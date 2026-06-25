"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, cubicBezier } from "framer-motion";

/**
 * Click-splash, a soft rose ripple that blooms from the exact point of every
 * click/tap. Same rose as the brand line (#b24c63), so a tap reads as "this
 * is the same hand that draws everything else." Purely decorative feedback:
 * it confirms the click landed. Isolated root leaf, pointer-events-none, so it
 * never re-renders page content and never blocks interaction.
 */

type Splash = { id: number; x: number; y: number };

export default function ClickSplash() {
  const reduce = useReducedMotion();
  const [splashes, setSplashes] = useState<Splash[]>([]);

  useEffect(() => {
    if (reduce) return;
    let id = 0;
    const onDown = (e: PointerEvent) => {
      // Ignore non-primary buttons (right/middle click).
      if (e.button !== 0) return;
      const next = { id: id++, x: e.clientX, y: e.clientY };
      setSplashes((prev) => [...prev.slice(-6), next]);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [reduce]);

  if (reduce) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
      <AnimatePresence>
        {splashes.map((s) => (
          <motion.span
            key={s.id}
            initial={{ scale: 0, opacity: 0.55 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.62, ease: cubicBezier(0.22, 1, 0.36, 1) }}
            onAnimationComplete={() =>
              setSplashes((prev) => prev.filter((p) => p.id !== s.id))
            }
            style={{ left: s.x, top: s.y }}
            className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
          >
            {/* outer bloom */}
            <span className="absolute inset-0 rounded-full bg-rose/25" />
            {/* crisp ring that draws the edge of the splash */}
            <span className="absolute inset-0 rounded-full border border-rose/60" />
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
