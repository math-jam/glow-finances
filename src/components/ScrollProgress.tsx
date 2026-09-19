"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { sections } from "@/data/glowFinances";
import { useActiveSection } from "./useActiveSection";

/** Barra de progresso horizontal fina (mobile / tablet). */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const active = useActiveSection();

  return (
    <div
      className="fixed inset-x-0 top-0 z-40 lg:hidden"
      role="progressbar"
      aria-label="Progresso da página"
      aria-valuemin={0}
      aria-valuemax={sections.length}
      aria-valuenow={active + 1}
      aria-valuetext={`Seção ${active + 1} de ${sections.length}: ${sections[active]?.label ?? ""}`}
    >
      <div className="progress-track">
        <motion.div
          className="h-full origin-left bg-glow-terracotta"
          style={{ scaleX: reduce ? 1 : scaleX }}
        />
      </div>
    </div>
  );
}
