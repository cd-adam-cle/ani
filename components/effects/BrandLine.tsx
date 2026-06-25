"use client";

import { motion, useScroll, useReducedMotion } from "framer-motion";

const PATH =
  "M45 0 C12 120 78 230 45 350 C12 470 78 560 50 690 C24 810 70 900 45 1000";

/**
 * BrandLine: the rose thread that draws itself as you move down the page. The
 * same hand and the same rose as the click-splash. pathLength is bound straight
 * to scrollYProgress, so it tracks scroll exactly (never lags or stops short).
 * Fixed to the right gutter, faint, decorative (pointer-events-none) and only on
 * wide screens where there is gutter room. Under reduced motion it rests drawn.
 */
export default function BrandLine() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 right-0 z-[15] hidden w-[54px] xl:block"
    >
      <svg
        viewBox="0 0 90 1000"
        fill="none"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <motion.path
          d={PATH}
          stroke="var(--color-rose)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.18"
          style={{ pathLength: reduce ? 1 : scrollYProgress }}
        />
      </svg>
    </div>
  );
}
