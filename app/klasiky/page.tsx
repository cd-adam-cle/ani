"use client";

import Navbar from "@/components/Navbar";
import { ClassicGroup, Footer } from "@/components/Sections";
import { useLang } from "@/lib/LangContext";
import { cakesData } from "@/lib/cakesData";
import { frgaly, zakusky } from "@/lib/desserts";

export default function KlasikyPage() {
  const { lang } = useLang();
  const cs = lang === "cs";

  return (
    <>
      <Navbar solid />
      <main className="min-h-[100dvh] pt-[72px]">
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rose">
              {cs ? "Klasiky" : "The classics"}
            </span>
            <h1 className="mt-3 font-display text-4xl text-ink sm:text-6xl">
              {cs ? "Osvědčené kousky, ať se nemusíš rozhodovat" : "Proven pieces, so you don't have to decide"}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink/65">
              {cs
                ? "Klikni na dort a předvyplní se ti do konfigurátoru, kde si můžeš vyměnit krém, korpus nebo přidat ovoce. U frgálů a zákusků stačí poptat a doladíme spolu."
                : "Tap a cake and it pre-fills the builder, where you can swap the cream, sponge or add fruit. For frgály and desserts, just ask and we'll fine-tune it together."}
            </p>
          </div>

          <div className="mt-16">
            <ClassicGroup
              accent="rose"
              label={cs ? "Dorty" : "Cakes"}
              items={cakesData.map((c) => ({ href: `/dort/${c.id}`, name: c.name, note: c.description, img: c.image }))}
            />
            <ClassicGroup
              accent="honey"
              label={cs ? "Frgály" : "Frgály"}
              items={frgaly.map((d) => ({ href: "/#objednat", name: cs ? d.cs : d.en, note: cs ? d.noteCs : d.noteEn, img: d.exterior, contain: true }))}
            />
            <ClassicGroup
              accent="coral"
              label={cs ? "Zákusky" : "Desserts"}
              items={zakusky.map((d) => ({ href: "/#objednat", name: cs ? d.cs : d.en, note: cs ? d.noteCs : d.noteEn, img: d.exterior, contain: true }))}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
