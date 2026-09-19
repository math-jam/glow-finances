/**
 * Configuração central do checkout.
 * Troque CHECKOUT_URL pela URL real da plataforma de pagamento.
 * Todos os CTAs da página passam por handleCheckout().
 */
export const CHECKOUT_URL = "https://SEU-CHECKOUT-AQUI";

/** Deadline da oferta especial (ISO 8601 com fuso). Nunca é reiniciado. */
export const OFFER_END_DATE = "2026-12-31T23:59:59-03:00";

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
