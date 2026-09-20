"use client";

import { diagnosis } from "@/data/glowFinances";
import { blurIn } from "@/lib/animations";
import CTAButton from "./CTAButton";
import Parallax from "./Parallax";
import Reveal from "./Reveal";

export default function DiagnosisSection() {
  return (
    <section
      id="diagnostico"
      aria-labelledby="diagnostico-title"
      className="snap-section flex flex-col overflow-hidden bg-glow-black text-glow-cream"
    >
      <Parallax speed={0.18} className="pointer-events-none absolute -right-32 top-[8%] hidden lg:block">
        <div className="h-[420px] w-[420px] rounded-full border border-glow-cream/10" />
      </Parallax>
      <Parallax speed={-0.1} className="pointer-events-none absolute -left-24 bottom-[6%] hidden lg:block">
        <div className="h-[260px] w-[260px] rounded-full bg-glow-terracotta/15 blur-3xl" />
      </Parallax>
      <div className="rule-terracotta absolute inset-x-0 top-0" aria-hidden="true" />

      <div className="container-glow relative flex flex-1 flex-col justify-center py-7 lg:py-10 lg:pl-24">
        <div className="grid gap-7 lg:grid-cols-[46fr_54fr] lg:items-center lg:gap-12">
          <div>
            <Reveal index={0} as="p" className="eyebrow mb-5 text-glow-beige/70">
              02 · Diagnóstico
            </Reveal>
            <Reveal index={1}>
              <h2 id="diagnostico-title" className="text-display text-[clamp(2.1rem,5vw,3.9rem)]">
                {diagnosis.headline[0]}
                <br />
                <em className="italic text-glow-beige">{diagnosis.headline[1]}</em>
              </h2>
            </Reveal>
            <Reveal index={2} as="p" className="mt-7 max-w-sm font-serif text-lg italic leading-snug text-glow-cream/80 sm:text-xl">
              {diagnosis.closing}
            </Reveal>
            <Reveal index={3} className="mt-8 hidden lg:block">
              <CTAButton tone="dark" variant="secondary" icon="down" scrollTo="metodo">
                {diagnosis.cta}
              </CTAButton>
            </Reveal>
          </div>

          {/* Perguntas: uma por vez, blur → nítido */}
          <ol className="flex flex-col gap-4 lg:gap-8" aria-label="Perguntas do diagnóstico">
            {diagnosis.questions.map((q, i) => (
              <Reveal
                key={q}
                as="li"
                index={i}
                variants={blurIn}
                amount={0.2}
                className="flex gap-5 border-l border-glow-cream/15 pl-5 lg:gap-7 lg:pl-7"
              >
                <span className="mt-1 shrink-0 font-serif text-sm tabular-nums text-glow-terracotta">0{i + 1}</span>
                <p className="font-serif text-[1.3rem] leading-snug text-glow-cream/90 sm:text-[1.5rem] lg:text-[1.75rem]">{q}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal index={3} className="mt-7 lg:hidden">
          <CTAButton tone="dark" variant="secondary" icon="down" scrollTo="metodo">
            {diagnosis.cta}
          </CTAButton>
        </Reveal>
      </div>
    </section>
  );
}
