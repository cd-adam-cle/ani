"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { cakeCategories, optionLabel } from "./cakeOptions";

/**
 * The cake "wishlist", every option the visitor marked as something they like.
 * Lives at the layout root so the landing picker and the /sloz-si-dort builder
 * share one selection, and persists to localStorage so a refresh or a return
 * trip keeps the picks. Keys are `${categoryId}:${optionId}`.
 */

type WishlistValue = {
  selected: Set<string>;
  toggle: (catId: string, optId: string) => void;
  /** single-choice categories (size): replaces any prior pick in that category */
  choose: (catId: string, optId: string) => void;
  has: (catId: string, optId: string) => boolean;
  countFor: (catId: string) => number;
  clear: () => void;
  loadPreset: (keys: string[]) => void;
  count: number;
  ready: boolean;
};

const Ctx = createContext<WishlistValue | null>(null);
const KEY = "anicka-wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setSelected(new Set(JSON.parse(raw)));
    } catch {
      /* ignore malformed storage */
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: Set<string>) => {
    setSelected(next);
    try {
      window.localStorage.setItem(KEY, JSON.stringify([...next]));
    } catch {
      /* storage may be unavailable */
    }
  }, []);

  const toggle = useCallback(
    (catId: string, optId: string) => {
      const key = `${catId}:${optId}`;
      const next = new Set(selected);
      next.has(key) ? next.delete(key) : next.add(key);
      persist(next);
    },
    [selected, persist],
  );

  const choose = useCallback(
    (catId: string, optId: string) => {
      const next = new Set(
        [...selected].filter((k) => !k.startsWith(`${catId}:`)),
      );
      next.add(`${catId}:${optId}`);
      persist(next);
    },
    [selected, persist],
  );

  const has = useCallback(
    (catId: string, optId: string) => selected.has(`${catId}:${optId}`),
    [selected],
  );

  const countFor = useCallback(
    (catId: string) =>
      [...selected].filter((k) => k.startsWith(`${catId}:`)).length,
    [selected],
  );

  const clear = useCallback(() => persist(new Set()), [persist]);

  const loadPreset = useCallback((keys: string[]) => {
    persist(new Set(keys));
  }, [persist]);

  const value = useMemo(
    () => ({
      selected,
      toggle,
      choose,
      has,
      countFor,
      clear,
      loadPreset,
      count: selected.size,
      ready,
    }),
    [selected, toggle, choose, has, countFor, clear, loadPreset, ready],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWishlist() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}

/** Human-readable summary grouped by category, for the inquiry message + review. */
export function summarize(selected: Set<string>, lang: "cs" | "en") {
  return cakeCategories
    .map((cat) => {
      const picks = [...selected]
        .filter((k) => k.startsWith(`${cat.id}:`))
        .map((k) => optionLabel(cat.id, k.split(":")[1], lang))
        .filter(Boolean) as string[];
      return picks.length
        ? { id: cat.id, label: lang === "cs" ? cat.cs : cat.en, picks }
        : null;
    })
    .filter(Boolean) as { id: string; label: string; picks: string[] }[];
}
