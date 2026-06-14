import type { Shelf as ShelfType } from "../data";
import { ProductCard } from "./ProductCard";

export function Shelf({ shelf }: { shelf: ShelfType }) {
  return (
    <section>
      <div className="mb-1 flex items-center gap-2.5">
        <h2 className="m-0 font-serif text-2xl font-medium tracking-tight lg:text-[28px]">
          {shelf.title}
        </h2>
        {shelf.icon && (
          <i className={`ti ${shelf.icon} text-[22px] text-ink`} aria-hidden="true" />
        )}
      </div>

      {shelf.subtitle && (
        <p className="mb-5 text-[13px] italic text-ink-faint">{shelf.subtitle}</p>
      )}

      {/* max 6 per row (mobile 2 → sm 3 → md 4 → lg 5 → xl 6).
          want a 5-max? change xl:grid-cols-6 to xl:grid-cols-5 */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {shelf.items.map((item, i) => (
          <ProductCard key={`${shelf.title}-${item.title}-${i}`} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
