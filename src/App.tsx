import { useEffect } from "react";
import { SITE } from "./data";
import { Hero } from "./components/Hero";
import { Shelf } from "./components/Shelf";
import { Divider, DisclosureRule } from "./components/Doodles";

export default function App() {
  useEffect(() => {
    document.title = SITE.profile.name;
  }, []);

  const hasAffiliate = SITE.shelves.some((s) => s.items.some((i) => i.affiliate));

  return (
    <div className="min-h-dvh px-4 py-8 sm:px-8 lg:py-12">
      <main className="mx-auto w-full max-w-7xl">
        {/* one cohesive cream page that fills the width */}
        <div className="paper-grain rounded-[var(--radius-page)] bg-paper p-6 shadow-[0_24px_70px_-28px_rgba(31,26,20,0.45)] sm:p-10 lg:p-14">
          <Hero data={SITE} />

          <Divider dot className="my-9 lg:my-12" />

          <div className="flex flex-col gap-12">
            {SITE.shelves.map((shelf, i) => (
              <div key={shelf.title} className="flex flex-col gap-12">
                <Shelf shelf={shelf} />
                {i < SITE.shelves.length - 1 && <Divider dot />}
              </div>
            ))}
          </div>

          {hasAffiliate && (
            <footer className="mt-12">
              <DisclosureRule />
              <p className="mt-2.5 text-center text-[11px] italic text-ink-faint">
                {SITE.disclosure}
              </p>
            </footer>
          )}
        </div>

        <p className="mt-6 text-center text-[10px] text-ink-faint/70">
          edit <code className="rounded bg-ink/5 px-1 py-0.5">src/data.ts</code> to manage links
        </p>
      </main>
    </div>
  );
}
