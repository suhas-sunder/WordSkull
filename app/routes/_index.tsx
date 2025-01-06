/* eslint-disable react/no-unescaped-entities */
import { useTheme } from "../client/components/context/ThemeContext";
import { MetaFunction } from "@remix-run/node";
import { Link } from "react-router-dom";
import SocialLinks from "../client/components/navigation/SocialLinks";
import SkullAnimation from "../client/components/ui/visual/SkullAnimation";
import GameLinks from "../client/components/layout/GameLinks";

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
  const { darkThemeActive } = useTheme();

  return (
    <header className="flex flex-col max-w-[1200px] text-center justify-center items-center mb-8">
      <h1
        className={`${
          darkThemeActive ? "text-stone-400" : "text-skull-dark-brown"
        } w-full z-1 flex-row flex justify-center items-center text-4xl sm:mb-[0.2em] sm:text-5xl text-center mt-12 leading-snug -translate-y-[0.3em] sm:translate-y-0 sm:mt-9  font-lora tracking-wide`}
      >
        <span className="whitespace-nowrap">
          <span className="inline-flex">W</span>
          <span className="inline-flex animate-scalePulse">💀</span>
          <span className="inline-flex">rd</span>
        </span>
        <span className="inline-flex">Skull</span>
      </h1>

      <p
        className={`${
          darkThemeActive ? "text-stone-300" : "text-skull-dark-brown"
        } sm:text-xl leading-relaxed sm:leading-loose font-lato italic mb-4 mx-3 sm:mt-2 sm:mx-12`}
      >
        Welcome, fellow adventurer! It's time to embark on a quest to defeat the
        skulls{" "}
        <span className="hidden sm:inline">
          in this challenging, word and puzzle game, fantasy themed adventure
        </span>
        ! Sharpen your vocabulary one word at a time by wielding the strongest
        weapon at your disposal—your mind! The dungeon awaits...
      </p>
      <Link
        to={"/game/word-skull-game-easy-mode"}
        className="hover:bg-amber-600 bg-pumpkin-orange flex z-10 text-white px-8  text-lg font-nunito rounded-full mt-3 py-2 tracking-widest leading-relaxed border-stone-300 hover:border-stone-400"
      >
        Start Playing!
      </Link>
      <div className="flex justify-center items-center w-full mt-10 sm:mt-3 scale-[.75]">
        <SkullAnimation />
      </div>
    </header>
  );
}

export default function Index() {
  const { darkThemeActive } = useTheme();

  return (
    <div className="flex relative animate-fadeIn flex-col leading-relaxed tracking-wider mt-3 sm:mt-6 overflow-hidden justify-center items-center mx-7">
      <Header />
      <main
        className={`${
          darkThemeActive && "text-stone-400"
        } flex flex-col sm:gap-14 max-w-[1400px] -translate-y-5 items-center`}
      >
        <GameLinks />
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
