import { createClient } from "@supabase/supabase-js";

// Both values are safe to ship to the browser: the anon key only grants what
// row level security allows (public read; writes for admins only).
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// null when env isn't set — the public page then falls back to data.ts
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export const IMAGE_BUCKET = "product-images";

// row shapes as stored in the database (see supabase/schema.sql)
export type ShelfRow = {
  id: string;
  title: string;
  subtitle: string | null;
  icon: string | null;
  position: number;
};

export type ItemRow = {
  id: string;
  shelf_id: string;
  title: string;
  url: string;
  source: string | null;
  image: string | null;
  badge: string | null;
  affiliate: boolean;
  position: number;
};

export type ShelfWithItems = ShelfRow & { items: ItemRow[] };

/** All shelves with their items, both sorted by position. */
export async function fetchShelves(): Promise<ShelfWithItems[]> {
  if (!supabase) throw new Error("Supabase is not configured");
  const { data, error } = await supabase
    .from("shelves")
    .select("*, items(*)")
    .order("position")
    .order("position", { referencedTable: "items" });
  if (error) throw error;
  return data as ShelfWithItems[];
}
