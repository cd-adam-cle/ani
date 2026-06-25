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
  const [drawDone, setDrawDone] = useState(false); // cake finished drawing
  const [pageReady, setPageReady] = useState(false); // window load + min floor

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_NO_CURTAIN) {
      setVisible(false);
      return;
    }

    // Set pageReady when page load finishes
    const allow = () => {
      setPageReady(true);
    };

    if (document.readyState === "complete") {
      allow();
    } else {
      window.addEventListener("load", allow, { once: true });
    }

    // Start a timer for the cake drawing animation duration.
    // CakeLoader total animation duration: 5 * 0.08s (delay) + 0.75s (duration) = 1.15s.
    const animDuration = reduce ? 0 : 1150;
    const animTimer = window.setTimeout(() => {
      setDrawDone(true);
    }, animDuration);

    // Hard safety: never trap the user behind the curtain
    const hardStop = window.setTimeout(() => {
      setDrawDone(true);
      setPageReady(true);
    }, 6000);

    return () => {
      window.removeEventListener("load", allow);
      window.clearTimeout(animTimer);
      window.clearTimeout(hardStop);
    };
  }, [reduce]);

  // Lift the curtain only once the cake has fully drawn AND the page is ready,
  // plus a small pause so the finished cake actually sits on screen for a moment.
  useEffect(() => {
    if (drawDone && pageReady) {
      const holdTime = reduce ? 100 : 700;
      const timer = window.setTimeout(() => {
        setVisible(false);
      }, holdTime);
      return () => window.clearTimeout(timer);
    }
  }, [drawDone, pageReady, reduce]);

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
          <CakeLoader size={104} onComplete={() => setDrawDone(true)} />
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
