"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { faq } from "@/data/glowFinances";
import { EASE } from "@/lib/animations";
import CTAButton from "./CTAButton";
import Reveal from "./Reveal";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="snap-section flex flex-col overflow-hidden bg-glow-cream">
      <div className="container-glow relative flex flex-1 flex-col justify-center py-7 lg:py-10 lg:pl-24">
        <div className="grid gap-8 lg:grid-cols-[36fr_64fr] lg:items-center lg:gap-16">
          <div>
            <Reveal index={0} as="p" className="eyebrow mb-6 text-glow-terracotta">
              07 · Dúvidas
            </Reveal>
            <Reveal index={1}>
              <h2
                id="faq-title"
                className="text-display text-[clamp(2.1rem,4.6vw,3.6rem)] text-glow-black"
              >
                {faq.headline}
              </h2>
            </Reveal>
            <Reveal index={2} as="p" className="mt-6 max-w-sm font-sans text-base font-light leading-relaxed text-glow-black/65">
              O que você precisa saber antes de começar.
            </Reveal>
            <Reveal index={3} className="mt-10 hidden lg:block">
              <CTAButton icon="down" scrollTo="oferta">
                {faq.cta}
              </CTAButton>
            </Reveal>
          </div>

          <ul className="flex flex-col" aria-label="Perguntas frequentes">
            {faq.items.map((item, i) => {
              const isOpen = open === i;
              const id = `faq-panel-${i}`;
              return (
                <Reveal key={item.q} as="li" index={Math.min(i, 5)} amount={0.1} className="border-t border-glow-black/10 last:border-b">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={id}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-4 text-left"
                    >
                      <span className="font-serif text-[1.15rem] leading-snug text-glow-black transition-colors duration-500 group-hover:text-glow-brown sm:text-[1.3rem]">
                        {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-glow-black/15 transition-all duration-500 ease-[var(--ease-glow)] group-hover:border-glow-black/40 ${
                          isOpen ? "rotate-45 bg-glow-black text-glow-cream" : "text-glow-black"
                        }`}
                      >
                        <Plus className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={id}
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-5 font-sans text-[0.92rem] font-light leading-relaxed text-glow-black/70">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </ul>
        </div>

        <Reveal index={3} className="mt-8 lg:hidden">
          <CTAButton icon="down" scrollTo="oferta">
            {faq.cta}
          </CTAButton>
        </Reveal>
      </div>
    </section>
  );
}
