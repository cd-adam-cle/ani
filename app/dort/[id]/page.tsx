"use client";

import { use, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, X, Check, ChevronDown } from "lucide-react";
import { useWishlist } from "@/lib/WishlistContext";
import { cakesData } from "@/lib/cakesData";
import RippleButton from "@/components/ui/RippleButton";
import { useLang } from "@/lib/LangContext";

import { cakeCategories, SINGLE_CHOICE } from "@/lib/cakeOptions";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Sections";

export default function CakeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { loadPreset } = useWishlist();
  const { lang } = useLang();
  const reduce = useReducedMotion();

  const cake = cakesData.find((c) => c.id === resolvedParams.id);

  const [localSelected, setLocalSelected] = useState<Set<string>>(new Set());
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  useEffect(() => {
    if (cake) {
      // Find default size in preset, if not there, add size:m
      const preset = new Set(cake.presetConfig);
      if (![...preset].some(k => k.startsWith('size:'))) {
        preset.add("size:m");
      }
      setLocalSelected(preset);
    }
  }, [cake]);

  const price = useMemo(() => {
    const sizeKeys = [...localSelected].filter(k => k.startsWith('size:'));
    const size = sizeKeys.length > 0 ? sizeKeys[0].split(":")[1] : "m";
    switch (size) {
      case "s": return 590; // Half price of typical 1200
      case "m": return 890; // Half price of typical 1800
      case "l": return 1490; // Half price of typical 3000
      case "tiered": return 2490;
      default: return 890;
    }
  }, [localSelected]);

  if (!cake) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-cream text-ink">
        <Navbar />
        <h1 className="font-display text-4xl">Dort nenalezen</h1>
        <Link href="/" className="mt-4 text-rose hover:underline">
          Zpět na hlavní stránku
        </Link>
        <div className="absolute bottom-0 w-full">
          <Footer />
        </div>
      </div>
    );
  }

  const toggleLocal = (catId: string, optId: string) => {
    const key = `${catId}:${optId}`;
    const next = new Set(localSelected);
    next.has(key) ? next.delete(key) : next.add(key);
    setLocalSelected(next);
  };

  const chooseLocal = (catId: string, optId: string) => {
    const next = new Set([...localSelected].filter((k) => !k.startsWith(`${catId}:`)));
    next.add(`${catId}:${optId}`);
    setLocalSelected(next);
  };

  const localHas = (catId: string, optId: string) => localSelected.has(`${catId}:${optId}`);

  const handleOrder = () => {
    loadPreset(Array.from(localSelected));
    router.push("/sloz-si-dort?step=3");
  };

  const renderCategory = (catId: string) => {
    const cat = cakeCategories.find((c) => c.id === catId);
    if (!cat) return null;
    const single = SINGLE_CHOICE.has(cat.id);
    const isOpen = openCategory === cat.id;

    const selectedOptions = cat.options.filter(opt => localHas(cat.id, opt.id));
    const selectedLabels = selectedOptions.map(opt => lang === "cs" ? opt.cs : opt.en).join(", ");

    return (
      <div key={cat.id} className={`mb-3 rounded-[1.2rem] border transition-all duration-300 ${isOpen ? "border-rose/30 bg-white/80 shadow-md" : "border-ink/10 bg-white/50 hover:bg-white/80 hover:border-ink/20"} overflow-hidden`}>
        <button
          type="button"
          onClick={() => setOpenCategory(isOpen ? null : cat.id)}
          className="flex w-full items-center justify-between p-5 text-left outline-none"
        >
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose">
              {lang === "cs" ? cat.cs : cat.en}
            </span>
            <div className="mt-0.5 font-display text-[17px] text-ink leading-snug">
              {selectedLabels || (lang === "cs" ? "Vyber si..." : "Choose...")}
            </div>
          </div>
          <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-cream-deep/50 transition-transform duration-300 ${isOpen ? "rotate-180 bg-rose/10 text-rose" : "text-ink/50"}`}>
            <ChevronDown className="h-5 w-5" />
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 pt-2">
                <p className="mb-4 text-xs font-medium text-ink/60">
                  {single
                    ? (lang === "cs" ? "Z této kategorie můžeš vybrat jen jednu možnost." : "Pick one option from this category.")
                    : (lang === "cs" ? "Můžeš vybrat více možností (Anička pak ty chutě propojí). Vyzkoušej něco nového!" : "You can select multiple options.")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.options.map((opt) => {
                    const active = localHas(cat.id, opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => (single ? chooseLocal(cat.id, opt.id) : toggleLocal(cat.id, opt.id))}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                          active
                            ? "border-rose bg-rose text-cream shadow-sm"
                            : "border-ink/10 bg-white/80 text-ink/75 hover:border-rose/40 hover:text-rose"
                        }`}
                      >
                        {active && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                        {lang === "cs" ? opt.cs : opt.en}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[100dvh] bg-cream pt-24 pb-24">
        {/* Main Content */}
        <main className="mx-auto max-w-5xl px-5 sm:px-8">
          
          <Link href="/#klasiky" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-ink/60 transition-colors hover:text-rose">
            <ArrowLeft className="h-4 w-4" />
            {lang === "cs" ? "Zpět na klasiky" : "Back to classics"}
          </Link>

          {/* Hero Product Info */}
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 sticky top-28 aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] shadow-[0_30px_70px_-30px_rgba(42,35,38,0.5)]"
            >
              <Image 
                src={cake.image} 
                alt={cake.name} 
                fill 
                className="object-cover"
                priority
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 flex flex-col"
            >
              <span className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-rose">
                {lang === "cs" ? "Klasika k úpravě" : "Classic to customize"}
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink leading-[1.1]">
                {cake.name}
              </h1>
              
              <div className="mt-4 flex items-end gap-3">
                <span className="font-display text-3xl text-ink">
                  {lang === "cs" ? "od " : "from "}{price} Kč
                </span>
                <span className="mb-1 text-sm font-semibold text-teal bg-teal/10 px-3 py-1 rounded-full">
                  {lang === "cs" ? "Poloviční ceny než jinde" : "Half the price of others"}
                </span>
              </div>

              <p className="mt-6 text-lg leading-relaxed text-ink/75">
                {cake.description}
              </p>

              {/* How it works simple text */}
              <div className="mt-10 mb-12 rounded-2xl bg-white/40 p-6 border border-ink/5 text-sm text-ink/80 leading-relaxed shadow-sm">
                <h3 className="font-semibold text-ink mb-2 text-base">
                  {lang === "cs" ? "Jak to funguje?" : "How it works?"}
                </h3>
                <p>
                  {lang === "cs" 
                    ? "Tento dort jsme pro tebe předvyplnili těmi nejlepšími ingrediencemi. Rozklikni si libovolnou sekci, podívej se na možnosti a klidně si dort uprav podle sebe – vyber si třeba víc ovoce najednou! Anička pak z tvého výběru vykouzlí dokonalý originál."
                    : "We have pre-filled this cake with the best ingredients. Open any section, check the options and feel free to tweak the cake - for example select more fruits! Anička will then craft a perfect original from your selection."}
                </p>
              </div>
              
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="font-display text-2xl text-ink">
                    {lang === "cs" ? "Složení dortu" : "Cake composition"}
                  </h2>
                  <span className="h-px flex-1 bg-ink/10" />
                </div>
                {renderCategory("size")}
                {renderCategory("occasion")}
                {renderCategory("sponge")}
                {renderCategory("cream")}
                {renderCategory("addins")}
                {renderCategory("finish")}
                {renderCategory("decoration")}
              </div>

              <div className="mt-10 pt-8 border-t border-ink/10">
                <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
                  <div className="text-center sm:text-left">
                    <div className="text-sm text-ink/60 font-semibold uppercase tracking-wider mb-1">
                      {lang === "cs" ? "Odhadovaná cena" : "Estimated price"}
                    </div>
                    <div className="font-display text-4xl text-ink">
                      ~ {price} Kč
                    </div>
                  </div>
                  
                  <RippleButton onClick={handleOrder} className="w-full sm:w-auto px-8 py-4 text-lg shadow-lg">
                    {lang === "cs" ? "Poptat tento dort" : "Inquire about this cake"}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </RippleButton>
                </div>
                <p className="mt-5 text-xs text-ink/50 text-center sm:text-right">
                  {lang === "cs" 
                    ? "Přesnou cenu ti potvrdí Anička po odeslání poptávky."
                    : "Anička will confirm the exact price after your inquiry."}
                </p>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
