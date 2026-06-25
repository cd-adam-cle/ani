"use client";

import { motion, useReducedMotion, cubicBezier } from "framer-motion";

/**
 * CakeLoader, a cake silhouette that draws itself stroke by stroke, the way
 * the brand line draws across the page. Replaced the tiny cherry with a thicker
 * birthday candle and flame. When complete, a burst of circular rays pop outward.
 */
export default function CakeLoader({
  size = 96,
  onComplete,
}: {
  size?: number;
  /** fired once the final stroke has fully drawn, so the curtain never lifts mid-draw */
  onComplete?: () => void;
}) {
  const reduce = useReducedMotion();

  // Each stroke of the cake, drawn in order (plate -> body -> frosting -> candle -> flame).
  const strokes = [
    // plate
    "M34 161 Q100 175 166 161",
    // cake body: sides + rounded bottom
    "M49 97 L49 150 Q49 159 58 159 L142 159 Q151 159 151 150 L151 97",
    // soft layer band
    "M52 126 Q100 134 148 126",
    // scalloped frosting lip across the top
    "M45 97 q7 -13 14 0 q7 -13 14 0 q7 -13 14 0 q7 -13 14 0 q7 -13 14 0 q7 -13 14 0 q7 -13 14 0 q7 -13 14 0",
    // candle stick + wick
    "M100 97 L100 63",
    // candle flame
    "M100 63 C95 55 96 46 100 40 C104 46 105 55 100 63",
  ];

  // 8 radiating rays just outside the cake and plate
  const numRays = 8;
  const rays = Array.from({ length: numRays }).map((_, i) => {
    const angle = ((i * 360) / numRays) * (Math.PI / 180);
    const r1 = 92;
    const r2 = 106;
    const cx = 100;
    const cy = 105;
    return {
      x1: cx + r1 * Math.cos(angle),
      y1: cy + r1 * Math.sin(angle),
      x2: cx + r2 * Math.cos(angle),
      y2: cy + r2 * Math.sin(angle),
    };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      className="text-rose"
      aria-hidden
    >
      {strokes.map((d, i) => {
        const isLast = i === strokes.length - 1;
        const isCandle = i === 4;
        return (
          <motion.path
            key={i}
            d={d}
            stroke="currentColor"
            strokeWidth={isCandle ? 11 : 4}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            // Draw once, in order, all the way to the end (no reverse loop).
            // Animation is now faster (duration 0.75s, delay 0.08s).
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.75, ease: cubicBezier(0.65, 0, 0.35, 1), delay: i * 0.08 }
            }
            onAnimationComplete={isLast ? onComplete : undefined}
          />
        );
      })}

      {/* Radiating pop rays that shoot outward once the cake is built */}
      {rays.map((r, i) => (
        <motion.line
          key={`ray-${i}`}
          x1={r.x1}
          y1={r.y1}
          x2={r.x2}
          y2={r.y2}
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            reduce
              ? { opacity: 0 }
              : { pathLength: [0, 1, 1], opacity: [0, 1, 1, 0] }
          }
          transition={
            reduce
              ? { duration: 0 }
              : {
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 0.95 + i * 0.03, // clock-like circular sequence pop
                }
          }
        />
      ))}
    </svg>
  );
}
