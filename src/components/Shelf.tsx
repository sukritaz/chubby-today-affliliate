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

      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
        {shelf.items.map((item, i) => (
          <ProductCard key={`${shelf.title}-${item.title}-${i}`} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
