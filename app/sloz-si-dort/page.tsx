"use client";

import { useMemo, useState, Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, cubicBezier } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChefHat,
  X,
  Mail,
  Phone,
  CalendarDays,
} from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { cakeCategories, SINGLE_CHOICE } from "@/lib/cakeOptions";
import { useWishlist, summarize } from "@/lib/WishlistContext";
import RippleButton from "@/components/ui/RippleButton";

const STEPS = [
  { cs: "Příležitost", en: "Occasion" },
  { cs: "Chuť", en: "Flavour" },
  { cs: "Vzhled", en: "Look" },
  { cs: "Kontakt", en: "Contact" },
];

export default function SlozSiDort() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <SlozSiDortForm />
    </Suspense>
  );
}

function SlozSiDortForm() {
  const { lang } = useLang();
  const reduce = useReducedMotion();
  const searchParams = useSearchParams();
  const { selected, toggle, choose, has } = useWishlist();

  const initialStep = parseInt(searchParams.get("step") || "0", 10);
  const [step, setStep] = useState(initialStep);
  const [dir, setDir] = useState(1);
  const [date, setDate] = useState("");
  const [vision, setVision] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const grouped = useMemo(() => summarize(selected, lang), [selected, lang]);

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  const renderCategory = (catId: string) => {
    const cat = cakeCategories.find((c) => c.id === catId);
    if (!cat) return null;
    const single = SINGLE_CHOICE.has(cat.id);
    return (
      <div key={cat.id} className="mb-7">
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg text-ink">
            {lang === "cs" ? cat.cs : cat.en}
          </h3>
          <span className="text-[11px] text-ink/65">
            {single
              ? lang === "cs"
                ? "vyber jednu"
                : "pick one"
              : lang === "cs"
                ? "klidně víc"
                : "as many as you like"}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {cat.options.map((opt) => {
            const active = has(cat.id, opt.id);
            return (
              <motion.button
                key={opt.id}
                type="button"
                onClick={() =>
                  single ? choose(cat.id, opt.id) : toggle(cat.id, opt.id)
                }
                whileTap={reduce ? undefined : { scale: 0.94 }}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  active
                    ? "border-rose bg-rose text-cream"
                    : "border-ink/15 bg-white/70 text-ink/75 hover:border-rose/40 hover:text-rose"
                }`}
              >
                <span
                  className={`grid h-4 w-4 place-items-center rounded-full border transition-colors ${
                    active ? "border-cream/70 bg-cream/20" : "border-ink/25"
                  }`}
                >
                  {active && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>
                {lang === "cs" ? opt.cs : opt.en}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  };

  const stepBody = (() => {
    switch (step) {
      case 0:
        return (
          <>
            <StepHead
              kicker={lang === "cs" ? "Krok 1 ze 4" : "Step 1 of 4"}
              title={lang === "cs" ? "Pro jakou chvíli?" : "What's the occasion?"}
              sub={
                lang === "cs"
                  ? "Začneme tím nejdůležitějším, kdy a pro koho dort bude."
                  : "Start with the essentials, when it's for, and who."
              }
            />
            {renderCategory("occasion")}
            {renderCategory("size")}
            <div className="mb-2">
              <label
                htmlFor="date"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink"
              >
                <CalendarDays className="h-4 w-4 text-rose" strokeWidth={1.8} />
                {lang === "cs" ? "Kdy dort potřebuješ?" : "When do you need it?"}
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full max-w-xs rounded-xl border border-ink/15 bg-white/70 px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-rose"
              />
            </div>
          </>
        );
      case 1:
        return (
          <>
            <StepHead
              kicker={lang === "cs" ? "Krok 2 ze 4" : "Step 2 of 4"}
              title={lang === "cs" ? "Jaká chuť?" : "What should it taste like?"}
              sub={
                lang === "cs"
                  ? "Označ chutě, které tě lákají. Klidně i protichůdné, Anička z nich vybere, co ladí."
                  : "Mark whatever appeals. Even clashing picks, Anička finds what works."
              }
            />
            {renderCategory("sponge")}
            {renderCategory("cream")}
            {renderCategory("addins")}
          </>
        );
      case 2:
        return (
          <>
            <StepHead
              kicker={lang === "cs" ? "Krok 3 ze 4" : "Step 3 of 4"}
              title={lang === "cs" ? "Jak má vypadat?" : "How should it look?"}
              sub={
                lang === "cs"
                  ? "Vzhled a poslední detaily. A jestli máš konkrétní představu, napiš ji."
                  : "The finish and final touches. Add anything specific you picture."
              }
            />
            {renderCategory("finish")}
            {renderCategory("decoration")}
            <div className="mt-2">
              <label
                htmlFor="vision"
                className="mb-2 block text-sm font-semibold text-ink"
              >
                {lang === "cs"
                  ? "Tvoje představa (volitelné)"
                  : "Your idea (optional)"}
              </label>
              <textarea
                id="vision"
                rows={4}
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                placeholder={
                  lang === "cs"
                    ? "Barvy, motiv, vzor, oblíbený dort z minula, alergie…"
                    : "Colours, theme, a pattern, allergies…"
                }
                className="w-full resize-none rounded-xl border border-ink/15 bg-white/70 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/65 focus:border-rose"
              />
            </div>
          </>
        );
      default:
        return (
          <>
            <StepHead
              kicker={lang === "cs" ? "Krok 4 ze 4" : "Step 4 of 4"}
              title={lang === "cs" ? "Kam se ti ozveme?" : "Where do we reach you?"}
              sub={
                lang === "cs"
                  ? "Anička se ozve, projde s tebou návrh a potvrdí termín i cenu."
                  : "Anička will reach out, walk through the design and confirm date and price."
              }
            />
            <div className="flex flex-col gap-4">
              <Field
                id="name"
                label={lang === "cs" ? "Jméno a příjmení" : "Full name"}
                value={name}
                onChange={setName}
                required
                placeholder={lang === "cs" ? "Tvoje jméno" : "Your name"}
              />
              <Field
                id="email"
                type="email"
                label="E-mail"
                value={email}
                onChange={setEmail}
                required
                placeholder="email@example.com"
              />
              <Field
                id="phone"
                type="tel"
                label={lang === "cs" ? "Telefon (volitelné)" : "Phone (optional)"}
                value={phone}
                onChange={setPhone}
                placeholder="+420 …"
              />
            </div>
          </>
        );
    }
  })();

  const buildMessage = () => {
    const lines: string[] = [];
    grouped.forEach((g) => lines.push(`${g.label}: ${g.picks.join(", ")}`));
    if (date) lines.push(`${lang === "cs" ? "Termín" : "Date"}: ${date}`);
    if (vision) lines.push(`${lang === "cs" ? "Představa" : "Idea"}: ${vision}`);
    return lines.join("\n");
  };

  const mailto = () => {
    const subject =
      lang === "cs" ? `Poptávka dortu, ${name}` : `Cake inquiry, ${name}`;
    const body =
      buildMessage() +
      `\n\n${name}\n${email}${phone ? `\n${phone}` : ""}`;
    return `mailto:objednavky@anickadorty.cz?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Guard implicit submission (e.g. Enter in the date field on an earlier
    // step): only the final step actually sends; anything earlier just advances.
    if (step < STEPS.length - 1) {
      go(step + 1);
      return;
    }
    setSubmitted(true);
    // Real handoff: open the visitor's mail client prefilled. If none exists,
    // the confirmation screen still shows the address + phone.
    window.location.href = mailto();
  };

  /* ---------------------------------------------------------------- */

  if (submitted) {
    return (
      <Shell lang={lang}>
        <div className="mx-auto max-w-xl py-16 text-center">
          <motion.div
            initial={reduce ? false : { scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: cubicBezier(0.22, 1, 0.36, 1) }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose text-cream"
          >
            <ChefHat className="h-8 w-8" strokeWidth={1.8} />
          </motion.div>
          <h1 className="mt-6 font-display text-3xl text-ink">
            {lang === "cs" ? "Tvůj dort je na cestě k Aničce." : "On its way to Anička."}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-ink/65">
            {lang === "cs"
              ? "Otevřeli jsme ti e-mail s celou tvojí představou. Stačí ho odeslat, Anička se ti pak ozve, probere detaily a potvrdí termín i cenu."
              : "We've opened an email with your whole idea. Just send it, Anička will get back to you, talk through the details and confirm date and price."}
          </p>

          {grouped.length > 0 && (
            <div className="mx-auto mt-8 max-w-md rounded-2xl border border-ink/10 bg-white/60 p-5 text-left">
              <SummaryList grouped={grouped} date={date} lang={lang} />
            </div>
          )}

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={mailto()}
              className="inline-flex items-center gap-2 rounded-full bg-rose px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-rose-deep"
            >
              <Mail className="h-4 w-4" strokeWidth={1.8} />
              {lang === "cs" ? "Otevřít e-mail znovu" : "Open the email again"}
            </a>
            <a
              href="tel:+420777123456"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-rose hover:text-rose"
            >
              <Phone className="h-4 w-4" strokeWidth={1.8} />
              +420 777 123 456
            </a>
          </div>
          <Link
            href="/"
            className="mt-8 inline-block text-sm text-ink/65 underline-offset-2 hover:text-rose hover:underline"
          >
            {lang === "cs" ? "Zpět na úvod" : "Back home"}
          </Link>
        </div>
      </Shell>
    );
  }

  const last = step === STEPS.length - 1;

  return (
    <Shell lang={lang}>
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={i} className="flex flex-1 items-center gap-3">
              <button
                type="button"
                onClick={() => i < step && go(i)}
                disabled={i > step}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  i < step
                    ? "bg-rose text-cream"
                    : i === step
                      ? "bg-rose text-cream ring-4 ring-rose/15"
                      : "bg-cream-deep/60 text-ink/65"
                } ${i < step ? "cursor-pointer" : ""}`}
              >
                {i < step ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
              </button>
              <span
                className={`hidden text-sm font-medium sm:inline ${
                  i <= step ? "text-ink" : "text-ink/65"
                }`}
              >
                {lang === "cs" ? s.cs : s.en}
              </span>
              {i < STEPS.length - 1 && (
                <span className="mx-1 hidden h-px flex-1 bg-ink/10 sm:block" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-ink/10">
          <motion.div
            className="h-full rounded-full bg-rose"
            initial={false}
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        {/* Step body */}
        <div className="min-h-[24rem] overflow-x-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              initial={reduce ? false : { opacity: 0, x: dir > 0 ? 36 : -36 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir > 0 ? -36 : 36 }}
              transition={{ duration: 0.32, ease: cubicBezier(0.22, 1, 0.36, 1) }}
            >
              {stepBody}
            </motion.div>
          </AnimatePresence>

          {/* Step nav */}
          <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-6">
            <button
              type="button"
              onClick={() => go(step - 1)}
              disabled={step === 0}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                step === 0
                  ? "cursor-not-allowed text-ink/30"
                  : "text-ink/70 hover:text-rose"
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              {lang === "cs" ? "Zpět" : "Back"}
            </button>

            {last ? (
              <RippleButton type="submit">
                {lang === "cs" ? "Odeslat Aničce" : "Send to Anička"}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </RippleButton>
            ) : (
              <RippleButton onClick={() => go(step + 1)}>
                {lang === "cs" ? "Pokračovat" : "Continue"}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </RippleButton>
            )}
          </div>
        </div>

        {/* Live summary */}
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-2xl border border-ink/10 bg-cream-deep/30 p-5">
            <h2 className="font-display text-lg text-ink">
              {lang === "cs" ? "Tvůj dort" : "Your cake"}
            </h2>
            {grouped.length === 0 && !date ? (
              <p className="mt-2 text-sm text-ink/65">
                {lang === "cs"
                  ? "Tady se ti bude skládat dort, jak procházíš kroky."
                  : "Your cake takes shape here as you go."}
              </p>
            ) : (
              <div className="mt-3">
                <SummaryList grouped={grouped} date={date} lang={lang} />
              </div>
            )}
          </div>
        </aside>
      </form>
    </Shell>
  );
}

/* ---- small building blocks --------------------------------------------- */

function Shell({
  lang,
  children,
}: {
  lang: "cs" | "en";
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] bg-cream">
      <header className="border-b border-ink/10">
        <div className="mx-auto flex h-[72px] max-w-5xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-baseline gap-2.5">
            <span className="font-display text-[1.5rem] leading-none text-rose">
              Anička
            </span>
            <span className="hidden text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ink/65 sm:inline">
              dorty
            </span>
          </Link>
          <Link
            href="/"
            aria-label={lang === "cs" ? "Zavřít" : "Close"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink/65 transition-colors hover:border-rose hover:text-rose"
          >
            <X className="h-4 w-4" />
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">{children}</main>
    </div>
  );
}

function StepHead({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="mb-7">
      <span className="text-xs font-semibold uppercase tracking-[0.26em] text-rose">
        {kicker}
      </span>
      <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">{title}</h1>
      <p className="mt-2 max-w-lg text-ink/65">{sub}</p>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold text-ink"
      >
        {label}
        {required && <span className="text-rose"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-ink/15 bg-white/70 px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/65 focus:border-rose"
      />
    </div>
  );
}

function SummaryList({
  grouped,
  date,
  lang,
}: {
  grouped: { id: string; label: string; picks: string[] }[];
  date: string;
  lang: "cs" | "en";
}) {
  return (
    <dl className="flex flex-col gap-3 text-sm">
      {grouped.map((g) => (
        <div key={g.id}>
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink/65">
            {g.label}
          </dt>
          <dd className="mt-0.5 text-ink/80">{g.picks.join(", ")}</dd>
        </div>
      ))}
      {date && (
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink/65">
            {lang === "cs" ? "Termín" : "Date"}
          </dt>
          <dd className="mt-0.5 text-ink/80">{date}</dd>
        </div>
      )}
    </dl>
  );
}
