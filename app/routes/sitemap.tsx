import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import SocialLinks from "../client/components/navigation/SocialLinks";
export const meta: MetaFunction = () => {
  return [
    { title: "🗺️ Emoji Kitchen Game Sitemap!" },
    {
      name: "description",
      content:
        "🗺️ Meta Description: Explore our comprehensive sitemap to navigate through our website effortlessly. Find links to all our main sections, including content pages, features, and resources, to quickly access what you're looking for. 🔍",
    },
  ];
};

export default function Sitemap() {
  return (
    <div className="flex justify-center gap-10  leading-loose tracking-widest flex-col items-center mx-10">
      <header>
        <h1 className=" font-lora text-center text-slate-500 translate-y-10 text-2xl mx-5 sm:text-3xl">
          Sitemap
        </h1>
      </header>
      <main className="max-w-[1200px]  my-10 text-pumpkin-orange text-lg flex flex-col w-full">
        <ol className="flex  flex-col list-decimal font-nunito mr-auto gap-5 mb-5">
          <li>
            <Link to="/" className=" hover:text-orange-500 flex mr-auto">
              Word Skull (Home)
            </Link>
          </li>
          <li>
            <Link
              to="/best-indie-games-showcase"
              className="hover: hover:text-orange-500"
            >
              Indie Games
            </Link>
          </li>
          <li>
            <Link to="/blog" className="hover: hover:text-orange-500">
              Blog
            </Link>
          </li>
          <li>
            <Link
              to="/board-game-reviews"
              className="hover: hover:text-orange-500"
            >
              Board Game Reviews
            </Link>
          </li>
          <li>
            <Link to="/faq" className="hover: hover:text-orange-500">
              FAQ
            </Link>
          </li>
          <li>
            <Link
              to="/terms-of-service"
              className="hover: hover:text-orange-500"
            >
              Terms of Service
            </Link>
          </li>
          <li>
            <Link to="/cookies-policy" className="hover: hover:text-orange-500">
              Cookies Policy
            </Link>
          </li>
          <li>
            <Link to="/privacy-policy" className="hover: hover:text-orange-500">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/wallpaper" className="hover: hover:text-orange-500">
              4K HD Wallpapers - Fantasy Themed
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              to="http://www.emojikitchengame.com/"
              className="hover: hover:text-orange-500"
              rel="noreferrer noopenner"
            >
              Emoji Kitchen Game
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              to="http://www.dragonmythology.com/"
              className="hover: hover:text-orange-500"
              rel="noreferrer noopenner"
            >
              Dragon Mythology
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              to="http://www.productivitygarden.com/"
              className="hover: hover:text-orange-500"
              rel="noreferrer noopenner"
            >
              Productivity Garden
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              to="https://freetypingcamp.com/"
              className="hover: hover:text-orange-500"
              rel="noreferrer noopenner"
            >
              Free Typing Camp
            </Link>
          </li>
          <li>
            <Link
              to="/#word-skull-classic"
              className=" hover:text-orange-500 flex mr-auto"
            >
              Word Skull Classic
            </Link>
          </li>
        </ol>
        <SocialLinks />
      </main>
    </div>
  );
}
