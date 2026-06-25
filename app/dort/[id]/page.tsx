"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useWishlist } from "@/lib/WishlistContext";
import { cakesData } from "@/lib/cakesData";
import RippleButton from "@/components/ui/RippleButton";

import { optionLabel } from "@/lib/cakeOptions";

export default function CakeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { loadPreset } = useWishlist();

  const cake = cakesData.find((c) => c.id === resolvedParams.id);

  if (!cake) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-cream text-ink">
        <h1 className="font-display text-4xl">Dort nenalezen</h1>
        <Link href="/" className="mt-4 text-rose hover:underline">
          Zpět na hlavní stránku
        </Link>
      </div>
    );
  }

  const handleEditAndOrder = () => {
    loadPreset(cake.presetConfig);
    router.push("/sloz-si-dort");
  };

  return (
    <div className="min-h-[100dvh] bg-cream">
      {/* Header */}
      <header className="border-b border-ink/10">
        <div className="mx-auto flex h-[72px] max-w-5xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-ink/70 transition-colors hover:text-rose">
            <ArrowLeft className="h-4 w-4" />
            Zpět
          </Link>
          <Link
            href="/"
            aria-label="Zavřít"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink/65 transition-colors hover:border-rose hover:text-rose"
          >
            <X className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] shadow-2xl"
          >
            <Image 
              src={cake.image} 
              alt={cake.name} 
              fill 
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center"
          >
            <span className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-rose">
              Inspirace
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink leading-[1.1]">
              {cake.name}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink/75">
              {cake.description}
            </p>

            <div className="mt-8 rounded-2xl bg-white/50 p-6 border border-ink/5">
              <h3 className="font-semibold text-ink mb-4">Složení tohoto dortu:</h3>
              <ul className="space-y-3">
                {cake.presetConfig.map((key) => {
                  const parts = key.split(":");
                  const cat = parts[0];
                  const opt = parts[1];
                  const catNames: Record<string, string> = {
                    sponge: "Korpus",
                    cream: "Krém",
                    addins: "Přísady",
                    finish: "Potah",
                    decoration: "Zdobení"
                  };
                  return (
                    <li key={key} className="flex gap-3 text-sm">
                      <span className="w-24 shrink-0 font-medium text-ink/60">{catNames[cat] || cat}</span>
                      <span className="font-semibold text-ink">{optionLabel(cat, opt, "cs") || opt}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-10">
              <RippleButton onClick={handleEditAndOrder} className="w-full sm:w-auto">
                Upravit a složit poptávku
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </RippleButton>
            </div>
            <p className="mt-4 text-xs text-ink/50 text-center sm:text-left">
              Dort si předvyplníte do konfigurátoru, kde si můžete vyměnit krém, korpus nebo přidat ovoce podle sebe.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
