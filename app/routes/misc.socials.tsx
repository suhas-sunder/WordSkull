import { MetaFunction } from "@remix-run/node";
import { Link } from "react-router-dom";
import SocialLinks from "../client/components/navigation/SocialLinks";

export const meta: MetaFunction = () => {
  const canonical = "https://www.wordskull.com/links";

  const title = "Links Hub | WordSkull – Socials, News & Resources";
  const description =
    "Your hub for all things WordSkull: connect on socials, get news updates, share scores, and dive deeper into the world of wordplay.";

  const ogImage = "https://www.wordskull.com/og/wordskull-links.jpg";

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
    { property: "og:image:alt", content: "WordSkull links hub" },
    { property: "og:locale", content: "en_US" },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },

    // Robots
    {
      name: "robots",
      content:
        "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    },
  ];
};

export default function Socials() {
  return (
    <div className="flex flex-col mt-3 sm:mt-5 justify-center items-center">
      <header className="flex flex-col justify-center items-center text-center max-w-[1200px] mb-8 gap-5">
        <h1 className="mt-[0.7em] text-5xl font-nunito text-skull-dark-brown">
          WordSkull - Links
        </h1>
        <p className="font-lato text-xl  tracking-wider leading-loose">
          Welcome! This page serves as my personal link tree, providing easy
          access to my projects and social media. I hope you find it helpful!
        </p>
      </header>
      <main className="flex flex-col font-lato text-skull-dark-brown tracking-wider leading-loose w-full gap-4 max-w-[1200px]">
        <h2 className="text-2xl font-nunito text-skull-super-dark-brown">
          Socials (Feel free to contact me)
        </h2>
        <ul>
          <li>
            <Link
              to="mailto:admin@wordskull.com"
              className="font-lora hover:text-amber-500 text-pumpkin-orange"
            >
              Gmail (admin@wordskull.com)
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.linkedin.com/in/word-skull/"
              className="font-lora hover:text-amber-500 text-pumpkin-orange"
            >
              LinkedIn
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.youtube.com/@WordSkullGame"
              className="font-lora hover:text-amber-500 text-pumpkin-orange"
            >
              YouTube
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.facebook.com/profile.php?id=61566613301910"
              className="font-lora hover:text-amber-500 text-pumpkin-orange"
            >
              Facebook
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://x.com/WordSkullGame"
              className="font-lora hover:text-amber-500 text-pumpkin-orange"
            >
              Twitter
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://mastodon.social/@wordskull"
              className="font-lora hover:text-amber-500 text-pumpkin-orange"
            >
              Mastadon
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.linkedin.com/in/word-skull/"
              className="font-lora hover:text-amber-500 text-pumpkin-orange"
            >
              LinkedIn
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.reddit.com/r/WordSkull/"
              className="font-lora hover:text-amber-500 text-pumpkin-orange"
            >
              Reddit
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.tiktok.com/@wordskull"
              className="font-lora hover:text-amber-500 text-pumpkin-orange"
            >
              TikTok
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://github.com/suhas-sunder"
              className="font-lora hover:text-amber-500 text-pumpkin-orange"
            >
              GitHub
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.suhassunder.com/"
              className="font-lora hover:text-amber-500 text-pumpkin-orange"
            >
              Portfolio
            </Link>
          </li>
        </ul>
        <h2 className="text-2xl font-nunito text-skull-super-dark-brown">
          My Projects
        </h2>

        <ul>
          <li>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.emojikitchen.com"
              className="font-lora hover:text-amber-500 text-pumpkin-orange"
            >
              Emoji Kitchen Game
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.emojikitchen.com"
              className="font-lora hover:text-amber-500 text-pumpkin-orange"
            >
              Emoji Kitchen Game
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.dragonmythology.com"
              className="font-lora hover:text-amber-500 text-pumpkin-orange"
            >
              DragonMythology
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.freetypingcamp.com"
              className="font-lora hover:text-amber-500 text-pumpkin-orange"
            >
              Free Typing Camp
            </Link>
          </li>
        </ul>
        <h2 className="text-2xl font-nunito text-skull-super-dark-brown">
          Fun word games
        </h2>
        <ul>
          <li>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.wordskull.com/word-skull-game-easy-mode"
              className="font-lora hover:text-amber-500 text-pumpkin-orange"
            >
              WordSkull (3 - 5 letters) Easy Mode - Defeat the boneheads!
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.wordskull.com/word-skull-game-medium-mode"
              className="font-lora hover:text-amber-500 text-pumpkin-orange"
            >
              WordSkull(3 - 6 letters) Medium Mode
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.wordskull.com/word-skull-game-hard-mode"
              className="font-lora hover:text-amber-500 text-pumpkin-orange"
            >
              WordSkull (3 - 7 letters) Hard Mode - Defeat the reapers!
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              to="https://www.wordskull.com/word-skull-game-extreme-mode"
              className="font-lora hover:text-amber-500 text-pumpkin-orange"
            >
              WordSkull (3 - 9 letters) Extreme Mode - Defat the royal lichen!
            </Link>
          </li>
        </ul>
        <SocialLinks />
      </main>
    </div>
  );
}
