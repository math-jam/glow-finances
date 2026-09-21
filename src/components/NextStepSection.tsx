"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { logos, nextStep } from "@/data/glowFinances";
import { EASE, scaleIn } from "@/lib/animations";
import CTAButton from "./CTAButton";
import ContinueButton from "./ContinueButton";
import Parallax from "./Parallax";
import Reveal from "./Reveal";

const BG = "#3a2e27";

/**
 * Mobile/tablet: o pó compacto à direita do texto, em perspectiva (3D),
 * flutuando e com brilho atrás.
 */
function MobileCompact3D() {
  const reduce = useReducedMotion();
  const mask = "radial-gradient(ellipse 58% 56% at 50% 50%, #000 28%, rgba(0,0,0,0.6) 62%, transparent 92%)";

  return (
    <div className="pointer-events-none absolute -right-[20%] top-[-8%] z-0 w-[60%] [perspective:900px] lg:hidden" aria-hidden="true">
      {/* Brilho dourado atrás */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[80%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,154,140,0.45)_0%,rgba(169,103,91,0.18)_45%,transparent_70%)] blur-2xl"
        {...(reduce ? {} : { animate: { scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }, transition: { duration: 6, ease: "easeInOut", repeat: Infinity } })}
      />
      {/* Anel fino inclinado, dando profundidade */}
      <motion.div
        className="absolute left-1/2 top-[66%] aspect-square w-[70%] rounded-full border border-glow-beige/20"
        style={{ transform: "translate(-50%, -50%) rotateX(68deg) rotateZ(-12deg)" }}
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
      />
      {/* Imagem em perspectiva */}
      <motion.div
        className="relative aspect-[528/700] w-full [transform-style:preserve-3d]"
        initial={reduce ? false : { opacity: 0, rotateY: -38, rotateX: 10, x: 40 }}
        whileInView={reduce ? { opacity: 1 } : { opacity: 1, rotateY: -16, rotateX: 8, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.25 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ maskImage: mask, WebkitMaskImage: mask }}
          {...(reduce
            ? {}
            : { animate: { y: [0, -10, 0], rotateZ: [0, 1.5, 0] }, transition: { duration: 6.5, ease: "easeInOut", repeat: Infinity } })}
        >
          <Image src={nextStep.image.src} alt="" fill sizes="70vw" quality={85} className="object-cover" />
        </motion.div>
        {/* Sombra projetada no "chão", em profundidade */}
        <motion.div
          className="absolute bottom-[4%] left-1/2 h-[7%] w-[62%] -translate-x-1/2 rounded-full bg-black/45 blur-lg"
          style={{ transform: "translateX(-50%) translateZ(-60px)" }}
          {...(reduce ? {} : { animate: { scaleX: [1, 0.86, 1], opacity: [0.7, 0.45, 0.7] }, transition: { duration: 6.5, ease: "easeInOut", repeat: Infinity } })}
        />
      </motion.div>
    </div>
  );
}

/**
 * 06 — O seu próximo passo: fechamento da argumentação antes da autora.
 * Cena escura, com o pó compacto e o pincel dourados "Glow Finances".
 */
export default function NextStepSection() {
  const reduce = useReducedMotion();
  // A imagem se dissolve nas bordas, para se fundir com o fundo da seção.
  const mask =
    "linear-gradient(90deg, transparent 0%, #000 16%, #000 88%, transparent 100%), linear-gradient(180deg, transparent 0%, #000 14%, #000 84%, transparent 100%)";

  return (
    <section
      id="proximo-passo"
      aria-labelledby="proximo-passo-title"
      className="snap-section flex flex-col overflow-hidden text-glow-cream"
      style={{ backgroundColor: BG }}
    >
      {/* Luz rasante, como na cena de referência */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 40%, rgba(217,193,180,0.10) 62%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.3) 100%)",
        }}
      />
      <Parallax speed={-0.1} className="pointer-events-none absolute left-[-12%] top-[-20%] hidden lg:block">
        <div className="h-[480px] w-[480px] rounded-full bg-glow-terracotta/15 blur-3xl" />
      </Parallax>
      <div className="rule-terracotta absolute inset-x-0 top-0" aria-hidden="true" />

      {/* "Lombadas" no canto superior direito */}
      <ul
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-8 hidden flex-col items-end gap-1 font-serif text-[0.95rem] uppercase tracking-[0.34em] text-glow-beige/35 lg:flex xl:right-12"
      >
        {nextStep.spines.map((w, i) => (
          <motion.li
            key={w}
            initial={reduce ? false : { opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: EASE, delay: 0.5 + i * 0.12 }}
          >
            {w}
          </motion.li>
        ))}
      </ul>

      <div className="container-glow relative flex flex-1 flex-col justify-center py-7 lg:py-10 lg:pl-24">
        <div className="grid items-center gap-6 lg:grid-cols-[50fr_50fr] lg:gap-10">
          {/* Texto */}
          <div className="relative z-10 max-w-xl">
            <Reveal index={0} as="p" className="eyebrow mb-5 text-glow-beige/80">
              06 · {nextStep.eyebrow}
            </Reveal>
            <Reveal index={1}>
              <h2 id="proximo-passo-title" className="text-display text-[clamp(2.2rem,5vw,4rem)]">
                {nextStep.headline[0]} <em className="italic text-glow-beige">{nextStep.headline[1]}</em>
              </h2>
            </Reveal>

            <div className="relative">
              <MobileCompact3D />
              <Reveal
                index={2}
                className="relative z-10 mt-5 min-h-[min(58vw,300px)] max-w-md pr-[40%] font-sans text-[0.95rem] font-light leading-relaxed text-glow-cream/80 sm:text-lg lg:mt-7 lg:min-h-0 lg:pr-0"
              >
                <p>
                  {nextStep.lines[0]}
                  <br />
                  {nextStep.lines[1]}
                </p>
                <p className="mt-4 text-glow-cream">{nextStep.closing}</p>
              </Reveal>
            </div>

            <Reveal index={3} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-9 lg:gap-4">
              <CTAButton checkout tone="dark" size="lg">
                {nextStep.cta}
              </CTAButton>
              <ContinueButton to="autora" tone="dark" label={nextStep.ctaSecondary} />
            </Reveal>

            {/* Assinatura Glow Finances */}
            <Reveal index={4} className="mt-8 hidden items-center gap-4 sm:flex lg:mt-12">
              <span className="relative h-10 w-28 opacity-80">
                <Image src={logos.script.src} alt={logos.script.alt} fill sizes="112px" className="object-contain object-left" />
              </span>
              <span className="h-px w-8 bg-glow-beige/40" aria-hidden="true" />
              <span className="font-sans text-[0.58rem] uppercase tracking-[0.3em] text-glow-beige/60">Seu dinheiro também precisa de skincare.</span>
            </Reveal>
          </div>

          {/* Pó compacto + pincel */}
          <Reveal variants={scaleIn} amount={0.2} className="relative hidden w-full lg:block">
            <Parallax speed={-0.06} range={200}>
              <motion.div
                className="relative mx-auto aspect-[528/700] h-[min(46svh,420px)] max-w-full lg:h-[min(74vh,660px)]"
                style={{ maskImage: mask, WebkitMaskImage: mask, maskComposite: "intersect", WebkitMaskComposite: "source-in" }}
                {...(reduce ? {} : { animate: { y: [0, -8, 0] }, transition: { duration: 7, ease: "easeInOut", repeat: Infinity } })}
              >
                <Image
                  src={nextStep.image.src}
                  alt={nextStep.image.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 90vw"
                  quality={88}
                  className="object-cover"
                />
              </motion.div>
            </Parallax>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
