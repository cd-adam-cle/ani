"use client";

import { motion, useReducedMotion, cubicBezier } from "framer-motion";

/**
 * CakeLoader, a cake silhouette that draws itself stroke by stroke, the way
 * the brand line draws across the page. Inspired by the "bottle draw" loader,
 * but the figure is the shadow of a layered cake: plate, body, a scalloped
 * frosting lip and a cherry. The draw is motivated: it says "something is being
 * made for you" while the page loads. Under reduced-motion it renders as a
 * static outline (no looping draw).
 */
export default function CakeLoader({ size = 96 }: { size?: number }) {
  const reduce = useReducedMotion();

  // Each stroke of the cake, drawn in order (plate -> body -> frosting -> cherry).
  const strokes = [
    // plate
    "M34 161 Q100 175 166 161",
    // cake body: sides + rounded bottom
    "M49 97 L49 150 Q49 159 58 159 L142 159 Q151 159 151 150 L151 97",
    // soft layer band
    "M52 126 Q100 134 148 126",
    // scalloped frosting lip across the top
    "M45 97 q7 -13 14 0 q7 -13 14 0 q7 -13 14 0 q7 -13 14 0 q7 -13 14 0 q7 -13 14 0 q7 -13 14 0 q7 -13 14 0",
    // cherry + stem
    "M100 43 C105 32 113 31 118 38",
    "M100 50 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0",
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      className="text-rose"
      aria-hidden
    >
      {strokes.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="currentColor"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          animate={reduce ? { pathLength: 1 } : { pathLength: 1 }}
          transition={
            reduce
              ? { duration: 0 }
              : {
                  duration: 1.25,
                  ease: cubicBezier(0.65, 0, 0.35, 1),
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 0.35,
                  delay: i * 0.12,
                }
          }
        />
      ))}
    </svg>
  );
}
