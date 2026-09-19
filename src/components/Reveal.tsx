"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { fadeUp, viewport } from "@/lib/animations";

interface Props {
  children: ReactNode;
  /** Índice para escalonar o atraso. */
  index?: number;
  variants?: Variants;
  className?: string;
  as?: ElementType;
  amount?: number;
}

/** Entra com fade + translate quando aparece na viewport (uma única vez). */
export default function Reveal({ children, index = 0, variants = fadeUp, className = "", as = "div", amount }: Props) {
  const Tag = (motion as unknown as Record<string, typeof motion.div>)[as as string] ?? motion.div;
  return (
    <Tag
      className={className}
      variants={variants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={amount ? { ...viewport, amount } : viewport}
    >
      {children}
    </Tag>
  );
}
