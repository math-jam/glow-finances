"use client";

import { ArrowRight, Check, X } from "lucide-react";
import { audience } from "@/data/glowFinances";
import ContinueButton from "./ContinueButton";
import Parallax from "./Parallax";
import Reveal from "./Reveal";

export default function AudienceSection() {
  return (
    <section id="para-quem" aria-labelledby="para-quem-title" className="snap-section flex flex-col overflow-hidden bg-glow-cream">
      <Parallax speed={0.1} className="pointer-events-none absolute left-[40%] top-[-10%] hidden lg:block">
        <div className="h-[50vh] w-[50vh] rounded-full bg-glow-beige/50 blur-3xl" />
      </Parallax>

      <div className="container-glow relative flex flex-1 flex-col justify-center py-7 lg:py-10 lg:pl-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <Reveal index={0} as="p" className="eyebrow mb-5 text-glow-terracotta">
              05 · Para quem é
            </Reveal>
            <Reveal index={1}>
              <h2 id="para-quem-title" className="text-display text-[clamp(2rem,4.4vw,3.4rem)] text-glow-black">
                {audience.headline}
              </h2>
            </Reveal>
          </div>

          {/* O que muda */}
          <Reveal index={2} className="hidden sm:block">
            <ol className="flex flex-col gap-1.5" aria-label="O que muda">
              {audience.shifts.map((s) => (
                <li key={s.from} className="flex items-center gap-3 font-sans text-[0.66rem] uppercase tracking-[0.24em]">
                  <span className="w-24 text-right text-glow-black/45 sm:w-28">{s.from}</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-glow-terracotta" strokeWidth={1.5} aria-hidden="true" />
                  <span className="text-glow-black">{s.to}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <div className="mt-6 grid gap-3 lg:mt-10 lg:grid-cols-2 lg:gap-6">
          <Reveal index={2} amount={0.2} className="rounded-[var(--radius-card)] border border-glow-black/10 bg-glow-white p-6 sm:p-7">
            <h3 className="eyebrow text-glow-olive">{audience.forYou.title}</h3>
            <ul className="mt-4 flex flex-col divide-y divide-glow-black/8">
              {audience.forYou.items.map((item) => (
                <li key={item} className="flex items-start gap-4 py-3 first:pt-0 last:pb-0">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-glow-olive/15 text-glow-olive">
                    <Check className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="font-serif text-[1.05rem] leading-snug text-glow-black sm:text-[1.15rem]">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal index={3} amount={0.2} className="rounded-[var(--radius-card)] border border-glow-black/10 bg-glow-beige/40 p-6 sm:p-7">
            <h3 className="eyebrow text-glow-terracotta">{audience.notForYou.title}</h3>
            <ul className="mt-4 flex flex-col divide-y divide-glow-black/8">
              {audience.notForYou.items.map((item) => (
                <li key={item} className="flex items-start gap-4 py-3 first:pt-0 last:pb-0">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-glow-terracotta/15 text-glow-terracotta">
                    <X className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="font-serif text-[1.05rem] leading-snug text-glow-black/80 sm:text-[1.15rem]">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal index={4} className="mt-6 lg:mt-8">
          <ContinueButton to="autora" label={audience.cta} />
        </Reveal>
      </div>
    </section>
  );
}
