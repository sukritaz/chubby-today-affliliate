import { useEffect, useState } from "react";
import { Doodle } from "./Doodles";

function getInitial(): boolean {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") return true;
  if (saved === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeToggle() {
  const [dark, setDark] = useState(getInitial);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      title={dark ? "lights on" : "lights off"}
      className={[
        "absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center",
        "rounded-full border-[0.5px] border-ink/20 bg-card/60 text-ink",
        "shadow-[0_4px_10px_-6px_rgba(0,0,0,0.4)] backdrop-blur-sm",
        "transition-transform duration-200 ease-out hover:-rotate-12 hover:scale-110",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
        "sm:right-6 sm:top-6",
      ].join(" ")}
    >
      <Doodle name={dark ? "sun" : "moon"} size={20} />
    </button>
  );
}
