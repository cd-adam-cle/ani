"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Sections";
import { useLang } from "@/lib/LangContext";
import { testimonials } from "@/lib/testimonials";

export default function RecenzePage() {
  const { lang } = useLang();
  const cs = lang === "cs";

  return (
    <>
      <Navbar solid />
      <main className="min-h-[100dvh] pt-[72px]">
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rose">
              {cs ? "Recenze" : "Reviews"}
            </span>
            <h1 className="mt-3 font-display text-4xl text-ink sm:text-6xl">
              {cs ? "Řekli, co chtějí. Dostali přesně to." : "They told us. They got exactly that."}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink/65">
              {cs
                ? "Skutečné objednávky, skutečné ohlasy. Většina klientů přichází z doporučení."
                : "Real orders, real words. Most clients come by recommendation."}
            </p>
          </div>

          <div className="mt-16 columns-1 md:columns-2 gap-8 space-y-8">
            {testimonials.map((tItem) => (
              <article
                key={tItem.id}
                className="break-inside-avoid flex flex-col overflow-hidden rounded-[2.25rem] border border-ink/5 bg-white/70 shadow-[0_20px_50px_-20px_rgba(42,35,38,0.3)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-20px_rgba(42,35,38,0.4)]"
              >
                <div className="relative aspect-[4/3] w-full shrink-0 bg-[radial-gradient(circle_at_50%_40%,#fdfbf7,#f4ebd9)]">
                  <Image
                    src={tItem.image}
                    alt={tItem.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-8 drop-shadow-2xl transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="flex flex-col p-7 sm:p-9">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-rose">
                      {cs ? tItem.occasionCs : tItem.occasionEn}
                    </p>
                  </div>
                  
                  <div className="mt-5 relative">
                    <Quote className="absolute -left-2 -top-2 h-8 w-8 text-rose/10" strokeWidth={2} />
                    <p className="relative z-10 font-display text-xl leading-relaxed text-ink sm:text-2xl">
                      {cs ? tItem.reviewCs : tItem.reviewEn}
                    </p>
                  </div>
                  
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-cream-deep/50 flex items-center justify-center text-rose font-display text-lg">
                      {tItem.name.charAt(0)}
                    </div>
                    <p className="text-sm font-semibold text-ink">{tItem.name}</p>
                  </div>

                  <div className="mt-7 rounded-2xl border border-ink/5 bg-ink/[0.02] p-5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-ink/40">
                      {cs ? "Co si původně přál(a)" : "Original request"}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">
                      {cs ? tItem.requestCs : tItem.requestEn}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <Link
              href="/sloz-si-dort"
              className="group inline-flex items-center gap-2 rounded-full bg-rose px-8 py-4 text-base font-bold text-cream shadow-[0_14px_30px_-12px_rgba(178,76,99,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-deep"
            >
              {cs ? "Chci taky svůj dort" : "I want my cake too"}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
