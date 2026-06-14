import { useEffect } from "react";
import { SITE } from "./data";
import { Hero } from "./components/Hero";
import { Shelf } from "./components/Shelf";
import { Divider, DisclosureRule, Doodle } from "./components/Doodles";
import { ThemeToggle } from "./components/ThemeToggle";

export default function App() {
  useEffect(() => {
    document.title = SITE.profile.name;
  }, []);

  const hasAffiliate = SITE.shelves.some((s) => s.items.some((i) => i.affiliate));

  return (
    <div className="relative min-h-dvh overflow-hidden px-4 py-8 sm:px-8 lg:py-12">
      {/* doodles scattered into the empty side margins (wide screens only).
          dimmed + warmed in dark so they whisper instead of shout. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 text-ink dark:text-ink-faint dark:opacity-55">
        <Doodle name="coffee" size={48} className="absolute left-[3%] top-[12%] hidden -rotate-6 opacity-40 xl:block" />
        <Doodle name="leaf" size={56} className="absolute left-[4%] top-[42%] hidden opacity-35 xl:block" />
        <Doodle name="stars" size={48} className="absolute bottom-[16%] left-[5%] hidden opacity-40 xl:block" />
        <Doodle name="sparkle" size={30} className="absolute right-[5%] top-[10%] hidden opacity-45 xl:block" />
        <Doodle name="arrow" size={58} className="absolute right-[3%] top-[34%] hidden rotate-12 opacity-30 xl:block" />
        <Doodle name="heart" size={34} className="absolute bottom-[26%] right-[6%] hidden opacity-40 xl:block" />
        <Doodle name="cloud" size={52} className="absolute bottom-[10%] right-[4%] hidden opacity-30 xl:block" />
      </div>

      <main className="relative mx-auto w-full max-w-7xl">
        {/* one cohesive cream page that fills the width */}
        <div className="paper-grain relative overflow-hidden rounded-[var(--radius-page)] bg-paper p-6 shadow-[0_24px_70px_-28px_rgba(31,26,20,0.45)] dark:border dark:border-ink/10 dark:shadow-[0_24px_70px_-28px_rgba(0,0,0,0.7)] sm:p-10 lg:p-14">
          <ThemeToggle />

          {/* doodles tucked into the hero whitespace */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 text-ink">
            <Doodle name="coffee" size={40} className="absolute left-[7%] top-[8%] hidden -rotate-12 opacity-50 md:block" />
            <Doodle name="squiggle" size={44} className="absolute left-[18%] top-[26%] hidden opacity-40 lg:block" />
            <Doodle name="moon" size={30} className="absolute right-[8%] top-[7%] hidden rotate-12 opacity-45 md:block" />
            <Doodle name="star" size={26} className="absolute right-[16%] top-[24%] hidden opacity-40 lg:block" />
          </div>

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
            <footer className="relative mt-12">
              {/* doodles flanking the footer note */}
              <Doodle name="leaf" size={34} className="absolute bottom-0 left-[12%] hidden -scale-x-100 opacity-40 sm:block" />
              <Doodle name="heart" size={28} className="absolute bottom-1 right-[12%] hidden opacity-40 sm:block" />
              <DisclosureRule />
              <p className="mt-2.5 text-center text-[11px] italic text-ink-faint">
                {SITE.disclosure}
              </p>
            </footer>
          )}
        </div>
      </main>
    </div>
  );
}
