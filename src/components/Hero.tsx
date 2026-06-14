import type { SiteData } from "../data";
import { HeroArt, HeroUnderline, AboutIcon } from "./Doodles";

/** Full-width hero banner: doodle + name centered, about as an intro line. */
export function Hero({ data }: { data: SiteData }) {
  return (
    <header className="mx-auto max-w-2xl text-center">
      <div className="mb-1 origin-bottom scale-110 sm:scale-125">
        <HeroArt />
      </div>

      <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight sm:text-5xl">
        {data.profile.name}
      </h1>

      <div className="mt-2">
        <HeroUnderline />
      </div>

      <p className="mt-2 text-sm italic text-ink-faint sm:text-base">
        {data.profile.tagline}
      </p>

      <div className="mt-5 inline-flex items-start gap-3 text-left">
        <AboutIcon />
        <div className="min-w-0">
          <p className="mb-1 font-serif text-base font-medium">{data.about.heading}</p>
          <p className="m-0 max-w-md text-[13px] leading-relaxed text-ink-soft sm:text-sm">
            {data.about.body}
          </p>
        </div>
      </div>
    </header>
  );
}
