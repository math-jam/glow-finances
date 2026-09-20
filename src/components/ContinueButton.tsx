"use client";

import { ArrowDown } from "lucide-react";
import { scrollToSection } from "@/lib/animations";

interface Props {
  to: string;
  label?: string;
  tone?: "light" | "dark";
  className?: string;
}

/** Botão discreto "Continuar ↓" usado no final das seções. */
export default function ContinueButton({ to, label = "Continuar", tone = "light", className = "" }: Props) {
  const color =
    tone === "dark"
      ? "text-glow-cream/70 hover:text-glow-cream border-glow-cream/25 hover:border-glow-cream/60"
      : "text-glow-black/65 hover:text-glow-black border-glow-black/20 hover:border-glow-black/50";

  return (
    <button
      type="button"
      onClick={() => scrollToSection(to)}
      aria-label={`${label}: ir para a próxima seção`}
      className={`group inline-flex min-h-12 items-center gap-3 rounded-[var(--radius-pill)] border px-5 py-2 font-sans text-[0.68rem] font-medium uppercase tracking-[0.26em] transition-all duration-500 ease-[var(--ease-glow)] hover:-translate-y-0.5 ${color} ${className}`}
    >
      <span>{label}</span>
      <ArrowDown className="btn-arrow btn-arrow-down h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
    </button>
  );
}
