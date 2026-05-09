import type { MetaFunction } from "@remix-run/node";
import RemoteWordListPage from "../client/components/words/RemoteWordListPage";
import { getCanonicalUrl } from "../shared/routes";
import { getWordsByLength } from "../shared/wordData";

const LENGTH = 7;
const canonical = getCanonicalUrl("/words-list/all-7-letter-words-for-word-games");
const initialWords = getWordsByLength(LENGTH);
const navLinks = [
    { href: "/words-list/all-6-letter-words-for-word-games", label: "<- 6-letter words" },
    { href: "/words-list/all-8-letter-words-for-word-games", label: "8-letter words ->" },
];

export const meta: MetaFunction = () => {
  const title = "All 7-Letter Words for Word Games | WordSkull";
  const desc = "Study 7-letter words for crosswords, hangman, Scrabble, and anagrams. Great for longer puzzles and vocabulary training.";
  const ogImage = "https://www.wordskull.com/og/wordskull-words-7.jpg";

  return [
    { title },
    { name: "description", content: desc },
    { tagName: "link", rel: "canonical", href: canonical },
    { property: "og:title", content: title },
    { property: "og:description", content: desc },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonical },
    { property: "og:image", content: ogImage },
    { property: "og:image:alt", content: "WordSkull 7-letter word list" },
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

export default function SevenLetterWords() {
  return (
    <RemoteWordListPage
      length={LENGTH}
      canonical={canonical}
      initialWords={initialWords}
      navLinks={navLinks}
    />
  );
}
