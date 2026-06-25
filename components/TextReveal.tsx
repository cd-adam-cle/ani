"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useLang } from "@/lib/LangContext";
import { Typewriter } from "@/components/ui/typewriter";

/**
 * TextReveal, a brand line that fills in word by word as it crosses the middle
 * of the screen.
 */
export default function TextReveal() {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });

  const wordsCs = ["Každý", "<TYPED>", "je", "originál.", "Žádné", "šablony,", "jen", "tvoje", "představa", "a", "Aniččino", "řemeslo."];
  const wordsEn = ["Every", "<TYPED>", "is", "one", "of", "a", "kind.", "No", "templates,", "just", "your", "idea", "and", "Anička's", "craft."];
  
  const words = lang === "cs" ? wordsCs : wordsEn;
  const accent = lang === "cs" ? "originál." : "kind.";

  return (
    <section ref={ref} className="relative py-28 sm:py-40">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <p className="flex flex-wrap font-display text-3xl leading-[1.25] sm:text-4xl md:text-5xl">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            const isTyped = word === "<TYPED>";
            
            const wordContent = isTyped ? (
              <Typewriter 
                text={lang === "cs" ? ["dort", "frgál", "zákusek"] : ["cake", "pastry", "dessert"]} 
                speed={70} 
                deleteSpeed={40} 
                waitTime={2500}
                className="text-rose font-bold"
                cursorClassName="text-rose"
              />
            ) : word;

            return (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[start, end]}
                accent={word === accent}
              >
                {wordContent}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="relative mr-2.5 mt-1">
      <span className="absolute opacity-[0.12] text-ink">{children}</span>
      <motion.span style={{ opacity }} className={accent ? "text-rose" : "text-ink"}>
        {children}
      </motion.span>
    </span>
  );
}
