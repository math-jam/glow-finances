import { Instagram } from "lucide-react";
import { footer } from "@/data/glowFinances";

const linkBase =
  "inline-flex items-center gap-1.5 font-sans text-[0.56rem] text-glow-cream/60 transition-colors duration-300 hover:text-glow-cream sm:text-[0.62rem]";
/** Links internos seguem o caixa-alta do rodapé; o @ do Instagram fica como se escreve. */
const linkCase = "uppercase tracking-[0.16em] sm:tracking-[0.2em]";
const handleCase = "tracking-[0.06em] sm:tracking-[0.08em]";

/** Rodapé minimalista — renderizado dentro da seção de oferta para manter 1 tela. */
export default function Footer() {
  return (
    <footer className="relative border-t border-glow-cream/10 text-glow-cream">
      <div className="container-glow flex flex-col gap-0.5 py-2 pb-[calc(env(safe-area-inset-bottom)+8px)] md:flex-row md:items-center md:justify-between lg:py-3 lg:pb-5 lg:pl-24">
        <p className="font-sans text-[0.56rem] uppercase tracking-[0.2em] text-glow-cream/50 sm:text-[0.62rem] sm:tracking-[0.24em]">
          {footer.brand} · {footer.byline}
        </p>
        <nav aria-label="Links do rodapé">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-0">
            {footer.links.map((link) => {
              const isExternal = "external" in link && link.external;
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`${linkBase} ${isExternal ? handleCase : linkCase}`}
                  >
                    {isExternal && <Instagram className="h-3 w-3" strokeWidth={1.5} aria-hidden="true" />}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <p className="max-w-md font-sans text-[0.56rem] font-light leading-snug text-glow-cream/40 sm:text-[0.68rem]">{footer.disclaimer}</p>
      </div>
    </footer>
  );
}
