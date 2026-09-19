"use client";

import Image from "next/image";
import { Check, Lock, ShieldCheck, Download } from "lucide-react";
import { commercial, logos, offer, product } from "@/data/glowFinances";
import { scaleIn } from "@/lib/animations";
import BookMockup from "./BookMockup";
import CTAButton from "./CTAButton";
import Footer from "./Footer";
import Parallax from "./Parallax";
import Reveal from "./Reveal";
import UrgencyTimer from "./UrgencyTimer";

const badgeIcons = [Lock, ShieldCheck, Download];

export default function OfferSection() {
  const hasPrevious = commercial.previousPrice.trim() !== "";

  return (
    <section
      id="oferta"
      aria-labelledby="oferta-title"
      className="snap-section flex flex-col bg-glow-black text-glow-cream lg:overflow-visible!"
    >
      <div className="rule-terracotta absolute inset-x-0 top-0" aria-hidden="true" />
      <Parallax speed={0.1} className="pointer-events-none absolute left-[-10%] top-[10%] hidden lg:block">
        <div className="h-[420px] w-[420px] rounded-full bg-glow-terracotta/15 blur-3xl" />
      </Parallax>

      <div className="container-glow relative flex flex-1 flex-col justify-center pb-4 pt-8 lg:pb-4 lg:pl-24 lg:pt-10">
        <div className="grid items-center gap-3 lg:grid-cols-[50fr_50fr] lg:gap-16">
          {/* Texto + timer + logo */}
          <div className="max-w-xl">
            <Reveal index={0} as="p" className="eyebrow mb-3 hidden text-glow-beige/70 sm:block lg:mb-5">
              10 — Comece agora
            </Reveal>
            <Reveal index={1}>
              <h2 id="oferta-title" className="text-display text-[clamp(1.75rem,5.2vw,4.2rem)]">
                {offer.headline}
              </h2>
            </Reveal>
            <Reveal index={2} as="p" className="mt-3 hidden max-w-md font-serif sm:block text-lg italic leading-snug text-glow-beige sm:text-xl">
              {offer.subheadline}
            </Reveal>

            <Reveal index={3} className="mt-4 lg:mt-7">
              <UrgencyTimer tone="dark" />
            </Reveal>

            <Reveal index={4} className="mt-7 hidden items-center gap-5 lg:flex">
              {/* Logo: "Planeje hoje. Brilhe sempre." */}
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] ring-1 ring-glow-cream/10 xl:h-28 xl:w-28">
                <Image src={logos.script.src} alt={logos.script.alt} fill sizes="112px" className="object-cover" />
              </div>
              <ul className="flex flex-col gap-2" aria-label="Garantias de compra">
                {commercial.trustBadges.map((badge, i) => {
                  const Icon = badgeIcons[i] ?? Check;
                  return (
                    <li key={badge} className="flex items-center gap-2 font-sans text-[0.66rem] uppercase tracking-[0.22em] text-glow-cream/55">
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                      {badge}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          {/* Card principal */}
          <Reveal variants={scaleIn} amount={0.2}>
            <div className="relative rounded-[var(--radius-card)] bg-glow-cream p-3.5 text-glow-black shadow-[var(--shadow-deep)] sm:p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="eyebrow text-glow-terracotta">Ebook + bônus</p>
                  <h3 className="mt-1 font-serif text-2xl text-glow-black sm:text-3xl">{offer.cardTitle}</h3>
                </div>
                <span className="hidden font-serif text-5xl leading-none text-glow-beige sm:block" aria-hidden="true">
                  {product.chapters}
                </span>
              </div>

              <ul className="mt-3 grid gap-x-3 gap-y-0.5 sm:grid-cols-2 sm:gap-y-1.5" aria-label="O que está incluído">
                {offer.includes.map((item) => (
                  <li key={item} className="flex items-center gap-3 font-sans text-[0.8rem] text-glow-black/85 sm:text-[0.88rem]">
                    <Check className="h-3.5 w-3.5 shrink-0 text-glow-olive" strokeWidth={2} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex items-center gap-3 rounded-[var(--radius-sm)] border border-glow-olive/30 bg-glow-olive/10 px-3 py-1.5 sm:px-4 sm:py-3">
                <span className="rounded-[var(--radius-pill)] bg-glow-olive px-3 py-1 font-sans text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-glow-cream">
                  {offer.bonusLabel}
                </span>
                <span className="font-serif text-[0.95rem] leading-tight text-glow-black sm:text-lg">{offer.bonusItem}</span>
              </div>

              <div className="mt-3 flex flex-wrap items-end gap-x-4 gap-y-1 border-t border-glow-black/10 pt-3 sm:mt-4 sm:pt-4">
                {hasPrevious && (
                  <span className="font-sans text-sm text-glow-black/45 line-through">
                    <span className="sr-only">De </span>
                    {commercial.previousPrice}
                  </span>
                )}
                <span className="font-serif text-3xl leading-none text-glow-black sm:text-4xl">
                  <span className="sr-only">Por </span>
                  {commercial.price}
                </span>
                {commercial.installments && (
                  <span className="w-full font-sans text-sm text-glow-black/60">{commercial.installments}</span>
                )}
              </div>

              <CTAButton checkout size="lg" className="mt-3 w-full sm:mt-4">
                {offer.cta}
              </CTAButton>

              <ul className="mt-2.5 flex flex-wrap justify-center gap-x-3 gap-y-0.5 lg:hidden" aria-label="Garantias de compra">
                {commercial.trustBadges.map((badge, i) => {
                  const Icon = badgeIcons[i] ?? Check;
                  return (
                    <li key={badge} className="flex items-center gap-1.5 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-glow-black/50">
                      <Icon className="h-3 w-3" strokeWidth={1.5} aria-hidden="true" />
                      {badge}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      <Footer />
    </section>
  );
}
