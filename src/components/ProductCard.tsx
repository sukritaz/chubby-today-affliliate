import type { Item } from "../data";
import { ExtArrow } from "./Doodles";

const isExternal = (url: string) => /^https?:\/\//i.test(url);

// Local images ("/images/x.png") must be served from the Vite base path so
// they work both on "/" (dev) and "/<repo>/" (GitHub Pages). External URLs
// pass through untouched.
const asset = (src: string) =>
  isExternal(src) ? src : import.meta.env.BASE_URL + src.replace(/^\//, "");

export function ProductCard({ item, index }: { item: Item; index: number }) {
  const external = isExternal(item.url);
  // alternate the polaroid tilt; reset to straight on hover/focus
  const tilt = index % 2 === 0 ? "-rotate-[0.6deg]" : "rotate-[0.6deg]";

  return (
    <a
      href={item.url}
      {...(external ? { target: "_blank", rel: "noopener sponsored" } : {})}
      className={[
        "group relative block rounded-[4px] bg-card p-2.5 pb-3 no-underline",
        "border-[0.5px] border-ink/20 text-ink",
        "shadow-[0_6px_14px_-10px_rgba(31,26,20,0.5)]",
        "transition-[transform,box-shadow] duration-200 ease-out",
        tilt,
        "hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_16px_30px_-12px_rgba(31,26,20,0.55)]",
        "focus-visible:-translate-y-1 focus-visible:rotate-0 focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-ink",
      ].join(" ")}
    >
      {item.badge && (
        <span className="absolute right-1.5 top-1.5 rotate-3 rounded-full bg-ink px-1.5 py-0.5 text-[9px] font-semibold lowercase tracking-wide text-paper">
          {item.badge}
        </span>
      )}

      <div className="mb-2.5 flex aspect-square items-center justify-center overflow-hidden rounded-[2px] bg-paper-shade">
        {item.image ? (
          <img
            src={asset(item.image)}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <i className="ti ti-photo text-[22px] text-[#B5A88C]" aria-hidden="true" />
        )}
      </div>

      <p className="mb-0.5 text-[13px] font-semibold leading-tight">{item.title}</p>

      {item.source && (
        <p className="flex items-center gap-1 text-[10.5px] text-ink-faint">
          {external && <ExtArrow />}
          <span>{item.source}</span>
        </p>
      )}
    </a>
  );
}
