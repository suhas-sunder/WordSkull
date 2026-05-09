import type { MetaFunction } from "@remix-run/node";
import RemoteWordListPage from "../client/components/words/RemoteWordListPage";
import { getCanonicalUrl } from "../shared/routes";
import { getWordsByLength } from "../shared/wordData";

const LENGTH = 4;
const canonical = getCanonicalUrl("/words-list/all-4-letter-words-for-word-games");
const initialWords = getWordsByLength(LENGTH);
const navLinks = [
    { href: "/words-list/all-3-letter-words-for-word-games", label: "<- 3-letter words" },
    { href: "/words-list/all-5-letter-words-for-word-games", label: "5-letter words ->" },
];

export const meta: MetaFunction = () => {
  const title = "All 4-Letter Words for Word Games | WordSkull";
  const desc = "Browse 4-letter words for Scrabble, Wordle, crosswords, and anagrams. Great for daily puzzles and short word play.";
  const ogImage = "https://www.wordskull.com/og/wordskull-words-4.jpg";

  return [
    { title },
    { name: "description", content: desc },
    { tagName: "link", rel: "canonical", href: canonical },
    { property: "og:title", content: title },
    { property: "og:description", content: desc },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonical },
    { property: "og:image", content: ogImage },
    { property: "og:image:alt", content: "WordSkull 4-letter word list" },
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

export default function FourLetterWords() {
  return (
    <RemoteWordListPage
      length={LENGTH}
      canonical={canonical}
      initialWords={initialWords}
      navLinks={navLinks}
    />
  );
}
