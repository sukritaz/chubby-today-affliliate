import { useState } from "react";
import { IMAGE_BUCKET, supabase } from "../lib/supabase";

// Same settings used to optimize the bundled images: cards render ~200px wide,
// so 600px covers retina screens + the hover zoom.
const MAX_SIZE = 600;
const QUALITY = 0.8;

/** Shrink any phone photo to a ≤600px WebP before it leaves the device. */
async function toWebp(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, MAX_SIZE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("could not encode image"))),
      "image/webp",
      QUALITY
    )
  );
}

/** Image picker that uploads to Supabase Storage and reports the public URL. */
export function ImageInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    setBusy(true);
    setError(null);
    try {
      const blob = await toWebp(file);
      const path = `${crypto.randomUUID()}.webp`;
      const { error } = await supabase!.storage
        .from(IMAGE_BUCKET)
        .upload(path, blob, { contentType: "image/webp", cacheControl: "31536000" });
      if (error) throw error;
      onChange(supabase!.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  };

  // bundled images ("/images/x.webp") resolve against the site root
  const preview = value && (/^https?:\/\//.test(value) ? value : import.meta.env.BASE_URL + value.replace(/^\//, ""));

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded bg-paper-shade">
        {preview ? (
          <img src={preview} alt="" className="h-full w-full object-cover" />
        ) : (
          <i className="ti ti-photo text-2xl text-ink-faint" aria-hidden="true" />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="flex h-11 cursor-pointer items-center gap-1.5 rounded-md border border-ink/25 bg-card px-3 text-sm font-semibold text-ink">
          <i className="ti ti-camera text-lg" aria-hidden="true" />
          {busy ? "uploading…" : value ? "change photo" : "add photo"}
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            disabled={busy}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
              e.target.value = "";
            }}
          />
        </label>
        {value && (
          <button type="button" className="self-start text-xs text-ink-faint underline" onClick={() => onChange("")}>
            remove photo
          </button>
        )}
        {error && <p className="text-xs text-red-700 dark:text-red-300">{error}</p>}
      </div>
    </div>
  );
}
