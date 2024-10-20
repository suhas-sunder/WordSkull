/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { useTheme } from "../client/components/context/ThemeContext";
import { MetaFunction } from "@remix-run/node";
import { Link } from "react-router-dom";
import WordSkullClassicEasy from "../client/assets/images/wordskull_classic_easy.jpg";

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
    <header className="flex flex-col gap-3 max-w-[1100px] text-center justify-center items-center mb-12">
      <h1 className="w-full flex-col z-1  sm:flex-row flex justify-center items-center text-4xl sm:text-5xl text-center mt-10 leading-snug -translate-y-[0.3em] sm:translate-y-0 sm:mt-10 sm:mb-3 text-slate-500 font-lora animate-fadeIn">
        <span className="whitespace-nowrap">
          <span className="inline-flex">W</span>
          <span className="inline-flex animate-scalePulse">💀</span>
          <span className="inline-flex">rd</span>
        </span>
        <span className="inline-flex">Skull</span>
      </h1>
      <p className="text-xl leading-loose font-lato text-slate-500">
        Play the best free online word and puzzle games, including a twist on
        the popular classics. Play games inspired by wordle, word search, math
        games, cryptogram, hangman, snake, and more. Most games are skull themed
        based on the obvious play on words.
      </p>
    </header>
  );
}

const difficulties = ["easy", "medium", "hard", "extreme"];

export default function Index() {
  const [difficulty, setDifficulty] = useState<string>("easy");
  const navigate = useNavigate();

  const { darkThemeActive } = useTheme();

  return (
    <div className="flex flex-col leading-loose tracking-wider mt-3 sm:mt-5 overflow-hidden justify-center items-center">
      <Header />
      <main
        className={`${
          darkThemeActive && "text-white"
        } transition-colors duration-[600ms] flex flex-col sm:gap-14 max-w-[1400px] -translate-y-5 sm:translate-y-0 items-center animate-fadeIn`}
      >
        <div className="flex flex-col flex-wrap justify-center gap-12 max-w-[1200px] items-center w-full">
          <div className="flex w-full justify-around">
            <div className="flex flex-col gap-2 w-[14em] justify-center items-center text-center pt-6 pb-10 shadow-md rounded-t-[150em] rounded-b-full bg-white">
              <img
                src={WordSkullClassicEasy}
                alt="Word Skull Classic"
                className="bg-black w-[180px] h-[180px] rounded-lg"
              />
              <h4 className="text-lg font-nunito">Easy Mode</h4>
              <p className="text-sm font-lato">3 - 5 letters per word</p>
              <button
                onClick={() => navigate(`/word-skull-game-${difficulty}-mode`)}
                className={`${
                  darkThemeActive
                    ? "text-white  hover:text-slate-300"
                    : " text-slate-500  hover:text-slate-600"
                } flex z-10 bg-green-500 text-white px-8 text-lg font-nunito rounded-full mt-2 transition-colors duration-[600ms] tracking-widest leading-loose border-slate-300 hover:border-slate-400`}
              >
                Play
              </button>
            </div>

            <div className="flex flex-col gap-2 w-[14em] justify-center items-center text-center pt-6 pb-10 shadow-md rounded-t-[150em] rounded-b-full bg-white">
              <img
                src={WordSkullClassicEasy}
                alt="Word Skull Classic"
                className="bg-black w-[180px] h-[180px] rounded-lg"
              />
              <h4 className="text-lg font-nunito">Easy Mode</h4>
              <p className="text-sm font-lato">3 - 5 letters per word</p>
              <button
                onClick={() => navigate(`/word-skull-game-${difficulty}-mode`)}
                className={`${
                  darkThemeActive
                    ? "text-white  hover:text-slate-300"
                    : " text-slate-500  hover:text-slate-600"
                } flex z-10 bg-green-500 text-white px-8 text-lg font-nunito rounded-full mt-2 transition-colors duration-[600ms] tracking-widest leading-loose border-slate-300 hover:border-slate-400`}
              >
                Play
              </button>
            </div>

            <div className="flex flex-col gap-2 w-[14em] justify-center items-center text-center pt-6 pb-10 shadow-md rounded-t-[150em] rounded-b-full bg-white">
              <img
                src={WordSkullClassicEasy}
                alt="Word Skull Classic"
                className="bg-black w-[180px] h-[180px] rounded-lg"
              />
              <h4 className="text-lg font-nunito">Easy Mode</h4>
              <p className="text-sm font-lato">3 - 5 letters per word</p>
              <button
                onClick={() => navigate(`/word-skull-game-${difficulty}-mode`)}
                className={`${
                  darkThemeActive
                    ? "text-white  hover:text-slate-300"
                    : " text-slate-500  hover:text-slate-600"
                } flex z-10 bg-green-500 text-white px-8 text-lg font-nunito rounded-full mt-2 transition-colors duration-[600ms] tracking-widest leading-loose border-slate-300 hover:border-slate-400`}
              >
                Play
              </button>
            </div>

            <div className="flex flex-col gap-2 w-[14em] justify-center items-center text-center pt-6 pb-10 shadow-md rounded-t-[150em] rounded-b-full bg-white">
              <img
                src={WordSkullClassicEasy}
                alt="Word Skull Classic"
                className="bg-black w-[180px] h-[180px] rounded-lg"
              />
              <h4 className="text-lg font-nunito">Easy Mode</h4>
              <p className="text-sm font-lato">3 - 5 letters per word</p>
              <button
                onClick={() => navigate(`/word-skull-game-${difficulty}-mode`)}
                className={`${
                  darkThemeActive
                    ? "text-white  hover:text-slate-300"
                    : " text-slate-500  hover:text-slate-600"
                } flex z-10 bg-green-500 text-white px-8 text-lg font-nunito rounded-full mt-2 transition-colors duration-[600ms] tracking-widest leading-loose border-slate-300 hover:border-slate-400`}
              >
                Play
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-4">
            {/* <h3 className="font-lora text-3xl text-skull-dark-brown">
              WordSkull Classic
            </h3> */}
            <div className="flex flex-col justify-center items-center gap-3 text-skull-dark-brown">
              <p className="font-lato text-xl ">
                This game mode is inspired by NYT Wordle.
              </p>
              <p className="font-lato text-xl">
                Complete the puzzle by guessing the correct word for each row
                before your lives run out!
              </p>
            </div>
          </div>
        </div>
        <ul className="grid grid-cols-2 my-8 sm:my-0 sm:grid-cols-4 text-sm gap-4 uppercase font-nunito">
          {difficulties.map((level) => (
            <li
              key={level}
              className="flex mx-auto items-center gap-2 justify-center rounded-full cursor-pointer group hover:border-slate-200 border-2 border-transparent"
            >
              <input
                checked={difficulty === level}
                onChange={() => setDifficulty(level)}
                id={level}
                type="radio"
                name="difficulty"
                className="hidden"
              />
              <label
                htmlFor={level}
                className="cursor-pointer flex items-center gap-2 py-2 px-4"
              >
                <div
                  className={`w-4 h-4 border rounded-full flex items-center justify-center  ${
                    difficulty === level
                      ? `${
                          darkThemeActive ? "bg-white" : "bg-slate-600"
                        } border-transparent`
                      : `${
                          darkThemeActive ? "bg-slate-700" : "bg-white"
                        } border-gray-300`
                  }`}
                >
                  <svg
                    className={`${
                      darkThemeActive
                        ? "text-slate-500 group-hover:text-white"
                        : "text-white group-hover:text-slate-500"
                    } w-3 h-3  translate-y-[0.05em] transition-opacity duration-300 ${
                      difficulty === level || "group-hover:opacity-100"
                    } ${difficulty === level ? "opacity-100" : "opacity-0"}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9 16.293l-4-4 1.414-1.414L9 13.465l8.586-8.586L19 6.293l-10 10z"
                    />
                  </svg>
                </div>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </label>
            </li>
          ))}
        </ul>

        <div>
          <h2 className="flex py-2 text-4xl font-lora mt-4 text-center w-full justify-center items-center text-slate-500">
            FAQ
          </h2>
          <ul className="text-slate-600">
            <li>
              <h3 className="flex py-2 text-2xl font-nunito mt-2 ">
                What is WordSkull?
              </h3>
              <p className="font-lato text-xl pl-5 tracking-wider leading-loose ">
                <Link
                  className="hover:text-skull-brown text-skull-super-dark-brown font-lora"
                  to="/word-skull-game-easy-mode"
                >
                  WordSkull
                </Link>{" "}
                is a fun and fast-paced word puzzle game where you tackle word
                challenges, with cool animations and effects to keep things
                exciting. The classic mode feels a lot like Wordle but more of a
                challenges as you solve for multiple words instead of just one.
                The goal is to guess the correct words in as few tries as
                possible. More game modes are on the way to mix things up and
                word it out!
              </p>
            </li>
            <li>
              <h3 className="flex py-2 text-2xl font-nunito mt-2 text-slate-700">
                Why did you make this website?
              </h3>
              <p className="font-lato text-xl pl-5 tracking-wider leading-loose">
                Great question! Long story short, I wanted to make something fun
                that I would enjoy using myself. Decided to make a twist on some
                classic word and puzzle games such as NYT Wordle, Cryptogram,
                Cross Math, Snake, and more. If you want the long store, you can
                find it on the{" "}
                <Link
                  className="hover:text-skull-brown text-skull-super-dark-brown font-lora"
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
        <div className="font-lato text-xl pl-5 tracking-wider text-center leading-loose">
          If you have any feedback, suggestions, or business inquiries, please
          feel free to reach out to{" "}
          <a
            href="mailto:admin@wordskull.com"
            className="text-skull-super-dark-brown hover:text-skull-brown"
          >
            admin@wordskull.com
          </a>
          or you can find me on any of my socials listed on the{" "}
          <Link
            className="hover:text-skull-brown text-skull-super-dark-brown font-lora"
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
