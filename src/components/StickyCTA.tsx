"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { stickyCta } from "@/data/glowFinances";
import { EASE } from "@/lib/animations";
import CTAButton from "./CTAButton";

/**
 * Barra de CTA fixa. Aparece depois do Hero (mobile) ou após ~35% da página
 * (desktop) e some a partir do FAQ, onde o CTA principal já está em destaque.
 */
export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const compute = () => {
      ticking = false;
      const hero = document.getElementById("hero");
      // Some a partir do FAQ: FAQ e Oferta já têm CTAs próprios em destaque.
      const offer = document.getElementById("faq") ?? document.getElementById("oferta");
      const y = window.scrollY;
      const vh = window.innerHeight;
      const total = document.documentElement.scrollHeight - vh;
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

      const pastHero = hero ? y > hero.offsetHeight * 0.85 : y > vh * 0.85;
      const past35 = total > 0 ? y / total > 0.35 : false;
      const offerTop = offer ? offer.getBoundingClientRect().top : Infinity;
      const inOffer = offerTop < vh * 0.5;

      setVisible((isDesktop ? past35 : pastHero) && !inOffer);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-cta"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-50 lg:inset-x-auto lg:bottom-6 lg:right-8"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="flex items-center justify-between gap-4 border-t border-glow-black/10 bg-glow-cream/95 px-5 py-3 backdrop-blur-md lg:rounded-[var(--radius-pill)] lg:border lg:px-3 lg:py-2 lg:pl-6 lg:shadow-[0_20px_60px_rgba(41,37,34,0.18)]">
            <div className="min-w-0">
              <p className="truncate font-serif text-[0.9rem] text-glow-black sm:text-[0.95rem]">
                <span className="sm:hidden">Glow Finances</span>
                <span className="hidden sm:inline">{stickyCta.text}</span>
              </p>
              <p className="whitespace-nowrap font-sans text-[0.58rem] uppercase tracking-[0.18em] text-glow-black/50 lg:text-[0.62rem] lg:tracking-[0.24em]">
                <span className="sm:hidden">+ Planilha bônus</span>
                <span className="hidden sm:inline">Livro digital · Planilha</span>
              </p>
            </div>
            <CTAButton checkout size="md" className="shrink-0 px-5! sm:px-7!">
              {stickyCta.cta}
            </CTAButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
