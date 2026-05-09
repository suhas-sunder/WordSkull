/* eslint-disable react/no-unescaped-entities */
import { useTheme } from "../client/components/context/ThemeContext";
import { MetaFunction } from "@remix-run/node";
import { Link } from "react-router-dom";
import SocialLinks from "../client/components/navigation/SocialLinks";
import SkullAnimation from "../client/components/ui/visual/SkullAnimation";
import GameLinks from "../client/components/layout/GameLinks";
import ClassicGameLogic from "../client/components/layout/ClassicGameLogic";
import ClassicGameplayInstructions from "../client/components/layout/ClassicGameplayInstructions";

export const meta: MetaFunction = () => {
  const canonical = "https://www.wordskull.com";

  const title = "WordSkull | Free Fantasy Word Game Like Wordle & Spelling Bee";
  const description =
    "Play WordSkull, a free fantasy word puzzle game. Inspired by Wordle & NYT Spelling Bee, challenge your vocabulary in unique battle modes with 3 to 9 letter words.";

  const ogImage = "https://www.wordskull.com/og/wordskull-home.jpg";

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
    { property: "og:image:alt", content: "WordSkull fantasy word battle game" },
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

function Header() {
  return (
    <header className="flex flex-col max-w-[1200px] text-center justify-center items-center mb-8">
      <ClassicGameLogic
        startPosition={0}
        endPosition={4}
        lettersPerSkull="Easy Difficulty: 3 - 5 letters"
        difficulty="easy"
        gameMode="classic"
      />
    </header>
  );
}

export default function Index() {
  const { darkThemeActive } = useTheme();

  return (
    <div className="flex relative flex-col leading-relaxed tracking-wider mt-3 sm:mt-6 overflow-hidden justify-center items-center mx-7">
      <Header />
      <main
        className={`${
          darkThemeActive && "text-stone-400"
        } flex flex-col sm:gap-14 max-w-[1400px] -translate-y-5 items-center`}
      >
        <GameLinks />
        
        <section className="mt-10">
          <ClassicGameplayInstructions />
        </section>
        <div>
          <h2
            className={`${
              darkThemeActive ? "text-stone-400" : "text-skull-dark-brown"
            } flex py-2 text-4xl font-lora mt-4 text-center w-full justify-center items-center `}
          >
            FAQ
          </h2>
          <ul
            className={`${
              darkThemeActive ? "text-stone-300" : "text-skull-dark-brown"
            } flex flex-col gap-4`}
          >
            <li className="flex flex-col gap-2">
              <h3
                className={`${
                  darkThemeActive ? "text-stone-400" : "text-skull-dark-brown"
                } flex py-2 text-2xl font-nunito mt-2`}
              >
                What is WordSkull?
              </h3>
              <p className="font-lato text-lg pl-5 tracking-wider leading-loose">
                <Link
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                  to="/games/classic/boneheads-easy-3-to-5-letter-words"
                >
                  WordSkull
                </Link>{" "}
                is a fun and fast-paced word puzzle game where you tackle unique
                word challenges. Play the best free online word and puzzle games
                with a twist on popular classics. Enjoy games inspired by
                Wordle, word search, math puzzles, cryptograms, and more. The
                classic mode feels a lot like Wordle but more of a challenge as
                you solve for multiple words instead of just one. The goal is to
                guess the correct words in as few tries as possible. More game
                modes are on the way, so get ready to mix things up and word it
                out!
              </p>
            </li>
            <li className="flex flex-col gap-2">
              <h3
                className={`${
                  darkThemeActive ? "text-stone-400" : "text-skull-dark-brown"
                } flex py-2 text-2xl font-nunito mt-2`}
              >
                What was the motivation behind WordSkull?
              </h3>
              <p className="font-lato text-lg pl-5 tracking-wider leading-loose">
                Great question! Long story short, I wanted to make something fun
                that I would enjoy using myself. Decided to make a twist on some
                classic word and puzzle games. If you want the long story, you
                can find it on the{" "}
                <Link
                  className={
                    "text-pumpkin-orange hover:text-amber-600 font-lora"
                  }
                  to="/about"
                >
                  {" "}
                  about page
                </Link>
                !
              </p>
            </li>
          </ul>
        </div>
        <div className="flex justify-center items-center w-full mt-10 sm:mt-3 scale-[.75]">
          <SkullAnimation />
        </div>
        <div
          className={`${
            darkThemeActive ? "text-stone-300" : "text-skull-dark-brown"
          } font-lato text-lg pl-5 tracking-wider text-center leading-loose`}
        >
          If you have any feedback, suggestions, or business inquiries, please
          feel free to reach out to{" "}
          <a
            href="mailto:admin@wordskull.com"
            className={"text-pumpkin-orange hover:text-amber-600 font-lora"}
          >
            admin@wordskull.com{" "}
          </a>
          or you can find me on any of my socials and associated links listed on
          the{" "}
          <Link
            className={"text-pumpkin-orange hover:text-amber-600 font-lora"}
            to="/misc/socials"
          >
            socials page
          </Link>
          .
        </div>
        <SocialLinks />
      </main>
    </div>
  );
}
