"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { audience } from "@/data/glowFinances";
import { EASE } from "@/lib/animations";
import ContinueButton from "./ContinueButton";
import Parallax from "./Parallax";
import Reveal from "./Reveal";

/* Posição e ritmo de cada etiqueta "flutuando" ao redor da foto. */
const tagSpots = [
  { className: "left-[-18%] top-[18%]", duration: 6.2, delay: 0.4 },
  { className: "right-[-22%] top-[40%]", duration: 7.1, delay: 1.1 },
  { className: "left-[-24%] bottom-[24%]", duration: 6.6, delay: 0.8 },
];

/** Foto recortada da Fernanda, sem fundo, "flutuando" ao lado do texto. */
function FloatingPortrait() {
  const reduce = useReducedMotion();
  const float = (amp: number, duration: number, delay = 0) =>
    reduce
      ? {}
      : { animate: { y: [0, -amp, 0] }, transition: { duration, delay, ease: "easeInOut" as const, repeat: Infinity } };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
      className="relative flex items-end justify-center"
    >
      {/* Luz suave e anel fino atrás da foto */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[12%] h-[62%] w-[150%] -translate-x-1/2 rounded-full bg-glow-beige/60 blur-3xl" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[6%] aspect-square w-[128%] -translate-x-1/2 rounded-full border border-glow-terracotta/30"
        {...float(10, 9, 0.6)}
      />

      {/* Foto com leve flutuação */}
      <motion.div className="relative will-change-transform" {...float(14, 6.4)}>
        <Image
          src={audience.photo.src}
          alt={audience.photo.alt}
          width={456}
          height={1280}
          sizes="(min-width: 1280px) 260px, 220px"
          quality={90}
          className="h-[min(66vh,620px)] w-auto"
        />
      </motion.div>

      {/* Sombra no "chão", que encolhe quando a foto sobe */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-6px] left-1/2 h-4 w-[60%] -translate-x-1/2 rounded-full bg-glow-black/20 blur-md"
        {...(reduce ? {} : { animate: { scaleX: [1, 0.8, 1], opacity: [0.6, 0.35, 0.6] }, transition: { duration: 6.4, ease: "easeInOut", repeat: Infinity } })}
      />

      {/* Etiquetas: o que muda */}
      {audience.shifts.map((s, i) => (
        <motion.div
          key={s.from}
          aria-hidden="true"
          className={`pointer-events-none absolute z-10 ${tagSpots[i].className}`}
          {...float(8, tagSpots[i].duration, tagSpots[i].delay)}
        >
          <span className="flex items-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] border border-glow-black/10 bg-glow-white/90 px-3.5 py-2 font-sans text-[0.58rem] uppercase tracking-[0.22em] shadow-[var(--shadow-softer)]">
            <span className="text-glow-black/45">{s.from}</span>
            <ArrowRight className="h-3 w-3 text-glow-terracotta" strokeWidth={1.5} />
            <span className="text-glow-black">{s.to}</span>
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function AudienceSection() {
  return (
    <section id="para-quem" aria-labelledby="para-quem-title" className="snap-section flex flex-col overflow-hidden bg-glow-cream">
      <Parallax speed={0.1} className="pointer-events-none absolute left-[30%] top-[-10%] hidden lg:block">
        <div className="h-[50vh] w-[50vh] rounded-full bg-glow-beige/50 blur-3xl" />
      </Parallax>
      <Parallax speed={-0.08} className="pointer-events-none absolute bottom-[-20%] left-[-8%] hidden lg:block">
        <div className="h-[360px] w-[360px] rounded-full border border-glow-brown/10" />
      </Parallax>

      <div className="container-glow relative flex flex-1 flex-col justify-center py-7 lg:py-10 lg:pl-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(240px,30%)] lg:items-center lg:gap-10 xl:gap-16">
          {/* Texto + cards */}
          <div>
            <Reveal index={0} as="p" className="eyebrow mb-5 text-glow-terracotta">
              05 · Para quem é
            </Reveal>
            <Reveal index={1}>
              <h2 id="para-quem-title" className="text-display max-w-3xl text-[clamp(2rem,4.4vw,3.4rem)] text-glow-black">
                {audience.headline[0]}
                <br />
                <em className="italic text-glow-brown">{audience.headline[1]}</em>
              </h2>
            </Reveal>

            <div className="mt-6 lg:mt-9">
              <div className="grid gap-3 sm:grid-cols-2 lg:gap-5">
              <Reveal index={2} amount={0.2} className="rounded-[var(--radius-card)] border border-glow-black/10 bg-glow-white p-6 sm:p-7">
                <h3 className="eyebrow flex items-center gap-3 text-glow-olive">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-glow-olive text-glow-cream">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
                  </span>
                  {audience.forYou.title}
                </h3>
                <ul className="mt-5 flex flex-col divide-y divide-glow-black/8">
                  {audience.forYou.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                      <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-glow-olive" aria-hidden="true" />
                      <span className="font-serif text-[1.02rem] leading-snug text-glow-black sm:text-[1.1rem]">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal index={3} amount={0.2} className="rounded-[var(--radius-card)] border border-glow-black/10 bg-glow-beige/40 p-6 sm:p-7">
                <h3 className="eyebrow flex items-center gap-3 text-glow-terracotta">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-glow-terracotta text-glow-cream">
                    <X className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
                  </span>
                  {audience.notForYou.title}
                </h3>
                <ul className="mt-5 flex flex-col divide-y divide-glow-black/8">
                  {audience.notForYou.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                      <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-glow-terracotta" aria-hidden="true" />
                      <span className="font-serif text-[1.02rem] leading-snug text-glow-black/80 sm:text-[1.1rem]">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              </div>
            </div>

            <Reveal index={4} className="mt-6 lg:mt-8">
              <ContinueButton to="proximo-passo" label={audience.cta} />
            </Reveal>
          </div>

          {/* Fernanda flutuando ao lado (desktop) */}
          <div className="hidden lg:block">
            <FloatingPortrait />
          </div>
        </div>
      </div>
    </section>
  );
}
