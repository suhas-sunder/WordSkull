import type { MetaFunction } from "@remix-run/node";
import ClassicGameLogic from "../client/components/layout/ClassicGameLogic";
import ClassicGameplayInstructions from "../client/components/layout/ClassicGameplayInstructions";
import { useMatches } from "react-router-dom";
import { useMemo } from "react";
import SocialLinks from "../client/components/navigation/SocialLinks";
import GameLinks from "../client/components/layout/GameLinks";
export type WordsData = {
  words?: { [key: number]: string[] };
};

export const meta: MetaFunction = () => {
  return [
    {
      title:
        "💀 Word Skull Easy - Easy difficulty offers learning for 3 to 5 letter words 🎉✨",
    },
    {
      name: "description",
      content:
        "Are you worthy? Find out by playing this fun word guessing game! Challenge your mind, and improve your vocabulary in no time! 🎉📲",
    },
  ];
};

export default function WordSkullEasy() {
  const matches = useMatches();
  const wordsData = useMemo(() => {
    // Find the first match with valid data
    const match = matches?.find((match) => (match?.data as WordsData)?.words);
    return match?.data as WordsData;
  }, [matches]);

  return (
    <>
      <ClassicGameLogic
        startPosition={0}
        endPosition={4}
        lettersPerSkull="Easy Difficulty: 3 - 5 letters"
        wordsData={wordsData}
        difficulty="easy"
        gameMode="classic"
      />
      {/* <div className="flex w-full justify-center">
        Display shortcuts to other related game modes here with current one
        selected.
      </div>
      <div className="flex w-full justify-center">
        List of all other game modes on the nav bar to the right.
      </div> */}
      <GameLinks />
      <section className="mt-20">
        <ClassicGameplayInstructions />
      </section>
      <section>
        <SocialLinks />
      </section>
    </>
  );
}
