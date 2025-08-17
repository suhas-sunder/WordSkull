import { MetaFunction } from "@remix-run/node";
import { useMemo } from "react";
import { useMatches } from "@remix-run/react"; // use Remix hook
import { v4 as uuidv4 } from "uuid";
import SocialLinks from "../client/components/navigation/SocialLinks";

type RootData = {
  canonical?: string;
  words?: Record<number, string[]>;
};
type Match = { id: string; data?: RootData };

const LENGTH = 7;

/* ===================== META ===================== */
export const meta: MetaFunction = ({ matches }) => {
  const root = matches.find((m) => m.id === "root") as Match | undefined;
  const words = root?.data?.words;

  // Prefer direct map by length; fallback to array order (3..9 -> index 0..6)
  const count =
    words?.[LENGTH]?.length ??
    (words ? Object.values(words)[LENGTH - 3]?.length ?? undefined : undefined);

  const title = `All ${LENGTH}-Letter Words for Word Games | Word Skull`;
  const desc = count
    ? `Browse ${count.toLocaleString()} curated ${LENGTH}-letter words for word games like Wordle, crosswords, anagrams, and cryptograms. Great for practice, puzzles, and vocabulary building.`
    : `Browse curated ${LENGTH}-letter words for word games like Wordle, crosswords, anagrams, and cryptograms. Great for practice, puzzles, and vocabulary building.`;

  const url =
    root?.data?.canonical ??
    `https://www.wordskull.com/words-list/all-${LENGTH}-letter-words-for-word-games`;

  return [
    { title },
    { name: "description", content: desc },
    // Social
    { property: "og:title", content: title },
    { property: "og:description", content: desc },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: desc },
    // Crawling hint
    { name: "robots", content: "index,follow,max-image-preview:large" },
  ];
};

/* ===================== PAGE ===================== */
export default function SevenLetterWords() {
  const matches = useMatches() as Match[];

  const { words, canonical } = useMemo(() => {
    const root = matches.find((m) => m.id === "root")?.data;
    return {
      words: root?.words,
      canonical:
        root?.canonical ??
        `https://www.wordskull.com/words-list/all-${LENGTH}-letter-words-for-word-games`,
    };
  }, [matches]);

  // Build the list
  const list: string[] =
    (words?.[LENGTH] as string[] | undefined) ??
    (words ? (Object.values(words)[LENGTH - 3] as string[]) : []) ??
    [];

  const count = list.length;

  // JSON-LD for rich results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `All ${LENGTH}-Letter Words for Word Games`,
    url: canonical,
    isPartOf: {
      "@type": "WebSite",
      name: "Word Skull",
      url: "https://www.wordskull.com",
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
          name: "Words List",
          item: "https://www.wordskull.com/words-list",
        },
        { "@type": "ListItem", position: 3, name: `${LENGTH}-Letter Words` },
      ],
    },
    about: [
      { "@type": "Thing", name: "word games" },
      { "@type": "Thing", name: `${LENGTH}-letter words` },
      { "@type": "Thing", name: "Wordle" },
      { "@type": "Thing", name: "crosswords" },
      { "@type": "Thing", name: "anagrams" },
      { "@type": "Thing", name: "cryptograms" },
    ],
    numberOfItems: count,
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      {/* SEO: JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header>
        <h1 className="mt-[0.7em] text-5xl font-nunito text-skull-dark-brown mb-12">
          All {LENGTH}-Letter Words for Word & Puzzle Games
        </h1>
      </header>

      <main className="flex max-w-[1200px] flex-col w-full">
        <div
          className="flex flex-col gap-5 justify-center items-center"
          key={uuidv4()}
        >
          <h2 className="text-2xl">
            There {count === 1 ? "is" : "are"} {count.toLocaleString()} word
            {count === 1 ? "" : "s"} in this list!
          </h2>

          {/* Semantic list; preserves your grid look */}
          <ul className="grid grid-cols-12 gap-5">
            {list.map((word) => (
              <li key={word} className="col-span-3 sm:col-span-2 md:col-span-1">
                {word}
              </li>
            ))}
          </ul>

          {/* Minimal internal nav for UX + crawlability (keeps your styling) */}
          <nav className="mt-6 text-pumpkin-orange">
            <a
              className="hover:text-amber-600 font-lora mr-4"
              href="/words-list/all-6-letter-words-for-word-games"
            >
              ← 6-letter words
            </a>
            <a
              className="hover:text-amber-600 font-lora"
              href="/words-list/all-8-letter-words-for-word-games"
            >
              8-letter words →
            </a>
          </nav>
        </div>

        <SocialLinks />
      </main>
    </div>
  );
}
