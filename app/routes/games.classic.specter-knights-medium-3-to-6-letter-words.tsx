import type { MetaFunction } from "@remix-run/node";
import ClassicGameLogic from "../client/components/layout/ClassicGameLogic";
import ClassicGameplayInstructions from "../client/components/layout/ClassicGameplayInstructions";
import { useMemo } from "react";
import { useMatches } from "react-router-dom";
import SocialLinks from "../client/components/navigation/SocialLinks";
import GameLinks from "../client/components/layout/GameLinks";
import { WordsData } from "./games.classic.boneheads-easy-3-to-5-letter-words";

type RootMatch = { id: string; data?: { canonical?: string } };

// ---------- META ----------
export const meta: MetaFunction = ({ matches }) => {
  const root = matches.find((m) => m.id === "root") as RootMatch | undefined;

  // Fallback canonical if root loader didn't provide one
  const canonical =
    root?.data?.canonical ??
    "https://www.wordskull.com/games/classic/specter-knights-medium-3-to-6-letter-words";

  const title = "Word Skull Classic Medium (3–6 Letter Words) | Specter Mode";
  const description =
    "Sharpen your skills in Specter (Medium). Guess 3–6 letter words, build vocabulary, and climb difficulty—perfect for quick, satisfying word-puzzle sessions.";

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
    // Crawl directives
    { name: "robots", content: "index,follow,max-image-preview:large" },
  ];
};

// ---------- PAGE ----------
export default function WordSkullMedium() {
  const matches = useMatches();
  const wordsData = useMemo(() => {
    const match = matches?.find((m) => (m?.data as WordsData)?.words);
    return match?.data as WordsData;
  }, [matches]);

  // Canonical for JSON-LD
  const root = matches.find((m) => m.id === "root") as RootMatch | undefined;
  const canonical =
    root?.data?.canonical ??
    "https://www.wordskull.com/games/classic/specter-knights-medium-3-to-6-letter-words";

  // JSON-LD (Breadcrumb + WebApplication)
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
          { "@type": "ListItem", position: 4, name: "Specter (Medium)" },
        ],
      },
      {
        "@type": "WebApplication",
        name: "Word Skull Classic: Specter (Medium)",
        url: canonical,
        applicationCategory: "Game",
        operatingSystem: "Web",
        inLanguage: "en",
        genre: ["Word", "Puzzle"],
        description:
          "Play Specter (Medium) in Word Skull Classic. Guess 3–6 letter words, expand vocabulary, and enjoy quick, challenging rounds.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "Word Skull" },
      },
    ],
  };

  return (
    <>
      {/* Accessible H1 for SEO without changing your layout */}
      <h1 className="sr-only">
        Word Skull Classic Specter (Medium) · 3–6 Letter Words
      </h1>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* GAME */}
      <ClassicGameLogic
        startPosition={4}
        endPosition={8}
        lettersPerSkull="Medium Difficulty: 3 - 6 letters"
        wordsData={wordsData}
        difficulty="medium"
        gameMode="classic"
      />

      {/* Cross-links to other modes */}
      <GameLinks />

      {/* How to play */}
      <section className="mt-20">
        <ClassicGameplayInstructions />
      </section>

      {/* Socials */}
      <section>
        <SocialLinks />
      </section>
    </>
  );
}
