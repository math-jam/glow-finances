import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { commercial } from "@/data/glowFinances";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const TITLE = "Glow Finances — Seu dinheiro também precisa de skincare";
const DESCRIPTION =
  "Aprenda a entender dinheiro e investimentos de uma forma simples, prática e conectada ao universo da beleza com o Método Glow Finances.";

export const metadata: Metadata = {
  metadataBase: new URL(
    commercial.canonicalUrl.includes("[") ? "http://localhost:3000" : commercial.canonicalUrl,
  ),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "pt_BR",
    siteName: "Glow Finances",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Capa do ebook Glow Finances" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  icons: { icon: "/favicon.svg" },
  robots: "index, follow",
};

export const viewport: Viewport = {
  themeColor: "#F8F5F1",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
