import { footer } from "@/data/glowFinances";

/** Rodapé minimalista — renderizado dentro da seção de oferta para manter 1 tela. */
export default function Footer() {
  return (
    <footer className="relative border-t border-glow-cream/10 text-glow-cream">
      <div className="container-glow flex flex-col gap-1 py-2 pb-[calc(env(safe-area-inset-bottom)+10px)] lg:py-3 md:flex-row md:items-center md:justify-between lg:pb-5 lg:pl-24">
        <p className="font-sans text-[0.62rem] uppercase tracking-[0.24em] text-glow-cream/50">
          {footer.brand} · {footer.byline}
        </p>
        <nav aria-label="Links do rodapé">
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {footer.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-glow-cream/60 transition-colors duration-300 hover:text-glow-cream"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="max-w-md font-sans text-[0.62rem] font-light leading-snug text-glow-cream/40 sm:text-[0.68rem]">{footer.disclaimer}</p>
      </div>
    </footer>
  );
}
