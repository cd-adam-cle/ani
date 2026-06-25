"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, cubicBezier } from "framer-motion";
import CakeLoader from "./CakeLoader";

/**
 * PageLoader, a warm cream curtain shown on first paint while fonts/images
 * settle, with the cake drawing itself in the middle. It lifts once the window
 * has loaded (with a short minimum so the draw is never a jarring flash). The
 * curtain rises rather than just fading, so the reveal feels like a lid coming
 * off. Reduced-motion: minimal hold, instant fade, no rising.
 */
export default function PageLoader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const minHold = reduce ? 350 : 1300;
    const start = performance.now();

    const finish = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, minHold - elapsed);
      window.setTimeout(() => setVisible(false), wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      // Safety net: never trap the user behind the curtain.
      const hardStop = window.setTimeout(() => setVisible(false), 4500);
      return () => {
        window.removeEventListener("load", finish);
        window.clearTimeout(hardStop);
      };
    }
  }, [reduce]);

  // Lock scroll while the curtain is up.
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
          initial={{ y: 0 }}
          exit={
            reduce
              ? { opacity: 0, transition: { duration: 0.25 } }
              : { y: "-100%", transition: { duration: 0.8, ease: cubicBezier(0.76, 0, 0.24, 1) } }
          }
        >
          <CakeLoader size={104} />
          <motion.p
            className="mt-6 font-display text-sm tracking-[0.3em] text-rose/80 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduce ? 0 : 0.4, duration: 0.6 }}
          >
            Anička
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
