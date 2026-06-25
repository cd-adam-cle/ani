"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Gooey "metaball" blobs in the three brand accents (teal / honey / coral).
 * The SVG filter blurs the shapes then hard-thresholds the alpha, so blobs that
 * drift near each other merge organically instead of overlapping as flat discs.
 * Used as the hero backdrop now that the cake photos are gone, this is what
 * carries the colour the rest of the palette was missing. Decorative only.
 */
const GooeyFilter = ({
  id = "goo-filter",
  strength = 12,
}: {
  id?: string;
  strength?: number;
}) => (
  <svg className="absolute hidden" aria-hidden="true">
    <defs>
      <filter id={id}>
        <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
        <feColorMatrix
          in="blur"
          type="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
          result="goo"
        />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>
);

type Blob = {
  color: string;
  size: number;
  left: string;
  top: string;
  dx: number;
  dy: number;
  dur: number;
};

// Two overlapping clusters (top-left teal, right warm) pushed to the edges so
// the centred headline stays clear. Members inside a cluster overlap, so the
// gooey filter fuses them into one organic shape instead of separate circles.
const BLOBS: Blob[] = [
  // top-left teal cluster
  { color: "var(--color-teal)", size: 360, left: "-6%", top: "2%", dx: 46, dy: 30, dur: 20 },
  { color: "var(--color-teal)", size: 240, left: "9%", top: "30%", dx: 36, dy: -34, dur: 24 },
  // right warm cluster (honey + coral fuse into a sunset shape)
  { color: "var(--color-honey)", size: 380, left: "72%", top: "-8%", dx: -44, dy: 40, dur: 22 },
  { color: "var(--color-coral)", size: 300, left: "78%", top: "34%", dx: -52, dy: -30, dur: 18 },
  { color: "var(--color-honey)", size: 220, left: "60%", top: "52%", dx: 50, dy: -26, dur: 26 },
];

export default function GooeyBlobs({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <GooeyFilter id="hero-goo" strength={22} />
      <div className="absolute inset-0 opacity-[0.42]" style={{ filter: "url(#hero-goo)" }}>
        {BLOBS.map((b, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              width: b.size,
              height: b.size,
              left: b.left,
              top: b.top,
              background: b.color,
            }}
            animate={reduce ? undefined : { x: [0, b.dx, 0], y: [0, b.dy, 0] }}
            transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}
