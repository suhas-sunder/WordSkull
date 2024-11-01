import { MetaFunction } from "@remix-run/node";
import { Link } from "react-router-dom";
import { useTheme } from "../client/components/context/ThemeContext";
import SocialLinks from "../client/components/navigation/SocialLinks";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Words List - All words used for word and Puzzle Games 🎉✨",
    },
    {
      name: "description",
      content:
        "List of all words in WordSkull the ultimate word game inspired by word & puzzle games like Wordle, crosswords, cryptogram... 🎉📲",
    },
  ];
};

export default function AllWordsForWordGame() {
  const { darkThemeActive } = useTheme();
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <header>
        <h1 className="mt-[0.7em] text-3xl font-nunito text-skull-dark-brown mb-12">
          Words List - All words used for word and Puzzle Games 🎉✨
        </h1>
      </header>
      <main className="flex max-w-[1200px] flex-col w-full justify-center items-center gap-5">
        <div className="grid sm:grid-cols-2 sm:gap-x-16 gap-y-10">
          <Link
            className={`${
              darkThemeActive
                ? "text-orange-600"
                : "text-skull-super-dark-brown"
            } hover:text-amber-600 font-lora`}
            to="/all-words-for-word-game-three-letters"
          >
            View list of all three letter words
          </Link>{" "}
          <Link
            className={`${
              darkThemeActive
                ? "text-orange-600"
                : "text-skull-super-dark-brown"
            } hover:text-amber-600 font-lora`}
            to="/all-words-for-word-game-four-letters"
          >
            View list of all four letter words
          </Link>{" "}
          <Link
            className={`${
              darkThemeActive
                ? "text-orange-600"
                : "text-skull-super-dark-brown"
            } hover:text-amber-600 font-lora`}
            to="/all-words-for-word-game-five-letters"
          >
            View list of all five letter words
          </Link>{" "}
          <Link
            className={`${
              darkThemeActive
                ? "text-orange-600"
                : "text-skull-super-dark-brown"
            } hover:text-amber-600 font-lora`}
            to="/all-words-for-word-game-six-letters"
          >
            View list of all six letter words
          </Link>{" "}
          <Link
            className={`${
              darkThemeActive
                ? "text-orange-600"
                : "text-skull-super-dark-brown"
            } hover:text-amber-600 font-lora`}
            to="/all-words-for-word-game-seven-letters"
          >
            View list of all seven letter words
          </Link>{" "}
          <Link
            className={`${
              darkThemeActive
                ? "text-orange-600"
                : "text-skull-super-dark-brown"
            } hover:text-amber-600 font-lora`}
            to="/all-words-for-word-game-eight-letters"
          >
            View list of all eight letter words
          </Link>{" "}
          <Link
            className={`${
              darkThemeActive
                ? "text-orange-600"
                : "text-skull-super-dark-brown"
            } hover:text-amber-600 font-lora`}
            to="/all-words-for-word-game-nine-letters"
          >
            View list of all nine letter words
          </Link>
        </div>{" "}
        <SocialLinks />
      </main>
    </div>
  );
}
