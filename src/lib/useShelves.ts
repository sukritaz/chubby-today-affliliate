import { useEffect, useState } from "react";
import type { Shelf } from "../data";
import { SITE } from "../data";
import type { ShelfWithItems } from "./supabase"; // type only: supabase-js isn't bundled here

const URL_ = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// give up on the database after this long and show data.ts instead
const TIMEOUT_MS = 4000;

// database rows → the Shelf/Item shape the components already render
const toShelves = (rows: ShelfWithItems[]): Shelf[] =>
  rows.map((s) => ({
    id: s.id,
    title: s.title,
    subtitle: s.subtitle ?? undefined,
    icon: s.icon ?? undefined,
    items: s.items.map((i) => ({
      id: i.id,
      title: i.title,
      url: i.url,
      source: i.source ?? undefined,
      image: i.image ?? undefined,
      badge: i.badge ?? undefined,
      affiliate: i.affiliate,
    })),
  }));

/**
 * One plain GET to Supabase's REST API (PostgREST), started as soon as this
 * module loads — in parallel with React's first render, not after it.
 * Resolves to data.ts on any failure, so the page always has something.
 */
const shelvesPromise: Promise<Shelf[]> = (async () => {
  if (!URL_ || !KEY) return SITE.shelves;
  try {
    const res = await fetch(
      `${URL_}/rest/v1/shelves?select=*,items(*)&order=position&items.order=position`,
      { headers: { apikey: KEY }, signal: AbortSignal.timeout(TIMEOUT_MS) }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return toShelves(await res.json());
  } catch (err) {
    console.warn("shelves: using fallback data", err);
    return SITE.shelves;
  }
})();

/** Shelves for the public page; null while the request is in flight. */
export function useShelves(): Shelf[] | null {
  const [shelves, setShelves] = useState<Shelf[] | null>(null);
  useEffect(() => {
    let cancelled = false;
    shelvesPromise.then((s) => !cancelled && setShelves(s));
    return () => {
      cancelled = true;
    };
  }, []);
  return shelves;
}
