/* eslint-disable react/no-unescaped-entities */
import { useTheme } from "../client/components/context/ThemeContext";
import { MetaFunction } from "@remix-run/node";
import { Link, useMatches } from "react-router-dom";
import SocialLinks from "../client/components/navigation/SocialLinks";
import SkullAnimation from "../client/components/ui/visual/SkullAnimation";
import GameLinks from "../client/components/layout/GameLinks";
import ClassicGameLogic from "~/client/components/layout/ClassicGameLogic";
import { useMemo } from "react";
import { WordsData } from "./game.word-skull-game-easy-mode";
import ClassicGameplayInstructions from "~/client/components/layout/ClassicGameplayInstructions";

export const meta: MetaFunction = () => {
  return [
    {
      title: "💀 Word Skull - Sharpen Your Mind, One Word at a Time. 🎉✨",
    },
    {
      name: "description",
      content:
        "WordSkull has fun word games for fun and learning! ❤️ Sharpen your vocabulary, challenge your mind 🧠, and enjoy relaxing gameplay and puzzles 💜.🎉",
    },
  ];
};

function Header() {
  const matches = useMatches();
  const wordsData = useMemo(() => {
    // Find the first match with valid data
    const match = matches?.find((match) => (match?.data as WordsData)?.words);
    return match?.data as WordsData;
  }, [matches]);

  return (
    <header className="flex flex-col max-w-[1200px] text-center justify-center items-center mb-8">
      <ClassicGameLogic
        startPosition={0}
        endPosition={4}
        lettersPerSkull="Easy Difficulty: 3 - 5 letters"
        wordsData={wordsData}
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
                  to="/game/word-skull-game-easy-mode"
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
            to="/socials"
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
