"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animations";

interface Props {
  /** Classes de largura responsiva (a altura segue a proporção 2:3 do mockup). */
  className?: string;
  /** Atributo sizes do next/image, alinhado às larguras usadas em className. */
  sizes?: string;
  priority?: boolean;
}

/**
 * Mockup oficial do ebook (imagem 3D fornecida pela autora, fundo transparente),
 * com sombra projetada e entrada suave.
 */
export default function BookMockup({ className = "w-[240px]", sizes = "240px", priority = false }: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`relative aspect-[2/3] ${className}`}
      initial={reduce ? false : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.3, ease: EASE, delay: 0.2 }}
    >
      {/* Sombra projetada no "chão" */}
      <div aria-hidden="true" className="absolute inset-x-[12%] -bottom-4 h-8 rounded-[50%] bg-glow-black/30 blur-2xl" />
      <div className="relative h-full w-full transition-transform duration-700 ease-[var(--ease-glow)] hover:-translate-y-1 hover:scale-[1.02]">
        <Image
          src="/images/cover.webp"
          alt="Ebook Glow Finances — O guia prático para mulheres que querem cuidar do dinheiro e construir liberdade, por Fernanda Oliveira"
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain drop-shadow-[0_30px_50px_rgba(41,37,34,0.35)]"
        />
      </div>
    </motion.div>
  );
}
