import type { MetaFunction } from "@remix-run/node";
import ClassicGameLogic from "../client/components/layout/ClassicGameLogic";
import ClassicGameplayInstructions from "../client/components/layout/ClassicGameplayInstructions";

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

export default function WordSkullMedium() {
  return (
    <>
      <ClassicGameLogic startPosition={8} endPosition={12} />
      <ClassicGameplayInstructions />
    </>
  );
}
