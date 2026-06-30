"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight, X, Search } from "lucide-react";
import { portfolio, type Project } from "@/config/portfolio";
import { Section } from "@/components/ui/Section";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { Tag } from "@/components/ui/Badge";
import { useLockBody } from "@/hooks/useLockBody";

export function Projects() {
  const { projects } = portfolio;

  // All unique tags for the filter bar.
  const allTags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, [projects]);

  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesTag = filter === "All" || p.tags.includes(filter);
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q));
      return matchesTag && matchesQuery;
    });
  }, [projects, filter, query]);

  return (
    <Section
      id="projects"
      index={3}
      eyebrow="Selected work"
      title="Featured"
      titleAccent="projects"
      description="A selection of analytics, machine-learning, and BI work, each solving a real problem end to end."
    >
      {/* Controls */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Tag key={tag} active={filter === tag} onClick={() => setFilter(tag)}>
              {tag}
            </Tag>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5">
          <Search className="h-4 w-4 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects…"
            className="w-40 bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
          />
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} onOpen={() => setSelected(project)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-muted">
          No projects match your filters.
        </p>
      )}

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <SpotlightCard className="flex h-full flex-col">
      {/* Cover */}
      <button
        onClick={onOpen}
        data-cursor-label="View"
        className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl text-left"
        aria-label={`Open ${project.title}`}
      >
        <div className="absolute inset-0 bg-accent-blue opacity-[0.05] transition-opacity duration-500 group-hover:opacity-[0.1]" />
        <div className="absolute inset-0 p-5 opacity-80 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100">
          <ProjectVisual variant={project.visual} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        {project.featured && (
          <span className="absolute left-3 top-3 rounded-full border border-accent-blue/40 bg-bg/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-accent-blue backdrop-blur">
            Featured
          </span>
        )}
        <span className="absolute right-3 top-3 flex h-8 w-8 translate-x-2 items-center justify-center rounded-full border border-border bg-bg/70 text-foreground opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </button>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-foreground">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-justify text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        {/* Metrics */}
        {project.metrics && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {project.metrics.slice(0, 3).map((m) => (
              <div
                key={m.label}
                className="rounded-lg border border-border bg-surface-2/40 p-2 text-center"
              >
                <p className="font-display text-sm font-bold text-foreground">
                  {m.value}
                </p>
                <p className="text-[10px] leading-tight text-muted">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tech */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md bg-surface-2/60 px-2 py-0.5 text-[11px] text-muted"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="rounded-md bg-surface-2/60 px-2 py-0.5 text-[11px] text-muted">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted transition hover:border-accent-blue/50 hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" /> Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted transition hover:border-accent-blue/50 hover:text-foreground"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Demo
            </a>
          )}
          <button
            onClick={onOpen}
            className="ml-auto text-xs font-medium text-accent-blue hover:underline"
          >
            Details →
          </button>
        </div>
      </div>
    </SpotlightCard>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useLockBody(Boolean(project));

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-surface/95 shadow-soft backdrop-blur-xl"
          >
            <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-t-3xl">
              <div className="absolute inset-0 bg-accent-blue opacity-[0.05]" />
              <div className="absolute inset-0 p-6">
                <ProjectVisual variant={project.visual} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg/70 text-foreground backdrop-blur transition hover:text-accent-blue"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-accent-blue/30 bg-accent-blue/10 px-2.5 py-0.5 text-[11px] text-accent-blue"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold text-foreground">
                {project.title}
              </h3>
              <p className="mt-3 text-justify leading-relaxed text-muted">
                {project.longDescription ?? project.description}
              </p>

              {project.metrics && (
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-border bg-surface-2/40 p-3 text-center"
                    >
                      <p className="font-display text-lg font-bold text-foreground">
                        {m.value}
                      </p>
                      <p className="text-[11px] text-muted">{m.label}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted">
                  Tech stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg bg-surface-2/60 px-2.5 py-1 text-xs text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-7 flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground transition hover:border-accent-blue/50"
                  >
                    <Github className="h-4 w-4" /> View Code
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full bg-accent-blue px-4 py-2 text-sm font-medium text-on-accent shadow-glow hover:opacity-90"
                  >
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
