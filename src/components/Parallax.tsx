"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type CSSProperties, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Intensidade e direção: 0.15 = desce devagar; -0.08 = sobe devagar. */
  speed?: number;
  /** Deslocamento máximo em px (é multiplicado por speed). */
  range?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Parallax leve baseado em transform. Só usa translateY, nunca top/left.
 * Desativado quando prefers-reduced-motion está ativo.
 */
export default function Parallax({ children, speed = 0.15, range = 400, className = "", style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [range * speed * -1, range * speed]);

  return (
    <motion.div ref={ref} className={className} style={{ ...style, y: reduce ? 0 : y }}>
      {children}
    </motion.div>
  );
}
