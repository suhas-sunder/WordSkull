import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import SocialLinks from "../client/components/navigation/SocialLinks";

type WordsMap = Record<number, string[]>;
const LENGTH = 8;

/* ===================== LOADER ===================== */
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const canonical = `${url.origin}/words-list/all-${LENGTH}-letter-words-for-word-games`;

  let words: WordsMap | undefined;

  try {
    const { default: GetWordsForSkull } = await import(
      "../client/components/utils/requests/GetWordsForSkull"
    );

    const resOrObj = await GetWordsForSkull();

    // Works whether the util returns a fetch Response or a plain object
    if (resOrObj && typeof (resOrObj as any).json === "function") {
      const data = await (resOrObj as Response).json();
      words = data?.words as WordsMap | undefined;
    } else {
      words = ((resOrObj as any)?.words ?? resOrObj) as WordsMap | undefined;
    }
  } catch (e) {
    console.error("GetWordsForSkull failed in 8-letter route:", e);
  }

  const list: string[] =
    (words?.[LENGTH] as string[] | undefined) ??
    (words ? (Object.values(words)[LENGTH - 3] as string[]) : []) ??
    [];

  return json({
    canonical,
    list,
    count: list.length,
  });
};

/* ===================== META ===================== */
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const count = data?.count;
  const title = `All ${LENGTH}-Letter Words for Word Games | Word Skull`;
  const desc = count
    ? `Browse ${count.toLocaleString()} curated ${LENGTH}-letter words for word games like Wordle, crosswords, anagrams, and cryptograms. Ideal for practice, puzzles, and vocabulary building.`
    : `Browse curated ${LENGTH}-letter words for word games like Wordle, crosswords, anagrams, and cryptograms. Ideal for practice, puzzles, and vocabulary building.`;

  const url =
    data?.canonical ??
    `https://www.wordskull.com/words-list/all-${LENGTH}-letter-words-for-word-games`;

  return [
    { title },
    { name: "description", content: desc },
    { property: "og:title", content: title },
    { property: "og:description", content: desc },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: desc },
    { name: "robots", content: "index,follow,max-image-preview:large" },
  ];
};

/* ===================== PAGE ===================== */
export default function EightLetterWords() {
  const { list, count, canonical } = useLoaderData<typeof loader>();
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
            There {count === 1 ? "is" : "are"} {count.toLocaleString()} word
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
