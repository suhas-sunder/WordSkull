import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useTheme } from "../client/components/context/ThemeContext";
import BlogSidebar from "../client/components/navigation/BlogSidebar";
import SocialLinks from "../client/components/navigation/SocialLinks";

/* ===================== CONSTANTS FOR THIS ARTICLE ===================== */
const slug = "wordskull-vs-quordle-multi-grid-madness";
const canonical = `https://www.wordskull.com/blog/${slug}`;
const datePublished = "2025-09-24";
const dateModified = datePublished;
const title = "WordSkull vs Quordle: Single Skulls vs Multi-Grid Madness";
const description =
  "Compare WordSkull and Quordle. Single-grid dungeon word battles versus four-board word guessing. See which puzzle fits your playstyle and start playing WordSkull.";

const headline = "WordSkull vs Quordle: Single Skulls vs Multi-Grid Madness";

const ogImageJpg = "https://www.doodlegarden.com/img/wordskull-vs-quordle.jpg";
const ogImageWebp =
  "https://www.doodlegarden.com/img/wordskull-vs-quordle.webp";
const imageAlt =
  "WordSkull dungeon grid facing off against Quordle four-board layout.";

/* ===================== META ===================== */
export const meta: MetaFunction = () => [
  { title },
  { name: "description", content: description },
  { tagName: "link", rel: "canonical", href: canonical },
  { property: "og:site_name", content: "WordSkull" },
  { property: "og:title", content: title },
  { property: "og:description", content: description },
  { property: "og:type", content: "article" },
  { property: "og:url", content: canonical },
  { property: "og:image", content: ogImageJpg },
  { property: "og:image:alt", content: imageAlt },
  { property: "og:locale", content: "en_US" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: title },
  { name: "twitter:description", content: description },
  { name: "twitter:image", content: ogImageJpg },
  {
    name: "robots",
    content:
      "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
  },
  {
    name: "keywords",
    content:
      "WordSkull, Quordle, word games, daily puzzles, play word games online, logic puzzles, vocabulary game, NYT style puzzles, four grid word game",
  },
];

/* ===================== PAGE ===================== */
export default function Blog_WordSkullVsQuordle() {
  const { darkThemeActive } = useTheme();

  // FAQ for JSON-LD + visible toggle
  const faq = [
    {
      q: "What is the difference between WordSkull and Quordle?",
      a: "WordSkull is a single-grid dungeon word puzzle with RPG flavor and strategic linking. Quordle uses four Wordle-style boards at once with pure deduction and letter feedback.",
    },
    {
      q: "Which game is harder, WordSkull or Quordle?",
      a: "Quordle is intense if you prefer rapid elimination across four boards. WordSkull is challenging in a different way because spatial word links affect traps, monsters, and score multipliers.",
    },
    {
      q: "Can I play WordSkull daily like Quordle?",
      a: "Yes. WordSkull offers daily challenges, quests, and leaderboards so you can build a consistent puzzle routine.",
    },
    {
      q: "Is WordSkull free to play?",
      a: "Yes. You can play WordSkull free on desktop and mobile with no sign up required.",
    },
    {
      q: "Do I need Wordle experience to enjoy WordSkull?",
      a: "No. WordSkull is a standalone experience. If you enjoy vocabulary building and clever strategy, you will feel right at home.",
    },
  ];

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
          { "@type": "ListItem", position: 3, name: headline, item: canonical },
        ],
      },
      {
        "@type": "Article",
        headline,
        name: headline,
        description,
        mainEntityOfPage: canonical,
        author: {
          "@type": "Person",
          name: "Suhas Sunder",
          url: "https://www.suhassunder.com",
        },
        publisher: { "@type": "Organization", name: "WordSkull" },
        datePublished,
        dateModified,
        inLanguage: "en",
        image: [ogImageJpg, ogImageWebp],
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
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
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
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
                {headline}
              </li>
            </ol>
          </nav>

          <h1 className="mt-1 font-nunito text-3xl tracking-wide text-pumpkin-orange">
            {headline}
          </h1>
          <div className="h-1 w-20 mt-2 rounded bg-gradient-to-r from-pumpkin-orange to-amber-500" />
          <p className="mt-2 text-sm text-stone-600">
            <time dateTime={datePublished}>
              {new Date(datePublished).toLocaleDateString()}
            </time>{" "}
            • By Suhas Sunder
          </p>
        </div>
      </header>

      {/* Body + Sidebar */}
      <main className="mx-auto max-w-[1200px] w-full px-6 py-8 flex gap-6">
        {/* Article */}
        <article className="flex-1 max-w-[900px] min-w-0 font-lato leading-relaxed tracking-wide">
          <figure className="mb-6 rounded-2xl overflow-hidden shadow-lg shadow-pumpkin-orange/20">
            <picture>
              <source srcSet={ogImageWebp} type="image/webp" />
              <source srcSet={ogImageJpg} type="image/jpeg" />
              <img
                src={ogImageJpg}
                alt={imageAlt}
                width={1200}
                height={630}
                className="w-full h-auto block"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          </figure>

          {/* Intro */}
          <section className="mb-8">
            <p>
              Looking for the right mix of vocabulary, logic, and fast
              decisions? This guide compares{" "}
              <Link to="/games/classic" className="text-amber-600 underline">
                WordSkull
              </Link>{" "}
              and Quordle so you can pick your next daily puzzle and start
              playing right away. If you want a single-grid word adventure with
              strategic linking, choose WordSkull. If you want four-board
              deduction at speed, Quordle will keep you guessing.
            </p>
          </section>

          {/* Gameplay Mechanics */}
          <section className="mb-8">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span> <span>Gameplay Mechanics</span>
            </h3>
            <ul className="mt-3 list-disc list-inside">
              <li>
                <strong>WordSkull:</strong> Link letters on a dungeon grid to
                form words, trigger traps and treasures, and fight monsters for
                score multipliers. Spatial planning matters because each word
                can alter the board and the next move.
              </li>
              <li>
                <strong>Quordle:</strong> Solve four hidden words at once with
                letter feedback after each guess. Pure deduction across multiple
                boards rewards vocabulary depth and efficient elimination.
              </li>
            </ul>
          </section>

          {/* Skill Focus */}
          <section className="mb-8">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span> <span>Skill Focus</span>
            </h3>
            <ul className="mt-3 list-disc list-inside">
              <li>
                <strong>WordSkull:</strong> Strategy, spatial reasoning,
                vocabulary building, and risk management with combo planning.
              </li>
              <li>
                <strong>Quordle:</strong> Deduction, pattern recognition, and
                guess efficiency across four parallel boards.
              </li>
            </ul>
          </section>

          {/* Which Fits Your Playstyle */}
          <section className="mb-8">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Which Fits Your Playstyle?</span>
            </h3>
            <ul className="mt-3 list-disc list-inside">
              <li>
                Pick <strong>WordSkull</strong> if you like immersive word
                adventures, score chasing, and a light RPG feel.
              </li>
              <li>
                Pick <strong>Quordle</strong> if you prefer rapid logic on four
                boards with tight guess budgeting.
              </li>
            </ul>
          </section>

          {/* Why WordSkull Helps With Daily Habit and Retention */}
          <section className="mb-8">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Daily Habit, Scores, and Replay</span>
            </h3>
            <p className="mt-3">
              WordSkull is built for repeat play. Daily quests, rotating dungeon
              layouts, and leaderboards make it easy to keep a streak and share
              scores. If you like short sessions, you can clear a quick level.
              If you want a deeper run, chain longer combos and climb the
              rankings.
            </p>
            <p className="mt-3">
              Quordle supports daily practice too. You get focused deduction
              reps across four grids, a good fit if your goal is efficient
              vocabulary testing in a compact session.
            </p>
          </section>

          {/* SEO Helpful Comparison Points */}
          <section className="mb-8">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span> <span>Quick Comparison</span>
            </h3>
            <ul className="mt-3 list-disc list-inside">
              <li>
                <strong>Time per round:</strong> WordSkull sessions can be short
                or long based on your route. Quordle is usually short and
                intense.
              </li>
              <li>
                <strong>Learning curve:</strong> WordSkull teaches strategy as
                you play with simple controls. Quordle rewards prior Wordle
                style experience and strong letter elimination.
              </li>
              <li>
                <strong>Mobile friendly:</strong> Both play well on phones and
                tablets. WordSkull’s grid and touch targets are tuned for quick
                swipes.
              </li>
              <li>
                <strong>Social features:</strong> WordSkull leaderboards and
                shareable scores make friendly rivalries simple.
              </li>
            </ul>
          </section>

          {/* SEO Supporting Copy */}
          <section className="mb-8">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Vocabulary Growth and Brain Training</span>
            </h3>
            <p className="mt-3">
              Word puzzles help with memory, attention, and verbal fluency.
              WordSkull boosts vocabulary and planning through spatial linking
              and combo creation. Quordle sharpens deduction and elimination.
              Many players rotate both for a balanced routine that stays fresh.
            </p>
          </section>

          {/* Internal Links for SEO */}
          <section className="mb-8">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span> <span>Related Reading</span>
            </h3>
            <ul className="mt-3 list-disc list-inside">
              <li>
                Prefer categorization puzzles? Read{" "}
                <Link
                  to="/blog/wordskull-vs-nyt-connections"
                  className="text-amber-600 underline"
                >
                  WordSkull vs NYT Connections
                </Link>{" "}
                to compare linking logic and daily grids.
              </li>
              <li>
                Ready to play now? Jump into{" "}
                <Link to="/games/classic" className="text-amber-600 underline">
                  WordSkull Classic
                </Link>{" "}
                and start a run in seconds.
              </li>
            </ul>
          </section>

          {/* Origins and Popularity */}
          <section className="mb-8">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Origins and Rise in Popularity</span>
            </h3>
            <p className="mt-3">
              <strong>WordSkull</strong> was built as a fantasy spin on the
              modern word puzzle craze. Instead of limiting players to plain
              grids, it blends dungeon-inspired adventures with vocabulary
              challenges. Players progress through levels, face monsters, and
              collect loot while forming words-making it both a puzzle and a
              role-playing experience.
            </p>
            <p className="mt-3">
              <strong>Quordle</strong> appeared as a natural evolution of{" "}
              <em>Wordle</em>. When Wordle took the internet by storm, many
              variants popped up. Quordle stood out by multiplying the
              challenge: four hidden words to solve at once, each guess
              affecting every grid. Its viral nature and difficulty quickly gave
              it a loyal player base among puzzle enthusiasts.
            </p>
          </section>

          {/* Difficulty and Replay Value */}
          <section className="mb-8">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Difficulty and Replay Value</span>
            </h3>
            <p className="mt-3">
              If you’re wondering which game is harder, the answer depends on
              your playstyle. Quordle demands lightning-fast deduction across
              four grids with limited guesses. WordSkull, on the other hand,
              challenges you to balance vocabulary with strategy-where a single
              misplaced link can trigger traps or block future moves.
            </p>
            <ul className="mt-3 list-disc list-inside">
              <li>
                <strong>Quordle:</strong> Best for players who thrive under
                pressure and enjoy efficient elimination.
              </li>
              <li>
                <strong>WordSkull:</strong> Ideal for players who like
                longer-term replay, score chasing, and story-driven mechanics.
              </li>
            </ul>
            <p className="mt-3">
              Both games encourage replay. Quordle delivers fast practice in
              word deduction, while WordSkull’s daily dungeons and leaderboard
              runs make it addictive for streak builders.
            </p>
          </section>

          {/* Community and Social Sharing */}
          <section className="mb-8">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Community and Social Sharing</span>
            </h3>
            <p className="mt-3">
              Word games thrive when players can share progress.{" "}
              <strong>Quordle</strong> helped pioneer the social screenshot
              trend by letting users copy their results and show friends. The
              colored block format became a badge of honor across Twitter,
              Discord, and Reddit.
            </p>
            <p className="mt-3">
              <strong>WordSkull</strong> takes a more game-like approach.
              Instead of static results, it features competitive{" "}
              <em>leaderboards</em> where players battle for top dungeon scores.
              Challenges and score streaks give it a stronger sense of community
              and rivalry beyond just daily grids.
            </p>
          </section>

          {/* Mobile and Accessibility */}
          <section className="mb-8">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Mobile Play and Accessibility</span>
            </h3>
            <p className="mt-3">
              Both <strong>WordSkull</strong> and <strong>Quordle</strong> are
              optimized for mobile, meaning you can play on your commute, during
              lunch, or from your couch. WordSkull’s grid layout is
              swipe-friendly for quick word linking, while Quordle’s multi-grid
              interface is simple enough for quick taps.
            </p>
            <p className="mt-3">
              Accessibility also matters. WordSkull includes scalable fonts,
              color-friendly palettes, and a clear visual design. Quordle relies
              on familiar word game conventions, making it easy to pick up for
              anyone who has tried Wordle before.
            </p>
          </section>

          {/* Educational and Cognitive Benefits */}
          <section className="mb-8">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Educational and Cognitive Benefits</span>
            </h3>
            <p className="mt-3">
              Word puzzles aren’t just entertainment-they’re brain training.
              Playing <strong>WordSkull</strong> improves spatial reasoning,
              vocabulary, and memory by forcing you to think about word
              placement and long-term strategy. The dungeon theme makes these
              benefits feel like part of an adventure.
            </p>
            <p className="mt-3">
              <strong>Quordle</strong> sharpens rapid deduction and pattern
              recognition. Because every guess applies across four grids, you
              need to process feedback quickly and adjust strategy. Many players
              report noticeable improvement in vocabulary retention and mental
              agility after consistent play.
            </p>
          </section>

          {/* Comparison Table */}
          <section className="mb-8">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Quick Comparison Table</span>
            </h3>
            <div className="overflow-x-auto mt-3">
              <table className="w-full border border-stone-300 text-sm">
                <thead>
                  <tr className="bg-stone-100 text-left">
                    <th className="p-2 border-b border-stone-300">Feature</th>
                    <th className="p-2 border-b border-stone-300">WordSkull</th>
                    <th className="p-2 border-b border-stone-300">Quordle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border-b border-stone-300">
                      Core Style
                    </td>
                    <td className="p-2 border-b border-stone-300">
                      Dungeon adventure, RPG puzzle
                    </td>
                    <td className="p-2 border-b border-stone-300">
                      Wordle variant with 4 grids
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-stone-300">
                      Difficulty
                    </td>
                    <td className="p-2 border-b border-stone-300">
                      Strategic planning + word building
                    </td>
                    <td className="p-2 border-b border-stone-300">
                      High-requires multitasking
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-stone-300">
                      Replay Value
                    </td>
                    <td className="p-2 border-b border-stone-300">
                      Daily dungeons + leaderboard runs
                    </td>
                    <td className="p-2 border-b border-stone-300">
                      Daily puzzle consistency
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-stone-300">
                      Social Play
                    </td>
                    <td className="p-2 border-b border-stone-300">
                      Competitive leaderboards
                    </td>
                    <td className="p-2 border-b border-stone-300">
                      Shareable results screenshots
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">Best For</td>
                    <td className="p-2">Fans of RPG + word games</td>
                    <td className="p-2">Fast deduction lovers</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Strategy Tips for Beginners */}
          <section className="mb-8">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Strategy Tips for Beginners</span>
            </h3>
            <p className="mt-3">
              New to word games? <strong>WordSkull</strong> is built to be
              accessible. Start with shorter words to clear space on the dungeon
              grid and gradually move to longer combos. Using small words early
              builds confidence, while saving longer words for later turns
              maximizes points and unlocks extra rewards.
            </p>
            <p className="mt-3">
              In <strong>Quordle</strong>, the best beginner strategy is to
              choose strong starting words with common vowels and consonants
              like “arise” or “stout.” Because guesses apply to all four grids,
              this spreads your coverage and helps eliminate letters quickly.
            </p>
            <p className="mt-3">
              For both games, consistency is key. Set aside five to ten minutes
              daily. Whether you’re linking words in a dungeon or juggling four
              grids at once, daily play sharpens vocabulary and pattern
              recognition skills over time.
            </p>
          </section>

          {/* Advanced Playstyles */}
          <section className="mb-8">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Advanced Playstyles and Mastery</span>
            </h3>
            <p className="mt-3">
              Once you’ve built confidence, <strong>WordSkull</strong> opens the
              door to advanced strategies. Expert players often plan multiple
              turns ahead, linking words to set up future bonuses or positioning
              moves to block traps. Chaining words for maximum dungeon damage is
              an art form, and leaderboard competitors study optimal paths the
              same way chess players study openings.
            </p>
            <p className="mt-3">
              <strong>Quordle</strong> mastery looks different. Advanced players
              prioritize information density—choosing words that test the
              maximum number of unknown letters in a single guess. Timing also
              matters: deciding when to commit to solving one grid versus
              spreading guesses across all four is what separates casual play
              from consistent wins.
            </p>
            <p className="mt-3">
              Both games reward persistence and experimentation. Treat each run
              as practice, refine your approach, and track progress over weeks
              instead of days. The payoff is not just higher scores but sharper
              cognitive reflexes.
            </p>
          </section>

          {/* Why WordSkull Appeals to Different Players */}
          <section className="mb-8">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>Why WordSkull Appeals to Different Players</span>
            </h3>
            <ul className="mt-3 list-disc list-inside">
              <li>
                <strong>Casual players:</strong> Quick dungeon runs and easy
                word links make it approachable for anyone who enjoys a daily
                puzzle break.
              </li>
              <li>
                <strong>Competitive players:</strong> Leaderboards, streaks, and
                score multipliers turn WordSkull into a battleground where skill
                and persistence shine.
              </li>
              <li>
                <strong>Educators:</strong> Teachers can use WordSkull to
                reinforce spelling, vocabulary, and strategic thinking in a fun,
                gamified format.
              </li>
            </ul>
            <p className="mt-3">
              By comparison, <strong>Quordle</strong> primarily appeals to
              competitive puzzlers who want a more demanding Wordle experience.
              Its simplicity is a strength, but WordSkull’s layered design
              broadens its audience reach.
            </p>
          </section>

          {/* The Future of Word Games */}
          <section className="mb-8">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>{" "}
              <span>The Future of Word Games</span>
            </h3>
            <p className="mt-3">
              The word game boom shows no signs of slowing. From crossword apps
              to viral hits like Wordle, audiences crave puzzles that blend
              simplicity with challenge. What’s next? Games that combine{" "}
              <em>storytelling</em>, <em>multiplayer features</em>, and{" "}
              <em>immersive mechanics</em>.
            </p>
            <p className="mt-3">
              <strong>WordSkull</strong> is ahead of the curve by merging RPG
              mechanics with puzzle play. Its evolving dungeon system and daily
              updates show how word games can grow into living, breathing
              experiences. <strong>Quordle</strong> demonstrates how increasing
              difficulty can capture a niche audience. Together, they highlight
              the innovation happening in puzzle design.
            </p>
            <p className="mt-3">
              As technology advances, expect more hybrid experiences: AR
              word-hunts, collaborative puzzle raids, and AI-driven
              personalization. WordSkull positions itself well in this future by
              offering both entertainment and cognitive benefits.
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span> <span>FAQ</span>
            </h3>
            <div className="mt-3 space-y-3">
              {faq.map((f) => (
                <details
                  key={f.q}
                  className={`rounded-lg border ${
                    darkThemeActive ? "border-stone-700" : "border-stone-200"
                  } p-3`}
                >
                  <summary className="cursor-pointer font-semibold">
                    {f.q}
                  </summary>
                  <p className="mt-2 text-sm">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className={card + " mb-12"}>
            <h3
              className={`font-lora text-2xl ${
                darkThemeActive
                  ? "text-stone-200"
                  : "text-skull-super-dark-brown"
              }`}
            >
              Play Now: Single Skull or Four Grids
            </h3>
            <p className="mt-2">
              Choose your path. Take on the dungeon in WordSkull or test
              deduction across four boards in Quordle. Build a daily puzzle
              habit and track your progress over time.
            </p>
            <p className="mt-4">
              <Link
                to="/games/classic"
                className="text-pumpkin-orange hover:text-amber-600 font-lora"
              >
                Play WordSkull Free
              </Link>{" "}
              or explore{" "}
              <Link
                to="/blog"
                className="text-pumpkin-orange hover:text-amber-600 font-lora"
              >
                more WordSkull articles
              </Link>
              .
            </p>
          </section>
        </article>

        {/* Sidebar */}
        <BlogSidebar />
      </main>

      {/* Social links */}
      <section className="mt-8">
        <SocialLinks />
      </section>
    </div>
  );
}
