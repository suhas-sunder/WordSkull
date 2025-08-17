import type { MetaFunction } from "@remix-run/node";
import ClassicGameLogic from "../client/components/layout/ClassicGameLogic";
import ClassicGameplayInstructions from "../client/components/layout/ClassicGameplayInstructions";
import { useMatches } from "react-router-dom";
import { useMemo } from "react";
import { WordsData } from "./game.word-skull-game-easy-mode";
import SocialLinks from "../client/components/navigation/SocialLinks";
import GameLinks from "../client/components/layout/GameLinks";

export const meta: MetaFunction = () => {
  return [
    {
      title:
        "💀 Word Skull Hard - Hard difficulty offers learning for 3 to 5 letter words 🎉✨",
    },
    {
      name: "description",
      content:
        "Are you worthy? Find out by playing this fun word guessing game! Challenge your mind, and improve your vocabulary in no time! 🎉📲",
    },
  ];
};

export default function WordSkullMedium() {
  const matches = useMatches();
  const wordsData = useMemo(() => {
    // Find the first match with valid data
    const match = matches?.find((match) => (match?.data as WordsData)?.words);
    return match?.data as WordsData;
  }, [matches]);

  return (
    <>
      <ClassicGameLogic
        startPosition={8}
        endPosition={12}
        lettersPerSkull="Hard Difficulty: 3 - 7 letters"
        wordsData={wordsData}
        difficulty="hard"
        gameMode="classic"
      />
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
