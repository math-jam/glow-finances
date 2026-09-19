"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { content, product } from "@/data/glowFinances";
import { EASE } from "@/lib/animations";
import CTAButton from "./CTAButton";
import Reveal from "./Reveal";

export default function ContentSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="conteudo" aria-labelledby="conteudo-title" className="snap-section flex flex-col overflow-hidden bg-glow-white">
      <div className="container-glow relative flex flex-1 flex-col justify-center py-7 lg:py-10 lg:pl-24">
        <div className="grid gap-5 lg:grid-cols-[40fr_60fr] lg:items-center lg:gap-16">
          <div>
            <Reveal index={0} as="p" className="eyebrow mb-3 text-glow-terracotta lg:mb-5">
              05 — O que você vai aprender
            </Reveal>
            <Reveal index={1}>
              <h2 id="conteudo-title" className="text-display text-[clamp(1.9rem,3.8vw,3rem)] text-glow-black">
                {content.headline[0]}
                <br />
                <em className="italic text-glow-brown">{content.headline[1]}</em>
              </h2>
            </Reveal>
            <Reveal index={2} className="mt-4 hidden items-baseline gap-4 sm:flex lg:mt-6">
              <span className="font-serif text-6xl leading-none text-glow-beige">{product.chapters}</span>
              <span className="font-sans text-[0.68rem] uppercase tracking-[0.26em] text-glow-black/55">
                capítulos
                <br />
                em 6 áreas
              </span>
            </Reveal>

            {/* Seções editoriais reais do ebook */}
            <Reveal index={3} className="mt-4 lg:mt-6">
              <ul className="flex flex-wrap gap-1.5" aria-label="Seções editoriais do ebook">
                {content.features.map((f) => (
                  <li
                    key={f}
                    className="rounded-[var(--radius-pill)] border border-glow-black/10 px-3 py-1.5 font-sans text-[0.62rem] uppercase tracking-[0.2em] text-glow-black/70"
                  >
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-3 hidden font-sans text-[0.82rem] font-light text-glow-black/60 sm:block">{content.extra}</p>
            </Reveal>

            <Reveal index={4} className="mt-8 hidden lg:block">
              <CTAButton variant="secondary" icon="down" scrollTo="bonus">
                {content.cta}
              </CTAButton>
            </Reveal>
          </div>

          {/* Lista expansível */}
          <ul className="flex flex-col" aria-label="Áreas de conteúdo">
            {content.categories.map((cat, i) => {
              const isOpen = open === i;
              const panelId = `conteudo-panel-${i}`;
              return (
                <Reveal key={cat.number} as="li" index={i} amount={0.15} className="border-t border-glow-black/10 last:border-b">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center gap-4 py-2 text-left lg:gap-7 lg:py-4"
                  >
                    <span className="w-7 shrink-0 font-serif text-sm tabular-nums text-glow-terracotta">{cat.number}</span>
                    <span className="flex-1 font-serif text-[1.2rem] leading-snug text-glow-black transition-colors duration-500 group-hover:text-glow-brown sm:text-[1.4rem]">
                      {cat.title}
                    </span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-glow-black/15 transition-all duration-500 ease-[var(--ease-glow)] group-hover:border-glow-black/40 ${
                        isOpen ? "rotate-45 bg-glow-black text-glow-cream" : "text-glow-black"
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <ul className="flex flex-wrap gap-1.5 pb-3 pl-11 lg:pl-14" aria-label={`Capítulos de ${cat.title}`}>
                          {cat.chapters.map((c) => (
                            <li key={c} className="rounded-[var(--radius-sm)] bg-glow-cream px-3 py-1.5 font-sans text-[0.75rem] text-glow-black/80">
                              {c}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </ul>
        </div>

        <Reveal index={4} className="mt-6 lg:hidden">
          <CTAButton variant="secondary" icon="down" scrollTo="bonus">
            {content.cta}
          </CTAButton>
        </Reveal>
      </div>
    </section>
  );
}
