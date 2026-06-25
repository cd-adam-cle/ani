import { cn } from "@/lib/utils";

/**
 * Soft radial glow background using the full brand palette, not just rose.
 *   honey #EEC76D   coral #FF858D   teal #9AC2C5   rose #B24C63
 *
 * Rendered once as a fixed, behind-everything layer. The previous version was a
 * flat cream rectangle, which is why teal/honey/coral never showed up anywhere
 * on the page. These low-opacity glows tint the whole site warm and colourful
 * while keeping text fully legible above them. Decorative only.
 */
export function GlowBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none fixed inset-0 -z-10 bg-cream", className)}
      style={{
        backgroundImage: [
          "radial-gradient(45rem 32rem at 8% -4%, color-mix(in srgb, var(--color-teal) 38%, transparent), transparent 70%)",
          "radial-gradient(42rem 30rem at 96% 6%, color-mix(in srgb, var(--color-honey) 40%, transparent), transparent 70%)",
          "radial-gradient(40rem 34rem at 88% 92%, color-mix(in srgb, var(--color-coral) 30%, transparent), transparent 72%)",
          "radial-gradient(46rem 36rem at 4% 88%, color-mix(in srgb, var(--color-honey) 26%, transparent), transparent 72%)",
        ].join(", "),
      }}
    />
  );
}

export default GlowBackground;
