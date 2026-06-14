/* Hand-drawn ink doodles, lifted from the mockup. Decorative only. */

const INK = "#1F1A14";

export function HeroArt() {
  return (
    <svg
      width="120" height="110" viewBox="0 0 120 110" fill="none"
      stroke={INK} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      className="mx-auto block" aria-hidden="true"
    >
      <path d="M 14 22 Q 16 18 18 22" /><path d="M 102 18 Q 104 14 106 18" />
      <circle cx="22" cy="46" r="1.2" fill={INK} stroke="none" />
      <path d="M 96 56 L 96 60 M 94 58 L 98 58" />
      <path d="M 60 26 Q 46 24 42 36 Q 40 46 44 52 Q 48 60 60 60 Q 72 60 76 52 Q 80 46 78 36 Q 74 24 60 26 Z" />
      <path d="M 44 38 Q 48 28 60 28 Q 72 28 76 38 Q 76 32 70 30" />
      <path d="M 52 42 Q 54 40 56 42" /><path d="M 64 42 Q 66 40 68 42" />
      <circle cx="54" cy="46" r="1.1" fill={INK} stroke="none" />
      <circle cx="66" cy="46" r="1.1" fill={INK} stroke="none" />
      <path d="M 56 52 Q 60 55 64 52" />
      <path d="M 52 50 Q 50 50 49 51" /><path d="M 68 50 Q 70 50 71 51" />
      <path d="M 50 60 L 46 86 L 74 86 L 70 60" />
      <path d="M 46 86 L 42 96" /><path d="M 74 86 L 78 96" />
      <path d="M 50 70 Q 38 68 32 56" />
      <path d="M 70 70 Q 82 74 88 82 Q 88 90 84 90 Q 80 88 84 84 L 90 84" />
      <path d="M 32 56 L 30 50" /><path d="M 30 50 L 26 52" /><path d="M 30 50 L 30 46" /><path d="M 26 52 L 30 46" />
      <path d="M 18 90 Q 22 88 24 92" /><path d="M 102 96 Q 100 92 104 92" />
      <circle cx="14" cy="60" r="1" fill={INK} stroke="none" />
      <circle cx="106" cy="38" r="1" fill={INK} stroke="none" />
      <path d="M 12 38 Q 14 36 14 38 Q 14 40 12 41 L 10 39 Q 10 37 12 38 Z" strokeWidth="1" />
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
      width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#6B5D4A"
      strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    >
      <path d="M 1 1 L 9 9 M 9 1 L 1 9" />
    </svg>
  );
}
