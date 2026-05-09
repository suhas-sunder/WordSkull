import type { MetaFunction } from "@remix-run/node";
import ClassicGameLogic from "../client/components/layout/ClassicGameLogic";
import ClassicGameplayInstructions from "../client/components/layout/ClassicGameplayInstructions";
import { useMatches } from "react-router-dom";
import SocialLinks from "../client/components/navigation/SocialLinks";
import GameLinks from "../client/components/layout/GameLinks";

type RootMatch = { id: string; data?: { canonical?: string } };

// ---------- META ----------
export const meta: MetaFunction = ({ matches }) => {
  const root = matches.find((m) => m.id === "root") as RootMatch | undefined;

  // Canonical from root when available, with a safe fallback
  const canonical =
    root?.data?.canonical ??
    "https://www.wordskull.com/games/classic/specter-knights-medium-3-to-6-letter-words";

  const title = "Specter Medium Mode | Classic WordSkull (3-6 Letter Words)";
  const description =
    "Play Classic WordSkull: Specter, the Medium mode. Guess 3-6 letter words, build vocabulary, and climb difficulty with quick, satisfying sessions.";

  // Real image, 1200x630+, must return 200 OK
  const ogImage = "https://www.wordskull.com/og/wordskull-specter.jpg";

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
    { property: "og:image:alt", content: "WordSkull Specter medium mode" },
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
export default function WordSkullMedium() {
  const matches = useMatches();

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
        difficulty="medium"
        gameMode="classic"
        skullNumber={1}
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
