"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/lib/LangContext";

const HERO_CAKES = [
  { id: "forest", src: "/photos/cakes/02-chocodrip-exterior.webp" },
  { id: "berry", src: "/photos/cakes/03-berry-exterior.webp" },
  { id: "main", src: "/photos/cakes/01-forest-exterior.webp" },
  { id: "redvelvet", src: "/photos/cakes/04-redvelvet-exterior.webp" },
  { id: "cheesecake", src: "/photos/cakes/05-cheesecake-exterior.webp" },
];

export default function Hero() {
  const { lang, t } = useLang();

  return (
    <section id="top" className="relative flex flex-col items-center justify-center bg-cream pt-24 sm:pt-32 pb-4 overflow-hidden">
      
      {/* Grid */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 sm:px-8 md:grid md:grid-cols-4 lg:gap-6">
        
        {/* Left Column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col gap-4 lg:gap-6 md:col-span-1"
        >
          <Link href={`/dort/${HERO_CAKES[0].id}`} className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl sm:aspect-square md:aspect-[4/5] block">
            <Image src={HERO_CAKES[0].src} alt="Dort" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10" />
          </Link>
          <Link href={`/dort/${HERO_CAKES[1].id}`} className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl sm:aspect-square md:aspect-[4/5] block">
            <Image src={HERO_CAKES[1].src} alt="Dort" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10" />
          </Link>
        </motion.div>

        {/* Center Column - Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center justify-center text-center md:col-span-2 md:h-full py-12 md:py-0"
        >
          <motion.h1
            className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.85] tracking-tight text-rose uppercase"
          >
            {t.hero.title}
          </motion.h1>
        </motion.div>

        {/* Right Column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden md:flex flex-col gap-4 lg:gap-6 md:col-span-1"
        >
          <Link href={`/dort/${HERO_CAKES[3].id}`} className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl sm:aspect-square md:aspect-[4/5] block">
            <Image src={HERO_CAKES[3].src} alt="Dort" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10" />
          </Link>
          <Link href={`/dort/${HERO_CAKES[4].id}`} className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl sm:aspect-square md:aspect-[4/5] block">
            <Image src={HERO_CAKES[4].src} alt="Dort" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
