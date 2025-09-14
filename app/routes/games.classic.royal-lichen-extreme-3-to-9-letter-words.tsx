import type { MetaFunction } from "@remix-run/node";
import ClassicGameLogic from "../client/components/layout/ClassicGameLogic";
import ClassicGameplayInstructions from "../client/components/layout/ClassicGameplayInstructions";
import { useMatches } from "react-router-dom";
import { useMemo } from "react";
import { WordsData } from "./games.classic.boneheads-easy-3-to-5-letter-words";
import SocialLinks from "../client/components/navigation/SocialLinks";
import GameLinks from "../client/components/layout/GameLinks";

type RootMatch = { id: string; data?: { canonical?: string } };

// ---------- META ----------
export const meta: MetaFunction = ({ matches }) => {
  const root = matches.find((m) => m.id === "root") as RootMatch | undefined;

  // Canonical from root when available, with a safe fallback
  const canonical =
    root?.data?.canonical ??
    "https://www.wordskull.com/games/classic/royal-lichen-extreme-3-to-9-letter-words";

  const title = "Royal Lichen Extreme | Classic WordSkull (3-9 Letter Words)";
  const description =
    "Play Classic WordSkull: Royal Lichen, the Extreme mode. Guess 3-9 letter words to push your vocabulary to the limit and master the hardest challenge.";

  // Real image, 1200x630+, returns 200 OK
  const ogImage = "https://www.wordskull.com/og/wordskull-royal-lichen.jpg";

  return [
    // Title & Description
    { title },
    { name: "description", content: description },

    // Canonical
    { tagName: "link", rel: "canonical", href: canonical },

    // Open Graph
    { property: "og:site_name", content: "WordSkull" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonical },
    { property: "og:image", content: ogImage },
    {
      property: "og:image:alt",
      content: "WordSkull Royal Lichen extreme mode",
    },
    { property: "og:locale", content: "en_US" },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },

    // Robots
    {
      name: "robots",
      content:
        "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    },
  ];
};

// ---------- PAGE ----------
export default function WordSkullExtreme() {
  const matches = useMatches();

  const wordsData = useMemo(() => {
    // Find the first match with valid words data (root loader etc.)
    const match = matches?.find((m) => (m?.data as WordsData)?.words);
    return match?.data as WordsData;
  }, [matches]);

  // For JSON-LD canonical
  const root = matches.find((m) => m.id === "root") as RootMatch | undefined;
  const canonical =
    root?.data?.canonical ??
    "https://www.wordskull.com/games/classic/royal-lichen-extreme-3-to-9-letter-words";

  // JSON-LD: Breadcrumb + WebApplication
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
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
          {
            "@type": "ListItem",
            position: 3,
            name: "Classic",
            item: "https://www.wordskull.com/games/classic",
          },
          { "@type": "ListItem", position: 4, name: "Royal Lichen (Extreme)" },
        ],
      },
      {
        "@type": "WebApplication",
        name: "Word Skull Classic: Royal Lichen (Extreme)",
        url: canonical,
        applicationCategory: "Game",
        operatingSystem: "Web",
        inLanguage: "en",
        genre: ["Word", "Puzzle"],
        description:
          "Play Royal Lichen (Extreme) in Word Skull Classic. Guess 3–9 letter words, expand vocabulary, and conquer the hardest level.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "Word Skull" },
      },
    ],
  };

  return (
    <>
      {/* Accessible H1 for SEO; doesn't change your visual layout */}
      <h1 className="sr-only">
        Word Skull Classic Royal Lichen (Extreme) · 3–9 Letter Words
      </h1>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* GAME UI (unchanged) */}
      <ClassicGameLogic
        startPosition={12}
        endPosition={15}
        lettersPerSkull="Extreme Difficulty: 3 - 9 letters"
        wordsData={wordsData}
        difficulty="extreme"
        gameMode="classic"
        skullNumber={1}
      />

      <GameLinks />

      <section className="mt-20">
        <ClassicGameplayInstructions />
      </section>

      <section>
        <SocialLinks />
      </section>
    </>
  );
}
