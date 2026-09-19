"use client";

import { sections } from "@/data/glowFinances";
import { scrollToSection } from "@/lib/animations";
import { useActiveSection } from "./useActiveSection";

/** Indicador lateral (desktop): 01 … 12, com a seção atual destacada. */
export default function SectionNavigator() {
  const active = useActiveSection();
  // Seções escuras: usa tom claro para o indicador.
  const darkIds = new Set(["diagnostico", "finances", "bonus", "oferta"]);
  const onDark = darkIds.has(sections[active]?.id);

  return (
    <nav
      aria-label="Navegação entre seções"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block xl:left-8"
    >
      <ol className="flex flex-col gap-2.5">
        {sections.map((s, i) => {
          const isActive = i === active;
          const color = onDark ? "text-glow-cream" : "text-glow-black";
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => scrollToSection(s.id)}
                aria-label={`Ir para ${s.label}`}
                aria-current={isActive ? "true" : undefined}
                className={`group flex items-center gap-3 font-sans text-[0.62rem] tracking-[0.28em] transition-all duration-500 ease-[var(--ease-glow)] ${color} ${
                  isActive ? "opacity-100" : "opacity-35 hover:opacity-80"
                }`}
              >
                <span
                  className={`block h-px bg-current transition-all duration-500 ease-[var(--ease-glow)] ${
                    isActive ? "w-7" : "w-3 group-hover:w-5"
                  }`}
                  aria-hidden="true"
                />
                <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
