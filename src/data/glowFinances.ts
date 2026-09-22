/**
 * Conteúdo da landing page Glow Finances.
 *
 * Tudo aqui foi baseado no ebook real "Glow Finances — Seu dinheiro também
 * precisa de skincare" (Fernanda Oliveira) ou fornecido no briefing.
 * Qualquer informação que NÃO existe no material está marcada com
 * [INSERIR ...] e precisa ser preenchida antes da publicação.
 */

export const product = {
  name: "Glow Finances",
  tagline: "Seu dinheiro também precisa de skincare.",
  method: "MÉTODO GLOW FINANCES™",
  author: "Fernanda Oliveira",
  chapters: 34,
  bonusName: "Planilha Financeira Glow Finances",
  /** Plataforma de venda/entrega e prazo de acesso (informados pela autora). */
  platform: "Kiwify",
  accessMonths: 12,
};

/* ---------------------------------------------------------------- */
/* Dados comerciais — PLACEHOLDERS                                   */
/* ---------------------------------------------------------------- */

export const commercial = {
  /** Preço atual. Ex.: "R$ 97" */
  price: "R$ 97,00",
  /** Preço anterior (riscado). Deixe "" se não existir. */
  previousPrice: "R$ 197,00",
  /** Texto abaixo do preço. Ex.: "ou 12x de R$ 9,70". Deixe "" se não existir. */
  installments: "",
  /** Selos abaixo do CTA — baseados na entrega informada pela autora (Kiwify). */
  trustBadges: ["Compra segura via Kiwify", "Acesso imediato ao ebook", "12 meses de acesso"],
  /** Canônica do site — usada em SEO / Open Graph. */
  canonicalUrl: "https://[INSERIR-DOMINIO]",
  contactEmail: "[INSERIR E-MAIL DE CONTATO]",
  termsUrl: "#",
  privacyUrl: "#",
};

/* ---------------------------------------------------------------- */
/* Logos (fornecidos no briefing)                                     */
/* ---------------------------------------------------------------- */

export const logos = {
  monogram: { src: "/images/logo-monogram.png", alt: "Monograma GF, Glow Finances: finanças na sua rotina" },
  compact: { src: "/images/logo-compact.webp", alt: "Glow Finances: seu dinheiro também precisa de skincare" },
  script: { src: "/images/logo-script.webp", alt: "Glow Finances: planeje hoje, brilhe sempre" },
  /** Recortes já enquadrados (sem precisar escalar/cortar via CSS): só o monograma GF e só o "Glow Finances" manuscrito. */
  mark: { src: "/images/logo-monogram.png", alt: "Monograma GF, Glow Finances" },
  wordmark: { src: "/images/logo-wordmark.webp", alt: "Glow Finances" },
};

/* ---------------------------------------------------------------- */
/* Seções                                                            */
/* ---------------------------------------------------------------- */

export type SectionId =
  | "hero"
  | "finances"
  | "metodo"
  | "bonus"
  | "para-quem"
  | "proximo-passo"
  | "autora"
  | "faq"
  | "oferta";

export const sections: { id: SectionId; label: string }[] = [
  { id: "hero", label: "Início" },
  { id: "finances", label: "Traduzindo o financês" },
  { id: "metodo", label: "O método" },
  { id: "bonus", label: "Bônus" },
  { id: "para-quem", label: "Para quem é" },
  { id: "proximo-passo", label: "O seu próximo passo" },
  { id: "autora", label: "Autora" },
  { id: "faq", label: "Perguntas" },
  { id: "oferta", label: "Oferta" },
];

export const hero = {
  eyebrow: product.method,
  headline: ["Seu dinheiro também", "precisa de skincare."],
  subheadline: "Você já aprendeu a cuidar da pele, do cabelo e da beleza. Agora é hora de aprender a cuidar do seu dinheiro, começando do zero, sem complicação e sem “financês”.",
  ctaPrimary: "Quero começar",
  ctaSecondary: "Ver como funciona",
  scrollHint: "Role para descobrir",
  tags: ["Livro digital", "Planilha financeira", "Vídeos explicativos", "Plano de 30 dias"],
};

// Capítulos 3 e 4 — o problema e a rotina de skincare do dinheiro
export const method = {
  headline: ["Talvez investir nunca tenha sido difícil.", "Só faltava alguém explicar na sua língua."],
  intro: "Skincare tem ordem: limpar, hidratar, tratar, proteger. Dinheiro também. Comprar ácido antes do sabonete dá errado. Investir antes de organizar, também.",
  steps: [
    { number: "01", skin: "Limpar", money: "Organizar", detail: "Cortar o que drena: juros, parcelas, assinaturas esquecidas." },
    { number: "02", skin: "Hidratar", money: "Criar reserva", detail: "Sua base de estabilidade, o protetor solar financeiro." },
    { number: "03", skin: "Tratar", money: "Investir", detail: "Entender Selic, CDI, CDB, Tesouro, ações e FIIs." },
    { number: "04", skin: "Proteger", money: "Construir patrimônio", detail: "Plano de 1, 5 e 10 anos e uma rotina que se repete." },
  ],
  // Pó compacto + pincel (versão clara), ao lado das etapas, como na arte
  image: { src: "/images/method-compact.webp", alt: "Pó compacto e pincel dourados Glow Finances sobre pó espalhado" },
  cta: "Traduzir o Financês",
};

// "Traduzindo o Financês" — glossário real do ebook
export const glossary = {
  eyebrow: "Traduzindo o Financês",
  headline: ["Não é um idioma difícil.", "Só explicaram errado."],
  columns: { from: "Financês", to: "Português" },
  terms: [
    { term: "CDB", jargon: "Certificado de Depósito Bancário.", plain: "Você empresta dinheiro para o banco e recebe juros." },
    { term: "CDI", jargon: "Certificado de Depósito Interbancário.", plain: "A régua usada para comparar o rendimento de muitos investimentos." },
    { term: "Selic", jargon: "Taxa básica de juros da economia.", plain: "“O preço do dinheiro.” Quanto maior, mais caro fica pegar emprestado." },
    { term: "Inflação", jargon: "Aumento geral dos preços ao longo do tempo.", plain: "Seu dinheiro comprando cada vez menos, mesmo sendo o mesmo número." },
  ],
  note: "Cada capítulo traduz um termo assim, com analogias do universo da beleza.",
  cta: "Ver o método",
};

/**
 * Seção 05, Bônus. Entrega informada pela autora: a planilha chega 7 dias
 * após a compra, junto com um vídeo ensinando a usá-la.
 */
export const bonus = {
  badge: "Bônus",
  headline: ["Você não vai só aprender.", "Vai colocar em prática."],
  name: ["Planilha Financeira", "Glow Finances"],
  description: "A planilha do Plano Glow de 30 dias, onde seus números viram rotina. Chega 7 dias após a compra, com um vídeo ensinando a usar.",
  // Recursos visíveis na própria planilha (tela fornecida pela autora)
  uses: ["Entradas, gastos e saldo do mês", "Para onde seu dinheiro está indo", "Quanto você guardou", "Minhas metas"],
  cta: "É para mim?",
};

export const audience = {
  headline: ["Talvez seja exatamente", "o que estava faltando."],
  photo: { src: "/images/fernanda-cutout.webp", alt: "Fernanda Oliveira, de pé, consultando um tablet" },
  forYou: {
    title: "É para você se",
    items: [
      "Nunca soube por onde começar a investir.",
      "Se sente perdida com termos financeiros.",
      "Quer entender antes de investir.",
      "Pensa no longo prazo.",
    ],
  },
  notForYou: {
    title: "Não é para você se",
    items: ["Procura enriquecimento rápido.", "Quer uma fórmula mágica.", "Quer promessa de rentabilidade."],
  },
  shifts: [
    { from: "Confusão", to: "Clareza" },
    { from: "Ansiedade", to: "Organização" },
    { from: "Impulso", to: "Intencionalidade" },
  ],
  cta: "Conhecer a autora",
};

// Seção 06 — fechamento antes da autora
export const nextStep = {
  eyebrow: "O seu próximo passo",
  headline: ["Seu dinheiro", "também precisa", "de", "skincare."],
  description: "O Glow Finances é o guia prático para mulheres que querem cuidar do dinheiro e construir liberdade.",
  // Os três pilares (os mesmos da capa do ebook)
  features: [
    { icon: "lipstick", label: ["Finanças", "na sua rotina"] },
    { icon: "book", label: ["Educação", "financeira"] },
    { icon: "chart", label: ["Investimentos", "para iniciantes"] },
  ],
  // Pincel dourado que compõe a cena, ao lado do livro
  image: { src: "/images/next-step-compact.webp", alt: "" },
  cta: "Quero começar",
  // Linha de fechamento, no rodapé da cena
  taglines: ["Mais clareza", "Mais escolhas", "Mais você"],
} as const;

export const author = {
  eyebrow: "Por trás do Glow Finances",
  name: "Fernanda Oliveira",
  role: "Criadora do Glow Finances · Corretora de imóveis",
  byline: "Por Fernanda Oliveira",
  // Biografia fornecida pela autora (condensada, em primeira pessoa)
  bio: [
    "Aos 18 anos, comprei meu primeiro terreno e ali começou meu interesse por patrimônio. Aos 22, fiz meu primeiro investimento em renda fixa. Ver meu dinheiro render despertou uma curiosidade que nunca mais parou.",
    "Desde então, estudar investimentos virou parte da minha rotina. O Glow Finances nasceu dessa trajetória e da vontade de tornar esse universo mais simples para mulheres que querem começar, mas ainda não sabem por onde.",
  ],
  photo: { src: "/images/fernanda-mesa-notebook.jpeg", alt: "Fernanda Oliveira em pé, debruçada sobre o notebook em uma mesa redonda de madeira" },
  // Trecho real do último capítulo do ebook (Capítulo 34)
  quote: "Mulheres não precisam apenas ganhar dinheiro. Precisam fazer do dinheiro um aliado na construção da vida que realmente desejam.",
  cta: "Tirar dúvidas",
};

export const faq = {
  headline: "Perguntas frequentes",
  items: [
    { q: "É para quem nunca investiu?", a: "Sim. A jornada acompanha a Barbie, personagem que começa sem entender nenhum termo. Cada conceito é construído do zero." },
    { q: "Preciso entender de economia?", a: "Não. Cada termo passa pelo “Traduzindo o Financês”, com analogias de beleza e cotidiano." },
    { q: "Preciso ter muito dinheiro?", a: "Não. O Método 1% ensina a começar com uma pequena porcentagem da sua renda." },
    { q: "Indica investimentos específicos?", a: "Não. É material educacional: explica como cada investimento funciona e traz um checklist de 15 perguntas para você decidir." },
    { q: "O que vem no bônus?", a: "A Planilha Financeira Glow Finances e um vídeo ensinando a usá-la, liberados 7 dias após a compra." },
    { q: "Como recebo o material?", a: "A compra é feita pela Kiwify. Você recebe acesso imediato ao ebook e ao vídeo de boas-vindas; após 7 dias, a planilha com o vídeo de uso. O acesso dura 12 meses." },
  ],
  cta: "Ir para a oferta",
};

export const offer = {
  headline: "Seu dinheiro merece uma rotina.",
  subheadline: "Comece entendendo. Depois, cuide. Então, construa.",
  timerLabel: "Oferta especial termina em",
  timerEnded: "Essa condição especial terminou.",
  cardTitle: "Glow Finances",
  includes: ["Livro digital", "Vídeos explicativos", "Método Glow Finances", "Diagnóstico, checklist e Glow Challenge", "Plano Glow de 30 dias"],
  bonusLabel: "Bônus",
  bonusItem: "Planilha Financeira Glow + vídeo de uso",
  bonusItemShort: "Planilha Glow + vídeo de uso",
  cta: "Quero meu Glow Finances",
};

export const stickyCta = {
  text: "Glow Finances + Planilha Bônus",
  cta: "Quero começar",
};

export const footer = {
  brand: "Glow Finances™",
  byline: "Por Fernanda Oliveira",
  links: [
    { label: "Termos de Uso", href: commercial.termsUrl },
    { label: "Política de Privacidade", href: commercial.privacyUrl },
    { label: "Contato", href: `mailto:${commercial.contactEmail}` },
  ],
  disclaimer: "Este material possui caráter educacional e não constitui recomendação individual de investimento.",
};
