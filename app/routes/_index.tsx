/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "@remix-run/react";
import { useTheme } from "../client/components/context/ThemeContext";
import { MetaFunction } from "@remix-run/node";
import { Link } from "react-router-dom";
import Skull_1 from "../client/assets/images/skull_1.png";
import Skull_2 from "../client/assets/images/skull_2.png";
import Skull_3 from "../client/assets/images/skull_3.png";
import Skull_4 from "../client/assets/images/skull_4.png";
import SkullAnimation from "../client/components/ui/visual/SkullAnimation";

export const meta: MetaFunction = () => {
  return [
    {
      title: "💀 Word Skull - Sharpen Your Mind, One Word at a Time. 🎉✨",
    },
    {
      name: "description",
      content:
        "Word Skull is an engaging platform where fun meets learning ❤️.  It’s a great way to sharpen your vocabulary, but it’s also just a good word game to dive into when you want to relax, challenge your mind, and word it out 🧩💚. Word Skull is the perfect way to have fun and keep your brain active 🧠💜! 🎉📲",
    },
  ];
};

function Header() {
  return (
    <header className="flex flex-col max-w-[1200px] text-center justify-center items-center mb-16">
      <h1 className="w-full z-1 flex-row flex justify-center items-center text-4xl sm:text-5xl text-center mt-9 leading-snug -translate-y-[0.3em] sm:translate-y-0 sm:mt-8 sm:mb-3 text-skull-dark-brown font-lora">
        <span className="whitespace-nowrap">
          <span className="inline-flex">W</span>
          <span className="inline-flex animate-scalePulse">💀</span>
          <span className="inline-flex">rd</span>
        </span>
        <span className="inline-flex">Skull</span>
      </h1>
      <p className="sm:text-xl leading-relaxed sm:leading-relaxed font-lato text-skull-dark-brown sm:mb-3 mx-3 sm:mt-1 sm:mx-12">
        Fellow adventurer, sharpen your mind and wield the strongest weapon at
        your disposal, your words! Conquer the skulls in epic word and puzzle
        challenges. The dungeon awaits...
      </p>

      <div className="flex justify-center items-center w-full mt-10 mb-3 sm:mb-0">
        <SkullAnimation />
      </div>
    </header>
  );
}

export default function Index() {
  const navigate = useNavigate();

  const { darkThemeActive } = useTheme();

  return (
    <div className="flex flex-col leading-relaxed tracking-wider mt-3 sm:mt-5 overflow-hidden justify-center items-center">
      <Header />
      <main
        className={`${
          darkThemeActive && "text-white"
        } transition-colors duration-[600ms] flex flex-col sm:gap-14 max-w-[1400px] -translate-y-5 sm:translate-y-0 items-center animate-fadeIn`}
      >
        <div className="flex flex-col flex-wrap justify-center gap-8 max-w-[1200px] items-center w-full ">
          <div className="flex flex-col justify-center items-center gap-1">
            <h2 className="font-lora text-2xl text-skull-super-dark-brown">
              WordSkull Classic
            </h2>
            <p className="text-skull-dark-brown text-base leading-loose font-lato mx-5 sm:mx-8 text-center">
              This game mode is inspired by NYT Wordle. Complete the puzzle by
              guessing the correct word for each row before your lives run out.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8  gap-12 justify-center items-center">
            <button
              onClick={() => navigate(`/word-skull-game-easy-mode`)}
              className="group flex col-span-2 flex-col gap-2 w-[15em] justify-center items-center text-center pt-8 pb-12  hover:scale-[1.05] transition-scale duration-[300ms] shadow-md rounded-t-[150em] rounded-b-full bg-ivory bg-opacity-10"
            >
              <h3 className="text-lg font-nunito">Boneheads</h3>
              <img
                src={Skull_1}
                alt="Word Skull Classic"
                className=" w-[180px] h-[180px] rounded-lg"
              />
              <h3 className="text-base font-nunito">Difficulty: Easy</h3>
              <p className="text-sm font-lato">3 - 5 letters per word</p>
              <div
                className={`${
                  darkThemeActive
                    ? "bg-skull-dark-brown  group-hover:bg-amber-500"
                    : "bg-skull-super-dark-brown  group-hover:bg-amber-600"
                } flex z-10 text-white px-8 text-lg font-nunito rounded-full mt-2 transition-colors duration-[600ms] tracking-widest leading-relaxed border-slate-300 hover:border-slate-400`}
              >
                Play
              </div>
            </button>

            <button
              onClick={() => navigate(`/word-skull-game-medium-mode`)}
              className="group flex col-span-2 flex-col gap-2 w-[15em] justify-center items-center text-center pt-8 pb-12  hover:scale-[1.05] transition-scale duration-[300ms] shadow-md rounded-t-[150em] rounded-b-full bg-ivory bg-opacity-10"
            >
              <h3 className="text-lg font-nunito">Specter</h3>
              <img
                src={Skull_2}
                alt="Word Skull Classic"
                className=" w-[180px] h-[180px] rounded-lg"
              />
              <h4 className="text-base font-nunito">Difficulty: Medium</h4>
              <p className="text-sm font-lato">3 - 6 letters per word</p>
              <div
                className={`${
                  darkThemeActive
                    ? "bg-skull-dark-brown  group-hover:bg-amber-500"
                    : "bg-skull-super-dark-brown  group-hover:bg-amber-600"
                } flex z-10 text-white px-8 text-lg font-nunito rounded-full mt-2 transition-colors duration-[600ms] tracking-widest leading-relaxed border-slate-300 hover:border-slate-400`}
              >
                Play
              </div>
            </button>

            <button
              onClick={() => navigate(`/word-skull-game-hard-mode`)}
              className="group flex col-span-2 flex-col gap-2 w-[15em] justify-center items-center text-center pt-8 pb-12  hover:scale-[1.05] transition-scale duration-[300ms] shadow-md rounded-t-[150em] rounded-b-full bg-ivory bg-opacity-10"
            >
              <h3 className="text-lg font-nunito">Reapers</h3>
              <img
                src={Skull_3}
                alt="Word Skull Classic"
                className=" w-[180px] h-[180px] rounded-lg"
              />
              <h4 className="text-base font-nunito">Difficulty: Hard</h4>
              <p className="text-sm font-lato">3 - 7 letters per word</p>
              <div
                className={`${
                  darkThemeActive
                    ? "bg-skull-dark-brown  group-hover:bg-amber-500"
                    : "bg-skull-super-dark-brown  group-hover:bg-amber-600"
                } flex z-10 text-white px-8 text-lg font-nunito rounded-full mt-2 transition-colors duration-[600ms] tracking-widest leading-relaxed border-slate-300 hover:border-slate-400`}
              >
                Play
              </div>
            </button>

            <button
              onClick={() => navigate(`/word-skull-game-extreme-mode`)}
              className="group flex col-span-2 flex-col gap-2 w-[15em] justify-center items-center text-center pt-8 pb-12  hover:scale-[1.05] transition-scale duration-[300ms] shadow-md rounded-t-[150em] rounded-b-full bg-ivory bg-opacity-10"
            >
              <h3 className="text-lg font-nunito">Royal Lichen</h3>
              <img
                src={Skull_4}
                alt="Word Skull Classic"
                className=" w-[180px] h-[180px] rounded-lg"
              />
              <h4 className="text-base font-nunito">Difficulty: Extreme</h4>
              <p className="text-sm font-lato">3 - 9 letters per word</p>
              <div
                className={`${
                  darkThemeActive
                    ? "bg-skull-dark-brown  group-hover:bg-amber-500"
                    : "bg-skull-super-dark-brown  group-hover:bg-amber-600"
                } flex z-10 text-white px-8 text-lg font-nunito rounded-full mt-2 transition-colors duration-[600ms] tracking-widest leading-relaxed border-slate-300 hover:border-slate-400`}
              >
                Play
              </div>
            </button>
          </div>
        </div>

        <div>
          <h2 className="flex py-2 text-2xl font-lora mt-4 text-center w-full justify-center items-center text-skull-super-dark-brown">
            FAQ
          </h2>
          <ul className="text-skull-dark-brown flex flex-col gap-4">
            <li className="flex flex-col gap-2">
              <h3 className="flex py-2 text-xl font-nunito mt-2 text-skull-super-dark-brown">
                What is WordSkull?
              </h3>
              <p className="font-lato text-lg pl-5 tracking-wider leading-loose">
                <Link
                  className="hover:text-amber-600 text-skull-super-dark-brown font-lora"
                  to="/word-skull-game-easy-mode"
                >
                  WordSkull
                </Link>{" "}
                is a fun and fast-paced word puzzle game where you tackle unique
                word challenges. Play the best free online word and puzzle games
                with a twist on popular classics. Enjoy games inspired by
                Wordle, word search, math puzzles, cryptograms, and more. The
                classic mode feels a lot like Wordle but more of a challenges as
                you solve for multiple words instead of just one. The goal is to
                guess the correct words in as few tries as possible. More game
                modes are on the way, so get ready to mix things up and word it
                out!
              </p>
            </li>
            <li className="flex flex-col gap-2">
              <h3 className="flex py-2 text-xl font-nunito mt-2 text-skull-super-dark-brown">
                What was the motivation behind WordSkull?
              </h3>
              <p className="font-lato text-lg pl-5 tracking-wider leading-loose">
                Great question! Long story short, I wanted to make something fun
                that I would enjoy using myself. Decided to make a twist on some
                classic word and puzzle games such as NYT Wordle, Cryptogram,
                Cross Math, Snake, and more. If you want the long store, you can
                find it on the{" "}
                <Link
                  className="hover:text-amber-600 text-skull-super-dark-brown font-lora"
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
        <div className="font-lato text-lg pl-5 tracking-wider text-center leading-loose text-skull-dark-brown">
          If you have any feedback, suggestions, or business inquiries, please
          feel free to reach out to{" "}
          <a
            href="mailto:admin@wordskull.com"
            className="hover:text-amber-600 text-skull-super-dark-brown font-lora"
          >
            admin@wordskull.com{" "}
          </a>
          or you can find me on any of my socials listed on the{" "}
          <Link
            className="hover:text-amber-600 text-skull-super-dark-brown font-lora"
            to="/socials"
          >
            socials page
          </Link>
          .
        </div>
      </main>
    </div>
  );
}
