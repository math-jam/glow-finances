"use client";

import Image from "next/image";
import { glossary, logos } from "@/data/glowFinances";
import { scaleIn } from "@/lib/animations";
import CTAButton from "./CTAButton";
import Parallax from "./Parallax";
import Reveal from "./Reveal";

/** 04 — Traduzindo o Financês: glossário real do ebook, financês → português. */
export default function GlossarySection() {
  return (
    <section
      id="finances"
      aria-labelledby="finances-title"
      className="snap-section flex flex-col overflow-hidden bg-glow-brown text-glow-cream"
    >
      <Parallax speed={-0.12} className="pointer-events-none absolute right-[-10%] top-[-10%] hidden lg:block">
        <div className="h-[420px] w-[420px] rounded-full bg-glow-terracotta/20 blur-3xl" />
      </Parallax>
      <div className="rule-terracotta absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="container-glow relative flex flex-1 flex-col justify-center py-7 lg:py-10 lg:pl-24">
        <div className="grid gap-6 lg:grid-cols-[38fr_62fr] lg:items-center lg:gap-14">
          {/* Texto + logo */}
          <div>
            <Reveal index={0} as="p" className="eyebrow mb-5 text-glow-beige/80">
              04 · {glossary.eyebrow}
            </Reveal>
            <Reveal index={1}>
              <h2 id="finances-title" className="text-display text-[clamp(2rem,4.4vw,3.4rem)]">
                {glossary.headline[0]}
                <br />
                <em className="italic text-glow-beige">{glossary.headline[1]}</em>
              </h2>
            </Reveal>
            <Reveal index={2} as="p" className="mt-4 hidden max-w-sm font-sans sm:block text-[0.95rem] font-light leading-relaxed text-glow-cream/75">
              {glossary.note}
            </Reveal>

            {/* Logo compacto + pincel: o conceito beleza × finanças */}
            <Reveal index={3} variants={scaleIn} className="mt-7 hidden items-center gap-5 lg:flex">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] ring-1 ring-glow-cream/10 xl:h-36 xl:w-36">
                <Image src={logos.compact.src} alt={logos.compact.alt} fill sizes="144px" className="object-cover" />
              </div>
              <p className="max-w-[200px] font-serif text-base italic leading-snug text-glow-beige">
                Beleza e finanças falam a mesma língua. Só faltava alguém traduzir.
              </p>
            </Reveal>

            <Reveal index={4} className="mt-8 hidden lg:block">
              <CTAButton tone="dark" variant="secondary" icon="down" scrollTo="bonus">
                {glossary.cta}
              </CTAButton>
            </Reveal>
          </div>

          {/* Tabela Financês → Português */}
          <div>
            <div className="mb-3 grid grid-cols-[1fr_1fr] px-5 sm:px-6">
              <Reveal index={0} as="p" className="eyebrow text-glow-cream/50">
                {glossary.columns.from}
              </Reveal>
              <Reveal index={1} as="p" className="eyebrow text-glow-beige">
                {glossary.columns.to}
              </Reveal>
            </div>
            <ul className="flex flex-col gap-2 lg:gap-3" aria-label="Glossário financês para português">
              {glossary.terms.map((t, i) => (
                <Reveal
                  key={t.term}
                  as="li"
                  index={i}
                  amount={0.2}
                  className="grid grid-cols-[1fr_1fr] rounded-[var(--radius-card)] border border-glow-cream/12 bg-glow-cream/[0.04] px-4 py-3 transition-all duration-500 ease-[var(--ease-glow)] hover:-translate-y-[3px] hover:bg-glow-cream/[0.07] sm:px-6 sm:py-5"
                >
                  <div className="border-r border-glow-cream/12 pr-4 sm:pr-6">
                    <p className="font-serif text-lg text-glow-cream sm:text-xl">{t.term}</p>
                    <p className="mt-1 font-sans text-[0.72rem] leading-snug text-glow-cream/50 sm:text-[0.78rem]">{t.jargon}</p>
                  </div>
                  <p className="pl-4 font-sans text-[0.85rem] leading-relaxed text-glow-cream/90 sm:pl-6 sm:text-[0.95rem]">{t.plain}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        <Reveal index={4} className="mt-6 lg:hidden">
          <CTAButton tone="dark" variant="secondary" icon="down" scrollTo="bonus">
            {glossary.cta}
          </CTAButton>
        </Reveal>
      </div>
    </section>
  );
}
