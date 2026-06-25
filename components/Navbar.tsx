"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/lib/LangContext";

/**
 * Floating "island" navbar, a glass pill that hovers off the top edge (inspired
 * by the Supaste dock) but recoloured into our warm cream/rose palette instead
 * of the dark original. Liquid-glass refraction: a 1px inner highlight + a
 * tinted shadow read as a real glass edge. Keeps the existing behaviour, links
 * settle to a stronger pill on scroll, links underglow on hover, and adds a
 * gentle spring drop-in on mount. `solid` forces the settled look on sub-pages.
 */
export default function Navbar({ solid = false }: { solid?: boolean }) {
  const { t, lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (solid) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  const active = solid || scrolled;

  const links = [
    { href: "/#konfigurator", label: lang === "cs" ? "Slož si dort" : "Build a cake" },
    { href: "/klasiky", label: lang === "cs" ? "Klasiky" : "Classics" },
    { href: "/galerie", label: lang === "cs" ? "Galerie" : "Gallery" },
    { href: "/recenze", label: lang === "cs" ? "Recenze" : "Reviews" },
    { href: "/o-anicce", label: lang === "cs" ? "O Aničce" : "About" },
  ];

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.05 }}
      className="fixed inset-x-0 top-3 z-50 px-4 sm:top-4"
    >
      <nav
        className={`mx-auto flex max-w-3xl flex-col border transition-all duration-500 ${
          active || isOpen
            ? "border-white/60 bg-cream/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_16px_40px_-14px_rgba(42,35,38,0.3)] backdrop-blur-xl"
            : "border-white/40 bg-cream/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_10px_30px_-16px_rgba(42,35,38,0.25)] backdrop-blur-md"
        } ${isOpen ? "rounded-[1.8rem] p-4 h-auto" : "rounded-full h-[58px] justify-center pl-5 pr-2"}`}
      >
        <div className="flex w-full items-center justify-between">
          {/* Wordmark */}
          <Link href="/" className="flex items-baseline gap-2 pr-1" onClick={() => setIsOpen(false)}>
            <span className="font-display text-[1.4rem] leading-none text-rose">Anička</span>
            <span className="hidden text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-ink/55 sm:inline">
              dorty
            </span>
          </Link>

          {/* Center links (Desktop) */}
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group relative inline-block rounded-full px-3.5 py-2 text-[14px] font-semibold text-ink/75 transition-colors duration-300 hover:bg-rose/10 hover:text-rose"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Hamburger for mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white/40 text-ink/75 transition-all duration-300 hover:border-rose/30 hover:bg-rose/5 hover:text-rose lg:hidden focus:outline-none"
              aria-label={isOpen ? "Zavřít menu" : "Otevřít menu"}
            >
              <svg
                className="h-5 w-5 fill-none stroke-current"
                strokeWidth="2.5"
                strokeLinecap="round"
                viewBox="0 0 24 24"
              >
                <line
                  x1="4"
                  y1="6"
                  x2="20"
                  y2="6"
                  className={`transition-all duration-300 origin-center ${
                    isOpen ? "rotate-45 translate-y-[6px]" : ""
                  }`}
                />
                <line
                  x1="4"
                  y1="12"
                  x2="20"
                  y2="12"
                  className={`transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
                />
                <line
                  x1="4"
                  y1="18"
                  x2="20"
                  y2="18"
                  className={`transition-all duration-300 origin-center ${
                    isOpen ? "-rotate-45 -translate-y-[6px]" : ""
                  }`}
                />
              </svg>
            </button>

            {/* Primary CTA */}
            <Link
              href="/sloz-si-dort"
              onClick={() => setIsOpen(false)}
              className="shrink-0 rounded-full bg-rose px-5 py-2.5 text-[15px] font-bold tracking-wide text-cream shadow-[0_10px_24px_-10px_rgba(178,76,99,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-deep active:translate-y-0"
            >
              {t.nav.order}
            </Link>
          </div>
        </div>

        {/* Mobile menu links */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden lg:hidden"
            >
              <div className="mt-4 flex flex-col gap-1 border-t border-ink/5 pt-4">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setIsOpen(false)}
                    className="w-full rounded-xl px-4 py-2.5 text-[15px] font-semibold text-ink/75 transition-colors hover:bg-rose/10 hover:text-rose"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
