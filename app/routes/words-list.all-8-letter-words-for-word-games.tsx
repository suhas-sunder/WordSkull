import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import SocialLinks from "../client/components/navigation/SocialLinks";
import { getCanonicalUrl } from "../shared/routes";
import { getWordsByLength } from "../shared/wordData";

const LENGTH = 8;
const canonical = getCanonicalUrl(
  "/words-list/all-8-letter-words-for-word-games"
);
const list = getWordsByLength(LENGTH);
const count = list.length;

export const meta: MetaFunction = () => {
  const title = "All 8-Letter Words for Word Games | WordSkull";
  const desc = count
    ? `Discover ${count.toLocaleString(
        "en-US"
      )} 8-letter words for advanced puzzles, anagrams, and crosswords. Ideal for Scrabble strategy and vocab expansion.`
    : "Discover 8-letter words for advanced puzzles, anagrams, and crosswords. Ideal for Scrabble strategy and vocab expansion.";

  const url = canonical;
  const ogImage = "https://www.wordskull.com/og/wordskull-words-8.jpg";

  return [
    { title },
    { name: "description", content: desc },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: title },
    { property: "og:description", content: desc },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { property: "og:image:alt", content: "WordSkull 8-letter word list" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: desc },
    { name: "twitter:image", content: ogImage },
    {
      name: "robots",
      content:
        "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    },
  ];
};

/* ===================== PAGE ===================== */
export default function EightLetterWords() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (word: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(word);
      } else {
        // Fallback for older browsers
        const ta = document.createElement("textarea");
        ta.value = word;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(word);
      window.setTimeout(() => setCopied(null), 1200);
    } catch {
      // even if copy fails, we don’t crash UI
      setCopied(null);
    }
  };

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
        <div className="flex flex-col gap-5 justify-center items-center">
          <h2 className="text-2xl">
            There {count === 1 ? "is" : "are"} {count.toLocaleString("en-US")}{" "}
            word
            {count === 1 ? "" : "s"} in this list!
          </h2>

          {/* Copyable word buttons */}
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 w-full">
            {list.map((word) => (
              <li key={word}>
                <button
                  type="button"
                  title="Click to copy"
                  aria-label={`Copy ${word} to clipboard`}
                  onClick={() => handleCopy(word)}
                  className="group relative flex h-14 w-full items-center justify-center
                   rounded-xl border border-pumpkin-orange/30 bg-white/90 px-3 shadow-sm transition hover:border-pumpkin-orange/60
                   hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-pumpkin-orange
                   active:scale-[0.98]"
                >
                  {/* The word stays centered */}
                  <span className="font-semibold tracking-wide text-skull-dark-brown">
                    {word}
                  </span>

                  {/* Hover/focus hint: centered at bottom, no layout shift, no overlap */}
                  <span
                    className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2
                     text-[11px] leading-none text-pumpkin-orange/80 opacity-0
                     transition-opacity duration-150
                     group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    Tap to copy
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* Pagination-ish nav */}
          <nav className="mt-6 text-pumpkin-orange">
            <a
              className="hover:text-amber-600 font-lora mr-4"
              href="/words-list/all-7-letter-words-for-word-games"
            >
              ← 7-letter words
            </a>
            <a
              className="hover:text-amber-600 font-lora"
              href="/words-list/all-9-letter-words-for-word-games"
            >
              9-letter words →
            </a>
          </nav>
        </div>

        <SocialLinks />
      </main>

      {/* Tiny toast for copy feedback */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-4 right-4 z-50"
      >
        {copied && (
          <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-black/90 text-white text-sm px-3 py-2 shadow-lg">
            Copied “{copied}”
          </div>
        )}
      </div>
    </div>
  );
}
