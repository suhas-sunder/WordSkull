import type { MetaFunction } from "@remix-run/node";
import ClassicGameLogic from "../client/components/layout/ClassicGameLogic";
import { useMatches } from "react-router-dom";
import { useMemo } from "react";
import SocialLinks from "../client/components/navigation/SocialLinks";
import GameLinks from "../client/components/layout/GameLinks";
import ClassicGameplayInstructions from "../client/components/layout/ClassicGameplayInstructions";

export type WordsData = {
  words?: { [key: number]: string[] };
};

type RootMatch = { id: string; data?: { canonical?: string } };

/* ===================== META ===================== */
export const meta: MetaFunction = ({ matches }) => {
  const root = matches.find((m) => m.id === "root") as RootMatch | undefined;

  // Prefer canonical from root loader; fallback to this route’s public URL
  const canonical =
    root?.data?.canonical ??
    "https://www.wordskull.com/games/classic/boneheads-easy-3-to-5-letter-words";

  const title = "Word Skull Classic Boneheads (Easy, 3–5 Letter Words)";
  const description =
    "Warm up with Word Skull’s Easy mode: Boneheads. Guess 3–5 letter words, build confidence, and get ready for tougher skulls.";

  return [
    { title },
    { name: "description", content: description },
    // canonical
    { tagName: "link", rel: "canonical", href: canonical },
    // Open Graph
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonical },
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    // Robots
    { name: "robots", content: "index,follow,max-image-preview:large" },
  ];
};

/* ===================== PAGE ===================== */
export default function WordSkullEasy() {
  const matches = useMatches();

  const wordsData = useMemo(() => {
    const match = matches?.find((m) => (m?.data as WordsData)?.words);
    return match?.data as WordsData;
  }, [matches]);

  // JSON-LD (Breadcrumbs + WebApplication)
  const root = matches.find((m) => m.id === "root") as RootMatch | undefined;
  const canonical =
    root?.data?.canonical ??
    "https://www.wordskull.com/games/classic/boneheads-easy-3-to-5-letter-words";

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
          { "@type": "ListItem", position: 4, name: "Boneheads (Easy)" },
        ],
      },
      {
        "@type": "WebApplication",
        name: "Word Skull Classic: Boneheads (Easy)",
        url: canonical,
        applicationCategory: "Game",
        operatingSystem: "Web",
        inLanguage: "en",
        genre: ["Word", "Puzzle"],
        description:
          "Play Boneheads (Easy) in Word Skull Classic. Guess 3–5 letter words, build vocabulary, and warm up for Medium and Hard modes.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "Word Skull" },
      },
    ],
  };

  return (
    <>
      {/* Semantic H1 for SEO, invisible to users */}
      <h1 className="sr-only">
        Word Skull Classic Boneheads (Easy) · 3–5 Letter Words
      </h1>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- Your existing UI (unchanged) --- */}
      <ClassicGameLogic
        startPosition={0}
        endPosition={4}
        lettersPerSkull="Easy Difficulty: 3 - 5 letters"
        wordsData={wordsData}
        difficulty="easy"
        gameMode="classic"
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
