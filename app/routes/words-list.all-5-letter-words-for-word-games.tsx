import type { MetaFunction } from "@remix-run/node";
import RemoteWordListPage from "../client/components/words/RemoteWordListPage";
import { getCanonicalUrl } from "../shared/routes";
import { getWordsByLength } from "../shared/wordData";

const LENGTH = 5;
const canonical = getCanonicalUrl("/words-list/all-5-letter-words-for-word-games");
const initialWords = getWordsByLength(LENGTH);
const navLinks = [
    { href: "/words-list/all-4-letter-words-for-word-games", label: "<- 4-letter words" },
    { href: "/words-list/all-6-letter-words-for-word-games", label: "6-letter words ->" },
];

export const meta: MetaFunction = () => {
  const title = "All 5-Letter Words for Word Games | WordSkull";
  const desc = "Browse 5-letter words for Wordle, crosswords, anagrams, and puzzles. Perfect for daily Wordle training and vocab growth.";
  const ogImage = "https://www.wordskull.com/og/wordskull-words-5.jpg";

  return [
    { title },
    { name: "description", content: desc },
    { tagName: "link", rel: "canonical", href: canonical },
    { property: "og:title", content: title },
    { property: "og:description", content: desc },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonical },
    { property: "og:image", content: ogImage },
    { property: "og:image:alt", content: "WordSkull 5-letter word list" },
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

export default function FiveLetterWords() {
  return (
    <RemoteWordListPage
      length={LENGTH}
      canonical={canonical}
      initialWords={initialWords}
      navLinks={navLinks}
    />
  );
}
