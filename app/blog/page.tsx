"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Sections";
import { useLang } from "@/lib/LangContext";
import { posts } from "@/lib/posts";

export default function BlogPage() {
  const { lang } = useLang();
  const cs = lang === "cs";

  return (
    <>
      <Navbar solid />
      <main className="min-h-[100dvh] pt-[72px]">
        <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rose">
              {cs ? "Blog & tipy" : "Blog & tips"}
            </span>
            <h1 className="mt-3 font-display text-4xl text-ink sm:text-6xl">
              {cs ? "Než si objednáš" : "Before you order"}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink/65">
              {cs
                ? "Pár tipů z praxe, ať je výběr dortu hračka."
                : "A few tips from practice to make choosing a cake easy."}
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {posts.map((p) => {
              const copy = cs ? p.cs : p.en;
              return (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[1.8rem] border border-ink/5 bg-white/55 shadow-[0_18px_50px_-30px_rgba(42,35,38,0.45)] transition-transform duration-500 hover:-translate-y-1.5"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-cream-deep">
                    <Image
                      src={p.cover}
                      alt={copy.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <time className="text-xs font-semibold uppercase tracking-wider text-ink/50">
                      {new Date(p.date).toLocaleDateString(cs ? "cs-CZ" : "en-GB", { day: "numeric", month: "long", year: "numeric" })}
                    </time>
                    <h2 className="mt-2 font-display text-2xl leading-tight text-ink">{copy.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink/65">{copy.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-rose">
                      {cs ? "Číst" : "Read"}
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
