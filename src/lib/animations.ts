import type { Transition, Variants } from "framer-motion";

/** Easing editorial — suave, sem bounce. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const transition = (delay = 0, duration = 0.9): Transition => ({
  duration,
  delay,
  ease: EASE,
});

/** Fade + translate para textos e blocos. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: transition(i * 0.12),
  }),
};

/** Fade + blur → sharp (usado no diagnóstico). */
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 12 },
  visible: (i: number = 0) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: transition(i * 0.18, 1.1),
  }),
};

/** Escala discreta para imagens e cards. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: transition(i * 0.1, 1.1),
  }),
};

/** Configuração padrão para whileInView. */
export const viewport = { once: true, amount: 0.3 } as const;

/** Rola suavemente até uma seção. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
