"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/LangContext";

/**
 * CakeCard, a product tile that quietly turns over. The whole cake cross-fades
 * to its cross-section on hover / focus / tap, so you see what's inside without
 * a label shouting "hover me". No zoom, no overlaid pills: the name and a one-
 * line flavour note live as a caption *below* the photo, where captions belong.
 */
export default function CakeCard({
  name,
  note,
  whole,
  inside,
  href,
}: {
  name: string;
  note: string;
  whole: string;
  inside: string;
  href?: string;
}) {
  const { lang } = useLang();

  const Wrapper = href ? Link : "div";

  return (
    <Wrapper href={href as string} className="group block outline-none">
      <figure>
      <div
        tabIndex={0}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.6rem] bg-[radial-gradient(circle_at_50%_42%,#f7efe1,#efe3cf)] ring-1 ring-black/5"
      >
        {/* whole cake */}
        <Image
          src={whole}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-5 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-0 group-focus:opacity-0 group-active:opacity-0"
        />
        {/* cross-section, revealed underneath */}
        <Image
          src={inside}
          alt={`${name}, ${lang === "cs" ? "řez" : "inside"}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-5 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100"
        />
      </div>
      <figcaption className="mt-3 px-1">
        <p className="font-display text-lg leading-tight text-ink">{name}</p>
        <p className="mt-1 text-sm leading-snug text-ink/65">{note}</p>
      </figcaption>
      </figure>
    </Wrapper>
  );
}
