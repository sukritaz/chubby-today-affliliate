/* ============================================================================
   data.ts — THE ONLY FILE YOU EDIT to manage your page + affiliate links.
   ----------------------------------------------------------------------------
   Edit, save. Vite hot-reloads instantly — no refresh needed in dev.

   ADD AN AFFILIATE LINK:
     1. Pick a shelf below (or add a new one).
     2. Drop a new { ... } into its `items` array.
     3. Set `url` to your affiliate link.

   ITEM FIELDS:
     title      (required) product name on the card
     url        (required) affiliate / destination link
     source     (optional) small label, e.g. "amazon", "free download"
     image      (optional) image URL; omit = placeholder icon
     badge      (optional) corner tag, e.g. "new", "top pick"
     affiliate  (optional) true on real affiliate links → drives disclosure note
============================================================================ */

export type Item = {
  title: string;
  url: string;
  source?: string;
  image?: string;
  badge?: string;
  affiliate?: boolean;
};

export type Shelf = {
  title: string;
  subtitle?: string;
  icon?: string; // Tabler icon name, e.g. "ti-bulb" — https://tabler.io/icons
  items: Item[];
};

export type SiteData = {
  profile: { name: string; tagline: string };
  about: { heading: string; body: string };
  shelves: Shelf[];
  disclosure: string;
};

export const SITE: SiteData = {
  profile: {
    name: "hey, it's chubby",
    tagline: "my corner of the internet",
  },

  about: {
    heading: "about me",
    body:
      "writer, runner, recovering perfectionist. i share what helps me get " +
      "through the week — apps on my desk, kit on my shelf, the stuff that " +
      "keeps me moving.",
  },

  shelves: [
    {
      title: "the desk shelf",
      subtitle: "stuff on my desk & apps i live in",
      icon: "ti-bulb",
      items: [
        { title: "gaming 27 monitor", source: "amazon", url: "https://amzn.to/3Ky61E4", image: "/images/monitor.png", affiliate: true },
        { title: "standing desk", source: "free download", url: "https://amzn.to/49ZvDn8" },
        { title: "monitor arm", source: "amazon", url: "https://amzn.to/3SvzKkR", affiliate: true },
        { title: "desk chair", source: "amazon", url: "https://amzn.to/46Px6dk", image: "/images/office-chair.png", affiliate: true },
        { title: "macbook air", source: "amazon", url: "https://amzn.to/4e5rOPS", image: "/images/laptop.png", affiliate: true },
        { title: "macbook pro", source: "amazon", url: "https://amzn.to/43vBkFX", image: "/images/striff-hub.png", affiliate: true },
        { title: "logitech", source: "amazon", url: "https://amzn.to/3Iqr8HV", image: "/images/keyboard.png", affiliate: true },
        { title: "ipad pencil (knockoff)", source: "amazon", url: "https://amzn.to/3IPBVeF", affiliate: true },
        { title: "standing lamp", source: "amazon", url: "https://amzn.to/3KwYtS3", image: "/images/standing-lamp.png", affiliate: true },
        { title: "docking port", source: "amazon", url: "https://amzn.to/3IOil2x", image: "/images/striff-hub.png", affiliate: true },
      ],
    },
    {
      title: "the fitness shelf",
      subtitle: "what's keeping me moving",
      icon: "ti-run",
      items: [
        { title: "running shoes", source: "amazon", url: "#", affiliate: true },
        { title: "water bottle", source: "amazon", url: "#", affiliate: true },
        { title: "resistance band", source: "amazon", url: "#", affiliate: true },
        { title: "yoga mat", source: "amazon", url: "#", affiliate: true },
      ],
    },
  ],

  disclosure: "some links are affiliate — thanks for shopping through them",
};
