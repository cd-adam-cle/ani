"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/lib/LangContext";
import { Typewriter } from "@/components/ui/typewriter";
import GooeyBlobs from "@/components/effects/GooeyBlobs";

export default function Hero() {
  const { lang } = useLang();
  const cs = lang === "cs";

  return (
    <section
      id="top"
      className="relative flex min-h-[68vh] flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-12 sm:px-8"
    >
      <GooeyBlobs />

      {/* Soft cream halo, keeps the centred headline high-contrast over the blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[115%] w-[135%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(252,248,241,0.9), rgba(252,248,241,0.45) 52%, transparent 72%)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Kicker, the shrunken former title */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-rose/20 bg-white/70 px-4 py-1.5 shadow-sm backdrop-blur-sm"
        >
          <span className="font-display text-sm uppercase tracking-[0.22em] text-rose">
            {cs ? "Domácí cukrářství" : "Homemade patisserie"}
          </span>
          <span className="h-1 w-1 rounded-full bg-honey" />
          <span className="text-xs font-semibold text-ink/60">
            {cs ? "10 let řemesla" : "10 years of craft"}
          </span>
        </motion.div>

        {/* Headline, the brand line moved up out of the old TextReveal section */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-[clamp(2.4rem,7vw,5.25rem)] leading-[1.02] tracking-tight text-ink"
        >
          {cs ? "Každý " : "Every "}
          <span className="text-coral">
            <Typewriter
              text={cs ? ["dort", "frgál", "zákusek"] : ["cake", "frgál", "dessert"]}
              speed={70}
              deleteSpeed={40}
              waitTime={2200}
              className="text-coral"
              cursorClassName="ml-0.5 text-coral"
            />
          </span>
          <br />
          {cs ? "je " : "is "}
          <span className="text-rose">{cs ? "originál." : "one of a kind."}</span>
        </motion.h1>

        {/* Subhead, the second half of the brand line */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70 sm:text-xl"
        >
          {cs
            ? "Žádné šablony, jen tvoje představa a Aniččino řemeslo."
            : "No templates, just your idea and Anička's craft."}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="#konfigurator"
            className="group inline-flex items-center gap-2 rounded-full bg-rose px-7 py-3.5 text-base font-bold text-cream shadow-[0_14px_30px_-12px_rgba(178,76,99,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-deep active:translate-y-0"
          >
            {cs ? "Slož si dort" : "Build your cake"}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <Link
            href="/galerie"
            className="inline-flex items-center gap-2 rounded-full border border-teal bg-white/60 px-7 py-3.5 text-base font-bold text-ink/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-teal hover:bg-teal/15 hover:text-ink"
          >
            {cs ? "Prohlédnout galerii" : "See the gallery"}
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue, nudges the eye to the next section so the hero stays short */}
      <a
        href="#nabidka"
        aria-label={cs ? "Posunout na nabídku" : "Scroll to the offer"}
        className="group absolute bottom-5 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white/60 text-ink/55 backdrop-blur-sm transition-colors group-hover:border-rose group-hover:text-rose"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </a>
    </section>
  );
}
