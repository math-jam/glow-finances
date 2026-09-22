"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { nextStep } from "@/data/glowFinances";
import { EASE, scaleIn } from "@/lib/animations";
import CTAButton from "./CTAButton";
import Parallax from "./Parallax";
import Reveal from "./Reveal";

const BG = "#3a2e27";

type IconName = (typeof nextStep.features)[number]["icon"];

/** Ícones de linha fina, iguais aos da capa do ebook. */
function FeatureIcon({ name }: { name: IconName }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: "h-[46%] w-[46%]",
  };

  if (name === "lipstick") {
    return (
      <svg {...common}>
        <path d="M10 11V5.6a2 2 0 0 1 1.1-1.8L14 2.6V11" />
        <rect x="8.6" y="11" width="6.8" height="6" rx="0.8" />
        <path d="M7.4 17h9.2v3.4a1 1 0 0 1-1 1H8.4a1 1 0 0 1-1-1z" />
      </svg>
    );
  }
  if (name === "book") {
    return (
      <svg {...common}>
        <path d="M12 6.6C10.6 5.4 8.4 5 3.6 5.2V18c4.8-.2 7 .2 8.4 1.4 1.4-1.2 3.6-1.6 8.4-1.4V5.2c-4.8-.2-7 .2-8.4 1.4Z" />
        <path d="M12 6.6V19.4" />
        <path d="M14.2 15.6v-2.4M16.2 15.6v-4.2M18.2 15.6V9.4" />
        <path d="M5.8 9.2h4M5.8 11.8h4M5.8 14.4h2.6" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M3.5 20.5h17" />
      <rect x="5.5" y="13.5" width="3" height="7" />
      <rect x="10.5" y="10" width="3" height="10.5" />
      <rect x="15.5" y="6.5" width="3" height="14" />
      <path d="M4.5 10.5 9 6.6l3.6 2.6L19.5 3.5" />
      <path d="M16.5 3.5h3v3" />
    </svg>
  );
}

/** Capa do ebook com sombra projetada na bancada. Preenche o contêiner pai (aspect 2:3). */
function BookCover({ sizes }: { sizes: string }) {
  return (
    <>
      <div aria-hidden="true" className="absolute inset-x-[8%] -bottom-3 h-8 rounded-[50%] bg-black/55 blur-2xl" />
      <Image
        src="/images/cover.png"
        alt="Ebook Glow Finances: o guia prático para mulheres que querem cuidar do dinheiro e construir liberdade, por Fernanda Oliveira"
        fill
        sizes={sizes}
        quality={90}
        className="object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.45)]"
      />
    </>
  );
}

/** Mobile/tablet: o livro à direita da descrição e dos pilares, como na arte. */
function MobileBook() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="absolute right-[-2%] top-1/2 z-0 aspect-[2/3] w-[52%] -translate-y-1/2 sm:right-[2%] sm:w-[43%] lg:hidden"
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
    >
      <motion.div
        className="relative h-full w-full"
        {...(reduce ? {} : { animate: { y: [0, -6, 0] }, transition: { duration: 7, ease: "easeInOut", repeat: Infinity } })}
      >
        <BookCover sizes="58vw" />
      </motion.div>
    </motion.div>
  );
}

/**
 * 06 — O seu próximo passo: fechamento da argumentação antes da autora.
 * Cena escura, com o livro em destaque sobre a bancada e o pincel dourado.
 */
export default function NextStepSection() {
  const reduce = useReducedMotion();
  // O pó compacto e o pincel se dissolvem nas bordas, para se fundir com a bancada.
  const brushMask = "radial-gradient(ellipse 52% 56% at 50% 50%, #000 26%, rgba(0,0,0,0.55) 58%, transparent 86%)";

  return (
    <section
      id="proximo-passo"
      aria-labelledby="proximo-passo-title"
      className="snap-section flex flex-col overflow-hidden text-glow-cream"
      style={{ backgroundColor: BG }}
    >
      {/* Bancada de pedra, na base da cena */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(58,46,39,0) 0%, rgba(92,78,69,0.55) 18%, #6a5c53 45%, #63554c 75%, #574a41 100%)",
        }}
      />
      {/* Luz rasante + sombra das folhas no canto superior direito */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 40%, rgba(217,193,180,0.08) 62%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.3) 100%)",
        }}
      />
      <Parallax speed={-0.08} className="pointer-events-none absolute right-[-8%] top-[-14%]">
        <div className="h-[280px] w-[280px] rounded-full bg-glow-olive/25 blur-3xl lg:h-[460px] lg:w-[460px]" />
      </Parallax>
      <div className="rule-terracotta absolute inset-x-0 top-0" aria-hidden="true" />

      {/* Pó compacto + pincel dourados sobre a bancada, no canto inferior */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[13%] right-[-8%] z-0 h-[24svh] w-[48vw] opacity-60 sm:w-[36vw] lg:bottom-[-1%] lg:left-[-2%] lg:right-auto lg:h-[30%] lg:w-[27%] lg:opacity-85"
        style={{ maskImage: brushMask, WebkitMaskImage: brushMask }}
        initial={reduce ? false : { opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
      >
        <Image src={nextStep.image.src} alt="" fill sizes="50vw" quality={85} className="object-cover object-[50%_32%]" />
      </motion.div>

      <div className="container-glow relative flex flex-1 flex-col justify-center py-8 lg:py-6 lg:pl-24">
        <div className="grid items-center lg:grid-cols-[52fr_48fr] lg:gap-x-12">
          {/* Texto */}
          <div className="relative z-10 min-w-0 lg:max-w-xl">
            <Reveal index={0} as="p" className="eyebrow mb-4 text-glow-beige/85">
              {nextStep.eyebrow}
            </Reveal>
            <Reveal index={1}>
              <h2 id="proximo-passo-title" className="text-display max-w-[13ch] text-[clamp(2.1rem,9.2vw,3.4rem)] lg:max-w-none lg:text-[clamp(2.4rem,min(4.6vw,6.2svh),4.2rem)]">
                {nextStep.headline[0]}{" "}
                <br className="hidden lg:inline" />
                {nextStep.headline[1]}{" "}
                <br className="hidden lg:inline" />
                {nextStep.headline[2]} <em className="italic text-glow-beige">{nextStep.headline[3]}</em>
              </h2>
            </Reveal>

            {/* Descrição + pilares; no mobile o livro fica ao lado, à direita */}
            <div className="relative">
              <MobileBook />
              <Reveal
                index={2}
                as="p"
                className="relative z-10 mt-4 pr-[52%] font-sans text-[0.9rem] font-light leading-relaxed text-glow-cream/85 sm:text-lg lg:mt-4 lg:max-w-md lg:pr-0"
              >
                {nextStep.description}
              </Reveal>

              <Reveal index={3} className="relative z-10">
                <ul className="mt-6 flex flex-col gap-4 lg:mt-5 lg:gap-3.5">
                  {nextStep.features.map((f, i) => (
                    <motion.li
                      key={f.icon}
                      className="flex items-center gap-4 lg:gap-5"
                      initial={reduce ? false : { opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.45 + i * 0.14 }}
                    >
                      <span className="flex h-[3.4rem] w-[3.4rem] shrink-0 items-center justify-center rounded-full border border-glow-beige/55 text-glow-beige lg:h-[3.6rem] lg:w-[3.6rem]">
                        <FeatureIcon name={f.icon} />
                      </span>
                      <span className="font-sans text-[0.95rem] font-light leading-snug text-glow-cream sm:text-lg lg:text-xl">
                        {f.label[0]}
                        <br />
                        {f.label[1]}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          {/* Livro sobre a bancada (desktop) */}
          <Reveal variants={scaleIn} amount={0.2} className="relative z-10 hidden w-full lg:block">
            <Parallax speed={-0.05} range={160}>
              <motion.div
                className="relative mx-auto aspect-[2/3] h-[min(66svh,610px)]"
                {...(reduce ? {} : { animate: { y: [0, -6, 0] }, transition: { duration: 7, ease: "easeInOut", repeat: Infinity } })}
              >
                <BookCover sizes="40vw" />
              </motion.div>
            </Parallax>
          </Reveal>
        </div>

        {/* CTA centralizado */}
        <Reveal index={4} className="relative z-10 mt-8 flex justify-center lg:mt-5">
          <CTAButton checkout tone="dark" variant="accent" size="lg" className="px-12 tracking-[0.22em]">
            {nextStep.cta}
          </CTAButton>
        </Reveal>

        {/* Fechamento */}
        <Reveal index={5} as="ul" className="relative z-10 mt-8 flex items-center justify-between gap-2 lg:mt-5 lg:justify-center lg:gap-0">
          {nextStep.taglines.map((t, i) => (
            <li
              key={t}
              className={`flex items-center whitespace-nowrap font-sans text-[0.56rem] uppercase tracking-[0.22em] text-glow-cream/80 sm:text-[0.66rem] sm:tracking-[0.3em] lg:text-[0.7rem] ${
                i > 0 ? "before:mr-3 before:h-6 before:w-px before:bg-glow-beige/45 sm:before:mr-8 lg:before:mx-12" : ""
              }`}
            >
              {t}
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
