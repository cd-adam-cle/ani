"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/LangContext";

/**
 * Navbar, quiet until you scroll, then a soft cream glass bar settles in with
 * a hairline. Links are full-size and high-contrast; the underline grows from
 * the left on hover/focus so the eye is told exactly which target it is on.
 * Everything sits on one line, bar height stays at 72px.
 */
export default function Navbar() {
  const { t, lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#konfigurator", label: lang === "cs" ? "Slož si dort" : "Build a cake" },
    { href: "#galerie", label: lang === "cs" ? "Galerie" : "Gallery" },
    { href: "#dorty", label: lang === "cs" ? "Nabídka" : "Collection" },
    { href: "#pribeh", label: lang === "cs" ? "Příběh" : "Story" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/80 backdrop-blur-md border-b border-ink/10 shadow-[0_8px_30px_-12px_rgba(42,35,38,0.18)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
        {/* Wordmark */}
        <a href="#top" className="flex items-baseline gap-2.5">
          <span className="font-display text-[1.7rem] leading-none text-rose">
            Anička
          </span>
          <span className="hidden text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ink/65 sm:inline">
            dorty
          </span>
        </a>

        {/* Center links */}
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative inline-block rounded-xl px-4 py-2 text-[15px] font-semibold text-ink/80 transition-all duration-300 hover:bg-rose/10 hover:text-rose"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: language + primary CTA */}
        <div className="flex items-center gap-3 sm:gap-4">


          <Link
            href="/sloz-si-dort"
            className="rounded-full bg-rose px-6 py-2.5 text-[16px] font-bold tracking-wide text-cream shadow-[0_10px_24px_-10px_rgba(178,76,99,0.7)] transition-all duration-300 hover:bg-rose-deep hover:-translate-y-0.5 active:translate-y-0"
          >
            {t.nav.order}
          </Link>
        </div>
      </nav>
    </header>
  );
}
