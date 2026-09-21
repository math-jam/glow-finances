"use client";

import Image from "next/image";
import { author } from "@/data/glowFinances";
import { scaleIn } from "@/lib/animations";
import CTAButton from "./CTAButton";
import Parallax from "./Parallax";
import Reveal from "./Reveal";
import MobilePhotoBackdrop from "./MobilePhotoBackdrop";

export default function AuthorSection() {
  const bioIsPlaceholder = author.bio.startsWith("[");

  return (
    <section
      id="autora"
      aria-labelledby="autora-title"
      className="snap-section flex flex-col overflow-hidden bg-[#E5D6CC]"
    >
      {/* Mobile: foto da autora como fundo, desaparecendo para baixo, com parallax */}
      <MobilePhotoBackdrop src="/images/fernanda.jpeg" position="50% 0%" fadeColor="#E5D6CC" heightClass="h-[72svh]" sharpUntil={0.55} />

      <Parallax speed={0.14} className="pointer-events-none absolute left-[-6%] bottom-[-14%] hidden lg:block">
        <div className="h-[400px] w-[400px] rounded-full bg-glow-cream/70 blur-3xl" />
      </Parallax>

      <div className="container-glow relative flex flex-1 flex-col justify-end pb-[72px] pt-[40svh] lg:justify-center lg:py-10 lg:pl-24">
        <div className="grid items-center gap-6 lg:grid-cols-[42fr_58fr] lg:gap-16">
          {/* Foto real da autora (desktop) */}
          <div className="relative mx-auto hidden w-full max-w-[min(400px,58vh)] lg:mx-0 lg:block">
            <Reveal variants={scaleIn} className="relative overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-soft)]">
              <Parallax speed={-0.08} range={260} className="relative aspect-[4/5]">
                <Image
                  src="/images/fernanda.jpeg"
                  alt={`${author.name}, autora do Glow Finances`}
                  fill
                  sizes="(min-width: 1024px) 36vw, 90vw"
                  className="scale-[1.12] object-cover object-[50%_30%]"
                />
              </Parallax>
            </Reveal>
            {/* Etiqueta editorial */}
            <Reveal index={2} className="absolute -bottom-5 left-5 rounded-[var(--radius-sm)] border border-glow-black/10 bg-glow-cream px-5 py-3 shadow-[var(--shadow-softer)]">
              <p className="font-serif text-lg italic text-glow-black">{author.byline}</p>
            </Reveal>
          </div>

          {/* Texto (no mobile, com fundo em degradê para ler bem sobre a foto) */}
          <div className="-mx-5 max-w-xl px-5 pt-14 [background:linear-gradient(180deg,rgba(229,214,204,0)_0px,#E5D6CC_56px)] lg:mx-0 lg:px-0 lg:pt-0 lg:[background:none]">
            <Reveal index={0} as="p" className="eyebrow mb-4 text-glow-terracotta lg:mb-6">
              06 · {author.eyebrow}
            </Reveal>
            <Reveal index={1}>
              <h2
                id="autora-title"
                className="text-display text-[clamp(2.2rem,5vw,4rem)] text-glow-black"
              >
                {author.name}
              </h2>
            </Reveal>
            <Reveal index={1} as="p" className="mt-3 font-sans text-[0.66rem] uppercase tracking-[0.26em] text-glow-terracotta">
              {author.role}
            </Reveal>

            <Reveal index={2} className="mt-4 lg:mt-6">
              {bioIsPlaceholder ? (
                /* Estrutura pronta para receber a biografia real */
                <p className="rounded-[var(--radius-sm)] border border-dashed border-glow-black/25 bg-glow-cream/60 p-5 font-sans text-sm leading-relaxed text-glow-black/60">
                  {author.bio}
                </p>
              ) : (
                <p className="max-w-lg font-sans text-[0.88rem] font-light leading-relaxed text-glow-black/75 sm:text-base">{author.bio}</p>
              )}
            </Reveal>

            <Reveal index={3} className="mt-7 hidden border-l-2 border-glow-terracotta/60 pl-5 sm:block">
              <p className="font-serif text-xl italic leading-snug text-glow-brown sm:text-2xl">“{author.quote}”</p>
              <p className="mt-3 font-sans text-[0.62rem] uppercase tracking-[0.28em] text-glow-black/50">
                Trecho do ebook Glow Finances
              </p>
            </Reveal>

            <Reveal index={4} className="mt-6 lg:mt-8">
              <CTAButton variant="secondary" icon="down" scrollTo="faq">
                {author.cta}
              </CTAButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
