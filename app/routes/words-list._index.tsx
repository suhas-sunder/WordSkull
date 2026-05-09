import { MetaFunction } from "@remix-run/node";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useMatches } from "@remix-run/react";
import { useTheme } from "../client/components/context/ThemeContext";
import SocialLinks from "../client/components/navigation/SocialLinks";
import { getCanonicalUrl } from "../shared/routes";
import { getTotalWordCount, getWordCountsByLength } from "../shared/wordData";

type RootData = {
  canonical?: string;
};
type Match = { id: string; data?: RootData };

const LENGTHS = [3, 4, 5, 6, 7, 8, 9] as const;

/* ===================== META ===================== */
export const meta: MetaFunction = ({ matches }) => {
  const root = matches.find((m) => m.id === "root") as Match | undefined;
  const total = getTotalWordCount();

  const title = "All 3-9 Letter Words for Word Games | WordSkull";
  const desc = total
    ? `Browse ${total.toLocaleString()} words by length (3-9 letters) for Wordle, crosswords, anagrams, and more. Great for puzzles and practice.`
    : "Browse words by length (3-9 letters) for Wordle, crosswords, anagrams, and more. Great for puzzles and practice.";

  const url = root?.data?.canonical ?? getCanonicalUrl("/words-list");
  const ogImage = "https://www.wordskull.com/og/wordskull-words-list.jpg";

  return [
    // Title & Description
    { title },
    { name: "description", content: desc },

    // Canonical
    { tagName: "link", rel: "canonical", href: url },

    // Open Graph
    { property: "og:site_name", content: "WordSkull" },
    { property: "og:title", content: title },
    { property: "og:description", content: desc },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { property: "og:image:alt", content: "WordSkull word lists by length" },
    { property: "og:locale", content: "en_US" },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: desc },
    { name: "twitter:image", content: ogImage },

    // Robots (consistent, non-conflicting)
    {
      name: "robots",
      content:
        "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    },

    // Optional helpful keywords
    {
      name: "keywords",
      content:
        "word lists, 3 letter words, 4 letter words, 5 letter words, 6 letter words, 7 letter words, 8 letter words, 9 letter words, word games, crossword helper, anagram helper",
    },
  ];
};

/* ===================== PAGE ===================== */
export default function AllWordsForWordGame() {
  const { darkThemeActive } = useTheme();
  const matches = useMatches() as Match[];

  const { canonical, countsByLen } = useMemo(() => {
    const root = matches.find((m) => m.id === "root")?.data;

    return {
      canonical: root?.canonical ?? getCanonicalUrl("/words-list"),
      countsByLen: getWordCountsByLength(),
    };
  }, [matches]);

  // JSON-LD: Breadcrumb + ItemList of the 7 subpages
  const itemList = LENGTHS.map((n, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: `${n}-letter words`,
    url: `https://www.wordskull.com/words-list/all-${n}-letter-words-for-word-games`,
  }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "All 3–9 Letter Words for Word Games",
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
        { "@type": "ListItem", position: 2, name: "Words List" },
      ],
    },
    hasPart: {
      "@type": "ItemList",
      itemListElement: itemList,
    },
  };

  const linkColor = darkThemeActive ? "text-amber-600" : "text-pumpkin-orange";

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      {/* SEO: JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header>
        <h1 className="mt-[0.7em] text-3xl font-nunito text-skull-dark-brown mb-3">
          Words List - Word & Puzzle Games
        </h1>
        <p className="text-center font-lato text-skull-super-dark-brown/90 max-w-2xl">
          Explore curated word lists by length. Perfect for training, solving
          crosswords, leveling up at anagrams, and sharpening your Wordle
          instincts.
        </p>
      </header>

      <main className="flex max-w-[1200px] flex-col w-full justify-center items-center gap-8">
        {/* Sections with small captions + counts, keeps your colors/typography */}
        <div className="grid sm:grid-cols-2 sm:gap-x-16 gap-y-6 mt-6">
          {LENGTHS.map((n) => (
            <div key={n} className="flex flex-col">
              <Link
                className={`${linkColor} hover:text-amber-600 font-lora`}
                to={`/words-list/all-${n}-letter-words-for-word-games`}
              >
                View list of all {n}-letter words
              </Link>
              <span className="text-sm text-stone-500">
                {typeof countsByLen[n] === "number"
                  ? `${countsByLen[n]?.toLocaleString()} words`
                  : "Loading word count…"}
              </span>
            </div>
          ))}
        </div>

        {/* Quick jump nav */}
        <nav
          aria-label="Quick jump by length"
          className="flex flex-wrap gap-2 pt-2"
        >
          {LENGTHS.map((n) => (
            <Link
              key={`pill-${n}`}
              to={`/words-list/all-${n}-letter-words-for-word-games`}
              className="rounded-full border border-stone-300 px-3 py-1 text-sm dark:border-stone-700 hover:bg-pumpkin-orange hover:text-white hover:border-pumpkin-orange"
            >
              {n}-letter
            </Link>
          ))}
        </nav>

        <SocialLinks />
      </main>
    </div>
  );
}
