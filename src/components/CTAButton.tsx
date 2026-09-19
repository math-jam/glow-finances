"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";
import { CHECKOUT_URL, handleCheckout } from "@/lib/checkout";
import { scrollToSection } from "@/lib/animations";

type Variant = "primary" | "secondary" | "ghost";
type Tone = "light" | "dark";

interface Props {
  children: ReactNode;
  /** Aponta para o checkout (renderiza <a> real). */
  checkout?: boolean;
  /** Rola suavemente até a seção informada. */
  scrollTo?: string;
  onClick?: () => void;
  variant?: Variant;
  /** Tom do fundo em que o botão está. */
  tone?: Tone;
  icon?: "right" | "down" | "none";
  size?: "md" | "lg";
  className?: string;
  ariaLabel?: string;
}

const base =
  "group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-[var(--radius-pill)] font-sans font-medium tracking-[0.18em] uppercase transition-all duration-500 ease-[var(--ease-glow)] will-change-transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 select-none";

const sizes: Record<NonNullable<Props["size"]>, string> = {
  md: "min-h-12 px-7 text-[0.7rem]",
  lg: "min-h-14 px-9 text-[0.75rem]",
};

const styles: Record<Tone, Record<Variant, string>> = {
  light: {
    primary:
      "bg-glow-black text-glow-cream shadow-[0_14px_40px_rgba(41,37,34,0.18)] hover:bg-glow-brown hover:shadow-[0_18px_50px_rgba(41,37,34,0.24)]",
    secondary:
      "bg-transparent text-glow-black border border-glow-black/25 hover:border-glow-black/60 hover:bg-glow-white/40",
    ghost: "bg-transparent text-glow-black/80 hover:text-glow-black px-2",
  },
  dark: {
    primary:
      "bg-glow-cream text-glow-black shadow-[0_14px_40px_rgba(0,0,0,0.25)] hover:bg-glow-white hover:shadow-[0_18px_50px_rgba(0,0,0,0.32)]",
    secondary:
      "bg-transparent text-glow-cream border border-glow-cream/30 hover:border-glow-cream/70 hover:bg-glow-cream/10",
    ghost: "bg-transparent text-glow-cream/80 hover:text-glow-cream px-2",
  },
};

export default function CTAButton({
  children,
  checkout,
  scrollTo,
  onClick,
  variant = "primary",
  tone = "light",
  icon = "right",
  size = "md",
  className = "",
  ariaLabel,
}: Props) {
  const cls = `${base} ${sizes[size]} ${styles[tone][variant]} ${className}`;

  const Icon =
    icon === "none" ? null : icon === "down" ? (
      <ArrowDown className="btn-arrow btn-arrow-down h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
    ) : (
      <ArrowRight className="btn-arrow h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
    );

  if (checkout) {
    const go = (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      handleCheckout();
    };
    return (
      <a href={CHECKOUT_URL} onClick={go} className={cls} aria-label={ariaLabel}>
        <span>{children}</span>
        {Icon}
      </a>
    );
  }

  const handle = () => {
    if (scrollTo) scrollToSection(scrollTo);
    onClick?.();
  };

  return (
    <button type="button" onClick={handle} className={cls} aria-label={ariaLabel}>
      <span>{children}</span>
      {Icon}
    </button>
  );
}
