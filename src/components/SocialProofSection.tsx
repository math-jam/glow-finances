"use client";

import Image from "next/image";
import { socialProof } from "@/data/glowFinances";
import { scaleIn } from "@/lib/animations";
import CTAButton from "./CTAButton";
import MobilePhotoBackdrop from "./MobilePhotoBackdrop";
import Parallax from "./Parallax";
import Reveal from "./Reveal";

/**
 * Foto de quem comentou. Sem foto autorizada, cai no monograma — nunca em um
 * rosto genérico sem querer.
 */
function Avatar({ src, name }: { src?: string; name: string }) {
  const base =
    "relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-glow-black/10 sm:h-12 sm:w-12";

  if (!src) {
    const initial = name.replace(/[^\p{L}]/gu, "").charAt(0).toUpperCase() || "•";
    return (
      <span
        aria-hidden="true"
        className={`${base} flex items-center justify-center bg-glow-beige font-serif text-lg text-glow-brown`}
      >
        {initial}
      </span>
    );
  }

  return (
    <span className={base}>
      {/* alt vazio: o nome vem logo ao lado, no texto */}
      <Image src={src} alt="" fill sizes="48px" className="object-cover" />
    </span>
  );
}

/**
 * 09 — Prova social. Tom de acolhimento: o que mudou na cabeça de quem leu,
 * sem número de rentabilidade e sem promessa.
 */
export default function SocialProofSection() {
  return (
    <section
      id="prova-social"
      aria-labelledby="prova-social-title"
      className="snap-section flex flex-col overflow-hidden bg-[#E5D6CC]"
    >
      {/* Mobile: a mesma cena como fundo da seção, desaparecendo para baixo */}
      <MobilePhotoBackdrop
        src={socialProof.photo.src}
        position="50% 86%"
        fadeColor="#E5D6CC"
        heightClass="h-[56svh]"
        sharpUntil={0.52}
      />

      <Parallax speed={0.12} className="pointer-events-none absolute right-[-8%] top-[-10%] hidden lg:block">
        <div className="h-[380px] w-[380px] rounded-full bg-glow-cream/70 blur-3xl" />
      </Parallax>

      <div className="container-glow relative flex flex-1 flex-col justify-end pb-8 pt-[34svh] lg:justify-center lg:pb-7 lg:pl-24 lg:pt-7">
        <div className="grid items-center gap-7 lg:grid-cols-[42fr_58fr] lg:gap-12">
          {/* Foto de apoio — cena de rotina, não retrato de cliente */}
          <Reveal variants={scaleIn} className="relative order-2 hidden lg:order-1 lg:block">
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] sm:aspect-[4/3] lg:aspect-[10/11]">
              <Parallax speed={-0.06} range={180} className="relative h-full w-full">
                <Image
                  src={socialProof.photo.src}
                  alt={socialProof.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  quality={85}
                  className="scale-[1.04] object-cover object-[50%_72%]"
                />
              </Parallax>
            </div>
            <Reveal index={2} className="absolute -bottom-4 left-5 hidden rounded-[var(--radius-sm)] border border-glow-black/10 bg-glow-cream px-5 py-3 shadow-[var(--shadow-softer)] lg:block">
              <p className="font-serif text-lg italic text-glow-black">Uma página por vez.</p>
            </Reveal>
          </Reveal>

          {/* Texto + depoimentos */}
          {/* No mobile o texto entra sobre a foto: degradê para o fundo da seção garante leitura */}
          <div className="order-1 -mx-5 min-w-0 px-5 pt-14 [background:linear-gradient(180deg,rgba(229,214,204,0)_0px,#E5D6CC_56px)] lg:order-2 lg:mx-0 lg:px-0 lg:pt-0 lg:[background:none]">
            <Reveal index={0} as="p" className="eyebrow mb-4 text-glow-terracotta lg:mb-4">
              09 · {socialProof.eyebrow}
            </Reveal>
            <Reveal index={1}>
              <h2
                id="prova-social-title"
                className="text-display text-[clamp(2rem,4.8vw,3.4rem)] text-glow-black"
              >
                {socialProof.headline[0]}{" "}
                <em className="italic text-glow-brown">{socialProof.headline[1]}</em>
              </h2>
            </Reveal>
            <Reveal index={2} as="p" className="mt-3 max-w-lg font-sans text-[0.95rem] font-light leading-relaxed text-glow-black/70 sm:text-base lg:text-[0.95rem]">
              {socialProof.intro}
            </Reveal>

            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:mt-5" aria-label="Depoimentos de leitoras">
              {socialProof.items.map((item, i) => (
                <Reveal
                  key={i}
                  as="li"
                  index={3 + i}
                  amount={0.15}
                  className="flex h-full flex-col rounded-[var(--radius-card)] bg-glow-cream/85 p-5 shadow-[var(--shadow-softer)]"
                >
                  {/* Cabeçalho do comentário: foto + quem escreveu */}
                  <div className="flex items-center gap-3">
                    <Avatar src={item.avatar} name={item.name} />
                    <p className="min-w-0 font-sans text-[0.72rem] uppercase tracking-[0.18em] text-glow-black">
                      {item.name}
                    </p>
                  </div>

                  <p className="mt-4 flex-1 font-serif text-[1.02rem] leading-snug text-glow-black/90 sm:text-[1.06rem] lg:text-[0.96rem]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </Reveal>
              ))}
            </ul>

            <Reveal index={5} className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:mt-5">
              <p className="max-w-sm font-sans text-[0.76rem] font-light leading-relaxed text-glow-black/55">
                {socialProof.note}
              </p>
              <CTAButton icon="down" scrollTo="oferta" variant="secondary" className="shrink-0">
                {socialProof.cta}
              </CTAButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
