import { Link, useMatches } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

/* ===================== TYPES ===================== */
type RootData = { canonical?: string };
type Match = { id: string; data?: RootData };

type LoreEntry = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO, e.g. "2025-08-17"
  imageWebp?: string;
  imageJpg?: string;
  imageAlt?: string;
  arc?: string; // optional story arc label
};

/* ===================== DATA ===================== */
// Temporary static list — swap to your loader later
// Only include chapters that actually exist to avoid 404s.
const entries: LoreEntry[] = [
  {
    slug: "wordskull-chapter-1-the-wizards-rise-who-was-atriocsoul",
    title: "Chapter 1: The Wizard’s Rise",
    description:
      "Who was Atriocsoul? The scholar who scorned death, forged a dungeon of riddles, and left an army of skulls to outlast him.",
    date: "2025-08-20",
    imageWebp: "https://www.doodlegarden.com/img/wordskull-lore-chapter-1.webp",
    imageJpg: "https://www.doodlegarden.com/img/wordskull-lore-chapter-1.jpg",
    imageAlt:
      "A dim hall lined with skull sentinels, a black stone pulsing at its heart",
    arc: "Origins",
  },
];

/* ===================== META ===================== */
export const meta: MetaFunction = ({ matches }) => {
  const root = matches.find((m) => m.id === "root") as Match | undefined;

  const url = root?.data?.canonical ?? "https://www.wordskull.com/lore";
  const title = "WordSkull Lore | Worldbuilding, Chapters, and Myths";
  const description =
    "Read the official WordSkull lore. Chapters, arcs, and codex entries that expand the dungeon world, its factions, artifacts, and legends.";
  const ogImage = "https://www.wordskull.com/og/lore/wordskull-lore.jpg";

  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:site_name", content: "WordSkull" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { property: "og:image:alt", content: "WordSkull Lore cover" },
    { property: "og:locale", content: "en_US" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
    {
      name: "robots",
      content:
        "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    },
  ];
};

/* ===================== HELPERS ===================== */
function formatDate(iso: string) {
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
}

function buildJsonLdLore(canonical: string, items: LoreEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "WordSkull Lore",
    url: canonical,
    hasPart: {
      "@type": "ItemList",
      itemListElement: items.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://www.wordskull.com/lore/${p.slug}`,
        name: p.title,
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
        {
          "@type": "ListItem",
          position: 2,
          name: "Lore",
          item: canonical,
        },
      ],
    },
  };
}

/* ===================== THUMB (no nested Link) ===================== */
function LoreThumb({
  entry,
  priority = false,
}: {
  entry: LoreEntry;
  priority?: boolean;
}) {
  const hasSources = entry.imageWebp || entry.imageJpg;
  if (!hasSources) return null;

  const alt = entry.imageAlt ?? entry.title;
  // Fixed intrinsic size to reduce CLS; adjust to your real aspect
  const width = 900;
  const height = 400;

  return (
    <picture>
      {entry.imageWebp ? (
        <source srcSet={entry.imageWebp} type="image/webp" />
      ) : null}
      {entry.imageJpg ? (
        <source srcSet={entry.imageJpg} type="image/jpeg" />
      ) : null}
      <img
        src={entry.imageJpg || entry.imageWebp!}
        alt={alt}
        width={width}
        height={height}
        className="mb-3 h-40 w-full rounded-xl object-cover"
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
      />
    </picture>
  );
}

/* ===================== PAGE ===================== */
export default function LoreIndex() {
  const matches = useMatches();
  const root = matches.find((m) => m.id === "root") as Match | undefined;
  const canonical = root?.data?.canonical ?? "https://www.wordskull.com/lore";

  // Sort newest first (trivial with one item, but keeps logic ready)
  const sorted = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const jsonLd = buildJsonLdLore(canonical, sorted);

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-stone-200 bg-stone-100 mt-5">
        <div className="mx-auto max-w-[1200px] px-6 pt-8 pb-5">
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
              <li aria-current="page" className="text-amber-600 font-bold">
                Lore
              </li>
            </ol>
          </nav>

          <h1 className="mt-1 font-nunito text-2xl tracking-wide text-skull-dark-brown">
            WordSkull Lore
          </h1>
          <p className="mt-2 max-w-2xl font-lato text-stone-700">
            Chapters, arcs, and codex entries that build the world behind the
            puzzles.
          </p>
        </div>
      </header>

      {/* Grid of lore entries */}
      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <section aria-labelledby="lore-list">
          <h2 id="lore-list" className="sr-only">
            Recent lore
          </h2>

          {sorted.length === 0 ? (
            <p className="text-stone-600">No lore yet. Check back soon.</p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sorted.map((entry, idx) => (
                <li key={entry.slug}>
                  <Link
                    to={`/lore/${entry.slug}`}
                    className="group block rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pumpkin-orange/70"
                    aria-label={`Read: ${entry.title}`}
                  >
                    {/* Thumbnail */}
                    <LoreThumb entry={entry} priority={idx < 3} />

                    {/* Header */}
                    <header>
                      <h3 className="font-lora text-lg leading-snug text-pumpkin-orange transition group-hover:text-amber-600">
                        <span>{entry.title}</span>
                      </h3>
                      <p className="mt-1 text-xs text-stone-500">
                        {formatDate(entry.date)}
                        {entry.arc ? (
                          <span className="ml-2 rounded-full bg-stone-100 px-2 py-0.5 text-[10px] uppercase tracking-wide text-stone-600">
                            {entry.arc}
                          </span>
                        ) : null}
                      </p>
                    </header>

                    {/* Excerpt */}
                    <p className="mt-3 line-clamp-3 text-sm text-stone-700">
                      {entry.description}
                    </p>

                    {/* Faux button */}
                    <span className="mt-4 inline-block rounded-full bg-pumpkin-orange px-4 py-1 text-sm text-white transition group-hover:bg-amber-600">
                      Read
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
