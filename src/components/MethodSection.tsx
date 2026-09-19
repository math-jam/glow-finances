"use client";

import { ArrowRight } from "lucide-react";
import { method } from "@/data/glowFinances";
import CTAButton from "./CTAButton";
import Parallax from "./Parallax";
import Reveal from "./Reveal";

/* Frascos abstratos — visual próprio, sem fotos de cosméticos. */
function Bottle({ variant, label }: { variant: number; label: string }) {
  const stroke = "#4B3832";
  const fill = ["#F8F5F1", "#E9D9CF", "#D9C1B4", "#C99A8C"][variant];

  return (
    <svg viewBox="0 0 120 200" className="h-24 w-auto sm:h-28 lg:h-32 xl:h-36" role="img" aria-label={`Frasco ${label}`}>
      <defs>
        <linearGradient id={`shine-${variant}`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {variant === 0 && (
        <>
          <rect x="44" y="12" width="32" height="18" rx="4" fill={stroke} />
          <rect x="30" y="34" width="60" height="150" rx="14" fill={fill} stroke={stroke} strokeWidth="1.2" />
          <rect x="36" y="42" width="14" height="120" rx="7" fill={`url(#shine-${variant})`} />
          <rect x="42" y="92" width="36" height="46" rx="3" fill="none" stroke={stroke} strokeWidth="0.8" />
        </>
      )}
      {variant === 1 && (
        <>
          <rect x="22" y="62" width="76" height="16" rx="6" fill={stroke} />
          <rect x="18" y="80" width="84" height="100" rx="26" fill={fill} stroke={stroke} strokeWidth="1.2" />
          <rect x="26" y="90" width="14" height="70" rx="7" fill={`url(#shine-${variant})`} />
          <circle cx="60" cy="130" r="18" fill="none" stroke={stroke} strokeWidth="0.8" />
        </>
      )}
      {variant === 2 && (
        <>
          <rect x="50" y="6" width="20" height="20" rx="10" fill={stroke} />
          <rect x="54" y="26" width="12" height="34" rx="2" fill="none" stroke={stroke} strokeWidth="1.2" />
          <rect x="46" y="58" width="28" height="12" rx="3" fill={stroke} />
          <rect x="30" y="70" width="60" height="112" rx="16" fill={fill} stroke={stroke} strokeWidth="1.2" />
          <rect x="36" y="80" width="12" height="86" rx="6" fill={`url(#shine-${variant})`} />
          <line x1="60" y1="60" x2="60" y2="150" stroke={stroke} strokeWidth="0.8" strokeDasharray="2 4" />
        </>
      )}
      {variant === 3 && (
        <>
          <rect x="46" y="8" width="28" height="22" rx="5" fill={stroke} />
          <path
            d="M34 40 h52 a8 8 0 0 1 8 8 v118 c0 10 -10 16 -34 16 s-34 -6 -34 -16 V48 a8 8 0 0 1 8 -8z"
            fill={fill}
            stroke={stroke}
            strokeWidth="1.2"
          />
          <rect x="38" y="48" width="12" height="110" rx="6" fill={`url(#shine-${variant})`} />
          <path d="M44 96 l16 -12 l16 12 v26 l-16 12 l-16 -12z" fill="none" stroke={stroke} strokeWidth="0.8" />
        </>
      )}
    </svg>
  );
}

export default function MethodSection() {
  return (
    <section id="metodo" aria-labelledby="metodo-title" className="snap-section flex flex-col overflow-hidden bg-glow-beige">
      <Parallax speed={0.12} className="pointer-events-none absolute left-[-10%] top-[20%] hidden lg:block">
        <div className="h-[380px] w-[380px] rounded-full border border-glow-brown/15" />
      </Parallax>
      <Parallax speed={-0.08} className="pointer-events-none absolute bottom-[-10%] right-[-6%] hidden lg:block">
        <div className="h-[300px] w-[300px] rounded-full bg-glow-cream/50 blur-3xl" />
      </Parallax>

      <div className="container-glow relative flex flex-1 flex-col justify-center py-7 lg:py-10 lg:pl-24">
        <div className="grid gap-6 lg:grid-cols-[52fr_48fr] lg:items-end lg:gap-12">
          <div>
            <Reveal index={0} as="p" className="eyebrow mb-5 text-glow-brown/70">
              03 — O método Glow
            </Reveal>
            <Reveal index={1}>
              <h2 id="metodo-title" className="text-display text-[clamp(2rem,4.4vw,3.4rem)] text-glow-black">
                {method.headline[0]}
                <br />
                <em className="italic text-glow-brown">{method.headline[1]}</em>
              </h2>
            </Reveal>
          </div>
          <Reveal index={2} as="p" className="hidden max-w-md font-sans sm:block text-[0.95rem] font-light leading-relaxed text-glow-black/70 sm:text-base lg:pb-1">
            {method.intro}
          </Reveal>
        </div>

        {/* 4 etapas: Skincare → Finanças */}
        <ol className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-4" aria-label="As 4 etapas do método">
          {method.steps.map((step, i) => (
            <Reveal
              key={step.number}
              as="li"
              index={i}
              amount={0.2}
              className="flex items-center gap-4 rounded-[var(--radius-card)] border border-glow-brown/10 bg-glow-cream/60 px-4 py-3 transition-all sm:p-4 duration-500 ease-[var(--ease-glow)] hover:-translate-y-[5px] hover:bg-glow-cream hover:shadow-[var(--shadow-soft)] lg:flex-col lg:items-start lg:gap-5 lg:p-5"
            >
              <div className="hidden shrink-0 items-end sm:flex lg:h-36 xl:h-40">
                <Bottle variant={i} label={step.skin} />
              </div>
              <div>
                <p className="eyebrow text-glow-terracotta">{step.number}</p>
                <p className="mt-1.5 flex flex-wrap items-center gap-x-2 font-serif text-[1.15rem] leading-tight text-glow-black lg:text-[1.25rem]">
                  <span>{step.skin}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-glow-terracotta" strokeWidth={1.5} aria-hidden="true" />
                  <em className="italic text-glow-brown">{step.money}</em>
                </p>
                <p className="mt-2 font-sans text-[0.8rem] font-light leading-relaxed text-glow-black/60">{step.detail}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal index={5} className="mt-6 lg:mt-8">
          <CTAButton icon="down" scrollTo="finances">
            {method.cta}
          </CTAButton>
        </Reveal>
      </div>
    </section>
  );
}
