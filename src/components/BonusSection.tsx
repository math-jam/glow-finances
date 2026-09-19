"use client";

import { motion } from "framer-motion";
import { Check, Gift } from "lucide-react";
import { bonus } from "@/data/glowFinances";
import { EASE, scaleIn, viewport } from "@/lib/animations";
import CTAButton from "./CTAButton";
import Parallax from "./Parallax";
import Reveal from "./Reveal";

const toneBar: Record<string, string> = {
  olive: "bg-glow-olive/70",
  terracotta: "bg-glow-terracotta/70",
  beige: "bg-glow-beige",
};

const widths = ["82%", "58%", "40%", "24%", "66%"];

/** Mockup de notebook com a planilha desenhada em CSS (sem números inventados). */
function SpreadsheetMockup() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={scaleIn}
      className="relative mx-auto w-full max-w-[560px]"
    >
      {/* Brilho de "presente" atrás do notebook */}
      <div
        aria-hidden="true"
        className="absolute inset-[-10%] rounded-full bg-glow-cream/20 blur-3xl"
      />

      {/* Tela */}
      <div className="relative rounded-t-[14px] border-[6px] border-b-0 border-glow-black bg-glow-black shadow-[var(--shadow-deep)]">
        <div className="overflow-hidden rounded-t-[8px] bg-glow-cream">
          {/* Barra superior */}
          <div className="flex items-center justify-between border-b border-glow-black/10 px-4 py-2.5">
            <span className="font-serif text-[0.8rem] text-glow-black">{bonus.mockup.title}</span>
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-glow-beige" />
              <span className="h-2 w-2 rounded-full bg-glow-beige" />
              <span className="h-2 w-2 rounded-full bg-glow-terracotta/60" />
            </span>
          </div>

          {/* Tabela */}
          <div className="p-4 sm:p-5">
            <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-glow-black/10 pb-2 font-sans text-[0.55rem] uppercase tracking-[0.22em] text-glow-black/45">
              <span>Categoria</span>
              <span>Acompanhamento</span>
            </div>
            <ul className="mt-2 flex flex-col gap-2.5" aria-label="Categorias da planilha">
              {bonus.mockup.rows.map((row, i) => (
                <li key={row.label} className="grid grid-cols-[1fr_46%] items-center gap-4 sm:grid-cols-[1fr_52%]">
                  <span className="truncate font-sans text-[0.72rem] text-glow-black/80 sm:text-[0.78rem]">{row.label}</span>
                  <span className="relative block h-2 overflow-hidden rounded-full bg-glow-black/8">
                    <motion.span
                      variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
                      transition={{ duration: 1.1, ease: EASE, delay: 0.3 + i * 0.12 }}
                      style={{ width: widths[i] }}
                      className={`absolute inset-y-0 left-0 origin-left rounded-full ${toneBar[row.tone]}`}
                    />
                  </span>
                </li>
              ))}
            </ul>

            {/* Rodapé da planilha: meta + revisão mensal */}
            <div className="mt-4 hidden grid-cols-2 gap-3 sm:grid">
              <div className="rounded-[var(--radius-sm)] bg-glow-white p-3">
                <p className="font-sans text-[0.55rem] uppercase tracking-[0.2em] text-glow-black/45">Meta</p>
                <p className="mt-1 font-serif text-[0.9rem] text-glow-black">Reserva de emergência</p>
              </div>
              <div className="rounded-[var(--radius-sm)] bg-glow-white p-3">
                <p className="font-sans text-[0.55rem] uppercase tracking-[0.2em] text-glow-black/45">Rotina</p>
                <p className="mt-1 font-serif text-[0.9rem] text-glow-black">Revisão mensal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Base do notebook */}
      <div className="relative mx-[-4%] h-3 rounded-b-[10px] bg-[#3a332f] shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
        <span aria-hidden="true" className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-b bg-glow-black/60" />
      </div>
    </motion.div>
  );
}

export default function BonusSection() {
  return (
    <section
      id="bonus"
      aria-labelledby="bonus-title"
      className="snap-section flex flex-col overflow-hidden bg-glow-olive text-glow-cream"
    >
      <Parallax speed={0.16} className="pointer-events-none absolute -right-20 top-[-10%] hidden lg:block">
        <div className="h-[420px] w-[420px] rounded-full border border-glow-cream/15" />
      </Parallax>
      <Parallax speed={-0.1} className="pointer-events-none absolute left-[30%] bottom-[-20%] hidden lg:block">
        <div className="h-[320px] w-[320px] rounded-full bg-glow-cream/10 blur-3xl" />
      </Parallax>

      <div className="container-glow relative flex flex-1 flex-col justify-center py-7 lg:py-10 lg:pl-24">
        <div className="grid items-center gap-7 lg:grid-cols-[46fr_54fr] lg:gap-12">
          <div className="max-w-xl">
            <Reveal index={0} className="mb-5 inline-flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-glow-cream/40 bg-glow-cream/10 px-4 py-2 font-sans text-[0.62rem] uppercase tracking-[0.28em]">
                <Gift className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                {bonus.badge}
              </span>
            </Reveal>

            <Reveal index={1}>
              <h2
                id="bonus-title"
                className="text-display text-[clamp(2rem,4.4vw,3.4rem)]"
              >
                {bonus.headline[0]}
                <br />
                <em className="italic text-glow-beige">{bonus.headline[1]}</em>
              </h2>
            </Reveal>

            <Reveal index={2} className="mt-6 border-l border-glow-cream/30 pl-5">
              <p className="eyebrow text-glow-cream/70">{bonus.name[0]}</p>
              <p className="font-serif text-2xl text-glow-cream sm:text-3xl">{bonus.name[1]}</p>
            </Reveal>

            <Reveal index={3} as="p" className="mt-5 max-w-md font-sans text-[0.95rem] font-light leading-relaxed text-glow-cream/80 sm:text-base">
              {bonus.description}
            </Reveal>

            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2" aria-label="Como a planilha é usada">
              {bonus.uses.map((use, i) => (
                <Reveal key={use} as="li" index={i + 3} className="flex items-start gap-3 font-sans text-[0.92rem] text-glow-cream/90">
                  <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-glow-beige" strokeWidth={2} aria-hidden="true" />
                  <span>{use}</span>
                </Reveal>
              ))}
            </ul>

            <Reveal index={8} className="mt-6 lg:mt-8">
              <CTAButton tone="dark" icon="down" scrollTo="para-quem">
                {bonus.cta}
              </CTAButton>
            </Reveal>
          </div>

          <div className="relative">
            {/* Badge "BÔNUS" — presente premium */}
            <motion.span
              initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
              viewport={viewport}
              transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
              className="absolute -top-5 right-2 z-10 rounded-[var(--radius-pill)] bg-glow-terracotta px-5 py-2 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-glow-cream shadow-[var(--shadow-soft)] sm:right-6"
            >
              Bônus
            </motion.span>
            <SpreadsheetMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
