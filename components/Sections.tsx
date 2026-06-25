"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  Wand2,
  Cookie,
  Camera,
  Leaf,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Plus,
  ChevronDown,
} from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { cakes } from "@/lib/cakes";
import { cakesData } from "@/lib/cakesData";
import { frgaly, zakusky } from "@/lib/desserts";
import CakeCard from "./CakeCard";
import RippleButton from "./ui/RippleButton";
import AnimatedHeading from "./ui/AnimatedHeading";
import { InfiniteSlider } from "./ui/infinite-slider";

/* ---- Collection by type ------------------------------------------------- */

export function Categories() {
  const { lang } = useLang();
  const cs = lang === "cs";

  const [occasion, setOccasion] = useState<string>("all");

  const occasions = [
    { id: "all", cs: "Vše", en: "All" },
    { id: "svatba", cs: "Svatba", en: "Wedding" },
    { id: "narozeniny", cs: "Narozeniny", en: "Birthday" },
    { id: "vyroci", cs: "Výročí", en: "Anniversary" },
    { id: "oslava", cs: "Oslava", en: "Party" },
    { id: "firemni", cs: "Firemní", en: "Corporate" },
  ];

  const filteredCakes = occasion === "all" ? cakesData : cakesData.filter(c => c.occasions?.includes(occasion));
  const filteredFrgaly = occasion === "all" ? frgaly : frgaly.filter(f => f.occasions?.includes(occasion));
  const filteredZakusky = occasion === "all" ? zakusky : zakusky.filter(z => z.occasions?.includes(occasion));

  return (
    <section id="nabidka" className="mx-auto max-w-6xl px-5 pt-10 pb-24 sm:px-8">
      <div className="mb-14 text-center">
        <AnimatedHeading
          className="text-4xl sm:text-5xl"
          text={cs ? "Jak to bude?" : "How will it work?"}
        />
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink/65">
          {cs
            ? "Dvě cesty ke stejně dobrému konci. Slož si svůj originál od nuly, nebo sáhni po klasice a jen si ji uprav."
            : "Two paths to the same happy ending. Build your own from scratch, or pick a classic and tweak it."}
        </p>
      </div>

      {/* Two paths */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Path A, build your own (teal) */}
        <div className="group relative flex flex-col overflow-hidden rounded-[2.25rem] border border-teal/40 bg-teal/10 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl sm:p-10">
          <span className="inline-flex w-max items-center gap-2 rounded-full bg-teal/25 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-ink">
            <Wand2 className="h-3.5 w-3.5" strokeWidth={2} />
            {cs ? "Sestav si svůj" : "Build your own"}
          </span>
          <h3 className="mt-5 font-display text-3xl leading-tight text-ink sm:text-4xl">
            {cs ? "Originál od nuly" : "An original from scratch"}
          </h3>
          <p className="mt-3 max-w-md text-[16px] leading-relaxed text-ink/75">
            {cs
              ? "Vyber příležitost, chutě, korpus, krém i zdobení. Anička z toho složí ten nejlepší možný návrh, ať máš jasnou vizi nebo jen pár oblíbených chutí."
              : "Pick the occasion, flavours, sponge, cream and finish. Anička turns it into the best possible design, whether you have a clear vision or just a few favourite tastes."}
          </p>
          <RippleButton href="#konfigurator" className="mt-7">
            {cs ? "Začít skládat" : "Start building"}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </RippleButton>
        </div>

        {/* Path B, classics (honey) */}
        <div className="group relative flex flex-col overflow-hidden rounded-[2.25rem] border border-honey/50 bg-honey/15 p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl sm:p-10">
          <span className="inline-flex w-max items-center gap-2 rounded-full bg-honey/40 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-ink">
            <Cookie className="h-3.5 w-3.5" strokeWidth={2} />
            {cs ? "Vyber z klasik" : "Pick a classic"}
          </span>
          <h3 className="mt-5 font-display text-3xl leading-tight text-ink sm:text-4xl">
            {cs ? "Ať se nemusíš rozhodovat" : "No need to overthink it"}
          </h3>
          <p className="mt-3 max-w-md text-[16px] leading-relaxed text-ink/75">
            {cs
              ? "Osvědčené dorty, zákusky a frgály, které stačí vybrat. A pokud bys přece jen chtěl něco po svém, každou klasiku si můžeš upravit."
              : "Tried-and-true cakes, desserts and frgály, ready to pick. And if you'd still like it your way, every classic can be tweaked."}
          </p>
          <a
            href="#klasiky"
            className="group mt-7 inline-flex w-max items-center gap-2 rounded-full bg-[#E5B869] px-7 py-3.5 text-sm font-bold text-ink shadow-[0_10px_20px_-10px_rgba(229,184,105,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95"
          >
            {cs ? "Prohlédnout klasiky" : "Browse the classics"}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      {/* Classics by type */}
      <div id="klasiky" className="mt-20 scroll-mt-24">
        <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <h3 className="font-display text-3xl text-ink sm:text-4xl">
            {cs ? "Klasiky" : "The classics"}
          </h3>
          <div className="group relative z-20">
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

        <p className="mx-auto mt-3 mb-12 max-w-lg text-center text-ink/65">
          {cs
            ? "Klikni na dort a předvyplní se ti do konfigurátoru, kde si můžeš vyměnit krém, korpus nebo přidat ovoce."
            : "Tap a cake and it pre-fills the builder, where you can swap the cream, sponge or add fruit."}
        </p>

        {filteredCakes.length > 0 && (
          <ClassicGroup
            accent="rose"
            label={cs ? "Dorty" : "Cakes"}
            items={filteredCakes.map((c) => ({
              href: `/dort/${c.id}`,
              name: c.name,
              note: c.description,
              img: c.image,
            }))}
          />
        )}

        {filteredFrgaly.length > 0 && (
          <ClassicGroup
            accent="honey"
            label={cs ? "Frgály" : "Frgály"}
            items={filteredFrgaly.map((d) => ({
              href: "#objednat",
              name: cs ? d.cs : d.en,
              note: cs ? d.noteCs : d.noteEn,
              img: d.exterior,
              contain: true,
            }))}
          />
        )}

        {filteredZakusky.length > 0 && (
          <ClassicGroup
            accent="coral"
            label={cs ? "Zákusky" : "Desserts"}
            items={filteredZakusky.map((d) => ({
              href: "#objednat",
              name: cs ? d.cs : d.en,
              note: cs ? d.noteCs : d.noteEn,
              img: d.exterior,
              contain: true,
            }))}
          />
        )}
      </div>
    </section>
  );
}

/* ---- A labelled row of clickable classic cards ------------------------- */

const ACCENT: Record<string, { dot: string; badge: string; bg: string }> = {
  rose: { dot: "bg-rose", badge: "bg-rose/12 text-rose", bg: "from-rose/10 to-rose/0" },
  honey: { dot: "bg-honey", badge: "bg-honey/30 text-ink", bg: "from-honey/15 to-honey/0" },
  coral: { dot: "bg-coral", badge: "bg-coral/20 text-ink", bg: "from-coral/12 to-coral/0" },
};

export function ClassicGroup({
  accent,
  label,
  items,
}: {
  accent: "rose" | "honey" | "coral";
  label: string;
  items: { href: string; name: string; note: string; img: string; contain?: boolean }[];
}) {
  const a = ACCENT[accent];
  return (
    <div className="mb-12">
      <div className="mb-5 flex items-center gap-3">
        <span className={`h-2.5 w-2.5 rounded-full ${a.dot}`} />
        <h4 className="font-display text-2xl text-ink">{label}</h4>
        <span className="h-px flex-1 bg-ink/10" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <Link
            key={it.name}
            href={it.href}
            className="group flex flex-col overflow-hidden rounded-[1.6rem] border border-ink/5 bg-white/55 shadow-[0_18px_50px_-30px_rgba(42,35,38,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5"
          >
            <div className={`relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-b ${a.bg}`}>
              <Image
                src={it.img}
                alt={it.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={`transition-transform duration-700 group-hover:scale-105 ${
                  it.contain ? "object-contain p-5" : "object-cover"
                }`}
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h5 className="font-display text-lg leading-tight text-ink">{it.name}</h5>
              <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-ink/65">{it.note}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-rose">
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${a.badge}`}>
                  {it.href.startsWith("/dort/") ? "Upravit" : "Poptat"}
                </span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ---- Gallery of real cakes (hover to see the cut) ----------------------- */

export function Gallery() {
  const { t, lang } = useLang();
  const cs = lang === "cs";

  const row1 = cakes.slice(0, Math.ceil(cakes.length / 2));
  const row2 = cakes.slice(Math.ceil(cakes.length / 2));

  return (
    <section id="galerie" className="py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-14 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rose">
            {lang === "cs" ? "Galerie" : "Gallery"}
          </span>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <AnimatedHeading
              wrapperClassName="mt-3"
              className="text-4xl sm:text-5xl"
              text={t.sections.galleryTitle}
            />
          </div>
          <p className="mt-3 text-ink/65">
            {lang === "cs"
              ? "Najeď myší na dort (nebo klepni) a uvidíš, co se skrývá uvnitř."
              : "Hover a cake (or tap) to see what's hiding inside."}
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-6 mt-4">
        <InfiniteSlider gap={28} duration={45} durationOnHover={100}>
          {row1.map((c) => (
            <div
              key={c.id}
              className="w-[280px] sm:w-[320px] lg:w-[380px] transition-transform hover:-translate-y-1"
            >
              <CakeCard
                name={lang === "cs" ? c.cs : c.en}
                note={lang === "cs" ? c.noteCs : c.noteEn}
                whole={c.exterior}
                inside={c.slice}
                href={`/dort/${c.id}`}
              />
            </div>
          ))}
        </InfiniteSlider>
        
        <InfiniteSlider gap={28} duration={45} durationOnHover={100} reverse={true}>
          {row2.map((c) => (
            <div
              key={c.id}
              className="w-[280px] sm:w-[320px] lg:w-[380px] transition-transform hover:-translate-y-1"
            >
              <CakeCard
                name={lang === "cs" ? c.cs : c.en}
                note={lang === "cs" ? c.noteCs : c.noteEn}
                whole={c.exterior}
                inside={c.slice}
                href={`/dort/${c.id}`}
              />
            </div>
          ))}
        </InfiniteSlider>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8 mt-12 text-center">
        <Link
          href="/galerie"
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-ink px-8 py-4 text-base font-bold text-cream shadow-[0_20px_40px_-15px_rgba(42,35,38,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_50px_-15px_rgba(42,35,38,0.7)]"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-teal/30 via-rose/30 to-honey/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative z-10">{lang === "cs" ? "Celá galerie, i zákusky a frgály" : "Full gallery, desserts and frgály too"}</span>
          <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

/* ---- Story -------------------------------------------------------------- */

export function Story() {
  const { lang } = useLang();
  const cs = lang === "cs";

  const stats = [
    { num: "10", cs: "let praxe", en: "years of practice" },
    { num: "13", cs: "od kolika let peče", en: "started at age" },
    { num: "0", cs: "šablon, každý kus originál", en: "templates, all bespoke" },
  ];

  return (
    <section id="pribeh" className="relative overflow-hidden py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-start gap-14 md:grid-cols-12 md:gap-16">
          {/* Left, photo + stats */}
          <div className="md:col-span-5">
            <div className="mx-auto w-full max-w-[360px] rotate-[-2deg] rounded-[2.2rem] border border-black/5 bg-white p-4 pb-10 shadow-[0_30px_70px_-30px_rgba(42,35,38,0.5)]">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.6rem] bg-cream-deep">
                <Image
                  src="/photos/anicka.jpg"
                  alt="Anička při pečení"
                  fill
                  sizes="(max-width: 768px) 80vw, 360px"
                  className="object-cover object-[center_20%]"
                />
              </div>
              <p className="mt-5 text-center font-display text-base tracking-tight text-ink/80">
                Anička
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-ink/10 bg-white/60 p-4 text-center"
                >
                  <div
                    className={`font-display text-3xl leading-none ${
                      i === 0 ? "text-rose" : i === 1 ? "text-teal" : "text-honey"
                    }`}
                  >
                    {s.num}
                  </div>
                  <div className="mt-2 text-[11px] leading-snug text-ink/65">
                    {cs ? s.cs : s.en}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right, narrative */}
          <div className="flex flex-col justify-center md:col-span-7">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rose">
              {cs ? "Příběh Aničky" : "Anička's story"}
            </span>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
              {cs ? "Peču od svých třinácti." : "Baking since I was thirteen."}
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-ink/75 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-5xl first-letter:font-semibold first-letter:text-rose">
              {cs
                ? "Začalo to vůní těsta v naší kuchyni, když mi bylo třináct. Od té doby jsem prošla kurzy, stovkami receptů a tisíci hodin u pece, abych z domácího pečení udělala řemeslo."
                : "It started with the smell of dough in our kitchen when I was thirteen. Since then I've gone through courses, hundreds of recipes and thousands of hours at the oven to turn home baking into a craft."}
            </p>

            <p className="mt-4 leading-relaxed text-ink/70">
              {cs
                ? "Dnes peču zakázkové dorty, zákusky i tradiční frgály v Kavárně Modré korále. Objednávky mi chodí hlavně z doporučení, lidé se vracejí pro poctivou chuť bez kompromisů a pro pocit, že je za každým dortem konkrétní člověk, ne stroj."
                : "Today I bake custom cakes, desserts and traditional frgály at Kavárna Modré korále. Orders come mostly by word of mouth, people return for the honest, no-compromise taste and the feeling that there's a real person behind each cake, not a machine."}
            </p>

            {/* Pull quote, the promise */}
            <blockquote className="my-8 border-l-4 border-rose pl-5">
              <p className="font-display text-2xl leading-snug text-ink sm:text-[1.7rem]">
                {cs
                  ? "„Nech mě pomoct udělat tvou oslavu nezapomenutelnou. Upeču takový dort, o kterém si tvoji hosté budou povídat ještě dlouho po poslední lžičce.“"
                  : "“Let me help make your celebration unforgettable. I'll bake a cake your guests will talk about long after the last bite.”"}
              </p>
            </blockquote>

            <p className="leading-relaxed text-ink/70">
              {cs
                ? "Nemusíš mít jasnou vizi ani umět péct. Od první zprávy po předání to vedu za tebe, srozumitelně a v klidu, ať je to narozeninový dort, svatba, nebo jen koláč pro radost."
                : "You don't need a clear vision or any baking skills. From the first message to handover I guide it for you, calmly and clearly, whether it's a birthday cake, a wedding, or just a pastry for the joy of it."}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-ink/65">
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-4 py-2 font-medium">
                <MapPin className="h-4 w-4 text-teal" strokeWidth={1.8} />
                {cs ? "Kavárna Modré korále" : "Kavárna Modré korále"}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-4 py-2 font-medium">
                <Camera className="h-4 w-4 text-coral" strokeWidth={1.8} />
                {cs ? "Najdeš mě i na Instagramu" : "Find me on Instagram"}
              </span>
            </div>

            <Link
              href="/o-anicce"
              className="group mt-7 inline-flex w-max items-center gap-2 rounded-full bg-rose/10 px-6 py-3 text-sm font-bold text-rose transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose hover:text-cream"
            >
              {cs ? "Celý příběh Aničky" : "Anička's full story"}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Why Anička (answers the unspoken objections) ----------------------- */

export function WhyAnicka() {
  const { lang } = useLang();
  const cs = lang === "cs";

  const cards = [
    {
      icon: Leaf,
      color: "text-teal",
      ring: "bg-teal/15",
      cs: { t: "Poctivé suroviny", d: "Pravé máslo, čerstvé ovoce, žádné polotovary ani prášky z krabice. Chuť, kterou poznáš na první sousto." },
      en: { t: "Honest ingredients", d: "Real butter, fresh fruit, no shortcuts or box mixes. A taste you notice from the first bite." },
    },
    {
      icon: Sparkles,
      color: "text-rose",
      ring: "bg-rose/12",
      cs: { t: "Trefím tvou představu", d: "Stačí pár chutí nebo fotka z Pinterestu. Návrh připravím já a vždycky ho s tebou předem odsouhlasím." },
      en: { t: "I'll nail your idea", d: "Just a few flavours or a Pinterest photo is enough. I prepare the design and always confirm it with you first." },
    },
    {
      icon: HeartHandshake,
      color: "text-coral",
      ring: "bg-coral/15",
      cs: { t: "Jednoduchá domluva", d: "Od první zprávy po předání tě provedu krok za krokem. Žádné formuláře naslepo, žádný stres." },
      en: { t: "Easy from the start", d: "From the first message to handover I guide you step by step. No blind forms, no stress." },
    },
    {
      icon: ShieldCheck,
      color: "text-honey",
      ring: "bg-honey/25",
      cs: { t: "10 let zkušeností", d: "Stovky dortů, svateb i oslav. Víš, že to dovedu do konce a v termínu." },
      en: { t: "10 years of experience", d: "Hundreds of cakes, weddings and celebrations. You know it'll be done, and on time." },
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <div className="mb-14 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rose">
          {cs ? "Proč Anička" : "Why Anička"}
        </span>
        <AnimatedHeading
          wrapperClassName="mt-3"
          className="text-4xl sm:text-5xl"
          text={cs ? "Dort, na který se můžeš spolehnout" : "A cake you can rely on"}
        />
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink/65">
          {cs
            ? "Objednat dort u někoho, koho neznáš, je risk. Tady je, proč u Aničky není."
            : "Ordering a cake from someone you don't know is a risk. Here's why with Anička it isn't."}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          const copy = cs ? c.cs : c.en;
          return (
            <div
              key={copy.t}
              className="flex flex-col rounded-[1.6rem] border border-ink/5 bg-white/55 p-6 shadow-[0_18px_50px_-32px_rgba(42,35,38,0.45)] transition-transform duration-500 hover:-translate-y-1"
            >
              <span className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${c.ring}`}>
                <Icon className={`h-6 w-6 ${c.color}`} strokeWidth={1.8} />
              </span>
              <h3 className="font-display text-xl text-ink">{copy.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{copy.d}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---- FAQ (kills the last hesitations before the CTA) -------------------- */

export function Faq() {
  const { lang } = useLang();
  const cs = lang === "cs";

  const items = cs
    ? [
        { q: "Kolik dort stojí?", a: "Cena se odvíjí od velikosti, náročnosti zdobení a surovin. Napiš mi svou představu a pošlu ti konkrétní cenu předem, bez překvapení." },
        { q: "Co když přesně nevím, co chci?", a: "To je úplně běžné. Stačí pár oblíbených chutí nebo příležitost a zbytek navrhnu já. Nic neobjednáváš naslepo, návrh ti vždycky pošlu k odsouhlasení." },
        { q: "Zvládneš alergie nebo bezlepkové?", a: "Ano. Dej mi vědět o alergiích a omezeních, bezlepkový korpus i další úpravy řeším běžně." },
        { q: "Jak dlouho dopředu mám objednat?", a: "Ideálně 1–2 týdny dopředu, u svateb a větších akcí klidně dřív. Když to hoří, ozvi se, někdy se to podaří doladit." },
        { q: "Kde si dort vyzvednu?", a: "Osobní předání v Kavárně Modré korále, po domluvě najdeme i jiné řešení." },
      ]
    : [
        { q: "How much does a cake cost?", a: "It depends on size, decoration and ingredients. Send me your idea and I'll give you a clear price up front, no surprises." },
        { q: "What if I don't know exactly what I want?", a: "Totally normal. A few favourite flavours or the occasion is enough, I'll design the rest. You never order blind, I always send the design for approval." },
        { q: "Can you handle allergies or gluten-free?", a: "Yes. Let me know about allergies and restrictions, gluten-free sponge and other adjustments are routine." },
        { q: "How far in advance should I order?", a: "Ideally 1–2 weeks ahead, earlier for weddings and bigger events. If it's urgent, reach out, sometimes it works." },
        { q: "Where do I pick the cake up?", a: "In person at Kavárna Modré korále, or we'll arrange something else if needed." },
      ];

  return (
    <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <div className="mb-12 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rose">
          {cs ? "Časté otázky" : "FAQ"}
        </span>
        <AnimatedHeading
          wrapperClassName="mt-3"
          className="text-3xl sm:text-4xl"
          text={cs ? "Ještě váháš? Tohle se ptají nejčastěji" : "Still unsure? These come up most"}
        />
      </div>

      <div className="flex flex-col gap-3">
        {items.map((it) => (
          <details
            key={it.q}
            className="group rounded-2xl border border-ink/10 bg-white/60 px-5 open:bg-white/80 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-lg text-ink">
              {it.q}
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose/10 text-rose transition-transform duration-300 group-open:rotate-45">
                <Plus className="h-4 w-4" strokeWidth={2.4} />
              </span>
            </summary>
            <p className="pb-5 leading-relaxed text-ink/70">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ---- Closing band (single inquiry path) --------------------------------- */

export function CtaBand() {
  const { t, lang } = useLang();

  const contacts = [
    { icon: MapPin, text: "Kavárna Modré korále, ČR", href: undefined },
    { icon: Mail, text: "objednavky@anickadorty.cz", href: "mailto:objednavky@anickadorty.cz" },
    { icon: Phone, text: "+420 777 123 456", href: "tel:+420777123456" },
  ];

  return (
    <section id="objednat" className="px-5 pb-24 sm:px-8">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/55 p-9 text-center shadow-[0_40px_90px_-50px_rgba(42,35,38,0.55)] backdrop-blur-md sm:p-14">
        <AnimatedHeading
          className="text-3xl leading-tight sm:text-4xl"
          text={t.sections.ctaBandTitle}
        />
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink/65">
          {t.sections.ctaBandBody}
        </p>

        <RippleButton href="/sloz-si-dort" className="mt-8">
          {lang === "cs" ? "Slož si svůj dort" : "Build your cake"}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </RippleButton>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 border-t border-ink/10 pt-8 text-sm text-ink/65 sm:flex-row sm:gap-8">
          {contacts.map(({ icon: Icon, text, href }) => {
            const inner = (
              <span className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4 text-rose" strokeWidth={1.8} />
                {text}
              </span>
            );
            return href ? (
              <a key={text} href={href} className="transition-colors hover:text-rose">
                {inner}
              </a>
            ) : (
              <span key={text}>{inner}</span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---- Footer ------------------------------------------------------------- */

export function Footer() {
  const { t, lang } = useLang();
  const cs = lang === "cs";

  const cols = [
    {
      heading: cs ? "Nabídka" : "Offer",
      links: [
        { href: "/sloz-si-dort", label: cs ? "Slož si dort" : "Build a cake" },
        { href: "/klasiky", label: cs ? "Klasiky" : "Classics" },
        { href: "/prilezitost", label: cs ? "Podle příležitosti" : "By occasion" },
        { href: "/galerie", label: cs ? "Galerie" : "Gallery" },
      ],
    },
    {
      heading: cs ? "Anička" : "Anička",
      links: [
        { href: "/o-anicce", label: cs ? "O Aničce" : "About" },
        { href: "/recenze", label: cs ? "Recenze" : "Reviews" },
        { href: "/blog", label: cs ? "Blog & tipy" : "Blog & tips" },
        { href: "/#objednat", label: cs ? "Kontakt" : "Contact" },
      ],
    },
  ];

  return (
    <footer id="kontakt" className="relative z-30 border-t border-ink/10 bg-cream py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="font-display text-2xl text-rose">
            Anička
          </Link>
          <p className="mt-3 max-w-sm text-sm text-ink/65">{t.footer.tagline}</p>
          <p className="mt-4 text-xs text-ink/55">
            {t.footer.madeWith} · © {new Date().getFullYear()}
          </p>
        </div>
        {cols.map((col) => (
          <nav key={col.heading} className="flex flex-col gap-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/45">
              {col.heading}
            </span>
            {col.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-ink/70 transition-colors hover:text-rose"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        ))}
      </div>
    </footer>
  );
}
