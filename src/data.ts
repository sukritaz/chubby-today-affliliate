/* ============================================================================
   data.ts — profile, about, disclosure + animation settings for the page.
   ----------------------------------------------------------------------------
   SHELVES + PRODUCTS NOW LIVE IN SUPABASE. Manage them from any device at
   /admin.html — changes show up on the next page load, no deploy.

   The `shelves` below are only a fallback: the page shows them if Supabase
   isn't configured or can't be reached. They were copied into
   the database by supabase/seed.sql and won't sync back automatically.

   ITEM FIELDS:
     title      (required) product name on the card
     url        (required) affiliate / destination link
     source     (optional) small label, e.g. "amazon", "free download"
     image      (optional) image URL; omit = placeholder icon
     badge      (optional) corner tag, e.g. "new", "top pick"
     affiliate  (optional) true on real affiliate links → drives disclosure note
============================================================================ */

export type Item = {
  id?: string; // database id; absent on fallback data
  title: string;
  url: string;
  source?: string;
  image?: string;
  badge?: string;
  affiliate?: boolean;
};

export type Shelf = {
  id?: string; // database id; absent on fallback data
  title: string;
  subtitle?: string;
  icon?: string; // Tabler icon name, e.g. "ti-bulb" — https://tabler.io/icons
  items: Item[];
};

export type Settings = {
  /** how cards appear on page load */
  entrance: "stagger" | "fade" | "none";
  /** what a card does on hover */
  cardHover: "lift" | "zoom" | "tilt" | "none";
};

export type SiteData = {
  profile: { name: string; tagline: string };
  about: { heading: string; body: string };
  shelves: Shelf[];
  disclosure: string;
  settings: Settings;
};

export const SITE: SiteData = {
  /* ---- ANIMATION OPTIONS — change these to taste ---------------------- *
   * entrance:                      cardHover:
   *   "stagger" cards fade up one    "lift"  rises + straightens (default)
   *             after another        "zoom"  image zooms in
   *   "fade"    all fade in at once  "tilt"  wobbles the polaroid
   *   "none"    no entrance anim     "none"  no hover effect
   * (all auto-disabled for users with "reduce motion" set)
   * -------------------------------------------------------------------- */
  settings: {
    entrance: "none",
    cardHover: "lift",
  },

  profile: {
    name: "hey, it's chubby",
    tagline: "my corner of the internet",
  },

  about: {
    heading: "about me",
    body:
      "software developer by day, building better habits after the 9-5. i " +
      "share the apps, gear, and little wins that keep me moving outside of " +
      "work.",
  },

  shelves: [
    {
      title: "the desk shelf",
      subtitle: "stuff on my desk & apps i live in",
      icon: "ti-bulb",
      items: [
        { title: "gaming 27 monitor", source: "amazon", url: "https://amzn.to/3Ky61E4", image: "/images/monitor.webp", affiliate: true },
        { title: "standing desk", source: "amazon", url: "https://amzn.to/49ZvDn8", image: "/images/standing-desk.webp", affiliate: true },
        { title: "monitor arm", source: "amazon", url: "https://amzn.to/3SvzKkR", image: "/images/monitor-arm.webp", affiliate: true },
        { title: "desk chair", source: "amazon", url: "https://amzn.to/46Px6dk", image: "/images/office-chair.webp", affiliate: true },
        { title: "macbook air", source: "amazon", url: "https://amzn.to/4e5rOPS", image: "/images/laptop.webp", affiliate: true },
        { title: "macbook pro", source: "amazon", url: "https://amzn.to/43vBkFX", image: "/images/striff-hub.webp", affiliate: true },
        { title: "logitech keyboard", source: "amazon", url: "https://amzn.to/3Iqr8HV", image: "/images/keyboard.webp", affiliate: true },
        { title: "ipad pencil (knockoff)", source: "amazon", url: "https://amzn.to/3IPBVeF", image: "/images/ipad-pencil.webp", affiliate: true },
        { title: "standing lamp", source: "amazon", url: "https://amzn.to/3KwYtS3", image: "/images/standing-lamp.webp", affiliate: true },
        { title: "docking port", source: "amazon", url: "https://amzn.to/3IOil2x", image: "/images/striff-hub.webp", affiliate: true },
      ],
    },
    {
      title: "the fitness shelf",
      subtitle: "what's keeping me moving",
      icon: "ti-run",
      items: [
        { title: "treadmill", source: "amazon", url: "https://amzn.to/4x5N67f", image: "/images/treadmill.webp", affiliate: true },
        { title: "ultrahuman ring air", source: "ultrahuman", url: "https://ultrahuman.com/chubbytoday", image: "/images/ultrahuman-ring.webp", affiliate: true },
        { title: "pull up bar", source: "amazon", url: "https://amzn.to/4uAPMHS", image: "/images/pull-up-bar.webp", affiliate: true },
        { title: "dumbbell set", source: "amazon", url: "https://amzn.to/3T8eSQZ", image: "/images/dumbbell.webp", affiliate: true },
      ],
    },
  ],

  disclosure: "some links are affiliate — thanks for shopping through them",
};
