"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Props {
  src: string;
  /** Posição do recorte (object-position). */
  position?: string;
  /** Cor do fundo da seção, para a foto se fundir com ela. */
  fadeColor?: string;
  /** Altura do bloco da foto. */
  heightClass?: string;
  /** Fração do bloco (0–1) em que a foto ainda está nítida antes de começar a sumir. */
  sharpUntil?: number;
  priority?: boolean;
}

/**
 * Fundo fotográfico para mobile (some a partir de lg): a foto preenche o topo
 * da seção, fica nítida na metade de cima, desfoca e se funde com o fundo para
 * baixo, e se move em parallax durante o scroll.
 */
export default function MobilePhotoBackdrop({
  src,
  position = "50% 0%",
  fadeColor = "#F8F5F1",
  heightClass = "h-[62svh]",
  sharpUntil = 0.42,
  priority = false,
}: Props) {
  const pct = (v: number) => `${Math.round(Math.min(1, Math.max(0, v)) * 100)}%`;
  const sharpMask = `linear-gradient(180deg, #000 0%, #000 ${pct(sharpUntil)}, transparent ${pct(sharpUntil + 0.36)})`;
  const blurMask = `linear-gradient(180deg, transparent ${pct(sharpUntil - 0.12)}, #000 ${pct(sharpUntil + 0.13)}, #000 ${pct(sharpUntil + 0.33)}, transparent 100%)`;
  const fadeHeight = pct(1 - sharpUntil + 0.05);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 110]);

  const rgba = (a: number) => {
    const n = parseInt(fadeColor.slice(1), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  };

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-0 lg:hidden ${heightClass}`}
      style={{ y: reduce ? 0 : y }}
    >
      {/* Camada nítida (some a partir da metade) */}
      <div
        className="absolute inset-0"
        style={{ maskImage: sharpMask, WebkitMaskImage: sharpMask }}
      >
        <Image src={src} alt="" fill priority={priority} quality={90} sizes="100vw" className="object-cover" style={{ objectPosition: position }} />
      </div>
      {/* Camada desfocada (aparece na metade de baixo) */}
      <div
        className="absolute -inset-[6%]"
        style={{ maskImage: blurMask, WebkitMaskImage: blurMask }}
      >
        <Image src={src} alt="" fill quality={70} sizes="100vw" className="object-cover blur-xl" style={{ objectPosition: position }} />
      </div>
      {/* Fusão com o fundo da seção */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{ height: fadeHeight, background: `linear-gradient(180deg, ${rgba(0)} 0%, ${rgba(0.7)} 60%, ${fadeColor} 100%)` }}
      />
    </motion.div>
  );
}
