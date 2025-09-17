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
  category: CategoryKey; // NEW: which section this belongs to
};

type CategoryKey =
  | "story"
  | "employeeLogs"
  | "ancientRumors"
  | "playerJournals"
  | "testimonials";

/* ===================== CATEGORY DEFINITIONS ===================== */
const CATEGORIES: Record<
  CategoryKey,
  { title: string; id: string; blurb: string }
> = {
  story: {
    title: "✦ Story: The WordSkull Saga",
    id: "story",
    blurb:
      "Mainline narrative chapters that build the dark-fantasy world behind the word puzzles, skull battles, and dungeon trials.",
  },
  employeeLogs: {
    title: "✦ Employee Logs: Faction Lore & Deep Dives",
    id: "employee-logs",
    blurb:
      "In-universe memos and dossiers exploring factions, magic systems, and how skull sentinels enforce puzzle law.",
  },
  ancientRumors: {
    title:
      "✦ Addressing Ancient Survivor Logs & Rumors of the Skull Dungeon (Misinformation)",
    id: "ancient-rumors",
    blurb:
      "Archival notes debunking myths, hoaxes, and campfire tales about the dungeon’s origins and cursed mechanics.",
  },
  playerJournals: {
    title:
      "✦ Addressing The Player Journals & Adventurer Logs (Misinformation)",
    id: "player-journals",
    blurb:
      "Player-side accounts investigated: what’s real, what’s survivorship bias, and what the skulls want you to believe.",
  },
  testimonials: {
    title:
      "✦ Tales of Riches & Wisdom: Testimonials from Adventurers Who Made It Big!",
    id: "testimonials",
    blurb:
      "First-person victories, near-misses, and strategies that turned dungeon puzzles into treasure and hard-earned lessons.",
  },
};

/* ===================== DATA ===================== */
// Temporary static list   swap to your loader later
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
    category: "story",
  },
];

/* ===================== META ===================== */
export const meta: MetaFunction = ({ matches }) => {
  const root = matches.find((m) => m.id === "root") as Match | undefined;

  const url = root?.data?.canonical ?? "https://www.wordskull.com/lore";
  const title = "WordSkull Lore | Fantasy Story, Factions & Player Journals";
  const description =
    "Explore WordSkull lore: main story chapters, faction deep dives, rumors, and adventurer journals. Where fantasy storytelling meets word puzzle strategy.";

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

// Build JSON-LD with a separate ItemList per section for richer section SEO
function buildJsonLdLore(
  canonical: string,
  allItems: LoreEntry[],
  categories: typeof CATEGORIES
) {
  const lists = (Object.keys(categories) as CategoryKey[]).map((key) => {
    const items = allItems.filter((e) => e.category === key);
    return {
      "@type": "ItemList",
      name: categories[key].title,
      numberOfItems: items.length,
      itemListElement:
        items.length === 0
          ? []
          : items.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://www.wordskull.com/lore/${p.slug}`,
              name: p.title,
            })),
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "WordSkull Lore",
    url: canonical,
    hasPart: lists,
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

  // Sort newest first (works per-section as well)
  const sorted = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const jsonLd = buildJsonLdLore(canonical, sorted, CATEGORIES);

  // Helper: render a section for a given category key
  const renderSection = (key: CategoryKey) => {
    const meta = CATEGORIES[key];
    const items = sorted.filter((e) => e.category === key);

    return (
      <section
        key={key}
        id={meta.id}
        aria-labelledby={`${meta.id}-heading`}
        className="mb-10"
      >
        <header className="mb-3">
          <h2
            id={`${meta.id}-heading`}
            className="font-lora text-xl sm:text-2xl text-pumpkin-orange"
          >
            {meta.title}
          </h2>
          <p className="mt-1   text-stone-600 max-w-3xl">{meta.blurb}</p>
        </header>

        {items.length === 0 ? (
          <p className="text-stone-600   italic">
            Entries coming soon. Check back for new chapters and dungeon intel.
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((entry, idx) => (
              <li key={entry.slug}>
                <Link
                  to={`/lore/${entry.slug}`}
                  className="group block rounded-2xl border border-pumpkin-orange bg-white p-5 shadow-sm transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pumpkin-orange/70"
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
                  <p className="mt-3 line-clamp-3   text-stone-700">
                    {entry.description}
                  </p>

                  {/* Faux button */}
                  <span className="mt-4 inline-block rounded-full bg-pumpkin-orange px-4 py-1   text-white transition group-hover:bg-amber-600">
                    Read
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-pumpkin-orange bg-stone-100 mt-5">
        <div className="mx-auto max-w-[1200px] px-6 pt-8 pb-5">
          <nav aria-label="Breadcrumb" className="mb-2  ">
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
            Chapters, factions, rumors, and first-hand journals from the dungeon
            built for fans of <strong>word games</strong>,{" "}
            <strong>puzzle strategy</strong>, and <strong>dark fantasy</strong>.
          </p>
        </div>
      </header>

      {/* Sectioned Lore */}
      <main className="mx-auto max-w-[1200px] px-6 py-8">
        {/* Story */}
        {renderSection("story")}

        {/* Employee Logs: Faction Lore & Deep Dives */}
        {renderSection("employeeLogs")}

        {/* Addressing Ancient Survivor Logs & Rumors */}
        {renderSection("ancientRumors")}

        {/* Addressing Player Journals & Adventurer Logs */}
        {renderSection("playerJournals")}

        {/* Testimonials */}
        {renderSection("testimonials")}
      </main>

      {/* === LORE FAQ === */}
      <section
        id="lore-faq"
        aria-labelledby="lore-faq-heading"
        className="mx-auto max-w-[1200px] px-6 pb-12"
      >
        <header className="mb-3">
          <h2
            id="lore-faq-heading"
            className="font-lora text-xl sm:text-2xl text-pumpkin-orange"
          >
            Lore FAQ
          </h2>
          <p className="mt-1   text-stone-600 max-w-3xl">
            Answers for word-game fans and dungeon-delvers: how the story ties
            into puzzle strategy, where to start, and what’s coming next.
          </p>
        </header>

        <div className="mt-3 space-y-3 text-pumpkin-orange">
          <details className="rounded-lg border border-pumpkin-orange p-3 ">
            <summary className="cursor-pointer font-semibold">
              What is WordSkull lore, and do I need it to enjoy the game?
            </summary>
            <p className="mt-2  ">
              Lore is the narrative world behind the skull battles and word
              puzzles. You can play without reading it, but the story adds
              stakes, context, and long-term motivation especially if you enjoy
              dark fantasy.
            </p>
          </details>

          <details className="rounded-lg border border-pumpkin-orange p-3 ">
            <summary className="cursor-pointer font-semibold">
              How is the lore organized on this page?
            </summary>
            <p className="mt-2  ">
              We group entries into <strong>Story</strong> (main chapters),{" "}
              <strong>Employee Logs</strong> (faction deep dives),
              <strong> Ancient Rumors</strong> (myth-busting archival notes),{" "}
              <strong>Player Journals</strong> (investigated accounts), and{" "}
              <strong>Testimonials</strong> (wins, losses, and lessons from
              adventurers).
            </p>
          </details>

          <details className="rounded-lg border border-pumpkin-orange p-3 ">
            <summary className="cursor-pointer font-semibold">
              Where should a new reader start?
            </summary>
            <p className="mt-2  ">
              Begin with{" "}
              <Link
                to="/lore/wordskull-chapter-1-the-wizards-rise-who-was-atriocsoul"
                className="text-pumpkin-orange hover:text-amber-600 font-lora"
              >
                Chapter 1: The Wizard’s Rise
              </Link>
              . It introduces Atriocsoul, the Skull Guard, and the dungeon’s
              rules.
            </p>
          </details>

          <details className="rounded-lg border border-pumpkin-orange p-3 ">
            <summary className="cursor-pointer font-semibold">
              Does reading the lore help me get better at word and puzzle games?
            </summary>
            <p className="mt-2  ">
              Indirectly, yes. The chapters and logs highlight the same skills
              you need in WordSkull pattern recognition, probe discipline, and
              managing “forks” in candidate words so you’ll pick up strategy
              cues as you read.
            </p>
          </details>

          <details className="rounded-lg border border-pumpkin-orange p-3 ">
            <summary className="cursor-pointer font-semibold">
              Is WordSkull like Wordle, Quordle, or other word games?
            </summary>
            <p className="mt-2  ">
              WordSkull keeps the satisfying letter-feedback loop you know from
              daily word games, then adds variable word lengths (3–9), scalable
              difficulty, and a fantasy progression layer with skull “boss”
              encounters.
            </p>
          </details>

          <details className="rounded-lg border border-pumpkin-orange p-3 ">
            <summary className="cursor-pointer font-semibold">
              How often are new chapters or logs published?
            </summary>
            <p className="mt-2  ">
              We aim for a steady cadence. Check the <strong>Story</strong>{" "}
              section first for mainline updates, and watch
              <strong> Employee Logs</strong> for world-building between
              chapters.
            </p>
          </details>

          <details className="rounded-lg border border-pumpkin-orange p-3 ">
            <summary className="cursor-pointer font-semibold">
              Are there spoilers in the lore?
            </summary>
            <p className="mt-2  ">
              Chapters may foreshadow mechanics or boss behaviors, but core
              puzzle solutions aren’t spoiled. If an entry references later
              events, we’ll label it to keep your first run fresh.
            </p>
          </details>

          <details className="rounded-lg border border-pumpkin-orange p-3 ">
            <summary className="cursor-pointer font-semibold">
              Can I stream or use lore excerpts in classroom materials?
            </summary>
            <p className="mt-2  ">
              Yes, with attribution and links back to the source page. Please
              keep excerpts reasonable and non-commercial where required.
            </p>
          </details>

          <details className="rounded-lg border border-pumpkin-orange p-3 ">
            <summary className="cursor-pointer font-semibold">
              How does lore tie into WordSkull’s difficulty modes?
            </summary>
            <p className="mt-2  ">
              The dungeon’s “trials” mirror mode scaling: short words train
              speed and letter coverage; longer words stress pattern pruning,
              anagrams, and cluster testing just like the tougher skull
              encounters.
            </p>
          </details>

          <details className="rounded-lg border border-pumpkin-orange p-3 ">
            <summary className="cursor-pointer font-semibold">
              What’s the best next step after reading a chapter?
            </summary>
            <p className="mt-2  ">
              Jump into a quick session and apply a takeaway like running a
              probe that splits two candidate families. Start here:&nbsp;
              <Link
                to="/"
                className="text-pumpkin-orange hover:text-amber-600 font-lora"
              >
                Play WordSkull
              </Link>
              .
            </p>
          </details>
        </div>
      </section>

      <script
        type="application/ld+json"
        // JSON-LD for the FAQ section
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is WordSkull lore, and do I need it to enjoy the game?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Lore is the narrative world behind the skull battles and word puzzles. You can play without reading it, but the story adds stakes, context, and long-term motivation especially if you enjoy dark fantasy.",
                },
              },
              {
                "@type": "Question",
                name: "How is the lore organized on this page?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Entries are grouped into Story (main chapters), Employee Logs (faction deep dives), Ancient Rumors (myth-busting archival notes), Player Journals (investigated accounts), and Testimonials (wins, losses, and lessons from adventurers).",
                },
              },
              {
                "@type": "Question",
                name: "Where should a new reader start?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Start with Chapter 1: The Wizard’s Rise. It introduces Atriocsoul, the Skull Guard, and the dungeon’s rules.",
                },
              },
              {
                "@type": "Question",
                name: "Does reading the lore help me get better at word and puzzle games?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Indirectly, yes. The chapters and logs highlight the same skills you need in WordSkull pattern recognition, probe discipline, and managing forks in candidate words so you’ll pick up strategy cues as you read.",
                },
              },
              {
                "@type": "Question",
                name: "Is WordSkull like Wordle, Quordle, or other word games?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "WordSkull keeps the familiar letter-feedback loop from daily word games, then adds variable word lengths (3–9), scalable difficulty, and a fantasy progression layer with skull boss encounters.",
                },
              },
              {
                "@type": "Question",
                name: "How often are new chapters or logs published?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We aim for a steady cadence. Check the Story section first for mainline updates, and watch Employee Logs for world-building between chapters.",
                },
              },
              {
                "@type": "Question",
                name: "Are there spoilers in the lore?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Chapters may foreshadow mechanics or boss behaviors, but core puzzle solutions are not spoiled. If an entry references later events, it will be labeled to protect new players.",
                },
              },
              {
                "@type": "Question",
                name: "Can I stream or use lore excerpts in classroom materials?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, with attribution and links back to the source page. Please keep excerpts reasonable and non-commercial where required.",
                },
              },
              {
                "@type": "Question",
                name: "How does lore tie into WordSkull’s difficulty modes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The dungeon’s trials mirror mode scaling: short words train speed and letter coverage; longer words stress pattern pruning, anagrams, and cluster testing just like the tougher skull encounters.",
                },
              },
              {
                "@type": "Question",
                name: "What’s the best next step after reading a chapter?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Jump into a quick session and apply a takeaway such as running a probe that splits two candidate families then iterate to build skill.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
