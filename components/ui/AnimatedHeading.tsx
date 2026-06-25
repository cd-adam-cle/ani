"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * AnimatedHeading: a section title with a hand-drawn rose underline that draws
 * itself the first time it scrolls into view, then gently re-curves on hover.
 * The one consistent device under the centered section headings, so the page
 * reads as drawn by a single hand (same rose as the brand line and click-splash).
 * Motivated: the stroke arriving says "this section starts here".
 *
 * Layout: the outer block centers a shrink-to-fit inner box (so the underline is
 * exactly heading-width). The inner box reserves bottom padding so the absolutely
 * positioned underline never collides with the subline beneath it.
 */
const PATH = "M3,9 Q75,2 150,8 Q225,14 297,7";
const HOVER = "M3,8 Q75,14 150,9 Q225,3 297,9";

const underline: Variants = {
  hidden: { pathLength: 0, opacity: 0, d: PATH },
  visible: {
    pathLength: 1,
    opacity: 1,
    d: PATH,
    transition: {
      pathLength: { duration: 1.1, ease: "easeInOut" },
      opacity: { duration: 0.25 },
    },
  },
  hover: {
    pathLength: 1,
    opacity: 1,
    d: HOVER,
    transition: { duration: 0.55, ease: "easeInOut" },
  },
};

export default function AnimatedHeading({
  text,
  className,
  wrapperClassName,
}: {
  text: string;
  className?: string;
  wrapperClassName?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.6 }}
      className={cn("flex justify-center", wrapperClassName)}
    >
      <div className="relative inline-block pb-3">
        <h2 className={cn("font-display text-ink", className)}>{text}</h2>
        <svg
          viewBox="0 0 300 16"
          preserveAspectRatio="none"
          aria-hidden
          className="absolute bottom-0 left-0 h-2.5 w-full overflow-visible text-rose"
        >
          <motion.path
            d={PATH}
            variants={underline}
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </motion.div>
  );
}
