"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  Command as CommandIcon,
} from "lucide-react";
import { site } from "@/config/site";
import { portfolio } from "@/config/portfolio";
import { useLockBody } from "@/hooks/useLockBody";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface Command {
  id: string;
  label: string;
  hint?: string;
  icon: string;
  run: () => void;
  group: string;
}

interface PaletteContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  toggle: () => void;
}

const PaletteContext = createContext<PaletteContextValue | null>(null);

export function useCommandPalette(): PaletteContextValue {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error("useCommandPalette must be used within provider");
  return ctx;
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((p) => !p), []);

  // Global ⌘K / Ctrl+K shortcut.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  return (
    <PaletteContext.Provider value={{ open, setOpen, toggle }}>
      {children}
      <Palette open={open} onClose={() => setOpen(false)} />
    </PaletteContext.Provider>
  );
}

function Palette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  useLockBody(open);

  const commands: Command[] = useMemo(() => {
    const nav: Command[] = site.nav.map((n) => ({
      id: `nav-${n.id}`,
      label: `Go to ${n.label}`,
      icon: "Radar",
      group: "Navigation",
      run: () => scrollToId(n.id),
    }));

    const projects: Command[] = portfolio.projects.map((p) => ({
      id: `proj-${p.id}`,
      label: p.title,
      hint: "Project",
      icon: "FolderGit2",
      group: "Projects",
      run: () => scrollToId("projects"),
    }));

    const actions: Command[] = [
      {
        id: "email",
        label: "Copy email address",
        icon: "Mail",
        group: "Actions",
        run: () => navigator.clipboard?.writeText(portfolio.person.email),
      },
      ...portfolio.social.map((s) => ({
        id: `social-${s.label}`,
        label: `Open ${s.label}`,
        icon: s.icon,
        group: "Links",
        run: () => window.open(s.href, "_blank", "noopener"),
      })),
    ];

    return [...nav, ...projects, ...actions];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [commands, query]);

  // Reset on open.
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 40);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[active];
      if (cmd) {
        cmd.run();
        onClose();
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  // Group while preserving order.
  const groups = useMemo(() => {
    const map = new Map<string, Command[]>();
    filtered.forEach((c) => {
      const arr = map.get(c.group) ?? [];
      arr.push(c);
      map.set(c.group, arr);
    });
    return Array.from(map.entries());
  }, [filtered]);

  let flatIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface/90 shadow-soft backdrop-blur-xl"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-4 w-4 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections, projects, actions…"
                className="w-full bg-transparent py-4 text-sm text-foreground outline-none placeholder:text-muted"
              />
              <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] text-muted sm:inline">
                ESC
              </kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-muted">
                  No results for “{query}”.
                </p>
              )}
              {groups.map(([group, items]) => (
                <div key={group} className="mb-1">
                  <p className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted">
                    {group}
                  </p>
                  {items.map((cmd) => {
                    flatIndex += 1;
                    const idx = flatIndex;
                    const Icon = getIcon(cmd.icon);
                    return (
                      <button
                        key={cmd.id}
                        onMouseEnter={() => setActive(idx)}
                        onClick={() => {
                          cmd.run();
                          onClose();
                        }}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition",
                          active === idx
                            ? "bg-accent-blue/15 text-foreground"
                            : "text-muted hover:text-foreground",
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0 text-accent-blue" />
                        <span className="flex-1 truncate">{cmd.label}</span>
                        {cmd.hint && (
                          <span className="text-[11px] text-muted">{cmd.hint}</span>
                        )}
                        {active === idx && (
                          <CornerDownLeft className="h-3.5 w-3.5 text-muted" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[11px] text-muted">
              <span className="flex items-center gap-2">
                <CommandIcon className="h-3 w-3" /> Command Palette
              </span>
              <span className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <ArrowUp className="h-3 w-3" />
                  <ArrowDown className="h-3 w-3" /> navigate
                </span>
                <span className="flex items-center gap-1">
                  <CornerDownLeft className="h-3 w-3" /> select
                </span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
