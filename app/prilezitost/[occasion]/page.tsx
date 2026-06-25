"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import { ClassicGroup, Footer } from "@/components/Sections";
import { useLang } from "@/lib/LangContext";
import { useWishlist } from "@/lib/WishlistContext";
import { occasionBySlug } from "@/lib/occasions";
import { cakesData } from "@/lib/cakesData";

export default function OccasionPage({ params }: { params: Promise<{ occasion: string }> }) {
  const { occasion: slug } = use(params);
  const { lang } = useLang();
  const cs = lang === "cs";
  const router = useRouter();
  const { loadPreset } = useWishlist();

  const o = occasionBySlug[slug];

  if (!o) {
    return (
      <>
        <Navbar solid />
        <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 pt-[72px] text-center">
          <h1 className="font-display text-4xl text-ink">{cs ? "Příležitost nenalezena" : "Occasion not found"}</h1>
          <Link href="/prilezitost" className="text-rose hover:underline">
            {cs ? "Zpět na příležitosti" : "Back to occasions"}
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const copy = cs ? o.cs : o.en;
  const acc = o.accent === "teal" ? "rose" : o.accent;
  const featured = o.featured
    .map((id) => cakesData.find((c) => c.id === id))
    .filter(Boolean) as typeof cakesData;

  const startWithOccasion = () => {
    loadPreset([`occasion:${o.occasionId}`]);
    router.push("/sloz-si-dort");
  };

  return (
    <>
      <Navbar solid />
      <main className="min-h-[100dvh] pt-[72px]">
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Link
            href="/prilezitost"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-ink/60 transition-colors hover:text-rose"
          >
            <ArrowLeft className="h-4 w-4" />
            {cs ? "Všechny příležitosti" : "All occasions"}
          </Link>

          <div className="grid items-start gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rose">
                {cs ? "Příležitost" : "Occasion"}
              </span>
              <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-6xl">{copy.title}</h1>
              <p className="mt-4 font-display text-xl text-rose">{copy.tagline}</p>
              <p className="mt-5 text-lg leading-relaxed text-ink/75">{copy.body}</p>

              <button
                onClick={startWithOccasion}
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-rose px-8 py-4 text-base font-bold text-cream shadow-[0_14px_30px_-12px_rgba(178,76,99,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-deep"
              >
                {cs ? `Sestav dort na ${copy.title.toLowerCase()}` : "Build a cake for this"}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Ideas */}
            <div className="md:col-span-5">
              <div className="rounded-[1.8rem] border border-ink/10 bg-white/60 p-7">
                <h2 className="font-display text-xl text-ink">
                  {cs ? "S čím lidé chodí" : "What people come with"}
                </h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {copy.ideas.map((idea) => (
                    <li key={idea} className="flex items-start gap-3 text-ink/75">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose/12 text-rose">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {idea}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {featured.length > 0 && (
            <div className="mt-20">
              <ClassicGroup
                accent={acc}
                label={cs ? "Hodí se sem" : "Good picks"}
                items={featured.map((c) => ({ href: `/dort/${c.id}`, name: c.name, note: c.description, img: c.image }))}
              />
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
