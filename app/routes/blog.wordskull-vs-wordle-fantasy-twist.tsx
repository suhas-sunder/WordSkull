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
  const ogImage =
    "https://www.doodlegarden.com/img/wordskull-vs-nyt-wordle-game.webp";

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
        description:
          "Compare WordSkull and Wordle: mechanics, difficulty, strategy, and why a fantasy dungeon loop keeps puzzle fans engaged.",
        mainEntityOfPage: canonical,
        datePublished: date,
        dateModified: date,
        author: {
          "@type": "Person",
          name: "Suhas Sunder",
          url: "https://www.suhassunder.com",
        },
        publisher: {
          "@type": "Organization",
          name: "WordSkull",
          logo: {
            "@type": "ImageObject",
            url: "https://www.wordskull.com/og/wordskull-logo-512.jpg",
            width: 512,
            height: 512,
          },
        },
        // Provide multiple encodings for better eligibility
        image: [
          "https://www.doodlegarden.com/img/wordskull-vs-nyt-wordle-game.jpg",
          "https://www.doodlegarden.com/img/wordskull-vs-nyt-wordle-game.webp",
        ],
        inLanguage: "en",
        articleSection: ["Comparison", "Strategy", "Training"],
        keywords: [
          "WordSkull vs Wordle",
          "word games",
          "word puzzle strategy",
          "fantasy word game",
          "3-9 letter words",
        ],
        isPartOf: {
          "@type": "Blog",
          name: "WordSkull Blog",
          url: "https://www.wordskull.com/blog",
        },
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
      : "border-pumpkin-orange/60 bg-white/70");

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
            : "border-b border-pumpkin-orange/60 bg-stone-100 mt-5"
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
          {/* Hero media (WebP + JPG fallback) */}
          <figure className="mb-6 rounded-2xl overflow-hidden">
            <picture>
              <source
                srcSet="https://www.doodlegarden.com/img/wordskull-vs-nyt-wordle-game.webp"
                type="image/webp"
              />
              <source
                srcSet="https://www.doodlegarden.com/img/wordskull-vs-nyt-wordle-game.jpg"
                type="image/jpeg"
              />
              <img
                src="https://www.doodlegarden.com/img/wordskull-vs-nyt-wordle-game.jpg"
                alt="Side-by-side comparison vibe: WordSkull’s skull-battle grid and Wordle’s minimalist board"
                width={1200}
                height={630}
                className="w-full h-auto block"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
            <figcaption className="px-4 py-2 text-xs text-stone-500">
              WordSkull keeps the satisfying letter feedback of Wordle and
              layers on fantasy progression, variable lengths, and boss-style
              battles.
            </figcaption>
          </figure>

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

          <section className="mb-8">
            <h3 className={titleCls}>Core Differences at a Glance</h3>

            <div className="mt-3 overflow-x-auto rounded-xl border border-pumpkin-orange/60 ">
              <table className="min-w-full table-fixed text-sm">
                {/* Equal column widths */}
                <colgroup>
                  <col className="w-1/3" />
                  <col className="w-1/3" />
                  <col className="w-1/3" />
                </colgroup>

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
                    <th
                      scope="col"
                      className="text-left px-4 py-2 font-semibold tracking-normal"
                    >
                      Feature
                    </th>
                    <th
                      scope="col"
                      className="text-left px-4 py-2 font-semibold tracking-normal"
                    >
                      Wordle
                    </th>
                    <th
                      scope="col"
                      className="text-left px-4 py-2 font-semibold tracking-normal"
                    >
                      WordSkull
                    </th>
                  </tr>
                </thead>

                <tbody
                  className={[
                    darkThemeActive
                      ? "text-stone-300/90"
                      : "text-skull-dark-brown/90",
                    "divide-y divide-pumpkin-orange/60",
                  ].join(" ")}
                >
                  <tr className="align-middle">
                    <td className="px-4 py-2">Word length</td>
                    <td className="px-4 py-2">Fixed at 5</td>
                    <td className="px-4 py-2">3–9, mode-based</td>
                  </tr>
                  <tr className="align-middle">
                    <td className="px-4 py-2">Attempts / sessions</td>
                    <td className="px-4 py-2">6 tries, single daily</td>
                    <td className="px-4 py-2">
                      Unlimited sessions, multiple modes
                    </td>
                  </tr>
                  <tr className="align-middle">
                    <td className="px-4 py-2">Theme</td>
                    <td className="px-4 py-2">Minimalist</td>
                    <td className="px-4 py-2">
                      Fantasy dungeon &amp; skull battles
                    </td>
                  </tr>
                  <tr className="align-middle">
                    <td className="px-4 py-2">Progression</td>
                    <td className="px-4 py-2">Streaks</td>
                    <td className="px-4 py-2">Scalable modes &amp; tiers</td>
                  </tr>
                  <tr className="align-middle">
                    <td className="px-4 py-2">Training tools</td>
                    <td className="px-4 py-2">External lists / tools</td>
                    <td className="px-4 py-2">
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

          {/* === NEW: Why Players Graduate from Wordle to WordSkull === */}
          <section className="mb-10">
            <h3 className={titleCls}>
              Why Many Players Graduate from Wordle to WordSkull
            </h3>
            <p className="mt-3">
              Wordle is the perfect daily warm-up. But if you crave{" "}
              <strong>more agency, variety, and progression</strong>, WordSkull
              delivers: unlimited sessions,
              <strong>3–9 letter</strong> word ranges, and a fantasy loop that
              rewards steady practice. You can grind quick wins in{" "}
              <em>Boneheads</em>, sharpen pattern sense in <em>Specter</em>, and
              test endurance in <em>Grim Reapers</em> and
              <em> Royal Lichen</em>-all without waiting for a new daily puzzle.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <strong>Endless learning:</strong> practice multiple times a day
                to compound gains.
              </li>
              <li>
                <strong>Variable length:</strong> short words train speed; long
                words train structure.
              </li>
              <li>
                <strong>Built-in training:</strong> jump to{" "}
                <Link
                  to="/words-list"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  Words by Length
                </Link>{" "}
                between runs.
              </li>
            </ul>
          </section>

          {/* === NEW: Best Openers by Length (3–9 Letters) === */}
          <section className="mb-10">
            <h3 className={titleCls}>Best Openers by Length (3–9 Letters)</h3>
            <p className="mt-2">
              Use these to maximize letter coverage early. Swap freely if you’ve
              already seen overlaps.
            </p>
            <div className="mt-3 overflow-x-auto rounded-xl border border-pumpkin-orange/60 ">
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
                    <th className="text-left py-2 px-3">Length</th>
                    <th className="text-left py-2 px-3">
                      High-Coverage Openers
                    </th>
                    <th className="text-left py-2 px-3">Why It Works</th>
                  </tr>
                </thead>
                <tbody
                  className={
                    darkThemeActive
                      ? "text-stone-300/90"
                      : "text-skull-dark-brown/90"
                  }
                >
                  <tr className="border-t border-pumpkin-orange/60 ">
                    <td className="py-2 px-3">3–4</td>
                    <td className="py-2 px-3">
                      <em>TEN</em>, <em>STAR</em>, <em>RAIN</em>
                    </td>
                    <td className="py-2 px-3">
                      Hits common vowels + {`{R,S,T,N,L}`}
                    </td>
                  </tr>
                  <tr className="border-t border-pumpkin-orange/60 ">
                    <td className="py-2 px-3">5</td>
                    <td className="py-2 px-3">
                      <em>SLATE</em>, <em>ARISE</em>
                    </td>
                    <td className="py-2 px-3">
                      Bread-and-butter Wordle openers transfer well
                    </td>
                  </tr>
                  <tr className="border-t border-pumpkin-orange/60 ">
                    <td className="py-2 px-3">6</td>
                    <td className="py-2 px-3">
                      <em>STREAK</em>, <em>RETINA</em>
                    </td>
                    <td className="py-2 px-3">
                      Adds K/N to expand consonant map
                    </td>
                  </tr>
                  <tr className="border-t border-pumpkin-orange/60 ">
                    <td className="py-2 px-3">7–9</td>
                    <td className="py-2 px-3">
                      <em>TRAINED</em>, <em>RELATION</em>, <em>CREATION</em>
                    </td>
                    <td className="py-2 px-3">
                      Touches clusters and common morphemes (<code>-TION</code>,{" "}
                      <code>-ION</code>)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3">
              Then adapt based on feedback. When a family like <code>-ING</code>{" "}
              lights up, lean into it. If consonant clusters stall (
              <code>STR-</code>, <code>-NCH</code>), pick a probe that targets
              them.
            </p>
          </section>

          {/* === NEW: Common Mistakes & Quick Fixes === */}
          <section className="mb-10">
            <h3 className={titleCls}>Common Mistakes & Quick Fixes</h3>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <strong>Tunneling on one candidate:</strong> Force a fork-play a
                probe that splits top contenders.
              </li>
              <li>
                <strong>Over-valuing vowels late:</strong> In 7–9 letters,
                consonant placement usually prunes faster.
              </li>
              <li>
                <strong>Repeating low-info guesses:</strong> Every guess must
                confirm a spot <em>or</em> remove a branch.
              </li>
              <li>
                <strong>Ignoring length context:</strong> The best 5-letter
                habits don’t automatically win 7–9; adjust opener goals.
              </li>
            </ul>
          </section>

          {/* === NEW: Training Hub - Words by Length (Internal SEO) === */}
          <section className="mb-10">
            <h3 className={titleCls}>
              Training Hub: Words by Length (3–9 Letters)
            </h3>
            <p className="mt-3">
              Build a daily cadence. Browse curated lists to expand recall and
              reduce solve time:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <Link
                  to="/words-list/all-3-letter-words-for-word-games"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  All 3-letter words
                </Link>{" "}
                - filler speed & quick forks
              </li>
              <li>
                <Link
                  to="/words-list/all-4-letter-words-for-word-games"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  All 4-letter words
                </Link>{" "}
                - mid-game glue
              </li>
              <li>
                <Link
                  to="/words-list/all-5-letter-words-for-word-games"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  All 5-letter words
                </Link>{" "}
                - Wordle cross-training
              </li>
              <li>
                <Link
                  to="/words-list/all-6-letter-words-for-word-games"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  All 6-letter words
                </Link>{" "}
                - morphology practice (<code>-ING</code>, <code>-ABLE</code>)
              </li>
              <li>
                <Link
                  to="/words-list/all-7-letter-words-for-word-games"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  All 7-letter words
                </Link>{" "}
                - endurance
              </li>
              <li>
                <Link
                  to="/words-list/all-8-letter-words-for-word-games"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  All 8-letter words
                </Link>{" "}
                - anagram control
              </li>
              <li>
                <Link
                  to="/words-list/all-9-letter-words-for-word-games"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  All 9-letter words
                </Link>{" "}
                - boss-fight readiness
              </li>
            </ul>
          </section>

          {/* === NEW: How WordSkull Scales Difficulty (Design Notes) === */}
          <section className="mb-10">
            <h3 className={titleCls}>
              How WordSkull Scales Difficulty (Design Notes)
            </h3>
            <p className="mt-3">
              Difficulty in WordSkull isn’t just “more letters.” We tune
              challenge through
              <strong> letter-set density</strong> (how many viable candidates
              share positions),
              <strong> morphology</strong> (prefix/suffix families like{" "}
              <code>RE-</code>, <code>-ING</code>, <code>-TION</code>), and{" "}
              <strong> guess pressure</strong> (when forks appear and how
              expensive they are to resolve). That mix keeps veterans engaged
              while giving newcomers a fair on-ramp.
            </p>
            <div className={card + " mt-4"}>
              <p className="font-lora">
                <strong>Tip:</strong> When you feel “stuck,” switch from
                solution-hunting to
                <em> probe-hunting</em>. Use a word that maximizes information
                gain-even if it’s not a likely final answer.
              </p>
            </div>
          </section>

          {/* === NEW: Playthrough - One 6-Letter Battle, Step by Step === */}
          <section className="mb-10">
            <h3 className={titleCls}>
              Playthrough: One 6-Letter Battle, Step by Step
            </h3>
            <ol className="list-decimal pl-6 mt-3 space-y-3">
              <li>
                <strong>Opener:</strong> choose a high-coverage word (e.g., “
                <em>SLATER</em>”) to touch common consonants and vowels.
              </li>
              <li>
                <strong>Read feedback:</strong> lock greens, reposition yellows,
                and ban grays.
              </li>
              <li>
                <strong>Fork scan:</strong> list 2–3 viable families (e.g.,{" "}
                <code>_L_ATE</code>, <code>S_LI_E_</code>).
              </li>
              <li>
                <strong>Probe word:</strong> pick something that separates those
                families (e.g., “<em>CHONKY</em>” to test <code>CH</code>/
                <code>ON</code>/<code>Y</code>).
              </li>
              <li>
                <strong>Commit:</strong> once one branch dominates, switch from
                info-gain to surgical solving and finish the skull.
              </li>
            </ol>
            <p className="mt-2">
              This <em>probe-then-commit</em> rhythm is the backbone for{" "}
              <strong>Specter</strong> and up.
            </p>
          </section>

          {/* === NEW: Accessibility, Performance & Mobile Play === */}
          <section className="mb-12">
            <h3 className={titleCls}>
              Accessibility, Performance & Mobile Play
            </h3>
            <p className="mt-3">
              WordSkull is tuned for quick loads and smooth inputs across
              devices. On mobile,
              <strong> short-word sprints</strong> (3–5) are perfect for small
              windows of time. On desktop, longer modes shine with full keyboard
              flow and faster iteration.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <strong>Keyboard first:</strong> quick guess/delete/submit for
                fast loops.
              </li>
              <li>
                <strong>High-contrast feedback:</strong> readable tiles in light
                and dark modes.
              </li>
              <li>
                <strong>Lightweight assets:</strong> focused UI keeps the game
                responsive over long sessions.
              </li>
            </ul>
            <p className="mt-3">
              The result is a <strong>friction-free word game</strong> that
              rewards both quick breaks and deep practice runs.
            </p>
          </section>

          {/* === NEW: Mini-FAQ Addendum (SEO-friendly) === */}
          <section className="mb-14">
            <h3 className={titleCls}>Quick FAQ</h3>
            <details className="mt-3">
              <summary className="cursor-pointer font-semibold">
                Does WordSkull have a daily mode like Wordle?
              </summary>
              <p className="mt-2">
                WordSkull focuses on <strong>unlimited battles</strong> and
                scalable difficulty. Use shorter modes as your daily warm-up and
                climb as you improve.
              </p>
            </details>
            <details className="mt-3">
              <summary className="cursor-pointer font-semibold">
                What’s the best way to improve quickly?
              </summary>
              <p className="mt-2">
                Alternate between <em>Boneheads</em> sprints and{" "}
                <em>Specter</em> or <em>Grim Reapers</em>. Between runs, browse{" "}
                <Link
                  to="/words-list"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  Words by Length
                </Link>
                .
              </p>
            </details>
            <details className="mt-3">
              <summary className="cursor-pointer font-semibold">
                Will practicing WordSkull help my Wordle streak?
              </summary>
              <p className="mt-2">
                Yes. You’ll build <strong>pattern recognition</strong>,{" "}
                <strong>probe discipline</strong>, and a stronger{" "}
                <strong>letter-frequency</strong> intuition that transfers to
                5-letter play.
              </p>
            </details>
          </section>

          {/* CTA */}
          <section className={card + " mb-10"}>
            <p className="font-lora text-lg">
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
        <BlogSidebar />
      </main>

      <section className="mt-8">
        <SocialLinks />
      </section>
    </div>
  );
}
