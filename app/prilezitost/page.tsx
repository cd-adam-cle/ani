"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Sections";
import { useLang } from "@/lib/LangContext";
import { occasions } from "@/lib/occasions";
import { cakesData } from "@/lib/cakesData";

const DOT: Record<string, string> = {
  rose: "bg-rose",
  honey: "bg-honey",
  coral: "bg-coral",
  teal: "bg-teal",
};

export default function PrilezitostPage() {
  const { lang } = useLang();
  const cs = lang === "cs";

  return (
    <>
      <Navbar solid />
      <main className="min-h-[100dvh] pt-[72px]">
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rose">
              {cs ? "Podle příležitosti" : "By occasion"}
            </span>
            <h1 className="mt-3 font-display text-4xl text-ink sm:text-6xl">
              {cs ? "Na jakou chvíli pečeme?" : "What's the occasion?"}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink/65">
              {cs
                ? "Každá příležitost si žádá trochu jiný dort. Vyber tu svou a ukážu ti, co se hodí."
                : "Every occasion calls for a slightly different cake. Pick yours and I'll show you what fits."}
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {occasions.map((o) => {
              const copy = cs ? o.cs : o.en;
              const img = cakesData.find((c) => c.id === o.featured[0])?.image;
              return (
                <Link
                  key={o.slug}
                  href={`/prilezitost/${o.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[1.8rem] border border-ink/5 bg-white/55 shadow-[0_18px_50px_-30px_rgba(42,35,38,0.45)] transition-transform duration-500 hover:-translate-y-1.5"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream-deep">
                    {img && (
                      <Image
                        src={img}
                        alt={copy.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="mb-2 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-ink/60">
                      <span className={`h-2 w-2 rounded-full ${DOT[o.accent]}`} />
                      {cs ? "Příležitost" : "Occasion"}
                    </span>
                    <h2 className="font-display text-2xl text-ink">{copy.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink/65">{copy.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-rose">
                      {cs ? "Zobrazit" : "View"}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
