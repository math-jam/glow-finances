"use client";

import { useEffect, useState } from "react";
import { offer } from "@/data/glowFinances";
import { OFFER_DURATION_MINUTES, OFFER_END_STORAGE_KEY } from "@/lib/checkout";

interface Remaining {
  minutes: number;
  seconds: number;
  ended: boolean;
}

function computeRemaining(endMs: number, now = Date.now()): Remaining {
  const diff = Math.max(0, endMs - now);
  const total = Math.floor(diff / 1000);
  return {
    minutes: Math.floor(total / 60),
    seconds: total % 60,
    ended: diff <= 0,
  };
}

/**
 * Lê o fim da oferta salvo no navegador. Se não existir (primeira visita),
 * cria um novo prazo de OFFER_DURATION_MINUTES a partir de agora.
 */
function loadOrCreateEnd(): number {
  const fresh = Date.now() + OFFER_DURATION_MINUTES * 60 * 1000;
  try {
    const stored = Number(window.localStorage.getItem(OFFER_END_STORAGE_KEY));
    if (Number.isFinite(stored) && stored > 0) return stored;
    window.localStorage.setItem(OFFER_END_STORAGE_KEY, String(fresh));
  } catch {
    /* localStorage indisponível — usa o prazo em memória */
  }
  return fresh;
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Timer de urgência de OFFER_DURATION_MINUTES por visitante.
 * O prazo é salvo no localStorage, então persiste após refresh e não reinicia
 * sozinho. Ao terminar, mostra o estado final.
 */
export default function UrgencyTimer({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const end = loadOrCreateEnd();
    const tick = () => setRemaining(computeRemaining(end));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const text = tone === "dark" ? "text-glow-cream" : "text-glow-black";
  const muted = tone === "dark" ? "text-glow-cream/55" : "text-glow-black/55";
  const box = tone === "dark" ? "border-glow-cream/15 bg-glow-cream/5" : "border-glow-black/10 bg-glow-white";

  if (remaining?.ended) {
    return (
      <p role="status" className={`font-serif text-lg italic ${muted}`}>
        {offer.timerEnded}
      </p>
    );
  }

  const blocks = [
    { value: remaining ? pad(remaining.minutes) : "--", label: "min" },
    { value: remaining ? pad(remaining.seconds) : "--", label: "seg" },
  ];

  const readable = remaining
    ? `${remaining.minutes} minutos e ${remaining.seconds} segundos`
    : "calculando";

  return (
    <div>
      <p className={`eyebrow ${muted}`}>{offer.timerLabel}</p>
      {/* Mobile: uma linha compacta */}
      <p
        role="timer"
        aria-label={`${offer.timerLabel}: ${readable}`}
        className={`mt-2 flex items-baseline gap-2 font-serif text-[1.35rem] tabular-nums sm:hidden ${text}`}
      >
        {blocks.map((b, i) => (
          <span key={b.label} className="flex items-baseline gap-0.5">
            {b.value}
            <span className={`font-sans text-[0.55rem] uppercase tracking-[0.12em] ${muted}`}>{b.label[0]}</span>
            {i < blocks.length - 1 && <span className={`ml-1.5 ${muted}`}>:</span>}
          </span>
        ))}
      </p>
      <div
        aria-hidden="true"
        className="mt-3 hidden items-center gap-1.5 sm:mt-4 sm:flex sm:gap-3"
      >
        {blocks.map((b, i) => (
          <div key={b.label} className="flex items-center gap-2 sm:gap-3">
            <div className={`flex min-w-[56px] flex-col items-center rounded-[var(--radius-sm)] border px-2 py-1.5 sm:min-w-[76px] sm:px-3 sm:py-3 ${box}`}>
              <span className={`font-serif text-[1.3rem] leading-none tabular-nums sm:text-[2.1rem] ${text}`}>{b.value}</span>
              <span className={`mt-1.5 font-sans text-[0.55rem] uppercase tracking-[0.22em] ${muted}`}>{b.label}</span>
            </div>
            {i < blocks.length - 1 && (
              <span aria-hidden="true" className={`font-serif text-xl ${muted}`}>
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
