"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  CheckCircle2,
  Send,
  Loader2,
  Sparkles,
} from "lucide-react";
import { portfolio } from "@/config/portfolio";
import { Section } from "@/components/ui/Section";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent";

export function Contact() {
  const { person, social } = portfolio;
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // No backend wired up: open the user's mail client as a graceful fallback.
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n- ${form.name} (${form.email})`);
    setTimeout(() => {
      window.location.href = `mailto:${person.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
    }, 900);
  };

  return (
    <Section
      id="contact"
      index={7}
      eyebrow="Get in touch"
      title="Let's build"
      titleAccent="something"
      description="Open to internships, junior roles, and interesting data problems. Drop me a line."
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Info panel */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-border bg-surface/60 p-6 backdrop-blur">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1 text-xs text-accent-cyan">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan" />
              </span>
              {person.availability}
            </div>

            <div className="space-y-4">
              <a
                href={`mailto:${person.email}`}
                className="group flex items-center gap-4"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-2/60 text-accent-blue transition group-hover:scale-105">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <p className="text-xs text-muted">Email</p>
                  <p className="font-medium text-foreground">{person.email}</p>
                </span>
              </a>
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-2/60 text-accent-purple">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <p className="text-xs text-muted">Location</p>
                  <p className="font-medium text-foreground">{person.location}</p>
                </span>
              </div>
            </div>

            <div className="mt-6 border-t border-border pt-5">
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
                Find me online
              </p>
              <div className="flex flex-wrap gap-2">
                {social.map((s) => {
                  const Icon = getIcon(s.icon);
                  return (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      aria-label={s.label}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-2/60 text-muted transition hover:border-accent-blue/50 hover:text-accent-blue"
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface/40 p-4 text-sm text-muted">
            <Sparkles className="h-5 w-5 shrink-0 text-accent-blue" />
            Usually replies within 24 hours.
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-border bg-surface/60 p-6 backdrop-blur sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Name"
              id="name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              placeholder="Jane Doe"
            />
            <Field
              label="Email"
              id="email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder="jane@company.com"
            />
          </div>
          <div className="mt-5">
            <Field
              label="Message"
              id="message"
              textarea
              value={form.message}
              onChange={(v) => setForm({ ...form, message: v })}
              placeholder="Tell me about the role or project…"
            />
          </div>

          <button
            type="submit"
            disabled={status !== "idle"}
            className={cn(
              "mt-6 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-on-accent transition-all duration-300 disabled:opacity-80",
              status === "sent"
                ? "bg-accent-cyan"
                : "bg-accent-blue shadow-glow hover:opacity-90",
            )}
          >
            {status === "idle" && (
              <>
                Send Message <Send className="h-4 w-4" />
              </>
            )}
            {status === "sending" && (
              <>
                Sending <Loader2 className="h-4 w-4 animate-spin" />
              </>
            )}
            {status === "sent" && (
              <>
                Opening your mail app <CheckCircle2 className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </Section>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  textarea,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const shared =
    "peer w-full rounded-xl border bg-surface-2/40 px-4 pb-2 pt-6 text-sm text-foreground outline-none transition-colors placeholder:text-transparent focus:border-accent-blue/60";

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          required
          rows={5}
          value={value}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className={cn(shared, "resize-none border-border")}
        />
      ) : (
        <input
          id={id}
          type={type}
          required
          value={value}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className={cn(shared, "border-border")}
        />
      )}
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-4 top-4 text-sm transition-all duration-200",
          focused || value
            ? "top-2 text-[11px] text-accent-blue"
            : "text-muted",
        )}
      >
        {label}
      </label>
    </div>
  );
}
