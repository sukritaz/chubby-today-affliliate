/* Hand-drawn ink doodles, lifted from the mockup. Decorative only.
   Stroke/fill use currentColor so they follow the theme (text-ink). */

const INK = "currentColor";

export function HeroArt() {
  return (
    <svg
      width="120" height="110" viewBox="0 0 120 110" fill="none"
      stroke={INK} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      className="mx-auto block" aria-hidden="true"
    >
      {/* sparkles + tiny hearts floating around her */}
      <path d="M 20 22 L 20 28 M 17 25 L 23 25" />
      <path d="M 99 20 L 99 26 M 96 23 L 102 23" />
      <circle cx="30" cy="44" r="1.1" fill={INK} stroke="none" />
      <circle cx="92" cy="50" r="1.1" fill={INK} stroke="none" />
      <path d="M 100 60 Q 101 57 103 58 Q 105 57 105 60 Q 105 62 102 65 Q 99 62 100 60 Z" strokeWidth="1.1" />
      <path d="M 14 60 Q 15 58 16 59 Q 17 58 17 60 Q 17 61 15 63 Q 13 61 14 60 Z" strokeWidth="1.1" />

      {/* bow on top of her head */}
      <path d="M 56 16 L 60 20 L 64 16 Q 67 13 64 12 Q 60 13 60 20 Q 60 13 56 12 Q 53 13 56 16 Z" />
      <circle cx="60" cy="19" r="1" fill={INK} stroke="none" />

      {/* hair: bangs + side strands framing the face */}
      <path d="M 46 34 Q 43 19 60 18 Q 77 19 74 34" />
      <path d="M 47 36 Q 43 47 49 52" />
      <path d="M 73 36 Q 77 47 71 52" />

      {/* face */}
      <circle cx="60" cy="40" r="14" />
      {/* eyes with little lashes */}
      <path d="M 52 39 Q 54 37 56 39" />
      <path d="M 51 37 L 51.5 35 M 54 36 L 54 34 M 57 37 L 57.5 35" />
      <path d="M 64 39 Q 66 37 68 39" />
      <path d="M 63 37 L 62.5 35 M 66 36 L 66 34 M 69 37 L 68.5 35" />
      {/* blush cheeks */}
      <circle cx="50" cy="45" r="1.6" fill={INK} stroke="none" opacity="0.45" />
      <circle cx="70" cy="45" r="1.6" fill={INK} stroke="none" opacity="0.45" />
      {/* smile */}
      <path d="M 56 46 Q 60 50 64 46" />

      {/* dress + arms + legs */}
      <path d="M 53 53 Q 60 57 67 53" />
      <path d="M 53 53 L 45 84 L 75 84 L 67 53" />
      <path d="M 45 84 Q 60 88 75 84" />
      <path d="M 54 57 Q 47 64 45 70" />
      <path d="M 45 70 Q 41 71 42 75 Q 43 78 46 76 Q 48 74 45 70 Z" />
      <path d="M 66 56 Q 77 51 82 43" />
      <path d="M 82 43 Q 86 41 85 37 Q 84 34 81 36 Q 79 38 82 43 Z" />
      <path d="M 54 84 L 52 96" />
      <path d="M 66 84 L 68 96" />
      <path d="M 52 96 Q 48 97 50 94" />
      <path d="M 68 96 Q 72 97 70 94" />
    </svg>
  );
}

export function HeroUnderline() {
  return (
    <svg width="140" height="8" viewBox="0 0 140 8" className="mx-auto block" aria-hidden="true">
      <path
        d="M 4 4 Q 22 1 42 4 Q 62 7 82 4 Q 102 1 122 4 Q 132 5 136 4"
        stroke={INK} strokeWidth="1.2" fill="none" strokeLinecap="round"
      />
    </svg>
  );
}

export function AboutIcon() {
  return (
    <svg
      width="52" height="52" viewBox="0 0 58 58" fill="none"
      stroke={INK} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      className="shrink-0" aria-hidden="true"
    >
      <rect x="8" y="22" width="42" height="26" rx="2" /><rect x="4" y="48" width="50" height="3" rx="1" />
      <rect x="14" y="26" width="30" height="18" />
      <path d="M 18 30 L 38 30 M 18 34 L 34 34 M 18 38 L 36 38" />
      <path d="M 14 22 L 14 14 Q 14 12 16 12 L 24 12" />
      <path d="M 24 12 Q 26 8 30 8 Q 34 8 36 12 L 36 18" />
      <path d="M 24 12 L 24 18" /><path d="M 36 18 L 36 22" /><path d="M 24 18 L 36 18" />
      <circle cx="46" cy="14" r="3" /><path d="M 46 11 L 46 14 L 48 16" />
    </svg>
  );
}

/** wavy ink divider; pass dot to drop a center bead */
export function Divider({ dot = false, className = "" }: { dot?: boolean; className?: string }) {
  return (
    <svg
      height="14" viewBox="0 0 300 14" preserveAspectRatio="none"
      className={`block w-full ${className}`} aria-hidden="true"
    >
      <path
        d="M 10 7 Q 30 3 50 7 T 90 7 T 130 7 T 170 7 T 210 7 T 250 7 T 290 7"
        stroke={INK} strokeWidth="1" fill="none" strokeLinecap="round"
      />
      {dot && <circle cx="150" cy="7" r="1.4" fill={INK} />}
    </svg>
  );
}

export function DisclosureRule() {
  return (
    <svg height="10" viewBox="0 0 300 10" preserveAspectRatio="none" className="mx-auto block w-40" aria-hidden="true">
      <path d="M 60 5 L 240 5" stroke={INK} strokeWidth="1" strokeLinecap="round" strokeDasharray="2,3" />
    </svg>
  );
}

export function ExtArrow() {
  return (
    <svg
      width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor"
      strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    >
      <path d="M 1 1 L 9 9 M 9 1 L 1 9" />
    </svg>
  );
}

/* ---- decorative doodle set ---------------------------------------------- *
 * Small hand-drawn marks used to fill empty space. Pick one with <Doodle
 * name="coffee" />. All share a 40x40 viewBox.
 * ------------------------------------------------------------------------- */

export type DoodleName =
  | "sparkle" | "star" | "stars" | "squiggle" | "coffee"
  | "leaf" | "heart" | "arrow" | "cloud" | "moon" | "sun";

const PATHS: Record<DoodleName, JSX.Element> = {
  sun: (
    <>
      <circle cx="20" cy="20" r="7" />
      <path d="M20 5 V 9 M20 31 V 35 M5 20 H 9 M31 20 H 35 M9.5 9.5 L 12.3 12.3 M27.7 27.7 L 30.5 30.5 M30.5 9.5 L 27.7 12.3 M12.3 27.7 L 9.5 30.5" />
    </>
  ),
  sparkle: (
    <path d="M20 5 C 21 16 24 19 35 20 C 24 21 21 24 20 35 C 19 24 16 21 5 20 C 16 19 19 16 20 5 Z" />
  ),
  star: (
    <path d="M20 6 L 23.5 14 32 15 26 20.5 27.5 28.5 20 24.5 12.5 28.5 14 20.5 8 15 16.5 14 Z" />
  ),
  stars: (
    <>
      <path d="M13 10 C 13.6 15 15 16.4 20 17 C 15 17.6 13.6 19 13 24 C 12.4 19 11 17.6 6 17 C 11 16.4 12.4 15 13 10 Z" />
      <path d="M28 22 C 28.4 25 29.2 25.8 32 26 C 29.2 26.4 28.4 27.2 28 30 C 27.6 27.2 26.8 26.4 24 26 C 26.8 25.8 27.6 25 28 22 Z" />
    </>
  ),
  squiggle: (
    <path d="M6 24 Q 11 14 16 24 T 26 24 T 34 22" />
  ),
  coffee: (
    <>
      <path d="M11 17 H 27 V 26 A 5 5 0 0 1 22 31 H 16 A 5 5 0 0 1 11 26 Z" />
      <path d="M27 19 H 30 A 3.5 3.5 0 0 1 30 26 H 27" />
      <path d="M15 12 Q 17 9 15 6" />
      <path d="M21 12 Q 23 9 21 6" />
    </>
  ),
  leaf: (
    <>
      <path d="M21 33 C 21 25 20 17 23 8" />
      <path d="M20 23 C 13 23 11 18 12 13 C 18 13 22 17 20 23 Z" />
      <path d="M23 17 C 30 17 32 12 31 7 C 25 7 21 11 23 17 Z" />
    </>
  ),
  heart: (
    <path d="M20 31 C 7 22 8 11 15 11 C 18 11 20 14 20 16 C 20 14 22 11 25 11 C 32 11 33 22 20 31 Z" />
  ),
  arrow: (
    <>
      <path d="M7 13 C 16 9 27 11 31 22" />
      <path d="M31 22 L 25 21 M31 22 L 32 16" />
    </>
  ),
  cloud: (
    <path d="M12 27 A 5 5 0 0 1 13 17 A 7 7 0 0 1 26 15 A 5.5 5.5 0 0 1 28 27 Z" />
  ),
  moon: (
    <path d="M26 8 A 12 12 0 1 0 31 24 A 9 9 0 1 1 26 8 Z" />
  ),
};

export function Doodle({
  name,
  size = 40,
  className = "",
}: {
  name: DoodleName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 40 40" fill="none"
      stroke={INK} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
