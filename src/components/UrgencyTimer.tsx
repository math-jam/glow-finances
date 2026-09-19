"use client";

import { useEffect, useState } from "react";
import { offer } from "@/data/glowFinances";
import { OFFER_END_DATE } from "@/lib/checkout";

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  ended: boolean;
}

function computeRemaining(endIso: string, now = Date.now()): Remaining {
  const end = new Date(endIso).getTime();
  const diff = Math.max(0, end - now);
  const ended = Number.isNaN(end) || diff <= 0;
  const total = Math.floor(diff / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    ended,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Timer de urgência baseado em uma data ABSOLUTA (OFFER_END_DATE).
 * Por depender de uma data fixa, ele persiste após refresh, zera corretamente
 * e nunca reinicia sozinho. Ao terminar, mostra o estado final.
 */
export default function UrgencyTimer({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(computeRemaining(OFFER_END_DATE));
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
    { value: remaining ? pad(remaining.days) : "--", label: "dias" },
    { value: remaining ? pad(remaining.hours) : "--", label: "horas" },
    { value: remaining ? pad(remaining.minutes) : "--", label: "min" },
    { value: remaining ? pad(remaining.seconds) : "--", label: "seg" },
  ];

  const readable = remaining
    ? `${remaining.days} dias, ${remaining.hours} horas, ${remaining.minutes} minutos e ${remaining.seconds} segundos`
    : "calculando";

  return (
    <div>
      <p className={`eyebrow ${muted}`}>{offer.timerLabel}</p>
      <div
        role="timer"
        aria-live="off"
        aria-label={`${offer.timerLabel}: ${readable}`}
        className="mt-3 flex items-center gap-1.5 sm:mt-4 sm:gap-3"
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
