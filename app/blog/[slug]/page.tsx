"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Sections";
import { useLang } from "@/lib/LangContext";
import { postBySlug } from "@/lib/posts";

export default function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { lang } = useLang();
  const cs = lang === "cs";
  const post = postBySlug[slug];

  if (!post) {
    return (
      <>
        <Navbar solid />
        <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 pt-[72px] text-center">
          <h1 className="font-display text-4xl text-ink">{cs ? "Článek nenalezen" : "Post not found"}</h1>
          <Link href="/blog" className="text-rose hover:underline">
            {cs ? "Zpět na blog" : "Back to blog"}
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const copy = cs ? post.cs : post.en;

  return (
    <>
      <Navbar solid />
      <main className="min-h-[100dvh] pt-[72px]">
        <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-ink/60 transition-colors hover:text-rose"
          >
            <ArrowLeft className="h-4 w-4" />
            {cs ? "Zpět na blog" : "Back to blog"}
          </Link>

          <time className="text-xs font-semibold uppercase tracking-wider text-ink/50">
            {new Date(post.date).toLocaleDateString(cs ? "cs-CZ" : "en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </time>
          <h1 className="mt-2 font-display text-4xl leading-tight text-ink sm:text-5xl">{copy.title}</h1>

          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-[1.8rem] bg-cream-deep">
            <Image src={post.cover} alt={copy.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" priority />
          </div>

          <div className="mt-10 flex flex-col gap-5">
            {copy.body.map((para, i) => (
              <p
                key={i}
                className={`text-lg leading-relaxed text-ink/75 ${
                  i === 0
                    ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-5xl first-letter:font-semibold first-letter:text-rose"
                    : ""
                }`}
              >
                {para}
              </p>
            ))}
          </div>

          <div className="mt-12 rounded-[1.8rem] border border-rose/15 bg-rose/5 p-8 text-center">
            <h2 className="font-display text-2xl text-ink">
              {cs ? "Máš v hlavě dort?" : "Got a cake in mind?"}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-ink/65">
              {cs ? "Pojď si ho složit, zbytek vymyslíme spolu." : "Come build it, we'll figure out the rest together."}
            </p>
            <Link
              href="/sloz-si-dort"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-rose px-7 py-3.5 text-base font-bold text-cream shadow-[0_14px_30px_-12px_rgba(178,76,99,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-deep"
            >
              {cs ? "Slož si dort" : "Build your cake"}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
