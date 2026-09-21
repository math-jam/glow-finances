"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useCallback, useRef } from "react";
import { hero, logos, product } from "@/data/glowFinances";
import { EASE } from "@/lib/animations";
import CTAButton from "./CTAButton";
import MobilePhotoBackdrop from "./MobilePhotoBackdrop";

/* Etiquetas ao redor do retrato, cada uma em uma "profundidade" diferente. */
const tags = [
  { className: "left-[-14%] top-[14%]", depth: 1.7 },
  { className: "right-[-12%] top-[30%]", depth: 0.8 },
  { className: "left-[-8%] bottom-[26%]", depth: 1.2 },
  { className: "right-[-16%] bottom-[12%]", depth: 2.1 },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  /* Parallax de scroll */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const ambientY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  /* Parallax de ponteiro: camadas se deslocam em velocidades diferentes (efeito 3D) */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 60, damping: 18, mass: 0.6 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const cardX = useTransform(sx, (v) => v * -14);
  const cardY = useTransform(sy, (v) => v * -10);
  const cardRot = useTransform(sx, (v) => v * 1.2);
  const frameX = useTransform(sx, (v) => v * 12);
  const frameY = useTransform(sy, (v) => v * 10);
  const ambientX = useTransform(sx, (v) => v * -26);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reduce || e.pointerType !== "mouse") return;
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
      py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
    },
    [px, py, reduce],
  );
  const onPointerLeave = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  const rise = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: EASE, delay: 0.15 + i * 0.12 },
  });

  const portrait = (
    <motion.div
      className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-deep)] ring-1 ring-glow-black/10"
      style={{ x: reduce ? 0 : cardX, y: reduce ? 0 : cardY, rotate: reduce ? 0 : cardRot }}
    >
      <Image
        src="/images/hero-fernanda.webp"
        alt="Fernanda Oliveira, autora do Glow Finances"
        fill
        priority
        quality={90}
        sizes="(min-width: 1024px) 480px, 200px"
        className="object-cover object-[50%_18%]"
      />
    </motion.div>
  );

  return (
    <section
      id="hero"
      ref={ref}
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="snap-section flex flex-col overflow-hidden bg-glow-cream"
    >
      {/* Mobile: foto preenchendo o topo, desfocando e fundindo com o fundo, com parallax */}
      <MobilePhotoBackdrop src="/images/hero-fernanda.webp" position="50% 0%" heightClass="h-[64svh]" sharpUntil={0.46} priority />

      {/* Desktop: fundo ambiente, a mesma foto desfocada e suave, em outra profundidade */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[8%] hidden lg:block lg:left-[36%]"
        style={{ y: reduce ? 0 : ambientY, x: reduce ? 0 : ambientX }}
      >
        <Image src="/images/hero-ambient.webp" alt="" fill sizes="70vw" className="object-cover object-[50%_20%] opacity-60 blur-2xl" />
      </motion.div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, #F8F5F1 0%, rgba(248,245,241,0.96) 34%, rgba(248,245,241,0.7) 50%, rgba(248,245,241,0.35) 70%, rgba(248,245,241,0.55) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-40 lg:block"
        style={{ background: "linear-gradient(0deg, rgba(248,245,241,0.85), rgba(248,245,241,0))" }}
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

        <div className="flex flex-1 flex-col justify-end pt-[30svh] lg:grid lg:grid-cols-[48fr_52fr] lg:items-center lg:gap-8 lg:pl-16 lg:pt-0">

          {/* Texto */}
          <motion.div
            style={{ y: reduce ? 0 : textY }}
            className="relative z-10 -mx-5 max-w-xl px-5 pt-12 [background:linear-gradient(180deg,rgba(248,245,241,0)_0px,#F8F5F1_48px)] lg:mx-0 lg:px-0 lg:pt-0 lg:[background:none]"
          >
            <motion.p {...rise(1)} className="eyebrow mb-4 text-glow-terracotta lg:mb-5">
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...rise(2)}
              id="hero-title"
              className="text-display text-[clamp(2.1rem,7.6vw,4rem)] text-glow-black lg:max-w-none lg:text-[3.4rem] xl:w-[120%] xl:text-[4.3rem]"
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

            <motion.div {...rise(4)} className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-8 lg:gap-4">
              <CTAButton checkout size="lg">
                {hero.ctaPrimary}
              </CTAButton>
              <CTAButton variant="ghost" icon="down" scrollTo="diagnostico">
                {hero.ctaSecondary}
              </CTAButton>
            </motion.div>

            {/* Etiquetas em telas menores */}
            <motion.ul {...rise(5)} className="mt-5 flex flex-wrap gap-1.5 lg:hidden" aria-label="O que está incluso">
              {hero.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-[var(--radius-sm)] border border-glow-black/10 bg-glow-white/75 px-3 py-1.5 font-sans text-[0.56rem] uppercase tracking-[0.2em] text-glow-black/70"
                >
                  {tag}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Retrato com camadas (desktop) */}
          <motion.div {...rise(2)} className="relative hidden justify-center lg:flex xl:justify-end xl:pr-10">
            <motion.div style={{ y: reduce ? 0 : portraitY }} className="relative w-[min(42vw,460px)] xl:w-[min(36vw,480px)]">
              {/* Moldura fina em outra profundidade */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 rounded-[calc(var(--radius-card)+8px)] border border-glow-terracotta/40"
                style={{ x: reduce ? 0 : frameX, y: reduce ? 0 : frameY }}
              />
              {portrait}

              {hero.tags.map((tag, i) => (
                <FloatingTag key={tag} label={tag} className={tags[i].className} depth={tags[i].depth} sx={sx} sy={sy} delay={0.9 + i * 0.15} reduce={!!reduce} />
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div {...rise(6)} className="mt-4 hidden items-center gap-4 sm:flex lg:mt-0 lg:pl-16">
          <span className="font-sans text-[0.6rem] uppercase tracking-[0.34em] text-glow-black/50">{hero.scrollHint}</span>
          <ArrowDown className="animate-glow-float h-3.5 w-3.5 text-glow-terracotta" strokeWidth={1.5} aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}

interface TagProps {
  label: string;
  className: string;
  depth: number;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
  delay: number;
  reduce: boolean;
}

function FloatingTag({ label, className, depth, sx, sy, delay, reduce }: TagProps) {
  const x = useTransform(sx, (v) => v * 14 * depth);
  const y = useTransform(sy, (v) => v * 10 * depth);
  return (
    <motion.div aria-hidden="true" className={`pointer-events-none absolute z-20 ${className}`} style={{ x: reduce ? 0 : x, y: reduce ? 0 : y }}>
      <motion.span
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay }}
        className="inline-block whitespace-nowrap rounded-[var(--radius-sm)] border border-glow-black/10 bg-glow-white/90 px-4 py-2 font-sans text-[0.62rem] uppercase tracking-[0.24em] text-glow-black/80 shadow-[var(--shadow-softer)]"
      >
        {label}
      </motion.span>
    </motion.div>
  );
}
