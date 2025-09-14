import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useTheme } from "../client/components/context/ThemeContext";
import LoreSidebar from "../client/components/navigation/LoreSidebar";
import SocialLinks from "../client/components/navigation/SocialLinks";

/* ===================== CONSTANTS FOR THIS CHAPTER ===================== */
const slug = "chapter-1-the-wizards-rise";
const canonical = `https://www.wordskull.com/lore/${slug}`;
const datePublished = "2025-08-20"; // set your actual publish date
const dateModified = datePublished; // update when you edit
const title = "WordSkull Lore - Chapter 1: The Wizard’s Rise";
const headline = "Chapter 1: The Wizard’s Rise";
const description =
  "Who was Atriocsoul? The scholar who scorned death, forged a dungeon of riddles, and left an army of skulls to outlast him.";
const ogImageJpg =
  "https://www.doodlegarden.com/img/wordskull-lore-chapter-1.jpg";
const ogImageWebp =
  "https://www.doodlegarden.com/img/wordskull-lore-chapter-1.webp";
const imageAlt =
  "A dim hall lined with skull sentinels, a black stone pulsing at its heart.";

/* ===================== META ===================== */
export const meta: MetaFunction = () => {
  return [
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
  ];
};

/* ===================== PAGE ===================== */
export default function Lore_Chapter1_WizardsRise() {
  const { darkThemeActive } = useTheme();

  // FAQ content (renders below and feeds JSON-LD)
  const faq = [
    {
      q: "Who is Atriocsoul in WordSkull?",
      a: "Atriocsoul is the scholar-turned-wizard who bound his will to a black stone and built the puzzle dungeon. He created the Skull Guard to test and tempt intruders.",
    },
    {
      q: "What are the Skull Guard?",
      a: "Reanimated sentinels, once puzzle masters and password keepers, who still work the dungeon long after Atriocsoul’s fall.",
    },
    {
      q: "Do I need to read the lore before playing?",
      a: "No. You can jump straight into the game. Lore adds context, characters, and stakes if you enjoy worldbuilding.",
    },
    {
      q: "Is the lore connected to the game modes?",
      a: "Yes. The dungeon’s escalating trials echo WordSkull’s difficulty tiers, from quick sprints to long-form battles.",
    },
    {
      q: "Where do I read the next chapter?",
      a: "Head to Chapter 2: The Skull Guard. The series follows the wizard’s creations and the dungeon’s secrets.",
    },
  ];

  // JSON-LD: BreadcrumbList + Chapter + FAQPage
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
            name: "Lore",
            item: "https://www.wordskull.com/lore",
          },
          { "@type": "ListItem", position: 3, name: headline, item: canonical },
        ],
      },
      {
        "@type": "Chapter",
        headline,
        name: headline,
        description,
        mainEntityOfPage: canonical,
        isPartOf: {
          "@type": "CreativeWorkSeries",
          name: "WordSkull Lore",
          url: "https://www.wordskull.com/lore",
        },
        position: 1,
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

  // Minor visual upgrades kept, structure unchanged
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
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header with breadcrumbs */}
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
                  to="/lore"
                  className="hover:underline text-amber-600 font-bold"
                >
                  Lore
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
        {/* Article column */}
        <article className="flex-1 max-w-[900px] min-w-0 font-lato leading-relaxed tracking-wide">
          {/* Hero media */}
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
            <figcaption className="px-4 py-2 text-xs text-stone-500">
              The dungeon persists. A black stone remembers.
            </figcaption>
          </figure>

          {/* Title block */}
          <div className="text-center mb-4">
            <h2
              className={`font-lora text-4xl leading-snug ${
                darkThemeActive ? "text-stone-300" : "text-skull-dark-brown"
              }`}
            >
              WordSkull Lore
            </h2>
            <p className="font-lato text-base tracking-wider leading-relaxed mt-2 text-stone-600">
              The opening chapter of Atriocsoul’s legend and the birth of the
              skull sentinels.
            </p>
          </div>

          {/* === CONTENT SECTIONS === */}

          <section className="mb-8">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>
              <span>Who Was Atriocsoul?</span>
            </h3>
            <p className="mt-3">
              Every age has its villains, but few burned as brightly - and fell
              as hard - as the wizard known as Atriocsoul, the architect of the
              legendary puzzle dungeon Wordskull.
            </p>
            {/* High-contrast pullquote */}
            <p
              className={`mt-3 italic border-l-4 border-pumpkin-orange/80 pl-3 ${
                darkThemeActive ? "text-stone-200" : "text-pumpkin-orange"
              }`}
            >
              “He studied beyond fear, binding soul to syllable until bones
              obeyed words.”
            </p>
            <p className="mt-3">
              He was not born wicked. As a young scholar, Atriocsoul’s hunger
              was for knowledge, not conquest. He clawed through libraries,
              devoured forbidden grimoires, and pried into tombs that had been
              sealed for centuries. What he discovered was intoxicating: the
              secrets of soul-binding, words of power, and the art of weaving
              magic into flesh and bone.
            </p>
            <p className="mt-3">
              While kings and priests feared death, Atriocsoul believed it was
              just another barrier waiting to be broken - a mindset that laid
              the foundation for what players now know as a dark fantasy puzzle
              game unlike any other.
            </p>
          </section>

          <section className="mb-8">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>
              <span>The Rise of Atriocsoul’s Dungeon</span>
            </h3>
            <p className="mt-3">
              As his obsession grew, villages were stripped of their dead.
              Corpses vanished from graveyards, and skeleton armies marched
              under his banner. His followers called him a genius; his enemies
              called him a parasite. Both were right.
            </p>
            <p className="mt-3">
              At the height of his power, Atriocsoul’s dungeon became infamous,
              whispered across kingdoms like a cursed riddle. It was filled with
              traps, curses, and trials of the mind that worked like early word
              puzzles. Unlike other rulers, he believed brute strength was
              worthless without intellect.
            </p>
            <p className="mt-3">
              To enter his treasure halls, adventurers faced puzzles conjured by
              his hand, word-ciphers, cryptic riddles, and magical scrolls that
              demanded clever solutions. Solve them, and the path opened. Fail,
              and a false chamber snapped shut, springing traps that claimed
              another victim for his skeletal legion. It was the original word
              game challenge, centuries before the internet would rediscover it.
            </p>
          </section>

          <section className="mb-8">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>
              <span>Atriocsoul’s Fall and Sealed Magic</span>
            </h3>
            <p className="mt-3">
              But even Atriocsoul’s brilliance had limits. The kingdoms united,
              and after a war that raged for decades, he was finally struck
              down. His body was shattered, but not his spirit.
            </p>
            <p className="mt-3">
              For his soul had already been woven into a single artifact, a
              black stone that pulsed with the remnants of his power. Terrified,
              the victors sealed it away in secrecy, hoping it would never
              resurface.
            </p>
          </section>

          <section className="mb-8">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>
              <span>The Birth of the Skull Guard</span>
            </h3>
            <p className="mt-3">
              Yet the dungeon did not collapse. Atriocsoul’s dark magic
              lingered, clinging to the bones of his creations. The Skull Guard,
              reanimated sentinels who once served as his password keepers and
              puzzle masters, remained at their posts. They waited. They mocked.
              They tempted.
            </p>
            <p className="mt-3">
              Centuries passed, and still they worked. For though the wizard’s
              voice was silent, his will was not. And the skulls knew the truth:
              every word spoken, every puzzle attempted, every soul claimed
              brought their master one step closer to freedom.
            </p>
          </section>

          <section className="mb-8">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>
              <span>What Comes Next</span>
            </h3>
            <p className="mt-3">
              Atriocsoul’s dungeon was more than stone walls and traps. It
              needed guardians, clever, cruel, and cursed to work forever. In
              the next chapter, discover how the Skull Guard were first created,
              and why their personalities became as dangerous as the puzzles
              they protect in this lore-rich puzzle dungeon adventure.
            </p>
          </section>

          {/* === FAQ (visible) === */}
          <section className="mb-12">
            <h3 className={titleCls}>
              <span aria-hidden="true">✦</span>
              <span>Lore FAQ</span>
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

          {/* === CTA (old design restored) === */}
          <section className={card + " mb-12"}>
            <h3
              className={
                "font-lora text-2xl " +
                (darkThemeActive
                  ? "text-stone-200"
                  : "text-skull-super-dark-brown")
              }
            >
              The Dungeon Waits
            </h3>
            <p className="mt-2">
              Atriocsoul’s voice may have been silenced, but his skulls still
              whisper in the dark. The dungeon waits, and the puzzles never
              sleep.
            </p>
            <p className="mt-3">
              What about you? Will you step forward, test your mind in this dark
              word puzzle dungeon, and spread the word of your triumph, or
              become another name in the wizard’s ledger?
            </p>
            <p className="mt-3">
              Welcome to WordSkull. The game is eternal. The wizard thanks you.
            </p>
            <p className="mt-4">
              <Link
                to="/games/classic"
                className="text-pumpkin-orange hover:text-amber-600 font-lora"
              >
                Play WordSkull
              </Link>{" "}
              or start with{" "}
              <Link
                to="/lore"
                className="text-pumpkin-orange hover:text-amber-600 font-lora"
              >
                Chapter 2: The Skull Guard
              </Link>
              .
            </p>
          </section>
        </article>

        {/* Sidebar */}
        <LoreSidebar />
      </main>

      <section className="mt-8">
        <SocialLinks />
      </section>
    </div>
  );
}
