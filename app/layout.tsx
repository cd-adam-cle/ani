import type { Metadata } from "next";
import { Baloo_2, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/LangContext";
import { WishlistProvider } from "@/lib/WishlistContext";
import GlowBackground from "@/components/ui/glow-background";
import PageLoader from "@/components/effects/PageLoader";
import ClickSplash from "@/components/effects/ClickSplash";

// Heavy, rounded display face with full Latin-Extended coverage, so Czech
// diacritics (ž, ů, ř, č, ě, š …) render in the brand font instead of falling
// back. Replaces Bowlby One SC, which only shipped basic latin.
const displayFont = Baloo_2({
  weight: ["600", "700", "800"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anička · Dorty, zákusky a koláče na míru",
  description:
    "Domácí cukrářství s dvacetiletou praxí. Slož si vlastní dort, korpus, krém, náplň i ozdoba. Narozeninové, svatební a sváteční dorty, zákusky a koláče.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="cs"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${displayFont.variable} ${hindSiliguri.variable}`}
    >
      <body suppressHydrationWarning>
        <GlowBackground />
        <PageLoader />
        <ClickSplash />
        <LangProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </LangProvider>
      </body>
    </html>
  );
}
