import { MetaFunction } from "@remix-run/node";
import { Link } from "react-router-dom";
import { useTheme } from "~/client/components/context/ThemeContext";
import BlogSidebar from "~/client/components/navigation/BlogSidebar";
import SocialLinks from "~/client/components/navigation/SocialLinks";

/* ===================== META ===================== */
export const meta: MetaFunction = () => {
  const canonical =
    "https://www.wordskull.com/blog/wordskull-vs-wordle-fantasy-twist";
  const title = "WordSkull vs Wordle: A Fantasy Twist on the Word Game Craze";
  const description =
    "A deep dive into WordSkull vs Wordle: gameplay mechanics, difficulty curves, strategy, and why fantasy dungeon battles keep word-game fans coming back.";
  const ogImage = "https://www.wordskull.com/og/blog/wordskull-vs-wordle.jpg";

  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: canonical },
    { property: "og:site_name", content: "WordSkull" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:url", content: canonical },
    { property: "og:image", content: ogImage },
    { property: "og:image:alt", content: title },
    { property: "og:locale", content: "en_US" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
    {
      name: "robots",
      content:
        "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    },
  ];
};

/* ===================== PAGE ===================== */
export default function Blog_WordSkullVsWordle() {
  const { darkThemeActive } = useTheme();

  const canonical =
    "https://www.wordskull.com/blog/wordskull-vs-wordle-fantasy-twist";
  const date = "2025-08-17";

  // Sidebar articles (minimal; add more posts as you create them)
  const ARTICLES = [
    {
      slug: "wordskull-vs-wordle-fantasy-twist",
      title: "WordSkull vs Wordle: A Fantasy Twist on the Word Game Craze",
      date,
    },
  ];

  // JSON-LD: Article + Breadcrumbs + FAQ
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
            name: "Blog",
            item: "https://www.wordskull.com/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "WordSkull vs Wordle",
            item: canonical,
          },
        ],
      },
      {
        "@type": "Article",
        headline: "WordSkull vs Wordle: A Fantasy Twist on the Word Game Craze",
        datePublished: date,
        dateModified: date,
        mainEntityOfPage: canonical,
        image: "https://www.wordskull.com/og/blog/wordskull-vs-wordle.jpg",
        isPartOf: {
          "@type": "Blog",
          name: "WordSkull Blog",
          url: "https://www.wordskull.com/blog",
        },
        publisher: { "@type": "Organization", name: "WordSkull" },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is WordSkull harder than Wordle?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "It scales harder at upper modes: WordSkull Classic - Grim Reapers (3–7) and WordSkull Classic - Royal Lichen (3–9) add longer patterns and more elimination steps.",
            },
          },
          {
            "@type": "Question",
            name: "Will WordSkull help me improve at Wordle?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Practicing variable lengths improves pattern recognition, letter-frequency intuition, and elimination discipline.",
            },
          },
          {
            "@type": "Question",
            name: "Can I play WordSkull for free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. WordSkull is free to play in your browser with multiple modes and no daily cap.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div
      className={`${
        darkThemeActive ? "text-stone-300" : "text-skull-dark-brown"
      } flex justify-center flex-col items-center mt-12`}
    >
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== Hero ===== */}
      <header className="flex flex-col justify-center items-center gap-3 mb-3 mx-5 text-center">
        <h1
          className={`${
            darkThemeActive ? "text-stone-400" : "text-skull-dark-brown"
          } w-full z-1 flex justify-center items-center flex-col md:flex-row text-5xl text-center mt-1 leading-snug -translate-y-[0.3em] sm:translate-y-0 font-lora tracking-wide`}
        >
          <span className="mr-2">
            WordSkull{" "}
            <span className="whitespace-nowrap">
              <span className="inline-flex">v</span>
              <span className="inline-flex animate-scalePulse">💀</span>
              <span className="inline-flex">s</span>
            </span>{" "}
            Wordle
          </span>
        </h1>
        <p className="font-lato text-lg tracking-wider leading-loose mb-3 sm:pl-5 max-w-[1200px]">
          Compare mechanics, difficulty, and strategy, and see how a dungeon
          fantasy layer turns quick word puzzles into memorable battles.
          Published: {new Date(date).toLocaleDateString()} | Author: Suhas
          Sunder
        </p>
      </header>

      {/* ===== Body + Sidebar ===== */}
      <main className="flex max-w-[1200px] w-full mt-4 justify-center px-5">
        {/* Article column */}
        <article className="flex-1 max-w-[900px] min-w-0 font-lato leading-relaxed tracking-wide">
          {/* TL;DR */}
          <div
            className={`rounded-xl px-5 py-4 mb-6 border ${
              darkThemeActive
                ? "border-stone-700 bg-stone-900/40"
                : "border-stone-200 bg-white/70"
            }`}
          >
            <p>
              <strong>TLDR:</strong> Love Wordle’s daily rush? You’ll enjoy{" "}
              <Link
                to="/"
                className="text-pumpkin-orange hover:text-amber-600 font-lora"
              >
                WordSkull
              </Link>{" "}
              for the same word-cracking satisfaction, plus skull bosses, a
              fantasy vibe, and unlimited play across 3–9 letters.
            </p>
          </div>

          {/* Core differences */}
          <section className="mb-8">
            <h2
              className={`font-lora text-2xl ${
                darkThemeActive
                  ? "text-stone-200"
                  : "text-skull-super-dark-brown"
              }`}
            >
              Core Differences at a Glance
            </h2>
            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr
                    className={
                      darkThemeActive
                        ? "text-stone-300"
                        : "text-skull-super-dark-brown"
                    }
                  >
                    <th className="text-left py-2 pr-4">Feature</th>
                    <th className="text-left py-2 pr-4">Wordle</th>
                    <th className="text-left py-2">WordSkull</th>
                  </tr>
                </thead>
                <tbody
                  className={
                    darkThemeActive
                      ? "text-stone-300/90"
                      : "text-skull-dark-brown/90"
                  }
                >
                  <tr>
                    <td className="py-2 pr-4">Word length</td>
                    <td className="py-2 pr-4">Fixed at 5</td>
                    <td className="py-2">3–9 (mode-based)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Attempts / sessions</td>
                    <td className="py-2 pr-4">6 tries, single daily</td>
                    <td className="py-2">Unlimited sessions, multiple modes</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Theme</td>
                    <td className="py-2 pr-4">Minimalist</td>
                    <td className="py-2">Fantasy dungeon & skull battles</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Progression</td>
                    <td className="py-2 pr-4">Streaks</td>
                    <td className="py-2">Scalable modes & difficulty tiers</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Training tools</td>
                    <td className="py-2 pr-4">External lists/tools</td>
                    <td className="py-2">
                      Built-in{" "}
                      <Link
                        to="/words-list"
                        className="text-pumpkin-orange hover:text-amber-600 font-lora"
                      >
                        Words by Length
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Modes */}
          <section className="mb-10">
            <h2
              className={`font-lora text-2xl ${
                darkThemeActive
                  ? "text-stone-200"
                  : "text-skull-super-dark-brown"
              }`}
            >
              WordSkull Modes & Who Should Play Them
            </h2>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <strong>WordSkull Classic - Boneheads (Easy, 3–5):</strong>{" "}
                rapid reps to build letter-frequency intuition and quick
                elimination. Try it →{" "}
                <Link
                  to="/games/classic/boneheads-easy-3-to-5-letter-words"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  WordSkull Classic - Boneheads
                </Link>
              </li>
              <li>
                <strong>WordSkull Classic - Specter (Medium, 3–6):</strong>{" "}
                mixes short fillers with 6-letter patterns; great mid-game
                mastery. Try it →{" "}
                <Link
                  to="/games/classic/specter-knights-medium-3-to-6-letter-words"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  WordSkull Classic - Specter
                </Link>
              </li>
              <li>
                <strong>WordSkull Classic - Grim Reapers (Hard, 3–7):</strong>{" "}
                introduces longer morphemes and tougher forks; endurance begins.
                Try it →{" "}
                <Link
                  to="/games/classic/grim-reapers-hard-3-to-7-letter-words"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  WordSkull Classic - Grim Reapers
                </Link>
              </li>
              <li>
                <strong>
                  WordSkull Classic - Royal Lichen (Extreme, 3–9):
                </strong>{" "}
                late-game anagrams, prefix/suffix traps, and full-board
                discipline. Try it →{" "}
                <Link
                  to="/games/classic/royal-lichen-extreme-3-to-9-letter-words"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  WordSkull Classic - Royal Lichen
                </Link>
              </li>
            </ul>
          </section>

          {/* Strategy */}
          <section className="mb-10">
            <h2
              className={`font-lora text-2xl ${
                darkThemeActive
                  ? "text-stone-200"
                  : "text-skull-super-dark-brown"
              }`}
            >
              Strategy That Transfers (and What Changes)
            </h2>
            <ol className="list-decimal pl-6 mt-3 space-y-3">
              <li>
                <strong>Open with coverage, not hunches.</strong> In 3–5
                letters, prioritize {`{R,S,T,N,L}`} + {`{A,E}`} to collapse
                branches fast. In 7–9 letters, seed common <em>clusters</em> (
                <code>ING</code>, <code>TION</code>, <code>ABLE</code>) early to
                expose morphology.
              </li>
              <li>
                <strong>Fork-proof your guesses.</strong> Before locking a
                guess, list 2–3 plausible alternates. If the guess won’t split
                those branches, choose a different probe word.
              </li>
              <li>
                <strong>Short-word drills = faster endgames.</strong> Do 10
                quick rounds from{" "}
                <Link
                  to="/words-list/all-3-letter-words-for-word-games"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  3-letter
                </Link>
                ,{" "}
                <Link
                  to="/words-list/all-4-letter-words-for-word-games"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  4-letter
                </Link>
                , and{" "}
                <Link
                  to="/words-list/all-5-letter-words-for-word-games"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  5-letter lists
                </Link>{" "}
                to sharpen filler recognition and cleanup speed.
              </li>
              <li>
                <strong>Don’t overvalue vowels in long modes.</strong> Past 6
                letters, consonant placement patterns (e.g., <code>STR-</code>,{" "}
                <code>-NCH</code>, <code>-RCH</code>) often prune faster than
                one more vowel.
              </li>
              <li>
                <strong>Adopt a two-phase plan.</strong> Phase 1: maximize
                information gain. Phase 2: surgical solves. Switching too late
                is the #1 time-sink in WordSkull Classic - Royal Lichen.
              </li>
            </ol>
          </section>

          {/* Practice plan */}
          <section className="mb-10">
            <h2
              className={`font-lora text-2xl ${
                darkThemeActive
                  ? "text-stone-200"
                  : "text-skull-super-dark-brown"
              }`}
            >
              A 15-Minute Daily Practice Loop
            </h2>
            <div className="mt-3 space-y-2">
              <p>
                <strong>Minutes 0–4:</strong> WordSkull Classic - Boneheads
                sprint (3–5). Focus on letter coverage and fast eliminations.
              </p>
              <p>
                <strong>Minutes 5–9:</strong> WordSkull Classic - Specter (3–6).
                Target common bigrams (<code>TH</code>, <code>TR</code>,{" "}
                <code>SH</code>) and endings.
              </p>
              <p>
                <strong>Minutes 10–13:</strong> WordSkull Classic - Grim Reapers
                (3–7). Practice fork-busting probes to halve candidate sets.
              </p>
              <p>
                <strong>Minutes 14–15:</strong> WordSkull Classic - Royal Lichen
                (3–9). One long solve for endurance.
              </p>
            </div>
            <p className="mt-3">
              Between runs, skim{" "}
              <Link
                to="/words-list"
                className="text-pumpkin-orange hover:text-amber-600 font-lora"
              >
                Words by Length
              </Link>{" "}
              to expand your mental library.
            </p>
          </section>

          {/* Design notes */}
          <section className="mb-12">
            <h2
              className={`font-lora text-2xl ${
                darkThemeActive
                  ? "text-stone-200"
                  : "text-skull-super-dark-brown"
              }`}
            >
              Why the Fantasy Layer Works (Design Notes)
            </h2>
            <p className="mt-2">
              Narrative framing turns micro-wins (right letter, right spot) into
              visible combat feedback. That keeps arousal and focus up without
              adding rules. In short:{" "}
              <em>same cognitive load, higher motivation</em> — which translates
              to more voluntary practice and better vocabulary retention.
            </p>
          </section>

          {/* CTA */}
          <section
            className={`rounded-xl px-5 py-5 mb-10 border ${
              darkThemeActive
                ? "border-stone-700 bg-stone-900/40"
                : "border-stone-200 bg-white/70"
            }`}
          >
            <p className="font-lora text-xl">
              Ready to battle skulls?{" "}
              <Link to="/" className="text-pumpkin-orange hover:text-amber-600">
                Play WordSkull free
              </Link>{" "}
              or jump straight into{" "}
              <Link
                to="/games/classic/specter-knights-medium-3-to-6-letter-words"
                className="text-pumpkin-orange hover:text-amber-600"
              >
                WordSkull Classic - Specter (3–6)
              </Link>
              .
            </p>
          </section>

          <section className="mb-14">
            <h2
              className={`font-lora text-2xl ${
                darkThemeActive
                  ? "text-stone-200"
                  : "text-skull-super-dark-brown"
              }`}
            >
              More to Explore
            </h2>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                Training hub:{" "}
                <Link
                  to="/words-list"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  3–9 letter word lists
                </Link>
              </li>
              <li>
                Modes overview:{" "}
                <Link
                  to="/games/classic"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  Classic WordSkull
                </Link>
              </li>
              <li>
                Behind the scenes:{" "}
                <Link
                  to="/about"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  About WordSkull
                </Link>
              </li>
            </ul>
          </section>
        </article>

        {/* Sidebar component */}
        <BlogSidebar articles={ARTICLES} />
      </main>

      <section className="mt-8">
        <SocialLinks />
      </section>
    </div>
  );
}
