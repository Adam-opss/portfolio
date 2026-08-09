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
  Download,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Section } from "@/components/ui/Section";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

// Formspree form id (the part after formspree.io/f/). Public, safe to commit.
// Leave empty to fall back to opening the visitor's mail client.
const FORMSPREE_ID = "mljrgygl";

export function Contact() {
  const { content, ui } = useLanguage();
  const { person, social } = content;
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // No form backend configured: open the mail client as a graceful fallback.
    if (!FORMSPREE_ID) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
      const body = encodeURIComponent(
        `${form.message}\n\n- ${form.name} (${form.email})`,
      );
      window.location.href = `mailto:${person.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      return;
    }

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section
      id="contact"
      index={7}
      eyebrow={ui.contact.eyebrow}
      title={ui.contact.title}
      titleAccent={ui.contact.titleAccent}
      description={ui.contact.description}
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
                {ui.contact.findOnline}
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

            {person.resumeUrl && (
              <a
                href={person.resumeUrl}
                download="Adam_Palo_CV.pdf"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface-2/60 px-4 py-3 text-sm font-medium text-foreground transition hover:border-accent-blue/50 hover:text-accent-blue"
              >
                <Download className="h-4 w-4" /> {ui.contact.downloadCv}
              </a>
            )}
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface/40 p-4 text-sm text-muted">
            <Sparkles className="h-5 w-5 shrink-0 text-accent-blue" />
            {ui.contact.replies}
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-border bg-surface/60 p-6 backdrop-blur sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label={ui.contact.name}
              id="name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              placeholder={ui.contact.namePlaceholder}
            />
            <Field
              label={ui.contact.email}
              id="email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder={ui.contact.emailPlaceholder}
            />
          </div>
          <div className="mt-5">
            <Field
              label={ui.contact.message}
              id="message"
              textarea
              value={form.message}
              onChange={(v) => setForm({ ...form, message: v })}
              placeholder={ui.contact.messagePlaceholder}
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className={cn(
              "mt-6 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-on-accent transition-all duration-300 disabled:opacity-80",
              status === "sent"
                ? "bg-accent-cyan"
                : "bg-accent-blue shadow-glow hover:opacity-90",
            )}
          >
            {(status === "idle" || status === "error") && (
              <>
                {ui.contact.send} <Send className="h-4 w-4" />
              </>
            )}
            {status === "sending" && (
              <>
                {ui.contact.sending} <Loader2 className="h-4 w-4 animate-spin" />
              </>
            )}
            {status === "sent" && (
              <>
                {ui.contact.sent} <CheckCircle2 className="h-4 w-4" />
              </>
            )}
          </button>

          {status === "error" && (
            <p className="mt-3 flex items-center justify-center gap-2 text-sm text-red-400">
              <AlertCircle className="h-4 w-4" /> {ui.contact.error}
            </p>
          )}
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
