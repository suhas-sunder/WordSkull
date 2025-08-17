import { Outlet, useLocation, Link, useMatches } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import SocialLinks from "~/client/components/navigation/SocialLinks";

type RootData = { canonical?: string };
type Match = { id: string; data?: RootData };

/* ===================== META ===================== */
export const meta: MetaFunction = ({ matches }) => {
  const root = matches.find((m) => m.id === "root") as Match | undefined;
  const url = root?.data?.canonical ?? "https://www.wordskull.com/games";

  const title = "Play WordSkull Games | Free Word Battle Modes";
  const description =
    "Explore WordSkull game modes with new fantasy word challenges added regularly. Battle boneheads, spectres, reapers, and royal lichens & more.";

  // Serve a real image that returns 200 OK
  const ogImage = "https://www.wordskull.com/og/wordskull-games.jpg";

  return [
    // Title & Description
    { title },
    { name: "description", content: description },

    // Canonical
    { tagName: "link", rel: "canonical", href: url },

    // Open Graph
    { property: "og:site_name", content: "WordSkull" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { property: "og:image:alt", content: "Play WordSkull Games" },
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
export default function GamesIndex() {
  const { pathname } = useLocation();
  const isJustGames = pathname === "/games";
  const matches = useMatches() as Match[];

  const canonical =
    (matches.find((m) => m.id === "root")?.data as RootData | undefined)
      ?.canonical ?? "https://www.wordskull.com/games";

  const jsonLd = isJustGames
    ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Word Skull | Games",
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
            { "@type": "ListItem", position: 2, name: "Games" },
          ],
        },
        hasPart: {
          "@type": "ItemList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Classic",
              url: "https://www.wordskull.com/games/classic",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Daily Challenge (Coming Soon)",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Multiplayer (Coming Soon)",
            },
          ],
        },
      }
    : null;

  return (
    <div>
      {isJustGames ? (
        <>
          {jsonLd ? (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
          ) : null}

          {/* Header with breadcrumb */}
          <header className="border-b border-stone-200 bg-white">
            <div className="mx-auto flex min-h-20 max-w-[1200px] flex-col px-6 pt-12 pb-4">
              <nav aria-label="Breadcrumb" className="mb-2 text-sm">
                <ol className="flex flex-wrap items-center gap-1 text-amber-600 font-bold">
                  <li>
                    <Link to="/" className="hover:underline">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">›</li>
                  <li aria-current="page" className="text-amber-600 font-bold">
                    Games
                  </li>
                </ol>
              </nav>

              <h1 className="mt-1 font-nunito text-2xl tracking-wide text-skull-dark-brown">
                All Word Games
              </h1>
              <p className="mt-2 w-full max-w-2xl text-base leading-relaxed font-lato text-skull-super-dark-brown/90">
                Discover fast, satisfying word challenges. Start with classic
                modes (Boneheads, Specter, Reapers, Royal Lichen), with more
                game types arriving soon.
              </p>
            </div>
          </header>

          <main className="mx-auto max-w-[1200px] px-6 py-8">
            <section aria-labelledby="game-categories">
              <h2
                id="game-categories"
                className="mb-4 font-nunito text-xl text-skull-dark-brown"
              >
                Game Categories
              </h2>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* Classic: live link */}
                <Link
                  to="/games/classic"
                  className="group rounded-2xl border border-stone-200 bg-white/80 p-5 shadow-sm transition hover:shadow-md"
                >
                  <h3 className="font-lora text-pumpkin-orange transition group-hover:text-amber-600">
                    Classic
                  </h3>
                  <p className="mt-1 font-lato text-sm text-skull-super-dark-brown/90">
                    Core Word Skull experience | Easy, Medium, Hard, and Royal
                    Lichen (3–9 letters).
                  </p>
                  <span className="mt-3 inline-block rounded-full bg-pumpkin-orange px-4 py-1 text-sm text-white transition group-hover:bg-amber-600">
                    Play Classic
                  </span>
                </Link>

                {/* Coming soon cards */}
                <div
                  aria-disabled="true"
                  className="rounded-2xl border border-dashed border-stone-200 bg-white/70 p-5 opacity-90"
                  title="Coming soon"
                >
                  <h3 className="font-lora text-stone-600">Daily Challenge</h3>
                  <p className="mt-1 font-lato text-sm text-stone-600">
                    A fresh puzzle every day with global stats & streaks.
                  </p>
                  <span className="mt-3 inline-block rounded-full bg-stone-300 px-4 py-1 text-sm text-stone-700">
                    Coming Soon
                  </span>
                </div>

                <div
                  aria-disabled="true"
                  className="rounded-2xl border border-dashed border-stone-200 bg-white/70 p-5 opacity-90"
                  title="Coming soon"
                >
                  <h3 className="font-lora text-stone-600">Multiplayer</h3>
                  <p className="mt-1 font-lato text-sm text-stone-600">
                    Head-to-head word duels and private lobbies.
                  </p>
                  <span className="mt-3 inline-block rounded-full bg-stone-300 px-4 py-1 text-sm text-stone-700">
                    Coming Soon
                  </span>
                </div>
              </div>
            </section>

            {/* Helpful links */}
            <nav aria-label="Helpful links" className="mt-10">
              <ul className="flex flex-wrap gap-3">
                <li>
                  <Link
                    to="/words-list"
                    className="rounded-full border border-stone-300 px-3 py-1 text-sm hover:bg-stone-50"
                  >
                    Words List (3–9 letters)
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="mt-10">
              <SocialLinks />
            </div>
          </main>
        </>
      ) : null}

      {/* Nested routes render here */}
      <Outlet />
    </div>
  );
}
