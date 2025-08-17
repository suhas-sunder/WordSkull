import { MetaFunction } from "@remix-run/node";
import { Link, useMatches, useParams } from "@remix-run/react";
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
  const matches = useMatches();
  const params = useParams();

  const canonical =
    "https://www.wordskull.com/blog/wordskull-vs-wordle-fantasy-twist";
  const date = "2025-08-17";

  // Sidebar articles, add more as you publish
  const ARTICLES = [
    {
      slug: "wordskull-vs-wordle-fantasy-twist",
      title: "WordSkull vs Wordle: A Fantasy Twist on the Word Game Craze",
      date,
    },
  ];

  // Current slug from route, used to filter sidebar
  const currentSlug =
    params["*"] || params.slug || canonical.split("/").pop() || "";

  // Shuffle helper
  const shuffled = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

  // Filter out the current post and randomize the rest
  const sidebarArticles = shuffled(
    ARTICLES.filter((a) => a.slug !== currentSlug)
  );

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
        author: { "@type": "Person", name: "Suhas Sunder" },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is WordSkull harder than Wordle?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "It scales harder at upper modes. Grim Reapers and Royal Lichen add longer patterns and more elimination steps.",
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

  const card =
    "rounded-xl px-5 py-4 mb-6 border " +
    (darkThemeActive
      ? "border-stone-700 bg-stone-900/40"
      : "border-stone-200 bg-white/70");

  const titleCls =
    "font-lora text-2xl " +
    (darkThemeActive ? "text-stone-200" : "text-skull-super-dark-brown");

  return (
    <div
      className={`${
        darkThemeActive ? "text-stone-300" : "text-skull-dark-brown"
      } min-h-screen`}
    >
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header, aligned with Classic style */}
      <header
        className={
          darkThemeActive
            ? "border-b border-stone-800 bg-stone-900/30 mt-5"
            : "border-b border-stone-200 bg-stone-100 mt-5"
        }
      >
        <div className="mx-auto max-w-[1200px] px-6 pt-8 pb-5">
          <nav aria-label="Breadcrumb" className="mb-2 text-sm">
            <ol className="flex flex-wrap items-center gap-1 text-stone-600">
              <li>
                <Link
                  to="/"
                  className="hover:underline text-amber-600 font-bold"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li>
                <Link
                  to="/blog"
                  className="hover:underline text-amber-600 font-bold"
                >
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" className="text-amber-600 font-bold">
                WordSkull vs Wordle
              </li>
            </ol>
          </nav>

          <h1 className="mt-1 font-nunito text-2xl tracking-wide">
            WordSkull vs Wordle
            <span className="sr-only">, article</span>
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            <time dateTime={date}>{new Date(date).toLocaleDateString()}</time> •
            By Suhas Sunder
          </p>
        </div>
      </header>

      {/* Body + Sidebar */}
      <main className="mx-auto max-w-[1200px] w-full px-6 py-8 flex gap-6">
        {/* Article column */}
        <article className="flex-1 max-w-[900px] min-w-0 font-lato leading-relaxed tracking-wide">
          {/* Hero title, compact since header carries context */}
          <div className="text-center mb-4">
            <h2
              className={`font-lora text-4xl leading-snug ${
                darkThemeActive ? "text-stone-300" : "text-skull-dark-brown"
              }`}
            >
              WordSkull{" "}
              <span className="whitespace-nowrap">
                v
                <span
                  aria-hidden="true"
                  className="inline-flex animate-scalePulse"
                >
                  💀
                </span>
                s
              </span>{" "}
              Wordle
            </h2>
            <p className="font-lato text-base tracking-wider leading-relaxed mt-2 text-stone-600">
              Compare mechanics, difficulty, and strategy. See how a dungeon
              fantasy layer turns quick word puzzles into memorable battles.
            </p>
          </div>

          {/* TL;DR */}
          <div className={card}>
            <p>
              <strong>TLDR:</strong> Love Wordle’s daily rush? You’ll enjoy{" "}
              <Link
                to="/"
                className="text-pumpkin-orange hover:text-amber-600 font-lora"
              >
                WordSkull
              </Link>{" "}
              for similar word-cracking satisfaction, plus skull bosses, a
              fantasy vibe, and unlimited play across 3–9 letters.
            </p>
          </div>

          {/* Core differences */}
          <section className="mb-8">
            <h3 className={titleCls}>Core Differences at a Glance</h3>
            <div className="mt-3 overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-700">
              <table className="min-w-full text-sm">
                <thead
                  className={
                    darkThemeActive ? "bg-stone-900/30" : "bg-stone-50"
                  }
                >
                  <tr
                    className={
                      darkThemeActive
                        ? "text-stone-300"
                        : "text-skull-super-dark-brown"
                    }
                  >
                    <th scope="col" className="text-left py-2 pr-4">
                      Feature
                    </th>
                    <th scope="col" className="text-left py-2 pr-4">
                      Wordle
                    </th>
                    <th scope="col" className="text-left py-2">
                      WordSkull
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={
                    darkThemeActive
                      ? "text-stone-300/90"
                      : "text-skull-dark-brown/90"
                  }
                >
                  <tr className="border-t border-stone-200 dark:border-stone-700">
                    <td className="py-2 pr-4">Word length</td>
                    <td className="py-2 pr-4">Fixed at 5</td>
                    <td className="py-2">3–9, mode based</td>
                  </tr>
                  <tr className="border-t border-stone-200 dark:border-stone-700">
                    <td className="py-2 pr-4">Attempts or sessions</td>
                    <td className="py-2 pr-4">6 tries, single daily</td>
                    <td className="py-2">Unlimited sessions, multiple modes</td>
                  </tr>
                  <tr className="border-t border-stone-200 dark:border-stone-700">
                    <td className="py-2 pr-4">Theme</td>
                    <td className="py-2 pr-4">Minimalist</td>
                    <td className="py-2">Fantasy dungeon and skull battles</td>
                  </tr>
                  <tr className="border-t border-stone-200 dark:border-stone-700">
                    <td className="py-2 pr-4">Progression</td>
                    <td className="py-2 pr-4">Streaks</td>
                    <td className="py-2">Scalable modes and tiers</td>
                  </tr>
                  <tr className="border-t border-stone-200 dark:border-stone-700">
                    <td className="py-2 pr-4">Training tools</td>
                    <td className="py-2 pr-4">External lists or tools</td>
                    <td className="py-2">
                      Built in{" "}
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
            <h3 className={titleCls}>
              WordSkull Modes and Who Should Play Them
            </h3>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <strong>Classic, Boneheads, Easy, 3–5:</strong> rapid reps for
                letter frequency and quick elimination. Try it →{" "}
                <Link
                  to="/games/classic/boneheads-easy-3-to-5-letter-words"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  Boneheads
                </Link>
              </li>
              <li>
                <strong>Classic, Specter, Medium, 3–6:</strong> blends short
                fillers with 6 letter patterns. Try it →{" "}
                <Link
                  to="/games/classic/specter-knights-medium-3-to-6-letter-words"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  Specter
                </Link>
              </li>
              <li>
                <strong>Classic, Grim Reapers, Hard, 3–7:</strong> longer
                morphemes and tougher forks. Try it →{" "}
                <Link
                  to="/games/classic/grim-reapers-hard-3-to-7-letter-words"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  Grim Reapers
                </Link>
              </li>
              <li>
                <strong>Classic, Royal Lichen, Extreme, 3–9:</strong> late game
                anagrams and prefix or suffix traps. Try it →{" "}
                <Link
                  to="/games/classic/royal-lichen-extreme-3-to-9-letter-words"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  Royal Lichen
                </Link>
              </li>
            </ul>
          </section>

          {/* Strategy */}
          <section className="mb-10">
            <h3 className={titleCls}>
              Strategy That Transfers, and What Changes
            </h3>
            <ol className="list-decimal pl-6 mt-3 space-y-3">
              <li>
                <strong>Open with coverage, not hunches.</strong> In 3–5
                letters, prioritize {`{R,S,T,N,L}`} + {`{A,E}`}. In 7–9, seed
                common clusters like <code>ING</code>, <code>TION</code>,{" "}
                <code>ABLE</code>.
              </li>
              <li>
                <strong>Fork proof your guesses.</strong> If a guess will not
                split likely branches, pick a different probe word.
              </li>
              <li>
                <strong>Short word drills improve endgames.</strong> Do 10 quick
                rounds from{" "}
                <Link
                  to="/words-list/all-3-letter-words-for-word-games"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  3 letter
                </Link>
                ,{" "}
                <Link
                  to="/words-list/all-4-letter-words-for-word-games"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  4 letter
                </Link>
                , and{" "}
                <Link
                  to="/words-list/all-5-letter-words-for-word-games"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  5 letter lists
                </Link>
                .
              </li>
              <li>
                <strong>Do not overvalue vowels in long modes.</strong>{" "}
                Consonant placement patterns such as <code>STR-</code>,{" "}
                <code>-NCH</code>, <code>-RCH</code> often prune faster.
              </li>
              <li>
                <strong>Adopt a two phase plan.</strong> Phase 1, information
                gain. Phase 2, surgical solves.
              </li>
            </ol>
          </section>

          {/* Practice plan */}
          <section className="mb-10">
            <h3 className={titleCls}>A 15 Minute Daily Practice Loop</h3>
            <div className="mt-3 space-y-2">
              <p>
                <strong>Minutes 0–4:</strong> Boneheads sprint, 3–5.
              </p>
              <p>
                <strong>Minutes 5–9:</strong> Specter, 3–6, target common
                bigrams.
              </p>
              <p>
                <strong>Minutes 10–13:</strong> Grim Reapers, 3–7, practice fork
                busting probes.
              </p>
              <p>
                <strong>Minutes 14–15:</strong> Royal Lichen, 3–9, one long
                solve for endurance.
              </p>
            </div>
            <p className="mt-3">
              Between runs, skim{" "}
              <Link
                to="/words-list"
                className="text-pumpkin-orange hover:text-amber-600 font-lora"
              >
                Words by Length
              </Link>
              .
            </p>
          </section>

          {/* Design notes */}
          <section className="mb-12">
            <h3 className={titleCls}>
              Why the Fantasy Layer Works, Design Notes
            </h3>
            <p className="mt-2">
              Narrative framing turns micro wins into visible combat feedback.
              Same cognitive load, higher motivation. That translates to more
              voluntary practice and better vocabulary retention.
            </p>
          </section>

          {/* CTA */}
          <section className={card + " mb-10"}>
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
                Specter, 3–6
              </Link>
              .
            </p>
          </section>

          {/* More links */}
          <section className="mb-14">
            <h3 className={titleCls}>More to Explore</h3>
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

        {/* Sidebar, now filtered and randomized */}
        <BlogSidebar articles={sidebarArticles} />
      </main>

      <section className="mt-8">
        <SocialLinks />
      </section>
    </div>
  );
}
