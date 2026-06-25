"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { testimonials } from "@/lib/testimonials";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

/**
 * Testimonials, each client story told as before → after. On the left, a small
 * stack of cake cards rotates forward; on the right, the brief the client first
 * sent ("Co si přál") sits directly above what they said afterwards ("Ohlas").
 * That pairing is the whole pitch of the site: tell Anička roughly what you want,
 * get exactly the cake. The quote reveals word by word, motivated: it reads like
 * it is being spoken. Autoplay pauses on hover and on any manual move.
 */
export default function Testimonials() {
  const { lang } = useLang();
  const reduce = useReducedMotion();
  const n = testimonials.length;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [width, setWidth] = useState(420);
  const stageRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => setActive((p) => (p + 1) % n), [n]);
  const prev = useCallback(() => setActive((p) => (p - 1 + n) % n), [n]);

  // measure stage width for the stack offset
  useEffect(() => {
    const measure = () => {
      if (stageRef.current) setWidth(stageRef.current.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // autoplay
  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [paused, reduce, next, active]);

  // keyboard (ignore while typing)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && /INPUT|TEXTAREA|SELECT/.test(t.tagName)) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const gap = Math.min(Math.max(width * 0.16, 40), 84);

  const cardStyle = (i: number): React.CSSProperties => {
    const offset = (i - active + n) % n;
    const isActive = offset === 0;
    const isRight = offset === 1;
    const isLeft = offset === n - 1;
    const t = reduce ? "none" : "all 0.7s cubic-bezier(0.4, 1.4, 0.4, 1)";
    if (isActive)
      return { zIndex: 3, opacity: 1, transform: "translateX(0) scale(1) rotateY(0deg)", transition: t };
    if (isLeft)
      return { zIndex: 2, opacity: 1, transform: `translateX(-${gap}px) translateY(-${gap * 0.5}px) scale(0.86) rotateY(14deg)`, transition: t };
    if (isRight)
      return { zIndex: 2, opacity: 1, transform: `translateX(${gap}px) translateY(-${gap * 0.5}px) scale(0.86) rotateY(-14deg)`, transition: t };
    return { zIndex: 1, opacity: 0, transform: "scale(0.8)", transition: t, pointerEvents: "none" };
  };

  const tItem = testimonials[active];
  const review = lang === "cs" ? tItem.reviewCs : tItem.reviewEn;

  return (
    <section id="reference" className="bg-cream py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="reveal mb-14 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-rose">
            {lang === "cs" ? "Reference" : "Client stories"}
          </span>
          <AnimatedHeading
            wrapperClassName="mt-3"
            className="text-4xl sm:text-5xl"
            text={lang === "cs" ? "Řekli, co chtějí. Dostali přesně to." : "They told us. They got exactly that."}
          />
        </div>

        <div
          className="reveal grid items-center gap-10 md:grid-cols-2 md:gap-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Left: stacked cake cards */}
          <div ref={stageRef} className="relative h-[20rem] sm:h-[24rem]" style={{ perspective: 1200 }}>
            {testimonials.map((item, i) => (
              <div
                key={item.id}
                style={cardStyle(i)}
                className="absolute inset-0 overflow-hidden rounded-[1.8rem] bg-[radial-gradient(circle_at_50%_42%,#f7efe1,#efe3cf)] ring-1 ring-black/5 shadow-[0_30px_60px_-30px_rgba(42,35,38,0.45)]"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 90vw, 460px"
                  className="object-contain p-6"
                />
              </div>
            ))}
          </div>

          {/* Right: request + review */}
          <div className="flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={tItem.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose">
                  {lang === "cs" ? tItem.occasionCs : tItem.occasionEn}
                </p>

                {/* the original brief */}
                <div className="mt-4 rounded-2xl border border-ink/10 bg-cream-deep/40 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-ink/65">
                    {lang === "cs" ? "Co si přál(a)" : "What they asked for"}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
                    {lang === "cs" ? tItem.requestCs : tItem.requestEn}
                  </p>
                </div>

                {/* the review */}
                <div className="mt-5">
                  <p className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-ink/65">
                    <Quote className="h-3.5 w-3.5 text-rose" strokeWidth={2} />
                    {lang === "cs" ? "Ohlas" : "Their words"}
                  </p>
                  <p className="font-display text-xl leading-snug text-ink sm:text-2xl">
                    {review.split(" ").map((word, i) => (
                      <motion.span
                        key={`${tItem.id}-${i}`}
                        initial={reduce ? false : { filter: "blur(8px)", opacity: 0, y: 4 }}
                        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                        transition={{ duration: 0.24, ease: "easeOut", delay: reduce ? 0 : 0.02 * i }}
                        className="inline-block"
                      >
                        {word}&nbsp;
                      </motion.span>
                    ))}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-ink/80">{tItem.name}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* controls */}
            <div className="mt-7 flex items-center gap-3">
              <button
                onClick={prev}
                aria-label={lang === "cs" ? "Předchozí" : "Previous"}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-rose hover:bg-rose hover:text-cream"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                aria-label={lang === "cs" ? "Další" : "Next"}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-rose hover:bg-rose hover:text-cream"
              >
                <ArrowRight className="h-5 w-5" />
              </button>

              {/* progress dots */}
              <div className="ml-3 flex items-center gap-2">
                {testimonials.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => setActive(i)}
                    aria-label={`${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === active ? "w-6 bg-rose" : "w-2 bg-ink/20 hover:bg-ink/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
