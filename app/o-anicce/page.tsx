"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Camera, Leaf, Sparkles, HeartHandshake } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Sections";
import { useLang } from "@/lib/LangContext";

export default function OAniccePage() {
  const { lang } = useLang();
  const cs = lang === "cs";

  const timeline = cs
    ? [
        { year: "13 let", t: "Začátky s vůní vanilky", d: "Všechno to začalo doma. Od prvních pokusů mě hnala touha upéct dort, který nejen hezky vypadá, ale hlavně poctivě chutná. Už tehdy pro mě byl každý další dort výzvou, jak to udělat ještě o úroveň lépe." },
        { year: "Kurzy", t: "Z koníčka profi řemeslo", d: "Abych ti mohla nabídnout stoprocentní kvalitu, neustále se vzdělávám. Prošla jsem odbornými kurzy pečení i moderního zdobení. Piplám každou techniku, dokud není chuť i vzhled naprosto bez kompromisu." },
        { year: "Dnes", t: "Kavárna Modré korále a vy", d: "Dnes pod mýma rukama vznikají zakázkové dorty, které dělají radost na vašich oslavách, a mé dezerty najdeš i v Kavárně Modré korále. Moje největší reklama? Spokojení klienti, kteří se vracejí a doporučují mě dál." },
      ]
    : [
        { year: "Age 13", t: "First at the oven", d: "At home the smell of dough and creating caught me. Every cake a try at making it a little better." },
        { year: "Courses", t: "Hobby into craft", d: "I went through baking and decorating courses, refining technique until taste and looks were uncompromising." },
        { year: "Today", t: "Kavárna Modré korále", d: "I bake custom cakes, desserts and traditional frgály. Orders come mostly by word of mouth." },
      ];

  const values = cs
    ? [
        { icon: Leaf, color: "text-teal", ring: "bg-teal/15", t: "Poctivé suroviny", d: "Chuť ošidit nejde. Používám pouze pravé máslo, kvalitní čokoládu a čerstvé ovoce. Žádné umělé margaríny ani chemické polotovary. Ten rozdíl poznáš hned při prvním soustu." },
        { icon: Sparkles, color: "text-rose", ring: "bg-rose/12", t: "Žádné šablony", d: "Tvůj dort bude naprostý originál. Společně vymyslíme design, texturu i chuť tak, aby přesně sedly k atmosféře tvé oslavy. Sériovou výrobu podle katalogu u mě nehledej." },
        { icon: HeartHandshake, color: "text-coral", ring: "bg-coral/15", t: "Osobní přístup", d: "Nevíš si rady s výběrem velikosti nebo příchutě? Neboj. Provedu tě od prvního dotazu až po bezpečné předání dortu v krabici. V klidu, lidsky a tak, abys s tím neměl/a žádné starosti." },
      ]
    : [
        { icon: Leaf, color: "text-teal", ring: "bg-teal/15", t: "Honest ingredients", d: "Real butter, fresh fruit, no shortcuts." },
        { icon: Sparkles, color: "text-rose", ring: "bg-rose/12", t: "No templates", d: "Every piece is made for you, not from a catalogue." },
        { icon: HeartHandshake, color: "text-coral", ring: "bg-coral/15", t: "Personal touch", d: "I guide you from first message to handover, calmly and clearly." },
      ];

  return (
    <>
      <Navbar solid />
      <main className="min-h-[100dvh] pt-[72px]">
        {/* Intro */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <div className="mx-auto w-full max-w-[380px] rotate-[-2deg] rounded-[2.2rem] border border-black/5 bg-white p-4 pb-10 shadow-[0_30px_70px_-30px_rgba(42,35,38,0.5)]">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.6rem] bg-cream-deep">
                  <Image src="/photos/anicka.jpg" alt="Anička" fill sizes="(max-width: 768px) 80vw, 380px" className="object-cover object-[center_20%]" priority />
                </div>
                <p className="mt-5 text-center font-display text-base text-ink/80">Anička</p>
              </div>
            </div>
            <div className="md:col-span-7">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rose">
                {cs ? "Z místní kuchyně až k vašim oslavám" : "From local kitchen to your celebrations"}
              </span>
              <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-6xl">
                {cs ? "Dorty, které chutnají stejně skvěle, jak vypadají." : "Cakes that taste as great as they look."}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-ink/75">
                {cs
                  ? "Začalo to vůní těsta v naší kuchyni, když mi bylo třináct. Z dětského nadšení se za více než deset let stalo poctivé řemeslo. Dnes je mým jediným cílem zbavit tě stresu z příprav – stačí mi říct tvou představu a já se postarám o dort, na který budou hosté vzpomínat ještě dlouho po oslavě."
                  : "It started with the smell of dough in our kitchen when I was thirteen. Over more than ten years, childhood enthusiasm became an honest craft. Today, my only goal is to relieve you of the stress of preparation - just tell me your vision and I will take care of a cake that guests will remember long after the celebration."}
              </p>
              <blockquote className="my-8 border-l-4 border-rose pl-5">
                <p className="font-display text-2xl leading-snug text-ink sm:text-[1.7rem]">
                  {cs
                    ? "„Nech mě pomoct udělat tvou oslavu nezapomenutelnou. Upeču takový dort, o kterém si tvoji hosté budou povídat ještě dlouho po poslední lžičce.“"
                    : "“Let me help make your celebration unforgettable. I'll bake a cake your guests will talk about long after the last bite.”"}
                </p>
              </blockquote>
              <div className="flex flex-wrap gap-3 text-sm text-ink/65">
                <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-4 py-2 font-medium">
                  <MapPin className="h-4 w-4 text-teal" strokeWidth={1.8} />
                  Kavárna Modré korále
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-4 py-2 font-medium">
                  <Camera className="h-4 w-4 text-coral" strokeWidth={1.8} />
                  {cs ? "Najdeš mě i na Instagramu" : "Find me on Instagram"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Journey */}
        <section className="bg-gradient-to-b from-cream via-teal/8 to-cream py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <h2 className="text-center font-display text-3xl text-ink sm:text-4xl">
              {cs ? "Jak to celé začalo" : "How it all began"}
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {timeline.map((m, i) => (
                <div key={i} className="rounded-[1.6rem] border border-ink/5 bg-white/60 p-6 shadow-[0_18px_50px_-32px_rgba(42,35,38,0.45)]">
                  <span className="inline-block rounded-full bg-rose/10 px-3 py-1 font-display text-sm font-bold text-rose">
                    {m.year}
                  </span>
                  <h3 className="mt-4 font-display text-xl text-ink">{m.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{m.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
          <h2 className="text-center font-display text-3xl text-ink sm:text-4xl">
            {cs ? "Jak peču" : "How I bake"}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.t} className="flex flex-col rounded-[1.6rem] border border-ink/5 bg-white/55 p-6 text-center shadow-[0_18px_50px_-32px_rgba(42,35,38,0.45)]">
                  <span className={`mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${v.ring}`}>
                    <Icon className={`h-6 w-6 ${v.color}`} strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display text-xl text-ink">{v.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{v.d}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-14 flex justify-center">
            <Link
              href="/sloz-si-dort"
              className="group inline-flex items-center gap-2 rounded-full bg-rose px-8 py-4 text-base font-bold text-cream shadow-[0_14px_30px_-12px_rgba(178,76,99,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-deep"
            >
              {cs ? "Pojď si složit dort" : "Build your cake"}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
