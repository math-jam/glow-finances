"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { hero, logos, product } from "@/data/glowFinances";
import { EASE } from "@/lib/animations";
import BookMockup from "./BookMockup";
import CTAButton from "./CTAButton";
import Parallax from "./Parallax";

const tagPositions = [
  { className: "left-[-34%] top-[10%]", speed: 0.22 },
  { className: "right-[-40%] top-[22%]", speed: -0.12 },
  { className: "left-[-26%] bottom-[22%]", speed: -0.18 },
  { className: "right-[-34%] bottom-[6%]", speed: 0.14 },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const bookY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const rise = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: EASE, delay: 0.15 + i * 0.12 },
  });

  return (
    <section
      id="hero"
      ref={ref}
      aria-labelledby="hero-title"
      className="snap-section flex flex-col overflow-hidden bg-glow-cream"
    >
      {/* Foto de fundo com parallax lento */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ y: reduce ? 0 : bgY, scale: reduce ? 1 : bgScale }}
      >
        <Image
          src="/images/reading.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_65%] opacity-80 lg:object-[55%_72%]"
        />
      </motion.div>
      {/* Véu editorial: legibilidade à esquerda, foto respirando à direita */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(248,245,241,0.98) 0%, rgba(248,245,241,0.94) 38%, rgba(248,245,241,0.6) 60%, rgba(248,245,241,0.18) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(0deg, rgba(248,245,241,0.9), rgba(248,245,241,0))" }}
      />

      <div className="container-glow relative flex flex-1 flex-col pb-4 pt-5 lg:pb-8 lg:pt-8">
        {/* Marca: monograma GF */}
        <motion.header {...rise(0)} className="flex items-center justify-between lg:pl-16">
          <span className="flex items-center gap-3">
            <span className="relative h-11 w-11 overflow-hidden rounded-full ring-1 ring-glow-black/10 sm:h-12 sm:w-12">
              <Image src={logos.monogram.src} alt={logos.monogram.alt} fill sizes="48px" className="scale-[1.35] object-cover object-[50%_42%]" />
            </span>
            <span className="font-serif text-lg tracking-tight text-glow-black">
              Glow<span className="text-glow-terracotta">.</span>
            </span>
          </span>
          <span className="hidden font-sans text-[0.62rem] uppercase tracking-[0.3em] text-glow-black/55 sm:block">
            Por {product.author}
          </span>
        </motion.header>

        <div className="grid flex-1 items-center gap-5 pt-5 lg:grid-cols-[46fr_54fr] lg:gap-6 lg:pl-16 lg:pt-0">
          {/* Coluna de texto */}
          <motion.div style={{ y: reduce ? 0 : textY }} className="relative z-10 max-w-xl">
            <motion.p {...rise(1)} className="eyebrow mb-5 text-glow-terracotta">
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...rise(2)}
              id="hero-title"
              className="text-display text-[clamp(2.4rem,8.4vw,4rem)] text-glow-black lg:max-w-none lg:text-[3.2rem] xl:w-[128%] xl:text-[4.3rem]"
            >
              {hero.headline[0]}
              <br />
              <em className="font-medium italic text-glow-brown">{hero.headline[1]}</em>
            </motion.h1>

            <motion.p
              {...rise(3)}
              className="mt-4 max-w-md font-sans text-[0.95rem] font-light leading-relaxed text-glow-black/75 sm:text-lg lg:mt-6"
            >
              {hero.subheadline}
            </motion.p>

            <motion.div
              {...rise(4)}
              className="mt-5 flex flex-col gap-3 sm:flex-row lg:mt-8 lg:gap-4 sm:items-center lg:flex-col lg:items-start xl:flex-row xl:items-center"
            >
              <CTAButton checkout size="lg">
                {hero.ctaPrimary}
              </CTAButton>
              <CTAButton variant="ghost" icon="down" scrollTo="diagnostico">
                {hero.ctaSecondary}
              </CTAButton>
            </motion.div>
          </motion.div>

          {/* Coluna do livro */}
          <motion.div
            style={{ y: reduce ? 0 : bookY }}
            className="relative flex justify-center lg:justify-end lg:pr-12 xl:pr-24"
          >
            <div className="relative flex flex-col items-center">
              {hero.tags.map((tag, i) => (
                <Parallax
                  key={tag}
                  speed={tagPositions[i].speed}
                  range={300}
                  className={`absolute z-20 hidden xl:block ${tagPositions[i].className}`}
                >
                  <motion.span
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: EASE, delay: 0.9 + i * 0.15 }}
                    className="inline-block whitespace-nowrap rounded-[var(--radius-sm)] border border-glow-black/10 bg-glow-white/85 px-4 py-2 font-sans text-[0.62rem] uppercase tracking-[0.24em] text-glow-black/75 shadow-[var(--shadow-softer)] backdrop-blur-sm"
                  >
                    {tag}
                  </motion.span>
                </Parallax>
              ))}

              <BookMockup
                priority
                className="w-[130px] sm:w-[220px] md:w-[280px] lg:w-[250px] xl:w-[340px] 2xl:w-[400px]"
                sizes="(min-width: 1536px) 400px, (min-width: 1280px) 340px, (min-width: 1024px) 250px, (min-width: 768px) 280px, (min-width: 640px) 220px, 150px"
              />

              <ul className="mt-4 flex flex-wrap justify-center gap-1.5 xl:hidden" aria-label="O que está incluso">
                {hero.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-[var(--radius-sm)] border border-glow-black/10 bg-glow-white/75 px-3 py-1.5 font-sans text-[0.56rem] uppercase tracking-[0.2em] text-glow-black/70"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div {...rise(6)} className="mt-4 flex items-center gap-4 lg:mt-0 lg:pl-16">
          <span className="font-sans text-[0.6rem] uppercase tracking-[0.34em] text-glow-black/50">{hero.scrollHint}</span>
          <ArrowDown className="animate-glow-float h-3.5 w-3.5 text-glow-terracotta" strokeWidth={1.5} aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
