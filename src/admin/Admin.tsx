import { useCallback, useEffect, useState } from "react";
import {
  fetchShelves,
  supabase,
  type ItemRow,
  type ShelfRow,
  type ShelfWithItems,
} from "../lib/supabase";
import { ImageInput } from "./ImageInput";
import { Button, Field, IconButton } from "./ui";

type ItemDraft = Pick<ItemRow, "title" | "url" | "source" | "image" | "badge" | "affiliate">;
type ShelfDraft = Pick<ShelfRow, "title" | "subtitle" | "icon">;

// what's open for editing: an existing row by id, or a "new" form
type Editing =
  | { kind: "item"; id: string; shelfId: string }
  | { kind: "new-item"; shelfId: string }
  | { kind: "shelf"; id: string }
  | { kind: "new-shelf" }
  | null;

const EMPTY_ITEM: ItemDraft = { title: "", url: "", source: "amazon", image: "", badge: "", affiliate: true };
const EMPTY_SHELF: ShelfDraft = { title: "", subtitle: "", icon: "" };

// empty strings from inputs → null in the database
const clean = <T extends Record<string, unknown>>(o: T): T =>
  Object.fromEntries(Object.entries(o).map(([k, v]) => [k, v === "" ? null : v])) as T;

const nextPosition = (rows: { position: number }[]) =>
  rows.reduce((max, r) => Math.max(max, r.position + 1), 0);

export function Admin({ email }: { email: string }) {
  const db = supabase!;
  const [shelves, setShelves] = useState<ShelfWithItems[]>([]);
  const [editing, setEditing] = useState<Editing>(null);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(
    () => fetchShelves().then(setShelves).catch((e) => setError(e.message)),
    []
  );

  useEffect(() => {
    reload();
  }, [reload]);

  /** Run a write, surface any error, then refresh. */
  const run = async (op: PromiseLike<{ error: { message: string } | null }>[]) => {
    setError(null);
    const results = await Promise.all(op);
    const failed = results.find((r) => r.error);
    if (failed?.error) setError(failed.error.message);
    await reload();
    return !failed;
  };

  /** Swap positions of two neighbouring rows. */
  const swap = (table: "items" | "shelves", a: { id: string; position: number }, b: { id: string; position: number }) =>
    run([
      db.from(table).update({ position: b.position }).eq("id", a.id),
      db.from(table).update({ position: a.position }).eq("id", b.id),
    ]);

  const saveItem = async (draft: ItemDraft) => {
    if (!editing || (editing.kind !== "item" && editing.kind !== "new-item")) return;
    const row = clean(draft);
    const ok =
      editing.kind === "item"
        ? await run([db.from("items").update(row).eq("id", editing.id)])
        : await run([
            db.from("items").insert({
              ...row,
              shelf_id: editing.shelfId,
              position: nextPosition(shelves.find((s) => s.id === editing.shelfId)?.items ?? []),
            }),
          ]);
    if (ok) setEditing(null);
  };

  const saveShelf = async (draft: ShelfDraft) => {
    if (!editing || (editing.kind !== "shelf" && editing.kind !== "new-shelf")) return;
    const row = clean(draft);
    const ok =
      editing.kind === "shelf"
        ? await run([db.from("shelves").update(row).eq("id", editing.id)])
        : await run([db.from("shelves").insert({ ...row, position: nextPosition(shelves) })]);
    if (ok) setEditing(null);
  };

  const deleteItem = async (item: ItemRow) => {
    if (!confirm(`Delete "${item.title}"?`)) return;
    if (await run([db.from("items").delete().eq("id", item.id)])) setEditing(null);
  };

  const deleteShelf = async (shelf: ShelfWithItems) => {
    if (!confirm(`Delete shelf "${shelf.title}" and its ${shelf.items.length} products?`)) return;
    if (await run([db.from("shelves").delete().eq("id", shelf.id)])) setEditing(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="m-0 font-serif text-3xl font-medium">shelf admin</h1>
        <div className="flex gap-2">
          <a href={import.meta.env.BASE_URL} className="flex h-11 items-center rounded-md border border-ink/25 bg-card px-3 text-sm font-semibold text-ink no-underline">
            view site
          </a>
          <Button variant="ghost" onClick={() => db.auth.signOut()} title={email}>
            sign out
          </Button>
        </div>
      </header>

      {error && (
        <p role="alert" className="rounded-md border border-red-700/40 bg-card p-3 text-sm text-red-700 dark:text-red-300">
          {error}
        </p>
      )}

      {shelves.map((shelf, si) => (
        <section key={shelf.id} className="flex flex-col gap-2 rounded-lg border border-ink/15 bg-paper-shade/50 p-3">
          {editing?.kind === "shelf" && editing.id === shelf.id ? (
            <ShelfForm
              initial={shelf}
              onSave={saveShelf}
              onCancel={() => setEditing(null)}
              onDelete={() => deleteShelf(shelf)}
            />
          ) : (
            <div className="flex items-center gap-2">
              <div className="min-w-0 flex-1">
                <h2 className="m-0 flex items-center gap-2 font-serif text-xl font-medium">
                  {shelf.title}
                  {shelf.icon && <i className={`ti ${shelf.icon} text-lg`} aria-hidden="true" />}
                </h2>
                {shelf.subtitle && <p className="m-0 text-xs italic text-ink-faint">{shelf.subtitle}</p>}
              </div>
              <IconButton icon="ti-arrow-up" label="Move shelf up" disabled={si === 0} onClick={() => swap("shelves", shelf, shelves[si - 1])} />
              <IconButton icon="ti-arrow-down" label="Move shelf down" disabled={si === shelves.length - 1} onClick={() => swap("shelves", shelf, shelves[si + 1])} />
              <IconButton icon="ti-pencil" label="Edit shelf" onClick={() => setEditing({ kind: "shelf", id: shelf.id })} />
            </div>
          )}

          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {shelf.items.map((item, ii) =>
              editing?.kind === "item" && editing.id === item.id ? (
                <li key={item.id}>
                  <ItemForm
                    initial={item}
                    onSave={saveItem}
                    onCancel={() => setEditing(null)}
                    onDelete={() => deleteItem(item)}
                  />
                </li>
              ) : (
                <li key={item.id} className="flex items-center gap-2 rounded-md bg-card p-2">
                  <button
                    type="button"
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    onClick={() => setEditing({ kind: "item", id: item.id, shelfId: shelf.id })}
                  >
                    <Thumb src={item.image} />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{item.title}</span>
                      <span className="block truncate text-xs text-ink-faint">{item.url}</span>
                    </span>
                  </button>
                  <IconButton icon="ti-arrow-up" label="Move up" disabled={ii === 0} onClick={() => swap("items", item, shelf.items[ii - 1])} />
                  <IconButton icon="ti-arrow-down" label="Move down" disabled={ii === shelf.items.length - 1} onClick={() => swap("items", item, shelf.items[ii + 1])} />
                </li>
              )
            )}
          </ul>

          {editing?.kind === "new-item" && editing.shelfId === shelf.id ? (
            <ItemForm initial={EMPTY_ITEM} onSave={saveItem} onCancel={() => setEditing(null)} />
          ) : (
            <Button variant="ghost" onClick={() => setEditing({ kind: "new-item", shelfId: shelf.id })}>
              <i className="ti ti-plus" aria-hidden="true" /> add product
            </Button>
          )}
        </section>
      ))}

      {editing?.kind === "new-shelf" ? (
        <ShelfForm initial={EMPTY_SHELF} onSave={saveShelf} onCancel={() => setEditing(null)} />
      ) : (
        <Button onClick={() => setEditing({ kind: "new-shelf" })}>
          <i className="ti ti-plus" aria-hidden="true" /> add shelf
        </Button>
      )}
    </div>
  );
}

function Thumb({ src }: { src: string | null }) {
  const url = src && (/^https?:\/\//.test(src) ? src : import.meta.env.BASE_URL + src.replace(/^\//, ""));
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded bg-paper-shade">
      {url ? <img src={url} alt="" className="h-full w-full object-cover" /> : <i className="ti ti-photo text-ink-faint" aria-hidden="true" />}
    </span>
  );
}

function ItemForm({
  initial,
  onSave,
  onCancel,
  onDelete,
}: {
  initial: ItemDraft;
  onSave: (d: ItemDraft) => Promise<void>;
  onCancel: () => void;
  onDelete?: () => void;
}) {
  const [d, setD] = useState<ItemDraft>({
    title: initial.title,
    url: initial.url,
    source: initial.source ?? "",
    image: initial.image ?? "",
    badge: initial.badge ?? "",
    affiliate: initial.affiliate,
  });
  const [saving, setSaving] = useState(false);
  const set = (k: keyof ItemDraft) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setD({ ...d, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  return (
    <form
      className="flex flex-col gap-3 rounded-md border border-ink/25 bg-card p-3"
      onSubmit={async (e) => {
        e.preventDefault();
        setSaving(true);
        await onSave(d);
        setSaving(false);
      }}
    >
      <ImageInput value={d.image ?? ""} onChange={(image) => setD({ ...d, image })} />
      <Field label="title">
        <input required value={d.title} onChange={set("title")} />
      </Field>
      <Field label="link">
        <input required type="url" inputMode="url" value={d.url} onChange={set("url")} placeholder="https://amzn.to/…" />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="source">
          <input value={d.source ?? ""} onChange={set("source")} placeholder="amazon" />
        </Field>
        <Field label="badge">
          <input value={d.badge ?? ""} onChange={set("badge")} placeholder="new" />
        </Field>
      </div>
      <label className="flex min-h-11 items-center gap-2 text-sm">
        <input type="checkbox" className="h-5 w-5" checked={d.affiliate} onChange={set("affiliate")} />
        affiliate link
      </label>
      <FormActions saving={saving} onCancel={onCancel} onDelete={onDelete} />
    </form>
  );
}

function ShelfForm({
  initial,
  onSave,
  onCancel,
  onDelete,
}: {
  initial: ShelfDraft;
  onSave: (d: ShelfDraft) => Promise<void>;
  onCancel: () => void;
  onDelete?: () => void;
}) {
  const [d, setD] = useState<ShelfDraft>({
    title: initial.title,
    subtitle: initial.subtitle ?? "",
    icon: initial.icon ?? "",
  });
  const [saving, setSaving] = useState(false);
  const set = (k: keyof ShelfDraft) => (e: React.ChangeEvent<HTMLInputElement>) => setD({ ...d, [k]: e.target.value });

  return (
    <form
      className="flex flex-col gap-3 rounded-md border border-ink/25 bg-card p-3"
      onSubmit={async (e) => {
        e.preventDefault();
        setSaving(true);
        await onSave(d);
        setSaving(false);
      }}
    >
      <Field label="shelf title">
        <input required value={d.title} onChange={set("title")} />
      </Field>
      <Field label="subtitle">
        <input value={d.subtitle ?? ""} onChange={set("subtitle")} />
      </Field>
      <Field label="icon (tabler.io/icons, e.g. ti-bulb)">
        <input value={d.icon ?? ""} onChange={set("icon")} autoCapitalize="none" />
      </Field>
      <FormActions saving={saving} onCancel={onCancel} onDelete={onDelete} />
    </form>
  );
}

function FormActions({ saving, onCancel, onDelete }: { saving: boolean; onCancel: () => void; onDelete?: () => void }) {
  return (
    <div className="flex gap-2">
      <Button type="submit" disabled={saving} className="flex-1">
        {saving ? "saving…" : "save"}
      </Button>
      <Button variant="ghost" onClick={onCancel}>
        cancel
      </Button>
      {onDelete && (
        <Button variant="danger" onClick={onDelete}>
          delete
        </Button>
      )}
    </div>
  );
}
