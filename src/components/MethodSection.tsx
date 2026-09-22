"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { method } from "@/data/glowFinances";
import { EASE } from "@/lib/animations";
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

/** Fundo da seção: o mesmo tom (com o mesmo degradê) do fundo da foto do pó compacto. */
const BG = "linear-gradient(168deg, #e7d6cc 0%, #e2cdc2 42%, #dabfb1 78%, #d2b3a2 100%)";

/**
 * Mobile/tablet: o pó compacto e o pincel à direita das etapas, como na arte,
 * descendo da altura do título até depois do botão. Fica POR CIMA dos cards
 * (por isso o texto deles é mais escuro, para continuar legível).
 */
function CompactAside() {
  const reduce = useReducedMotion();
  // Dissolve só as bordas, para a foto se fundir no fundo (que tem o mesmo tom).
  const mask =
    "linear-gradient(90deg, transparent 0%, #000 18%, #000 100%), linear-gradient(180deg, transparent 0%, #000 10%, #000 90%, transparent 100%)";
  return (
    <motion.div
      aria-hidden="true"
      initial={reduce ? false : { opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.3, ease: EASE, delay: 0.2 }}
      className="pointer-events-none absolute right-[-16%] top-[-4%] z-20 w-[66%] sm:right-[-8%] sm:w-[44%] lg:hidden"
    >
      <motion.div
        className="relative aspect-[424/960] w-full"
        style={{ maskImage: mask, WebkitMaskImage: mask, maskComposite: "intersect", WebkitMaskComposite: "source-in" }}
        {...(reduce ? {} : { animate: { y: [0, -6, 0] }, transition: { duration: 7, ease: "easeInOut", repeat: Infinity } })}
      >
        <Image src={method.image.src} alt="" fill sizes="(min-width: 640px) 44vw, 60vw" quality={88} className="object-cover" />
      </motion.div>
    </motion.div>
  );
}

export default function MethodSection() {
  return (
    <section
      id="metodo"
      aria-labelledby="metodo-title"
      className="snap-section flex flex-col overflow-hidden"
      style={{ background: BG }}
    >
      <Parallax speed={0.12} className="pointer-events-none absolute left-[-10%] top-[20%] hidden lg:block">
        <div className="h-[380px] w-[380px] rounded-full border border-glow-brown/15" />
      </Parallax>
      <Parallax speed={-0.08} className="pointer-events-none absolute bottom-[-10%] right-[-6%] hidden lg:block">
        <div className="h-[300px] w-[300px] rounded-full bg-glow-cream/50 blur-3xl" />
      </Parallax>

      <div className="container-glow relative flex flex-1 flex-col justify-center pb-28 pt-8 lg:py-10 lg:pl-24">
        <div className="grid gap-6 lg:grid-cols-[52fr_48fr] lg:items-end lg:gap-12">
          <div>
            <Reveal index={0}>
              <span className="mb-5 block h-px w-10 bg-glow-brown/50" aria-hidden="true" />
              <p className="eyebrow mb-5 text-glow-brown/70">03 · O método Glow</p>
            </Reveal>
            <Reveal index={1}>
              <h2 id="metodo-title" className="text-display text-[clamp(2.1rem,4.4vw,3.4rem)] text-glow-black">
                {method.headline[0]}
                <br />
                <em className="italic text-glow-brown">{method.headline[1]}</em>
              </h2>
            </Reveal>
          </div>
          <Reveal index={2} as="p" className="hidden max-w-md font-sans lg:block text-[0.95rem] font-light leading-relaxed text-glow-black/70 sm:text-base lg:pb-1">
            {method.intro}
          </Reveal>
        </div>

        {/* 4 etapas: Skincare → Finanças. No mobile/tablet, o pó compacto à direita, como na arte. */}
        <div className="relative mt-5 lg:mt-10">
          <CompactAside />
          <ol
            className="relative z-0 grid gap-3 pr-[44%] sm:grid-cols-2 sm:pr-[34%] lg:grid-cols-4 lg:gap-4 lg:pr-0"
            aria-label="As 4 etapas do método"
          >
            {method.steps.map((step, i) => (
              <Reveal
                key={step.number}
                as="li"
                index={i}
                amount={0.2}
                className="flex items-center gap-4 rounded-[14px] bg-glow-cream/40 px-3.5 py-3.5 backdrop-blur-[2px] transition-all duration-500 ease-[var(--ease-glow)] hover:-translate-y-[5px] hover:bg-glow-cream/80 hover:shadow-[var(--shadow-soft)] sm:p-4 lg:flex-col lg:items-start lg:gap-5 lg:rounded-[var(--radius-card)] lg:border lg:border-glow-brown/10 lg:bg-glow-cream/60 lg:p-5 lg:backdrop-blur-none"
              >
                <div className="hidden shrink-0 items-end sm:flex lg:h-36 xl:h-40">
                  <Bottle variant={i} label={step.skin} />
                </div>
                <div>
                  <p className="font-sans text-[0.68rem] font-medium tracking-[0.2em] text-glow-brown/90">{step.number}</p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 font-serif text-[1.2rem] leading-tight text-glow-black lg:text-[1.25rem]">
                    <span>{step.skin}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-glow-terracotta" strokeWidth={1.5} aria-hidden="true" />
                    <em className="italic text-glow-brown">{step.money}</em>
                  </p>
                  <p className="mt-1.5 font-sans text-[0.8rem] font-normal leading-relaxed text-glow-black/85">{step.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal index={5} className="relative z-10 mt-5 lg:mt-8">
            <CTAButton icon="down" scrollTo="finances" size="compact">
              {method.cta}
            </CTAButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
