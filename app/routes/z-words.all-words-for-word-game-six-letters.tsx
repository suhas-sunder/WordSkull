import { MetaFunction } from "@remix-run/node";
import { useMemo } from "react";
import { useMatches } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import SocialLinks from "../client/components/navigation/SocialLinks";

type MatchData = {
  data: {
    words?: { [key: number]: string[] };
  };
};

export const meta: MetaFunction = () => {
  return [
    {
      title:
        "Words List - Six letter words used for word and Puzzle Games 🎉✨",
    },
    {
      name: "description",
      content:
        "List of Six letter words in WordSkull the ultimate word game inspired by word & puzzle games like Wordle, crosswords, cryptogram... 🎉📲",
    },
  ];
};

export default function SixLetterWords() {
  const matches = useMatches() as MatchData[];

  const wordsData = useMemo(() => {
    return matches[0]?.data?.words;
  }, [matches]);

  return (
    <div className="flex  flex-col justify-center items-center mt-10">
      <header>
        <h1 className="mt-[0.7em] text-5xl font-nunito text-skull-dark-brown mb-12">
          Words List - Word & Puzzle Games
        </h1>
      </header>
      <main className="flex max-w-[1200px] flex-col w-full">
        <div
          className="flex flex-col gap-5 justify-center items-center"
          key={uuidv4()}
        >
          <h2 className="text-2xl">
            There are{" "}
            {wordsData && (Object.values(wordsData) as string[][])[3].length}{" "}
            words in this list!
          </h2>
          <p className="grid grid-cols-16 gap-5">
            {wordsData &&
              (Object.values(wordsData) as string[][])[3]?.map((word) => (
                <span key={uuidv4()}>{word}</span>
              ))}
          </p>
        </div>
        <SocialLinks />
      </main>
    </div>
  );
}
