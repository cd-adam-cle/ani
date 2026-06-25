"use client";

import Image from "next/image";
import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { cakes } from "@/lib/cakes";
import CakeCard from "./CakeCard";
import RippleButton from "./ui/RippleButton";
import AnimatedHeading from "./ui/AnimatedHeading";

/* ---- Collection by type ------------------------------------------------- */

export function Categories() {
  const { t, lang } = useLang();
  const cats = [
    {
      id: "dorty",
      img: "/photos/cards/wedding_cake_whole.png",
      title: t.sections.cakes,
      desc: t.sections.cakesDesc,
    },
    {
      id: "zakusky",
      img: "/photos/cards/mini_pastry_whole.png",
      title: t.sections.desserts,
      desc: t.sections.dessertsDesc,
    },
    {
      id: "kolace",
      img: "/photos/cards/czech_pie_whole.png",
      title: t.sections.koláče,
      desc: t.sections.koláčeDesc,
    },
  ];

  return (
    <section id="nabidka" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <div className="mb-14 text-center">
        <AnimatedHeading
          className="text-4xl sm:text-5xl"
          text={lang === "cs" ? "Co to bude?" : "What will it be?"}
        />
        <p className="mt-4 text-lg text-ink/65">
          {lang === "cs" ? "Cesta je jen na tobě. Buď si vytvoříš vlastní speciál, nebo sáhneš po klasice." : "The choice is yours. Build a special one, or go for a classic."}
        </p>
      </div>

      <div className="flex flex-col gap-16">
        
        {/* Speciální / Slož si dort */}
        <div className="relative flex flex-col md:flex-row items-center overflow-hidden rounded-[2.5rem] bg-rose/5 border border-rose/10 p-8 shadow-sm transition-all hover:shadow-xl sm:p-12 min-h-[22rem]">
          <div className="relative z-10 md:w-1/2 md:pr-8">
            <span className="mb-4 inline-block rounded-full bg-rose px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cream">
              {lang === "cs" ? "Speciální" : "Special"}
            </span>
            <h3 className="font-display text-4xl sm:text-5xl text-ink leading-tight">
              {lang === "cs" ? "Slož si dort snů" : "Build your dream cake"}
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-ink/75 max-w-md">
              {lang === "cs" 
                ? "Dort přesně podle tvé fantazie. Vyber si korpus, krém, oblíbené ovoce i finální zdobení v našem konfigurátoru."
                : "A cake exactly to your imagination. Pick the sponge, cream, fruit and decoration in our builder."}
            </p>
            <RippleButton href="/sloz-si-dort" className="mt-8">
              {lang === "cs" ? "Přejít do konfigurátoru" : "Go to configurator"}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </RippleButton>
          </div>
          <div className="mt-10 md:mt-0 relative w-full md:w-1/2 h-64 md:h-full md:absolute right-0 top-0 bottom-0">
            {/* Využíváme masku pro hezký přechod do pozadí */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t md:bg-gradient-to-r from-[rgba(253,242,243,1)] via-[rgba(253,242,243,0.5)] to-transparent" />
            <Image 
              src="/photos/cakes/03-berry-exterior.webp" 
              alt="Speciální dort" 
              fill 
              className="object-cover object-center md:object-left" 
            />
          </div>
        </div>

        {/* Klasiky */}
        <div>
          <div className="mb-8 flex items-center justify-between">
            <h3 className="font-display text-3xl text-ink">
              {lang === "cs" ? "Nebo si vyber z klasiky" : "Or pick from classics"}
            </h3>
          </div>
          
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {cats.map((c, i) => (
              <a
                key={c.id}
                id={c.id === "dorty" ? undefined : c.id}
                href="#galerie"
                className="group relative block h-[26rem] overflow-hidden rounded-[1.8rem] shadow-[0_24px_60px_-32px_rgba(42,35,38,0.45)] ring-1 ring-black/5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-7">
                  <span className="mb-2 w-max rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                    {lang === "cs" ? "Klasika" : "Classic"}
                  </span>
                  <h4 className="font-display text-2xl text-cream">{c.title}</h4>
                  <p className="mt-2 max-w-[24ch] text-sm leading-relaxed text-cream/80">
                    {c.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cream">
                    {lang === "cs" ? "Zobrazit v galerii" : "See in the gallery"}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

/* ---- Gallery of real cakes (hover to see the cut) ----------------------- */

export function Gallery() {
  const { t, lang } = useLang();

  return (
    <section id="galerie" className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-14 text-center">
          <AnimatedHeading
            className="text-4xl sm:text-5xl"
            text={t.sections.galleryTitle}
          />
          <p className="mt-3 text-ink/65">
            {lang === "cs"
              ? "Najeď myší na dort (nebo klepni) a uvidíš, co se skrývá uvnitř."
              : "Hover a cake (or tap) to see what's hiding inside."}
          </p>
        </div>

        <div className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {cakes.map((c, i) => (
            <div
              key={c.id}
              className="transition-transform hover:-translate-y-1"
            >
              <CakeCard
                name={lang === "cs" ? c.cs : c.en}
                note={lang === "cs" ? c.noteCs : c.noteEn}
                whole={c.exterior}
                inside={c.slice}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Story -------------------------------------------------------------- */

export function Story() {
  const { t, lang } = useLang();
  return (
    <section id="pribeh" className="mx-auto max-w-6xl px-5 py-28 sm:px-8">
      <div className="grid items-center gap-16 md:grid-cols-12">
        <div className="flex justify-center md:col-span-5">
          <div className="relative w-full max-w-[340px] rotate-[-2deg] rounded-[2.2rem] border border-black/5 bg-white p-4 pb-12 shadow-[0_30px_70px_-30px_rgba(42,35,38,0.5)]">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.6rem] bg-cream-deep">
              <Image
                src="/photos/anicka.jpg"
                alt="Anička při pečení"
                fill
                sizes="(max-width: 768px) 80vw, 340px"
                className="object-cover object-[center_20%]"
              />
            </div>
            <p className="mt-6 text-center font-display text-sm italic tracking-tight text-ink/80">
              Anička
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center md:col-span-7">
          <h2 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
            {t.sections.storyTitle}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/75 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-5xl first-letter:font-semibold first-letter:text-rose">
            {t.sections.storyBody}
          </p>
          <p className="mt-4 leading-relaxed text-ink/65">
            {lang === "cs"
              ? "Už od dětství mě fascinovala vůně čerstvého těsta a tvořivost spojená se zdobením. Dnes peču zakázkové dorty, u kterých lidé milují poctivost, chuť bez kompromisů a osobní přístup ke každé jedné objednávce."
              : "Ever since childhood I have been fascinated by the smell of fresh dough and the creativity of decoration. Today I bake custom cakes where people love the honesty, the no-compromise taste, and a personal approach to every single order."}
          </p>
        </div>
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
  const { t } = useLang();
  return (
    <footer id="kontakt" className="relative z-30 border-t border-ink/10 bg-cream py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-center sm:px-8">
        <span className="font-display text-2xl text-rose">Anička</span>
        <p className="max-w-sm text-sm text-ink/65">{t.footer.tagline}</p>
        <p className="text-xs text-ink/65">
          {t.footer.madeWith} · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
