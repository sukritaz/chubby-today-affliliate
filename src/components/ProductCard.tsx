import type { Item, Settings } from "../data";
import { SITE } from "../data";
import { ExtArrow } from "./Doodles";

const isExternal = (url: string) => /^https?:\/\//i.test(url);

// Send a click to both analytics tools. Both are injected by scripts in
// index.html; guard each in case it hasn't loaded (or is blocked).
type GoatCounter = { count: (o: { path: string; title?: string; event?: boolean }) => void };
type Gtag = (cmd: "event", name: string, params: Record<string, unknown>) => void;
const trackClick = (item: Item) => {
  const w = window as unknown as { goatcounter?: GoatCounter; gtag?: Gtag };
  w.goatcounter?.count({ path: `click-${item.title}`, title: item.title, event: true });
  w.gtag?.("event", "click", { link_title: item.title, link_url: item.url });
};

// Local images ("/images/x.png") must be served from the Vite base path so
// they work both on "/" (dev) and "/<repo>/" (GitHub Pages). External URLs
// pass through untouched.
const asset = (src: string) =>
  isExternal(src) ? src : import.meta.env.BASE_URL + src.replace(/^\//, "");

// hover styles, keyed by settings.cardHover
const HOVER: Record<Settings["cardHover"], string> = {
  lift: "hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_16px_30px_-12px_rgba(31,26,20,0.55)] focus-visible:-translate-y-1 focus-visible:rotate-0",
  zoom: "hover:rotate-0 focus-visible:rotate-0",
  tilt: "hover:rotate-2 hover:-translate-y-0.5 focus-visible:rotate-2",
  none: "",
};

export function ProductCard({ item, index }: { item: Item; index: number }) {
  const external = isExternal(item.url);
  const { entrance, cardHover } = SITE.settings;

  // alternate the polaroid tilt; most hover modes straighten it
  const tilt = index % 2 === 0 ? "-rotate-[0.6deg]" : "rotate-[0.6deg]";

  // entrance class + staggered delay (stagger only)
  const entranceClass =
    entrance === "stagger" ? "anim-stagger" : entrance === "fade" ? "anim-fade" : "";
  const delay = entrance === "stagger" ? { animationDelay: `${index * 70}ms` } : undefined;

  return (
    <a
      href={item.url}
      {...(external ? { target: "_blank", rel: "noopener sponsored" } : {})}
      onClick={() => trackClick(item)}
      style={delay}
      className={[
        "group relative block rounded-[4px] bg-card p-2.5 pb-3 no-underline",
        "border-[0.5px] border-ink/20 text-ink dark:border-ink/15",
        "shadow-[0_6px_14px_-10px_rgba(31,26,20,0.5)]",
        "dark:shadow-[0_10px_24px_-14px_rgba(0,0,0,0.8)] dark:hover:shadow-[0_20px_36px_-16px_rgba(0,0,0,0.9)]",
        "transition-[transform,box-shadow] duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
        tilt,
        HOVER[cardHover],
        entranceClass,
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
            className={[
              "h-full w-full object-cover transition-transform duration-300",
              cardHover === "zoom" ? "group-hover:scale-110" : "group-hover:scale-105",
            ].join(" ")}
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
