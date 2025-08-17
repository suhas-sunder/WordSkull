import { MetaFunction } from "@remix-run/node";
import { Link, useMatches } from "@remix-run/react";
import SocialLinks from "../client/components/navigation/SocialLinks";

type RootData = { canonical?: string };
type Match = { id: string; data?: RootData };

/* ===================== META ===================== */
export const meta: MetaFunction = ({ matches }) => {
  const root = matches.find((m) => m.id === "root") as Match | undefined;
  const url = root?.data?.canonical ?? "https://www.wordskull.com/wallpaper";

  const title =
    "Free 4K Fantasy Wallpapers | Dragons, Skulls, Anime & E-Girl | Word Skull";
  const description =
    "Download free 4K HD wallpapers from Word Skull’s fantasy world—dragons, skulls, dungeon vibes, anime & e-girl aesthetics. Perfect sizes for desktop, mobile, and tablets.";

  return [
    { title },
    { name: "description", content: description },
    // canonical
    { tagName: "link", rel: "canonical", href: url },
    // social
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    // helpful keywords
    {
      name: "keywords",
      content:
        "4K wallpapers, fantasy wallpapers, dragon wallpaper, skull wallpaper, anime wallpaper, egirl wallpaper, desktop wallpaper, mobile wallpaper, tablet wallpaper, HD background",
    },
    { name: "robots", content: "index,follow,max-image-preview:large" },
  ];
};

/* ===================== PAGE ===================== */
function Wallpaper() {
  // Update these slugs if your category routes differ:
  const categories = [
    {
      slug: "/desktop-landscape-wallpapers",
      h3: "16:9 Landscape (Desktop & Laptop)",
      p: "Perfect for monitors and notebooks — crisp 4K/1080p fantasy scenes.",
    },
    {
      slug: "/mobile-portrait-wallpapers",
      h3: "9:16 Portrait (Mobile)",
      p: "Optimized for iPhone & Android lock/home screens — tall, vivid art.",
    },
    {
      slug: "/tablet-4-3-wallpapers",
      h3: "4:3 Portrait (Tablet & iPad)",
      p: "Balanced compositions for tablets and iPads with minimal cropping.",
    },
    {
      slug: "/square-wallpapers",
      h3: "1:1 Square (Avatars & Icons)",
      p: "Great for profile pics, social icons, and compact layouts.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free 4K Fantasy Wallpapers | Word Skull",
    url: "https://www.wordskull.com/wallpaper",
    about: [
      { "@type": "Thing", name: "Fantasy wallpapers" },
      { "@type": "Thing", name: "Dragon wallpapers" },
      { "@type": "Thing", name: "Skull wallpapers" },
      { "@type": "Thing", name: "Anime wallpapers" },
      { "@type": "Thing", name: "E-girl wallpapers" },
    ],
    hasPart: {
      "@type": "ItemList",
      itemListElement: categories.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.h3,
        url: `https://www.wordskull.com${c.slug}`,
      })),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.wordskull.com",
        },
        { "@type": "ListItem", position: 2, name: "Wallpapers" },
      ],
    },
  };

  return (
    <div className="flex flex-col leading-relaxed tracking-wider mt-3 sm:mt-5 gap-8 overflow-hidden justify-center items-center">
      {/* SEO: JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="text-center">
        <h1 className="mt-[0.7em] text-5xl font-nunito text-skull-dark-brown">
          Free 4K HD Fantasy Wallpapers
        </h1>
        <p className="mt-3 max-w-2xl mx-auto font-lato text-skull-super-dark-brown/90">
          Dragons, skulls, dungeons, anime & e-girl vibes—crafted to fit
          desktop, mobile, and tablet screens with minimal cropping and maximum
          impact.
        </p>
      </header>

      <main className="flex flex-col gap-8 w-full max-w-[1200px] justify-center items-center">
        <section aria-labelledby="browse-by-dimension" className="w-full">
          <h2
            id="browse-by-dimension"
            className="text-2xl font-nunito text-skull-dark-brown text-center mb-2"
          >
            Browse by Dimension
          </h2>
          <ul className="flex flex-col gap-6 w-full max-w-[800px] mx-auto">
            {categories.map((c) => (
              <li key={c.slug} className="border-b border-stone-200 pb-4">
                <Link to={c.slug} className="group block">
                  <h3 className="text-xl font-lora text-pumpkin-orange group-hover:text-amber-600">
                    {c.h3}
                  </h3>
                  <p className="font-lato text-skull-super-dark-brown/90">
                    {c.p}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="themes" className="w-full">
          <h2
            id="themes"
            className="text-2xl font-nunito text-skull-dark-brown text-center"
          >
            Popular Themes
          </h2>
          <p className="text-center max-w-2xl mx-auto font-lato text-skull-super-dark-brown/90">
            Explore signature Word Skull aesthetics—dark fantasy, neon-lit
            e-girl, retro anime glow, and metallic skull iconography.
          </p>
          <nav
            aria-label="Wallpaper themes"
            className="mt-4 flex flex-wrap gap-2 justify-center"
          >
            {[
              "Dragons",
              "Skulls",
              "Dungeons",
              "Anime",
              "E-Girl",
              "Runes",
              "Necromancy",
              "Celestial",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-stone-300 px-3 py-1 text-sm hover:bg-stone-50 dark:border-stone-700 dark:hover:bg-stone-800"
              >
                {tag}
              </span>
            ))}
          </nav>
        </section>

        <section aria-labelledby="tips" className="w-full">
          <h2
            id="tips"
            className="text-2xl font-nunito text-skull-dark-brown text-center"
          >
            Quick Tips
          </h2>
          <ul className="mt-2 list-disc pl-6 max-w-2xl mx-auto font-lato text-skull-super-dark-brown/90">
            <li>Choose a ratio that matches your screen to avoid cropping.</li>
            <li>On mobile, use 9:16 for a perfect lock-screen fit.</li>
            <li>For crisp results, pick the highest resolution available.</li>
          </ul>
        </section>

        <SocialLinks />
      </main>
    </div>
  );
}

export default Wallpaper;
