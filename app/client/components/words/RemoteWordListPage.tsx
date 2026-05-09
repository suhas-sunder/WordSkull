import { useCallback, useEffect, useMemo, useState } from "react";
import SocialLinks from "../navigation/SocialLinks";
import type { SortedWordsByLength } from "../../../shared/remoteWordLists";
import {
  SORTED_WORDS_CACHE_KEY,
  getSortedWordsForLength,
  getSortedWordsUrl,
  normalizeSortedWordsPayload,
  readSortedWordsResponse,
} from "../../../shared/remoteWordLists";

type WordListLink = {
  href: string;
  label: string;
};

type RemoteWordListPageProps = {
  length: number;
  canonical: string;
  initialWords: string[];
  navLinks: WordListLink[];
  mainClassName?: string;
};

type ListSource = "curated" | "cache" | "remote";
type LoadState = "loading" | "loaded" | "failed";

function readCachedSortedWords() {
  if (typeof window === "undefined") return {};

  try {
    const cached = window.localStorage.getItem(SORTED_WORDS_CACHE_KEY);
    if (!cached) return {};

    return normalizeSortedWordsPayload(JSON.parse(cached));
  } catch {
    return {};
  }
}

function writeCachedSortedWords(sortedWords: SortedWordsByLength) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      SORTED_WORDS_CACHE_KEY,
      JSON.stringify(sortedWords)
    );
  } catch {
    // Storage is a convenience; the static fallback must remain usable.
  }
}

export default function RemoteWordListPage({
  length,
  canonical,
  initialWords,
  navLinks,
  mainClassName = "flex max-w-[1200px] flex-col w-full",
}: RemoteWordListPageProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [words, setWords] = useState(initialWords);
  const [source, setSource] = useState<ListSource>("curated");
  const [loadState, setLoadState] = useState<LoadState>("loading");

  const count = words.length;

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    const applyWords = (nextWords: string[], nextSource: ListSource) => {
      if (cancelled || nextWords.length === 0) return;

      setWords(nextWords);
      setSource(nextSource);
    };

    const loadRemoteWords = async () => {
      const cachedSortedWords = readCachedSortedWords();
      const cachedWords = getSortedWordsForLength(cachedSortedWords, length);

      if (cachedWords.length > 0) {
        applyWords(cachedWords, "cache");
      }

      try {
        const response = await fetch(getSortedWordsUrl(), {
          cache: "no-cache",
          signal: controller.signal,
        });

        const sortedWords = await readSortedWordsResponse(response);
        const remoteWords = getSortedWordsForLength(sortedWords, length);

        if (remoteWords.length === 0) {
          throw new Error("Word list response did not contain valid words.");
        }

        writeCachedSortedWords(sortedWords);
        applyWords(remoteWords, "remote");

        if (!cancelled) setLoadState("loaded");
      } catch {
        if (!cancelled) setLoadState("failed");
      }
    };

    loadRemoteWords();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [initialWords, length]);

  const handleCopy = useCallback(async (word: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(word);
      } else {
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
  }, []);

  const statusMessage = useMemo(() => {
    if (loadState === "loaded" && source === "remote") {
      return `Loaded the full ${length}-letter word list.`;
    }

    if (source === "cache") {
      return `Showing a cached full ${length}-letter word list while checking for updates.`;
    }

    if (loadState === "failed") {
      return `Showing ${count.toLocaleString(
        "en-US"
      )} curated starter words. The full word list could not load.`;
    }

    return `Showing ${count.toLocaleString(
      "en-US"
    )} curated starter words while loading the full word list.`;
  }, [count, length, loadState, source]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `All ${length}-Letter Words for Word Games`,
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
        { "@type": "ListItem", position: 3, name: `${length}-Letter Words` },
      ],
    },
    about: [
      { "@type": "Thing", name: "word games" },
      { "@type": "Thing", name: `${length}-letter words` },
      { "@type": "Thing", name: "Wordle" },
      { "@type": "Thing", name: "crosswords" },
      { "@type": "Thing", name: "anagrams" },
      { "@type": "Thing", name: "cryptograms" },
    ],
    ...(source !== "curated" ? { numberOfItems: count } : {}),
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header>
        <h1 className="mt-[0.7em] text-5xl font-nunito text-skull-dark-brown mb-12">
          All {length}-Letter Words for Word & Puzzle Games
        </h1>
      </header>

      <main className={mainClassName}>
        <div className="flex flex-col gap-5 justify-center items-center">
          <h2 className="text-2xl">
            There {count === 1 ? "is" : "are"} {count.toLocaleString("en-US")}{" "}
            word
            {count === 1 ? "" : "s"} in this list!
          </h2>

          <p className="text-center font-lato text-sm text-skull-super-dark-brown/80">
            {statusMessage}
          </p>

          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 w-full">
            {words.map((word) => (
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
                  <span className="font-semibold tracking-wide text-skull-dark-brown">
                    {word}
                  </span>

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
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="hover:text-amber-600 font-lora mr-4"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <SocialLinks />
      </main>

      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-4 right-4 z-50"
      >
        {copied && (
          <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-black/90 text-white text-sm px-3 py-2 shadow-lg">
            Copied {copied}
          </div>
        )}
      </div>
    </div>
  );
}
