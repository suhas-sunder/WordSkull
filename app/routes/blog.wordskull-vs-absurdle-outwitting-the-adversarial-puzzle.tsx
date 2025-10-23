import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useTheme } from "../client/components/context/ThemeContext";
import BlogSidebar from "../client/components/navigation/BlogSidebar";
import SocialLinks from "../client/components/navigation/SocialLinks";

/* ===================== META ===================== */
export const meta: MetaFunction = () => {
  const canonical =
    "https://www.wordskull.com/blog/wordskull-vs-absurdle-outwitting-the-adversarial-puzzle";
  const title = "WordSkull vs Absurdle: Outwitting the Adversarial Puzzle";
  const description =
    "WordSkull vs Absurdle compared. Learn how WordSkull gives you progression, strategy, and unlimited play while Absurdle fights back with an adversarial mystery word.";

  const ogImage = "https://www.doodlegarden.com/img/wordskull-vs-absurdle.webp";

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
export default function Blog_WordSkullVsAbsurdle() {
  const { darkThemeActive } = useTheme();

  const canonical =
    "https://www.wordskull.com/blog/wordskull-vs-absurdle-outwitting-the-adversarial-puzzle";
  const date = "2025-10-23";

  /* JSON-LD - Breadcrumb + Article + FAQ */
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
            name: "WordSkull vs Absurdle",
            item: canonical,
          },
        ],
      },
      {
        "@type": "Article",
        headline: "WordSkull vs Absurdle: Outwitting the Adversarial Puzzle",
        description:
          "Discover the difference between the adversarial chaos of Absurdle and the strategic dungeon battles of WordSkull. Learn skills that improve every word game you play.",
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
        image: [
          "https://www.doodlegarden.com/img/wordskull-vs-absurdle.jpg",
          "https://www.doodlegarden.com/img/wordskull-vs-absurdle.webp",
        ],
        inLanguage: "en",
        articleSection: [
          "Comparison",
          "Strategy",
          "Difficulty",
          "Unlimited play",
          "Fantasy puzzles",
        ],
        keywords: [
          "WordSkull vs Absurdle",
          "absurdle strategy",
          "adversarial word games",
          "fantasy word puzzle",
          "3-9 letter words",
          "play WordSkull",
          "hard word games",
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
            name: "What makes Absurdle different from WordSkull?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Absurdle adapts its secret word to avoid being guessed. WordSkull uses fixed solutions, progression and boss battles to keep challenge fair and learnable.",
            },
          },
          {
            "@type": "Question",
            name: "Is WordSkull easier than Absurdle?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Absurdle tries to push you into dead ends. WordSkull scales difficulty from beginner to extreme so players build lasting skills instead of frustration.",
            },
          },
          {
            "@type": "Question",
            name: "Can I play WordSkull for free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. WordSkull is completely free to play with unlimited sessions across all difficulty modes.",
            },
          },
        ],
      },
    ],
  };

  const card =
    "rounded-xl px-5 py-4 mb-6 border shadow-sm " +
    (darkThemeActive
      ? "border-stone-700 bg-stone-900/40"
      : "border-pumpkin-orange/60 bg-white/70");

  const titleCls =
    "font-lora text-2xl mb-3 flex items-center gap-2 " +
    (darkThemeActive ? "text-amber-300" : "text-pumpkin-orange");

  return (
    <div
      className={`${
        darkThemeActive ? "text-stone-300" : "text-skull-dark-brown"
      } min-h-screen`}
    >
      {/* === Structured Data === */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* === Breadcrumb Header === */}
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
                WordSkull vs Absurdle
              </li>
            </ol>
          </nav>

          <h1 className="mt-1 font-nunito text-2xl tracking-wide">
            WordSkull vs Absurdle<span className="sr-only">, article</span>
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            <time dateTime={date}>{new Date(date).toLocaleDateString()}</time> •
            By Suhas Sunder
          </p>
        </div>
      </header>

      {/* === Layout === */}
      <main className="mx-auto max-w-[1200px] w-full px-6 py-8 flex gap-6">
        {/* === Article === */}
        <article className="flex-1 max-w-[900px] min-w-0 font-lato leading-relaxed tracking-wide">
          {/* Hero */}
          <div className="text-center mb-4">
            <h2
              className={`font-lora text-4xl leading-snug ${
                darkThemeActive ? "text-stone-300" : "text-skull-dark-brown"
              }`}
            >
              WordSkull vs <span className="inline-flex">💀</span>Absurdle
            </h2>
            <p className="font-lato text-base tracking-wider leading-relaxed mt-2 text-stone-600">
              One game tries to help you solve. The other actively fights back.
              Which one builds better word-game skills?
            </p>
          </div>

          <figure className="mb-6 rounded-2xl overflow-hidden">
            <picture>
              <source
                srcSet="https://www.doodlegarden.com/img/wordskull-vs-absurdle.webp"
                type="image/webp"
              />
              <source
                srcSet="https://www.doodlegarden.com/img/wordskull-vs-absurdle.jpg"
                type="image/jpeg"
              />
              <img
                src="https://www.doodlegarden.com/img/wordskull-vs-absurdle.jpg"
                alt="Comparison of WordSkull’s progression system and Absurdle’s adversarial word shuffling"
                width={1200}
                height={630}
                className="w-full h-auto block"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
            <figcaption className="px-4 py-2 text-xs text-stone-500">
              Absurdle hides the answer by shifting its secret word. WordSkull
              gives a fair fight, progression, and bosses.
            </figcaption>
          </figure>

          {/* TLDR */}
          <div className={card}>
            <p>
              TLDR: Absurdle adapts its secret word to avoid being solved, which
              creates chaos but little learning.{" "}
              <Link
                to="/"
                className="text-pumpkin-orange hover:text-amber-600 font-lora"
              >
                WordSkull
              </Link>{" "}
              gives you unlimited battles, progression across 3–9 letters, and
              fantasy motivation that actually improves your skills.
            </p>
          </div>

          {/* Table */}
          <section className="mb-10">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Head-to-Head Comparison</span>
            </h3>
            <div className="mt-3 overflow-x-auto rounded-xl border border-pumpkin-orange/60">
              <table className="min-w-full table-fixed text-sm">
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
                    <th className="text-left px-4 py-2 font-semibold">
                      Feature
                    </th>
                    <th className="text-left px-4 py-2 font-semibold">
                      Absurdle
                    </th>
                    <th className="text-left px-4 py-2 font-semibold">
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
                  <tr>
                    <td className="px-4 py-2">Secret word</td>
                    <td className="px-4 py-2">Changes to avoid your guesses</td>
                    <td className="px-4 py-2">Fixed, fair, learnable</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Play style</td>
                    <td className="px-4 py-2">Adversarial chaos</td>
                    <td className="px-4 py-2">Dungeon puzzles, boss battles</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Word length</td>
                    <td className="px-4 py-2">Fixed 5</td>
                    <td className="px-4 py-2">Varies 3–9 by mode</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Learning curve</td>
                    <td className="px-4 py-2">High frustration</td>
                    <td className="px-4 py-2">Guided skill growth</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Sessions</td>
                    <td className="px-4 py-2">Unlimited chaos</td>
                    <td className="px-4 py-2">
                      Unlimited practice + progression
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Key SEO sections */}

          <section className="mb-10">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Why Absurdle Fights You</span>
            </h3>
            <p className="mt-3">
              Absurdle begins with hundreds of possible answers. Every time you
              guess, it shifts the hidden word to something that still fits your
              feedback but is harder to reach. It is clever coding, but…
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>You cannot improve meaningfully game to game</li>
              <li>It teaches defensive guessing, not strategy</li>
              <li>Wins feel random, not earned</li>
            </ul>
          </section>

          <section className="mb-10">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Why WordSkull Helps You Win More Word Games</span>
            </h3>
            <p className="mt-3">
              WordSkull rewards smart plays with faster solves. Better branching
              logic means fewer wasted guesses in WordSkull… and in every other
              word game you play.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Variable length builds both speed and structure</li>
              <li>Boss battles encourage learning through progress</li>
              <li>
                Internal tools:{" "}
                <Link
                  to="/words-list"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  Words by Length
                </Link>{" "}
                between games
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Who Should Play Which?</span>
            </h3>
            <p className="mt-3">Choose your adventure:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <strong>Absurdle</strong> if you enjoy battling a mischievous
                algorithm
              </li>
              <li>
                <strong>WordSkull</strong> if you want to get better at word
                games and have fun doing it
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Why Players Compare WordSkull and Absurdle</span>
            </h3>
            <p className="mt-3">
              Fans of difficult word puzzles often look for variety. When Wordle
              becomes a daily warm up, players want something with more bite.
              Absurdle delivers difficulty through chaos. WordSkull delivers
              difficulty through progression, vocabulary depth, and dungeon
              battles that feel rewarding instead of random.
            </p>
            <p className="mt-3">
              Both games attract advanced solvers who enjoy challenge and
              constraint. The difference is in what you get back for your
              effort. WordSkull teaches skills that transfer into other puzzles.
              Absurdle keeps you guessing, but does not create repeatable
              growth.
            </p>
          </section>

          <section className="mb-10">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Fair Challenge vs Adversarial Trickery</span>
            </h3>
            <p className="mt-3">
              The core philosophical split. Absurdle changes the answer to avoid
              your guesses. WordSkull gives a fixed solution and a fair fight.
              The result is two very different kinds of challenge.
            </p>

            <div className="mt-4 overflow-x-auto rounded-xl border border-pumpkin-orange/60">
              <table className="min-w-full table-fixed text-sm">
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
                    <th className="px-4 py-2 text-left font-semibold">
                      Play Style
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Outcome
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pumpkin-orange/60">
                  <tr>
                    <td className="px-4 py-2">
                      Absurdle’s adversarial shuffling
                    </td>
                    <td className="px-4 py-2">
                      Chaos difficulty, low strategy carryover
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      WordSkull’s fixed battles and clues
                    </td>
                    <td className="px-4 py-2">
                      Learnable skills and rewarding mastery
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Skill Growth That Transfers Beyond WordSkull</span>
            </h3>
            <p className="mt-3">
              WordSkull players improve across a spectrum of word puzzles,
              including Wordle, Quordle, and even Spelling Bee. Structured
              learning is built into the experience. Short words teach speed.
              Long words teach anagram stamina.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Better letter frequency intuition</li>
              <li>Cleaner elimination logic under pressure</li>
              <li>Faster vocabulary recall across lengths</li>
            </ul>
          </section>

          <section className="mb-10">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>How WordSkull Scales Difficulty Better</span>
            </h3>
            <p className="mt-3">
              WordSkull challenges you differently depending on length and mode.
              A 3 letter fight feels like a reflex test. A 9 letter boss battle
              becomes an exercise in structure and anagram control. Absurdle
              stays a single length and a single type of difficulty.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Boneheads, 3 to 5: fast reps for common letters</li>
              <li>Specter, 3 to 6: blend of small and mid-length patterns</li>
              <li>Grim Reapers, 3 to 7: branching and multi-syllable traps</li>
              <li>
                Royal Lichen, 3 to 9: true endurance and morphology puzzles
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Training Routine for Hard Word Game Players</span>
            </h3>
            <p className="mt-3">
              If you love beating tough puzzles, a daily routine in WordSkull
              will help you improve everywhere else. Start short, get your
              reflexes warm, then ramp into a boss challenge.
            </p>
            <div className="mt-3 space-y-1">
              <p>Minutes 0 to 4: Boneheads, quick letter tests</p>
              <p>Minutes 5 to 8: Specter, cluster discovery</p>
              <p>Minutes 9 to 12: Grim Reapers, mid-game branching</p>
              <p>Minutes 13 to 15: Royal Lichen, a long pattern finisher</p>
            </div>
            <p className="mt-3">
              To expand recall between sessions, browse{" "}
              <Link
                to="/words-list"
                className="text-pumpkin-orange hover:text-amber-600 font-lora"
              >
                Words by Length
              </Link>
              .
            </p>
          </section>

          <section className="mb-10">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Accessibility and Mobile Performance</span>
            </h3>
            <p className="mt-3">
              WordSkull is designed to run fast on phones and desktops so you
              can fit short battles throughout the day. Clear contrast, keyboard
              shortcuts, and smooth animations keep focus on letter patterns and
              decision making.
            </p>
          </section>

          <section className="mb-10">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Where Absurdle Fits in Your Puzzle Rotation</span>
            </h3>
            <p className="mt-3">
              Some players treat{" "}
              <a
                href="https://qntm.org/absurdle"
                rel="noopener noreferrer nofollow"
                className="text-pumpkin-orange hover:text-amber-600"
              >
                Absurdle
              </a>{" "}
              as a pure novelty challenge. You can test it occasionally for
              variety. But if you want a game that builds lasting skill,
              WordSkull offers unlimited learning, adventure, and battle-driven
              progression.
            </p>
          </section>

          <section className="mb-10">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Why WordSkull Retains Puzzle Players Longer</span>
            </h3>

            <p className="mt-3">
              Absurdle thrives on surprise and frustration. That makes it a fun
              side challenge, but a difficult game to play every single day.
              WordSkull builds confidence. As players solve more skull battles,
              they upgrade their pattern recognition and vocabulary. That sense
              of progress keeps people coming back.
            </p>

            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                Clear goal posts as you climb from Boneheads to Royal Lichen
              </li>
              <li>Predictable rules that reward smart improvement</li>
              <li>Small wins snowball into complete mastery</li>
            </ul>
          </section>

          <section className="mb-10">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Solve Psychology: Randomness vs Mastery</span>
            </h3>

            <p className="mt-3">
              WordSkull creates teachable patterns. Absurdle breaks patterns.
              Over time, this shapes how players think. The more you play
              WordSkull, the better you get at every word game. The more you
              play Absurdle, the better you get at escaping traps that exist
              only inside Absurdle.
            </p>

            <div className="mt-4 overflow-x-auto rounded-xl border border-pumpkin-orange/60">
              <table className="min-w-full table-fixed text-sm">
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
                    <th className="px-4 py-2 text-left font-semibold">
                      Game Design
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Player Outcome
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pumpkin-orange/60">
                  <tr>
                    <td className="px-4 py-2">
                      WordSkull progression and skill gates
                    </td>
                    <td className="px-4 py-2">
                      You learn faster, solve smarter
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      Absurdle adversarial shuffling
                    </td>
                    <td className="px-4 py-2">You react, but rarely improve</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Social Play and Streamable Battles</span>
            </h3>

            <p className="mt-3">
              WordSkull battles create moments worth sharing: clutch victories,
              comeback finales, and boss defeats. That makes it more fun with
              friends, in Discord groups, and even on stream.
            </p>

            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Quick matches encourage repeat head-to-head challenges</li>
              <li>Progression gives viewers a reason to cheer</li>
              <li>Fantasy theme gives creators a story to tell</li>
            </ul>
          </section>

          <section className="mb-10">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Vocabulary Growth and Real Learning</span>
            </h3>

            <p className="mt-3">
              WordSkull leverages the full power of English vocabulary. By
              solving words across many lengths, you absorb common prefixes,
              suffixes, and clusters automatically. Longer modes, especially
              Grim Reapers and Royal Lichen, teach morphology, not just
              guessing.
            </p>

            <p className="mt-3">
              Practice between battles using{" "}
              <Link
                to="/words-list"
                className="text-pumpkin-orange hover:text-amber-600 font-lora"
              >
                curated word lists by length
              </Link>{" "}
              to accelerate progression.
            </p>
          </section>

          <section className="mb-10">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Where Absurdle Fits in Your Puzzle Rotation</span>
            </h3>

            <p className="mt-3">
              Absurdle, available at{" "}
              <a
                href="https://qntm.org/absurdle"
                rel="noopener noreferrer nofollow"
                className="text-pumpkin-orange hover:text-amber-600 font-lora"
              >
                qntm.org/absurdle
              </a>
              , is great for occasional chaos. Keep it in your rotation for
              novelty. When you want to improve vocabulary and win smarter,
              WordSkull has the tools to help you do that every day.
            </p>
          </section>

          <section className="mb-10">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Who Should Switch from Absurdle to WordSkull</span>
            </h3>

            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Players who want real progression and not randomness</li>
              <li>Vocabulary learners seeking structured skill-building</li>
              <li>Gamers who love achievements and boss battles</li>
              <li>Streamers who want compelling audience moments</li>
            </ul>

            <p className="mt-3">
              WordSkull rewards you for thinking smarter. The more you play, the
              better you get at every puzzle you touch.
            </p>
          </section>

          

          {/* Quick FAQ */}
          <section className="mb-14">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span> <span>Quick FAQ</span>
            </h3>
            <details className="mt-3">
              <summary className="cursor-pointer font-semibold">
                Does Absurdle cheat?
              </summary>
              <p className="mt-2">
                Not technically, but it does evade your guesses on purpose. That
                is the whole point.
              </p>
            </details>
            <details className="mt-3">
              <summary className="cursor-pointer font-semibold">
                Why does WordSkull have bosses?
              </summary>
              <p className="mt-2">
                Because defeating skulls feels great. Motivation boosts mastery.
              </p>
            </details>
            <details className="mt-3">
              <summary className="cursor-pointer font-semibold">
                Which game makes me smarter?
              </summary>
              <p className="mt-2">
                WordSkull. You build vocabulary, pattern recognition, and search
                logic that transfer into every word game.
              </p>
            </details>
          </section>

          {/* CTA */}
          <section className={card + " mb-10"}>
            <p className="font-lora text-lg">
              Outwit skull bosses today:{" "}
              <Link to="/" className="text-pumpkin-orange hover:text-amber-600">
                Play WordSkull free
              </Link>{" "}
              or warm up in{" "}
              <Link
                to="/games/classic/boneheads-easy-3-to-5-letter-words"
                className="text-pumpkin-orange hover:text-amber-600"
              >
                Boneheads, 3–5
              </Link>
              .
            </p>
          </section>

          {/* Explore more */}
          <section className="mb-14">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span> <span>More to Explore</span>
            </h3>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <Link
                  to="/words-list"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  Build your vocabulary
                </Link>
              </li>
              <li>
                <Link
                  to="/games/classic"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  Classic WordSkull modes
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  More WordSkull articles
                </Link>
              </li>
            </ul>
          </section>
        </article>

        {/* Sidebar */}
        <BlogSidebar />
      </main>

      <section className="mt-8">
        <SocialLinks />
      </section>
    </div>
  );
}
