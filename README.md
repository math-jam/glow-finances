# Glow Finances — Landing Page

Landing page editorial premium para o ebook **Glow Finances — Seu dinheiro também precisa de skincare**, de Fernanda Oliveira, com o bônus **Planilha Financeira Glow Finances**.

Stack: **Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide React**.

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run start    # servir o build
npm run lint
```

> Não rode `npm run build` enquanto `npm run dev` estiver ativo na mesma pasta — os dois usam `.next/`.

## Onde trocar cada coisa

| O quê | Arquivo | Campo |
| --- | --- | --- |
| **URL do checkout** | `src/lib/checkout.ts` | `CHECKOUT_URL` (todos os CTAs usam `handleCheckout()`, que preserva UTMs) |
| **Deadline do timer** | `src/lib/checkout.ts` | `OFFER_END_DATE` (ISO com fuso, ex. `2026-12-31T23:59:59-03:00`) |
| **Preço / preço anterior / parcelas** | `src/data/glowFinances.ts` | `commercial.price` (hoje `R$ 97,00`), `commercial.previousPrice` (`""` = oculto), `commercial.installments` |
| **Selos de confiança** | `src/data/glowFinances.ts` | `commercial.trustBadges` — manter só o que for verdadeiro no checkout |
| **Domínio canônico / OG** | `src/data/glowFinances.ts` | `commercial.canonicalUrl` |
| **E-mail, Termos, Privacidade** | `src/data/glowFinances.ts` | `commercial.contactEmail`, `termsUrl`, `privacyUrl` |
| **Bio da autora** | `src/data/glowFinances.ts` | `author.bio` |
| **Respostas do FAQ** | `src/data/glowFinances.ts` | `faq.items` |
| **Textos de todas as seções** | `src/data/glowFinances.ts` | — |
| **Capa do ebook** | `public/images/cover.webp` | mockup 3D oficial (PNG transparente 350×525 — se houver versão maior, substitua para melhor nitidez em telas retina) |
| **Foto da autora** | `public/images/author.webp` | `AuthorSection` |
| **Foto de fundo do Hero** | `public/images/reading.webp` | `Hero` (parallax) |
| **Logos** | `public/images/logo-monogram.webp`, `logo-compact.webp`, `logo-script.webp` | Hero, Glossário, Oferta |
| **Imagem Open Graph** | `public/og-image.jpg` | 1200×630 |
| **Favicon** | `public/favicon.svg` | — |

## Placeholders que precisam ser preenchidos antes de publicar

Busque por `[INSERIR` em `src/data/glowFinances.ts`:

- `commercial.canonicalUrl` → `https://[INSERIR-DOMINIO]`
- `commercial.contactEmail` → `[INSERIR E-MAIL DE CONTATO]`
- `src/lib/checkout.ts` → `CHECKOUT_URL` e `OFFER_END_DATE`

**Informações reais já aplicadas (fornecidas pela autora):** bio, projeto sem equipe, produto = ebook + planilha + vídeos explicativos, compra pela Kiwify com acesso imediato ao ebook e vídeo de boas-vindas, planilha + vídeo de uso liberados 7 dias depois, acesso por 12 meses. Os selos de confiança (`commercial.trustBadges`) refletem isso.

**Bônus (planilha):** o arquivo da planilha não está no projeto; a seção descreve os usos citados no ebook (Capítulo 34).

## Estrutura

```
src/
  app/
    layout.tsx        Fontes (Playfair Display + Inter), metadata/SEO/OG
    page.tsx          Composição das 9 seções + overlays
    globals.css       Tokens (--glow-*), scroll-snap (1 seção = 1 tela), utilitários, noise
  components/
    Hero.tsx                 01 · Foto de fundo com parallax, monograma GF, mockup 3D
    DiagnosisSection.tsx     02 · 3 perguntas do diagnóstico (fade + blur → nítido)
    MethodSection.tsx        03 · Problema + método: Skincare → Finanças em 4 frascos
    GlossarySection.tsx      04 · Traduzindo o Financês (glossário real) + logo compacto
    BonusSection.tsx         05 · Planilha em mockup de notebook (CSS)
    AudienceSection.tsx      06 · É / não é para você + Confusão → Clareza
    AuthorSection.tsx        07 · Fernanda Oliveira (foto real + bio placeholder)
    FAQ.tsx                  08 · Accordion (6 perguntas)
    OfferSection.tsx         09 · Card de oferta + timer + logo script + footer
    UrgencyTimer.tsx         Timer baseado em OFFER_END_DATE (persistente, sem reset)
    StickyCTA.tsx            Barra fixa (após Hero no mobile / 35% no desktop; some no FAQ)
    SectionNavigator.tsx     Indicador lateral 01–09 (desktop)
    ScrollProgress.tsx       Barra de progresso horizontal (mobile/tablet)
    CTAButton.tsx            Botão (<a> real para checkout / <button> para scroll)
    ContinueButton.tsx       "Continuar ↓"
    BookMockup.tsx           Mockup oficial do ebook com sombra e entrada suave
    Parallax.tsx             Parallax por transform (respeita reduced-motion)
    Reveal.tsx               Fade + translate ao entrar na viewport
    Footer.tsx               Rodapé (dentro da seção de oferta)
    useActiveSection.ts      IntersectionObserver da seção ativa
  data/
    glowFinances.ts   Todo o copy + dados comerciais (placeholders) + logos
  lib/
    checkout.ts       CHECKOUT_URL, OFFER_END_DATE, handleCheckout()
    animations.ts     Easing, variants, scrollToSection()
```

## Decisões

- **1 seção = 1 tela:** a partir de 1024px cada seção tem `height: 100svh` fixo com `scroll-snap-type: y mandatory`. No mobile usa `min-height: 100svh` + `proximity` — o conteúdo foi dimensionado para caber em 375×812 / 390×844; em telas menores (ex. 360×740) a seção cresce em vez de cortar conteúdo.
- **Logos:** monograma GF no topo do Hero, logo compacto (pó + pincel) na seção "Traduzindo o Financês", logo script ("Planeje hoje. Brilhe sempre.") na Oferta — em `public/images/logo-*.webp`.
- **Reduced motion:** desativa snap, parallax e animações.
- **Conteúdo:** todo o copy foi baseado no ebook real (capítulos, labels editoriais, Método 1%, checklist de 15 perguntas). Nenhum depoimento, número de vendas ou promessa financeira foi inventado.
