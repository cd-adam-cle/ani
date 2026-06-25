"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import CakeCard from "@/components/CakeCard";
import { Footer } from "@/components/Sections";
import { useLang } from "@/lib/LangContext";
import { cakes } from "@/lib/cakes";
import { frgaly, zakusky } from "@/lib/desserts";

type TabId = "dorty" | "zakusky" | "frgaly";

export default function GaleriePage() {
  const { lang } = useLang();
  const cs = lang === "cs";
  const [tab, setTab] = useState<TabId>("dorty");
  const [occasion, setOccasion] = useState<string>("all");

  const occasions = [
    { id: "all", cs: "Vše", en: "All" },
    { id: "svatba", cs: "Svatba", en: "Wedding" },
    { id: "narozeniny", cs: "Narozeniny", en: "Birthday" },
    { id: "vyroci", cs: "Výročí", en: "Anniversary" },
    { id: "oslava", cs: "Oslava", en: "Party" },
    { id: "firemni", cs: "Firemní", en: "Corporate" },
  ];

  const tabs: { id: TabId; cs: string; en: string; dot: string }[] = [
    { id: "dorty", cs: "Dorty", en: "Cakes", dot: "bg-rose" },
    { id: "zakusky", cs: "Zákusky", en: "Desserts", dot: "bg-coral" },
    { id: "frgaly", cs: "Frgály", en: "Frgály", dot: "bg-honey" },
  ];

  const sourceData = tab === "dorty" ? cakes : tab === "frgaly" ? frgaly : zakusky;
  const items = sourceData
    .filter((item) => occasion === "all" || item.occasions?.includes(occasion))
    .map((item) => ({
      key: item.id,
      name: cs ? item.cs : item.en,
      note: cs ? item.noteCs : item.noteEn,
      whole: item.exterior,
      inside: item.slice,
    }));

  return (
    <>
      <Navbar solid />
      <main className="min-h-[100dvh] pt-[72px]">
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rose">
              {cs ? "Galerie" : "Gallery"}
            </span>
            <div className="mt-3 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <h1 className="font-display text-4xl text-ink sm:text-6xl">
                {cs ? "Co Anička upekla" : "What Anička baked"}
              </h1>
              <div className="group relative z-20 mt-2 sm:mt-4">
                <button className="flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-5 py-2.5 text-sm font-bold text-ink shadow-sm backdrop-blur-md transition-all hover:border-rose hover:text-rose">
                  {occasion === "all"
                    ? (cs ? "Podle příležitosti" : "By occasion")
                    : occasions.find((o) => o.id === occasion)?.[cs ? "cs" : "en"]}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-1/2 top-full hidden w-max -translate-x-1/2 pt-2 group-hover:flex">
                  <div className="flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/90 p-1.5 shadow-xl backdrop-blur-xl">
                    {occasions.map((occ) => (
                      <button
                        key={occ.id}
                        onClick={() => setOccasion(occ.id)}
                        className={`min-w-[140px] rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                          occasion === occ.id
                            ? "bg-rose/10 text-rose"
                            : "text-ink/70 hover:bg-ink/5 hover:text-ink"
                        }`}
                      >
                        {cs ? occ.cs : occ.en}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink/65">
              {cs
                ? "Najeď myší na kousek (nebo klepni) a uvidíš, co se skrývá uvnitř."
                : "Hover a piece (or tap) to see what's hiding inside."}
            </p>
          </div>

          {/* Tabs */}
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {tabs.map((tb) => {
              const on = tab === tb.id;
              return (
                <button
                  key={tb.id}
                  onClick={() => setTab(tb.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                    on
                      ? "border-rose bg-rose text-cream"
                      : "border-ink/15 bg-white/60 text-ink/70 hover:border-rose/40 hover:text-rose"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${on ? "bg-cream" : tb.dot}`} />
                  {cs ? tb.cs : tb.en}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((it) => (
              <div key={it.key} className="transition-transform hover:-translate-y-1">
                <CakeCard name={it.name} note={it.note} whole={it.whole} inside={it.inside} />
              </div>
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
