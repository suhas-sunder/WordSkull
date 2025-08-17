import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import SocialLinks from "../client/components/navigation/SocialLinks";

export const meta: MetaFunction = () => {
  const canonical = "https://www.wordskull.com/sitemap";

  const title = "Sitemap | WordSkull";
  const description =
    "Browse the WordSkull sitemap for quick access to all game modes, word lists, FAQs, and help pages.";

  const ogImage = "https://www.wordskull.com/og/wordskull-sitemap.jpg";

  return [
    // Title & Description
    { title },
    { name: "description", content: description },

    // Canonical
    { tagName: "link", rel: "canonical", href: canonical },

    // Open Graph
    { property: "og:site_name", content: "WordSkull" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonical },
    { property: "og:image", content: ogImage },
    { property: "og:image:alt", content: "WordSkull sitemap overview" },
    { property: "og:locale", content: "en_US" },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },

    // Robots (indexable, since it's useful for discovery)
    {
      name: "robots",
      content:
        "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    },
  ];
};

export default function Sitemap() {
  return (
    <div className="flex justify-center gap-10 leading-loose tracking-widest flex-col items-center mx-10">
      <header>
        <h1 className="font-lora text-center text-slate-500 translate-y-10 text-2xl mx-5 sm:text-3xl">
          Sitemap
        </h1>
      </header>

      <main className="max-w-[1200px] my-10 text-pumpkin-orange text-lg flex flex-col w-full">
        <ol className="flex flex-col list-decimal font-nunito mr-auto gap-5 mb-5">
          {/* --- Main --- */}
          <h2 className="font-lora text-xl text-slate-500 mt-5 mb-2">Main</h2>
          <li>
            <Link to="/" className="hover:text-amber-500 flex mr-auto">
              Word Skull (Home)
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-amber-500 flex mr-auto">
              About
            </Link>
          </li>
          <li>
            <Link to="/socials" className="hover:text-amber-500 flex mr-auto">
              Socials
            </Link>
          </li>
          <li>
            <Link to="/wallpaper" className="hover:text-amber-500 flex mr-auto">
              4K HD Wallpapers
            </Link>
          </li>
          <li>
            <Link to="/sitemap" className="hover:text-amber-500 flex mr-auto">
              Sitemap (this page)
            </Link>
          </li>

          {/* --- Games --- */}
          <h2 className="font-lora text-xl text-slate-500 mt-8 mb-2">Games</h2>
          <li>
            <Link to="/games" className="hover:text-amber-500 flex mr-auto">
              All Games
            </Link>
          </li>
          <li>
            <Link
              to="/games/classic"
              className="hover:text-amber-500 flex mr-auto"
            >
              Classic Games
            </Link>
          </li>
          <li>
            <Link
              to="/games/classic/boneheads-easy-3-to-5-letter-words"
              className="hover:text-amber-500 flex mr-auto"
            >
              Boneheads — Easy (3–5 letters)
            </Link>
          </li>
          <li>
            <Link
              to="/games/classic/specter-knights-medium-3-to-6-letter-words"
              className="hover:text-amber-500 flex mr-auto"
            >
              Specter Knights — Medium (3–6 letters)
            </Link>
          </li>
          <li>
            <Link
              to="/games/classic/grim-reapers-hard-3-to-7-letter-words"
              className="hover:text-amber-500 flex mr-auto"
            >
              Grim Reapers — Hard (3–7 letters)
            </Link>
          </li>
          <li>
            <Link
              to="/games/classic/royal-lichen-extreme-3-to-9-letter-words"
              className="hover:text-amber-500 flex mr-auto"
            >
              Royal Lichen — Extreme (3–9 letters)
            </Link>
          </li>

          {/* --- Word Lists --- */}
          <h2 className="font-lora text-xl text-slate-500 mt-8 mb-2">
            Word Lists
          </h2>
          <li>
            <Link
              to="/words-list"
              className="hover:text-amber-500 flex mr-auto"
            >
              Words List Hub
            </Link>
          </li>
          <li>
            <Link
              to="/words-list/all-3-letter-words-for-word-games"
              className="hover:text-amber-500 flex mr-auto"
            >
              All 3-letter words
            </Link>
          </li>
          <li>
            <Link
              to="/words-list/all-4-letter-words-for-word-games"
              className="hover:text-amber-500 flex mr-auto"
            >
              All 4-letter words
            </Link>
          </li>
          <li>
            <Link
              to="/words-list/all-5-letter-words-for-word-games"
              className="hover:text-amber-500 flex mr-auto"
            >
              All 5-letter words
            </Link>
          </li>
          <li>
            <Link
              to="/words-list/all-6-letter-words-for-word-games"
              className="hover:text-amber-500 flex mr-auto"
            >
              All 6-letter words
            </Link>
          </li>
          <li>
            <Link
              to="/words-list/all-7-letter-words-for-word-games"
              className="hover:text-amber-500 flex mr-auto"
            >
              All 7-letter words
            </Link>
          </li>
          <li>
            <Link
              to="/words-list/all-8-letter-words-for-word-games"
              className="hover:text-amber-500 flex mr-auto"
            >
              All 8-letter words
            </Link>
          </li>
          <li>
            <Link
              to="/words-list/all-9-letter-words-for-word-games"
              className="hover:text-amber-500 flex mr-auto"
            >
              All 9-letter words
            </Link>
          </li>

          {/* --- Legal & Help --- */}
          <h2 className="font-lora text-xl text-slate-500 mt-8 mb-2">
            Help & Legal
          </h2>
          <li>
            <Link to="/misc/faq" className="hover:text-amber-500 flex mr-auto">
              FAQ
            </Link>
          </li>
          <li>
            <Link
              to="/misc/privacy-policy"
              className="hover:text-amber-500 flex mr-auto"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              to="/misc/cookies-policy"
              className="hover:text-amber-500 flex mr-auto"
            >
              Cookies Policy
            </Link>
          </li>
          <li>
            <Link
              to="/misc/terms-of-service"
              className="hover:text-amber-500 flex mr-auto"
            >
              Terms of Service
            </Link>
          </li>

          {/* --- External Projects --- */}
          <h2 className="font-lora text-xl text-slate-500 mt-8 mb-2">
            Other Projects
          </h2>
          <li>
            <a
              href="https://www.emojikitchengame.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-amber-500 flex mr-auto"
            >
              Emoji Kitchen Game
            </a>
          </li>
          <li>
            <a
              href="https://www.dragonmythology.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-amber-500 flex mr-auto"
            >
              Dragon Mythology
            </a>
          </li>
          <li>
            <a
              href="https://www.productivitygarden.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-amber-500 flex mr-auto"
            >
              Productivity Garden
            </a>
          </li>
          <li>
            <a
              href="https://freetypingcamp.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-amber-500 flex mr-auto"
            >
              Free Typing Camp
            </a>
          </li>

          <li>
            <a
              href="https://jurassicwords.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-amber-500 flex mr-auto"
            >
              Jurassic Words - Dinosaur Word Game
            </a>
          </li>

          <li>
            <a
              href="https://dinowordgame.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-amber-500 flex mr-auto"
            >
              Jurassic Words - Dinosaur Word Game
            </a>
          </li>
          <li>
            <a
              href="https://advisorbees.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-amber-500 flex mr-auto"
            >
              Advisor Bees
            </a>
          </li>

          <li>
            <a
              href="https://codetranslators.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-amber-500 flex mr-auto"
            >
              Code Translators - Morse code translator, Binary translator, and
              more
            </a>
          </li>

          <li>
            <a
              href="https://coloringcardgames.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-amber-500 flex mr-auto"
            >
              Coloring Card Games - Coloring Pages for Card Games like
              Solitaire, Freecell, and more
            </a>
          </li>

          <li>
            <a
              href="https://doodlegarden.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-amber-500 flex mr-auto"
            >
              Doodle Garden - A Creative Space for Doodling and Drawing with fun
              stories explained with doodles
            </a>
          </li>

          <li>
            <a
              href="https://morsewords.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-amber-500 flex mr-auto"
            >
              Morse Words - A Fun Way to Learn Morse Code
            </a>
          </li>

          <li>
            <a
              href="https://mythologypuzzle.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-amber-500 flex mr-auto"
            >
              Mythology Puzzle - Fun and Educational Puzzle Games
            </a>
          </li>

          <li>
            <a
              href="https://sushiclicker.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-amber-500 flex mr-auto"
            >
              Sushi Clicker - A Fun and Addictive Sushi Restaurant Game
            </a>
          </li>

          <li>
            <a
              href="https://terrawords.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-amber-500 flex mr-auto"
            >
              Terra Words - A Fun and Educational Word Game Focused on Earth,
              Geography, and Nature
            </a>
          </li>

          <li>
            <a
              href="https://typingbooks.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-amber-500 flex mr-auto"
            >
              Typing Books - Improve Your Typing Skills with Fun and Engaging
              Lessons
            </a>
          </li>

          <li>
            <a
              href="https://typingstories.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-amber-500 flex mr-auto"
            >
              Typing Stories - Improve Your Typing Skills with Fun and Engaging
              Stories
            </a>
          </li>
          <li>
            <a
              href="https://wordmythology.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-amber-500 flex mr-auto"
            >
              Word Mythology - Explore the Myths and Legends Behind Words
            </a>
          </li>

          <li>
            <a
              href="https://funmoneygames.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-amber-500 flex mr-auto"
            >
              Fun Money Games - Play Games and Learn About Money Management
            </a>
          </li>

          <li>
            <a
              href="https://learnwordgames.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-amber-500 flex mr-auto"
            >
              Learn Word Games - Improve Your Vocabulary and Word Skills
            </a>
          </li>

          <li>
            <a
              href="https://dragontyping.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-amber-500 flex mr-auto"
            >
              Dragon Typing - Improve Your Typing Skills with Fun and Engaging
              Lessons
            </a>
          </li>
        </ol>

        <SocialLinks />
      </main>
    </div>
  );
}
