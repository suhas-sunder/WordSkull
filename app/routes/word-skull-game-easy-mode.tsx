import type { MetaFunction } from "@remix-run/node";
import { useEffect, useMemo, useState } from "react";
import Skulls from "../client/components/data/skulls";
import Keyboard from "../client/components/ui/Keyboard";
import useTotalLives from "../client/components/hooks/useTotalLives";
import useWordsForSkull from "../client/components/hooks/useWordsForSkull";
import useClassicGameplayLogic from "../client/components/hooks/useClassicGameplayLogic";
import DisplaySkull from "../client/components/layout/DisplaySkull";
import WordHistory from "../client/components/ui/WordHistory";
import Header from "../client/components/layout/Header";
import useHandleGameOver from "../client/components/hooks/useHandleGameOver";
import Keypad from "../client/components/ui/Keypad";

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
  const skulls = useMemo(
    () =>
      Skulls()
        .map((skull) => [...skull])
        .slice(0, 4),
    []
  );

  const [currentSkull, setCurrentSkull] = useState<string[][][]>([]);

  //Manage lives
  const { lives, setLives } = useTotalLives({ currentSkull });

  //Manage words list
  const { wordsForSkull, wordsList, dispWordHistory, setDispWordHistory } =
    useWordsForSkull({ currentSkull });

  //Handle the main gameplay logic
  const { currentRow, currentRowIndex, enteredWords, enterPressed } =
    useClassicGameplayLogic({
      currentSkull,
      setCurrentSkull,
      wordsList,
      setDispWordHistory,
      setLives,
      wordsForSkull,
    });

  const { isGameOver } = useHandleGameOver({ currentRow, currentSkull });

  useEffect(() => {
    const randomizeCurrentSkull = () => {
      setCurrentSkull([skulls[Math.floor(Math.random() * skulls?.length)]]);
    };

    randomizeCurrentSkull();
  }, [skulls]);

  return (
    <label className=" flex flex-col">
      <input type="textbox" className="opacity-[0.01] bg-red-200" />
      <Header lives={lives} isGameOver={isGameOver} />
      {isGameOver ? (
        <div></div>
      ) : (
        <main className="flex relative min-h-[21.5em] sm:min-h-[32.7em] flex-col pt-0 sm:pt-10 gap-5 px-5 items-center animate-fadeIn">
          <WordHistory
            dispWordHistory={dispWordHistory}
            setDispWordHistory={setDispWordHistory}
            wordsForSkull={wordsForSkull}
            currentRow={currentRow}
            enteredWords={enteredWords}
          />

          <DisplaySkull
            currentSkull={currentSkull}
            currentRow={currentRow}
            currentRowIndex={currentRowIndex}
            wordsForSkull={wordsForSkull}
            enteredWords={enteredWords}
            enterPressed={enterPressed}
          />

          <div className="flex max-w-[800px] overflow-hidden justify-center items-center -translate-y-5 sm:-translate-y-16 flex-col">
            <Keyboard
              currentlyEnteredWords={enteredWords[currentRow]}
              currentWord={wordsForSkull[currentRow]}
            />
            <Keypad  currentlyEnteredWords={enteredWords[currentRow]}
              currentWord={wordsForSkull[currentRow]} />
          </div>
        </main>
      )}
    </label>
  );
}
