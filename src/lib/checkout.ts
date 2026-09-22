/**
 * Configuração central do checkout.
 * Checkout real do ebook na Kiwify.
 * Todos os CTAs da página passam por handleCheckout().
 */
export const CHECKOUT_URL = "https://pay.kiwify.com.br/aIuJTjh";

/**
 * Duração da oferta especial, em minutos, contada a partir da primeira visita.
 * O prazo é salvo no navegador (localStorage) para persistir após refresh.
 */
export const OFFER_DURATION_MINUTES = 30;

/** Chave usada no localStorage para guardar o fim da oferta do visitante. */
export const OFFER_END_STORAGE_KEY = "glow-offer-end";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "src",
  "sck",
  "fbclid",
  "gclid",
];

/** Monta a URL final do checkout preservando parâmetros de UTM da página atual. */
export function buildCheckoutUrl(): string {
  if (typeof window === "undefined") return CHECKOUT_URL;
  try {
    const target = new URL(CHECKOUT_URL);
    const current = new URLSearchParams(window.location.search);
    UTM_KEYS.forEach((key) => {
      const value = current.get(key);
      if (value && !target.searchParams.has(key)) target.searchParams.set(key, value);
    });
    return target.toString();
  } catch {
    return CHECKOUT_URL;
  }
}

export function handleCheckout() {
  window.location.href = buildCheckoutUrl();
}
