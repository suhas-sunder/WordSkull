import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import SocialLinks from "../client/components/navigation/SocialLinks";

type WordsMap = Record<number, string[]>;
const LENGTH = 6;

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

    // Handle both: fetch Response or plain object
    if (resOrObj && typeof (resOrObj as any).json === "function") {
      const data = await (resOrObj as Response).json();
      words = data?.words as WordsMap | undefined;
    } else {
      words = ((resOrObj as any)?.words ?? resOrObj) as WordsMap | undefined;
    }
  } catch (e) {
    console.error("GetWordsForSkull failed in 6-letter route:", e);
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

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const count = data?.count as number | undefined;

  const title = "All 6-Letter Words for Word Games | WordSkull";
  const desc = count
    ? `Explore ${count.toLocaleString(
        "en-US"
      )} 6-letter words for puzzles like crosswords, anagrams, and Scrabble. Boost problem-solving and vocabulary skills.`
    : "Explore 6-letter words for puzzles like crosswords, anagrams, and Scrabble. Boost problem-solving and vocabulary skills.";

  const url =
    data?.canonical ??
    "https://www.wordskull.com/words-list/all-6-letter-words-for-word-games";
  const ogImage = "https://www.wordskull.com/og/wordskull-words-6.jpg";

  return [
    { title },
    { name: "description", content: desc },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: title },
    { property: "og:description", content: desc },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { property: "og:image:alt", content: "WordSkull 6-letter word list" },
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
export default function SixLetterWords() {
  const { list, count, canonical } = useLoaderData<typeof loader>();
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (word: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(word);
      } else {
        // Fallback for very old browsers
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
    <div className="flex  flex-col justify-center items-center mt-10">
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

          <nav className="mt-6 text-pumpkin-orange">
            <a
              className="hover:text-amber-600 font-lora mr-4"
              href="/words-list/all-5-letter-words-for-word-games"
            >
              ← 5-letter words
            </a>
            <a
              className="hover:text-amber-600 font-lora"
              href="/words-list/all-7-letter-words-for-word-games"
            >
              7-letter words →
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
