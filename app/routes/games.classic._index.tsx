import { Link, Outlet, useMatches } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

/* ===================== META ===================== */
type RootData = { canonical?: string };
type Match = { id: string; data?: RootData };

export const meta: MetaFunction = ({ matches }) => {
  const root = matches.find((m) => m.id === "root") as Match | undefined;

  const url =
    root?.data?.canonical ?? "https://www.wordskull.com/games/classic";
  const title =
    "Classic WordSkull Games | Boneheads, Specter, Reapers, Royal Lichen";
  const description =
    "Play Classic WordSkull: Boneheads (3-5 letters), Specter (3-6 letters), Reapers (3-7 letters), and Royal Lichen (3-9 letters).";

  // Real OG asset, at least 1200x630, returns 200 OK
  const ogImage = "https://www.wordskull.com/og/wordskull-classic.jpg";

  return [
    // Title & Description
    { title },
    { name: "description", content: description },

    // Canonical (always present to prevent duplicate-meta flags)
    { tagName: "link", rel: "canonical", href: url },

    // Open Graph
    { property: "og:site_name", content: "WordSkull" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { property: "og:image:alt", content: "Classic WordSkull game modes" },
    { property: "og:locale", content: "en_US" },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },

    // Robots (single, consistent directive string)
    {
      name: "robots",
      content:
        "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    },
  ];
};

/* ===================== PAGE ===================== */
export default function ClassicIndex() {
  const matches = useMatches();
  const isIndex = matches.some((m) => m.id.endsWith("games.classic._index"));

  const root = matches.find((m) => m.id === "root") as Match | undefined;
  const canonical =
    root?.data?.canonical ?? "https://www.wordskull.com/games/classic";

  // JSON-LD for Classic hub (index only)
  const jsonLd = isIndex
    ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Classic Word Games — Word Skull",
        url: canonical,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.wordskull.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Games",
              item: "https://www.wordskull.com/games",
            },
            { "@type": "ListItem", position: 3, name: "Classic" },
          ],
        },
        hasPart: {
          "@type": "ItemList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Boneheads — Easy (3–5)",
              url: "https://www.wordskull.com/games/classic/boneheads-easy-3-to-5-letter-words",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Specter Knights — Medium (3–6)",
              url: "https://www.wordskull.com/games/classic/specter-knights-medium-3-to-6-letter-words",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Grim Reapers — Hard (3–7)",
              url: "https://www.wordskull.com/games/classic/grim-reapers-hard-3-to-7-letter-words",
            },
            {
              "@type": "ListItem",
              position: 4,
              name: "Royal Lichen — Extreme (3–9)",
              url: "https://www.wordskull.com/games/classic/royal-lichen-extreme-3-to-9-letter-words",
            },
          ],
        },
      }
    : null;

  return (
    <div className="min-h-screen">
      {isIndex ? (
        <>
          {jsonLd ? (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
          ) : null}

          {/* Header */}
          <header className="border-b border-stone-200 bg-stone-100 mt-5">
            <div className="mx-auto max-w-[1200px] px-6 pt-8 pb-4">
              <nav aria-label="Breadcrumb" className="mb-2 text-sm">
                <ol className="flex flex-wrap items-center gap-1 text-stone-600">
                  <li>
                    <Link
                      to="/"
                      className="hover:underline text-amber-600 font-bold"
                    >
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">›</li>
                  <li>
                    <Link
                      to="/games"
                      className="hover:underline text-amber-600 font-bold"
                    >
                      Games
                    </Link>
                  </li>
                  <li aria-hidden="true">›</li>
                  <li aria-current="page" className="text-amber-600 font-bold">
                    Classic
                  </li>
                </ol>
              </nav>

              <h1 className="mt-1 font-nunito text-2xl tracking-wide text-skull-dark-brown">
                Classic Games
              </h1>
              <p className="mt-2 max-w-2xl font-lato text-stone-700">
                Choose a difficulty and take on quick 3–9 letter word
                challenges. Start with Boneheads, then climb to Royal Lichen.
              </p>
            </div>
          </header>

          {/* Four level links only */}
          <main className="mx-auto max-w-[1200px] px-6 py-8">
            <section aria-labelledby="classic-levels">
              <h2 id="classic-levels" className="sr-only">
                Classic Levels
              </h2>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <Link
                  to="/games/classic/boneheads-easy-3-to-5-letter-words"
                  className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <h3 className="font-lora text-pumpkin-orange transition group-hover:text-amber-600">
                    Boneheads
                  </h3>
                  <p className="mt-1 text-sm font-lato text-stone-700">
                    Easy • 3–5 letters
                  </p>
                  <span className="mt-3 inline-block rounded-full bg-pumpkin-orange px-4 py-1 text-sm text-white transition group-hover:bg-amber-600">
                    Play
                  </span>
                </Link>

                <Link
                  to="/games/classic/specter-knights-medium-3-to-6-letter-words"
                  className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <h3 className="font-lora text-pumpkin-orange transition group-hover:text-amber-600">
                    Specter Knights
                  </h3>
                  <p className="mt-1 text-sm font-lato text-stone-700">
                    Medium • 3–6 letters
                  </p>
                  <span className="mt-3 inline-block rounded-full bg-pumpkin-orange px-4 py-1 text-sm text-white transition group-hover:bg-amber-600">
                    Play
                  </span>
                </Link>

                <Link
                  to="/games/classic/grim-reapers-hard-3-to-7-letter-words"
                  className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <h3 className="font-lora text-pumpkin-orange transition group-hover:text-amber-600">
                    Grim Reapers
                  </h3>
                  <p className="mt-1 text-sm font-lato text-stone-700">
                    Hard • 3–7 letters
                  </p>
                  <span className="mt-3 inline-block rounded-full bg-pumpkin-orange px-4 py-1 text-sm text-white transition group-hover:bg-amber-600">
                    Play
                  </span>
                </Link>

                <Link
                  to="/games/classic/royal-lichen-extreme-3-to-9-letter-words"
                  className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <h3 className="font-lora text-pumpkin-orange transition group-hover:text-amber-600">
                    Royal Lichen
                  </h3>
                  <p className="mt-1 text-sm font-lato text-stone-700">
                    Extreme • 3–9 letters
                  </p>
                  <span className="mt-3 inline-block rounded-full bg-pumpkin-orange px-4 py-1 text-sm text-white transition group-hover:bg-amber-600">
                    Play
                  </span>
                </Link>
              </div>
            </section>
          </main>
        </>
      ) : (
        // Nested routes take the whole page
        <Outlet />
      )}
    </div>
  );
}
