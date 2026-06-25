"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";

/**
 * RippleButton, the brand "fill" button. On hover, a darker wash blooms from
 * the exact point the cursor entered and floods the button; on leave it recedes
 * toward where the cursor left. It is directional and motivated: the fill shows
 * the button accepting your attention. Click feedback is handled by the global
 * ClickSplash, so we don't double up a click ripple here.
 *
 * Polymorphic: pass `href` (internal "/..." → next/link, "#..."/external → <a>)
 * or omit it for a <button>.
 */
type Variant = "primary" | "secondary";

type Common = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  "aria-label"?: string;
};

type AsButton = Common & {
  href?: undefined;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit";
};
type AsLink = Common & { href: string; onClick?: () => void };

type Props = AsButton | AsLink;

const VARIANT: Record<Variant, { base: string; fill: string }> = {
  primary: {
    base: "bg-rose text-cream shadow-[0_16px_36px_-14px_rgba(178,76,99,0.85)]",
    fill: "bg-rose-deep",
  },
  secondary: {
    base: "border border-ink/15 bg-cream/40 text-ink",
    fill: "bg-rose/10",
  },
};

export default function RippleButton(props: Props) {
  const { children, variant = "primary", className = "" } = props;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [fill, setFill] = useState({ x: 0, y: 0, size: 0, on: false });

  const place = (e: MouseEvent, on: boolean) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.4;
    setFill({ x: e.clientX - rect.left, y: e.clientY - rect.top, size, on });
  };

  const v = VARIANT[variant];
  const cls =
    "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 " +
    v.base +
    " " +
    className;

  const inner = (
    <>
      {!reduce && (
        <span
          aria-hidden
          className={"pointer-events-none absolute rounded-full " + v.fill}
          style={{
            left: fill.x,
            top: fill.y,
            width: fill.size,
            height: fill.size,
            transform: `translate(-50%, -50%) scale(${fill.on ? 1 : 0})`,
            transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {children}
      </span>
    </>
  );

  // Link / anchor
  if ("href" in props && props.href !== undefined) {
    const onEnter = (e: MouseEvent) => place(e, true);
    const onLeave = (e: MouseEvent) => place(e, false);
    const isInternal = props.href.startsWith("/");
    if (isInternal) {
      return (
        <Link
          href={props.href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          onClick={props.onClick}
          aria-label={props["aria-label"]}
          className={cls}
        >
          {inner}
        </Link>
      );
    }
    return (
      <a
        href={props.href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={props.onClick}
        aria-label={props["aria-label"]}
        className={cls}
      >
        {inner}
      </a>
    );
  }

  // Button
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={props.type ?? "button"}
      onClick={props.onClick}
      onMouseEnter={(e) => place(e, true)}
      onMouseLeave={(e) => place(e, false)}
      aria-label={props["aria-label"]}
      className={cls}
    >
      {inner}
    </button>
  );
}
