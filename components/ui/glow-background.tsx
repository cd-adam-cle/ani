import { cn } from "@/lib/utils";

/**
 * Soft radial glow background (adapted from the shadcn "background-components"
 * pattern). Uses the brand palette instead of the original yellow/orange:
 *   honey  #EEC76D   coral #FF858D   teal #9AC2C5   rose #B24C63
 *
 * Render it once as a fixed, behind-everything layer (z-0). Page content sits
 * above it on its own stacking context.
 */
export function GlowBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 bg-cream",
        className,
      )}
    />
  );
}

export default GlowBackground;
