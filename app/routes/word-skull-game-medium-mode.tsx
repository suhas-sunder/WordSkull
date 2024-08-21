import type { MetaFunction } from "@remix-run/node";
import { useEffect, useMemo, useState } from "react";
import Skulls from "../client/components/data/skulls";
import Keyboard from "../client/components/ui/Keyboard";
import useWordsForSkull from "../client/components/hooks/useWordsForSkull";
import useClassicGameplayLogic from "../client/components/hooks/useClassicGameplayLogic";
import DisplaySkull from "../client/components/layout/DisplaySkull";
import WordHistory from "../client/components/ui/WordHistory";
import Header from "../client/components/layout/Header";
import Keypad from "../client/components/ui/Keypad";
import Icon from "../client/components/utils/other/Icon";
import useCaptureHTML from "../client/components/hooks/useCaptureHTML";

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
  const [showGameOverMenu, setShowGameOverMenu] = useState<boolean>(true);

  const skulls = useMemo(
    () =>
      Skulls()
        .map((skull) => [...skull])
        .slice(4, 8),
    []
  );

  const [currentSkull, setCurrentSkull] = useState<string[][][]>([]);

  //Manage words list
  const { wordsForSkull, wordsList, dispWordHistory, setDispWordHistory } =
    useWordsForSkull({ currentSkull });

  //Handle the main game play logic
  const {
    currentRow,
    currentRowIndex,
    enteredWords,
    enterPressed,
    isGameOver,
    lives,
    maxLives,
  } = useClassicGameplayLogic({
    currentSkull,
    setCurrentSkull,
    wordsList,
    setDispWordHistory,
    wordsForSkull,
  });

  const { downloadPuzzle, captureAreaRef } = useCaptureHTML({
    isGameOver,
  });

  const handleGameOverMsg = () => {
    const rowsCompleted = currentRow;

    if (rowsCompleted === 3) return "Great Effort!";

    if (rowsCompleted === 4) return "So Close!";

    if (rowsCompleted >= 5) return "You Won!";

    return "You Lose!";
  };

  useEffect(() => {
    const randomizeCurrentSkull = () => {
      setCurrentSkull([skulls[Math.floor(Math.random() * skulls?.length)]]);
    };

    randomizeCurrentSkull();
  }, [skulls]);

  return (
    <label className=" flex relative flex-col">
      <input type="textbox" className="opacity-[0.01]" />
      <Header
        lives={lives}
        isGameOver={isGameOver}
        difficulty="3 - 5 Letters"
        setShowGameOverMenu={setShowGameOverMenu}
      />
      {isGameOver && showGameOverMenu && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className="flex absolute w-full justify-center items-center">
          <button
            onClick={() => setShowGameOverMenu(false)}
            className="absolute h-[200vh] flex bg-skull-brown bg-opacity-10  z-30 w-full justify-center"
          ></button>
          <div className="flex relative flex-col bg-white shadow-lg pb-10 w-full gap-5 z-40 max-w-[700px] font-nunito overflow-hidden mt-20 tracking-widest leading-loose min-h-[30em] min-w-40 mb-auto rounded-lg justify-center items-center">
            <button
              className="absolute top-2 right-2 rounded-full p-1 scale-75 bg-skull-dark-brown fill-white hover:scale-[0.8]"
              onClick={() => setShowGameOverMenu(false)}
            >
              <Icon icon="close" title="Close Menu" />
            </button>
            <div className=" bg-skull-brown text-white w-full justify-center items-center py-2 text-2xl text-center">
              {handleGameOverMsg()}
            </div>
            <div className="flex w-full flex-col justify-center items-center gap-4">
              <h2 className="text-2xl text-slate-600">Stats</h2>
              <ul className="grid gap-5 sm:grid-cols-3 w-full justify-center items-center">
                <li className="flex col-span-1 flex-col gap-1 w-full justify-center items-center">
                  <span className="text-skull-dark-brown text-2xl">
                    {lives || 0}/{maxLives}
                  </span>
                  <span className="text-skull-super-dark-brown text-xs">
                    Unused Lives
                  </span>
                </li>
                <li className="flex flex-col gap-1 w-full justify-center items-center">
                  <span className="text-skull-dark-brown text-3xl sm:text-4xl">
                    {currentRow || 0}/{wordsForSkull.length || 0}
                  </span>
                  <span className="text-skull-super-dark-brown text-xs">
                    Correct Words
                  </span>
                </li>
                <li className="text-skull-dark-brown flex flex-col gap-1 w-full justify-center items-center">
                  <span className="text-2xl">0</span>
                  <span className="text-skull-super-dark-brown text-xs">
                    Time Spent
                  </span>
                </li>
              </ul>
            </div>

            <button className="cursor-pointer py-2 gap-2 bg-green-500 text-white px-4 rounded-md fill-slate-500 hover:fill-skull-brown flex justify-center items-center">
              Play Again
            </button>
            <div className="cursor-pointer py-2 gap-2 px-4 rounded-md fill-slate-500 hover:fill-skull-brown flex justify-center items-center">
              <span className="flex whitespace-nowrap text-xl text-slate-600">
                Share Your Results!
              </span>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              <li className="cursor-pointer py-2 gap-2 border-2 px-4 rounded-md fill-slate-500 hover:fill-skull-brown flex justify-center items-center">
                Instagram
              </li>
              <li className="cursor-pointer py-2 gap-2 border-2 px-4 rounded-md fill-slate-500 hover:fill-skull-brown flex justify-center items-center">
                Facebook
              </li>
              <li className="cursor-pointer py-2 gap-2 border-2 px-4 rounded-md fill-slate-500 hover:fill-skull-brown flex justify-center items-center">
                LinkedIn
              </li>
              <li className="cursor-pointer py-2 gap-2 border-2 px-4 rounded-md fill-slate-500 hover:fill-skull-brown flex justify-center items-center">
                Twitter
              </li>
              <li className="col-span-2 mx-auto">
                {" "}
                <button
                  onClick={downloadPuzzle}
                  className="cursor-pointer py-2 gap-2 border-2 px-4 rounded-md fill-slate-500 hover:fill-skull-brown flex justify-center items-center"
                >
                  Download Puzzle
                </button>
              </li>
              <li className="col-span-2 mx-auto">
                <button className="cursor-pointer py-2 gap-2 border-2 px-4 rounded-md fill-slate-500 hover:fill-skull-brown flex justify-center items-center">
                  Copy Puzzle
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      <main
        ref={captureAreaRef}
        className="flex relative flex-col gap-1 pt-1 px-5 items-center animate-fadeIn"
      >
        <WordHistory
          dispWordHistory={dispWordHistory}
          setDispWordHistory={setDispWordHistory}
          wordsForSkull={wordsForSkull}
          currentRow={currentRow}
          enteredWords={enteredWords}
        />
        <div id="capture-area" className="flex gap-2 flex-col">
          {isGameOver && showGameOverMenu && (
            <div className="flex font-nunito w-full flex-col justify-center items-center gap-4">
              <Header
                lives={lives}
                isGameOver={isGameOver}
                difficulty="3 - 5 Letters"
                dontFade={true}
                setShowGameOverMenu={setShowGameOverMenu}
              />
              <ul className="grid gap-5 sm:grid-cols-3 w-full justify-center items-center">
                <li className="flex col-span-1 flex-col gap-1 w-full justify-center items-center">
                  <span className="text-skull-dark-brown text-2xl">
                    {lives || 0}/{maxLives}
                  </span>
                  <span className="text-skull-super-dark-brown text-xs">
                    Unused Lives
                  </span>
                </li>
                <li className="flex flex-col gap-1 w-full justify-center items-center">
                  <span className="text-skull-dark-brown text-3xl sm:text-4xl">
                    {currentRow || 0}/{wordsForSkull.length || 0}
                  </span>
                  <span className="text-skull-super-dark-brown text-xs">
                    Correct Words
                  </span>
                </li>
                <li className="text-skull-dark-brown flex flex-col gap-1 w-full justify-center items-center">
                  <span className="text-2xl">0</span>
                  <span className="text-skull-super-dark-brown text-xs">
                    Time Spent
                  </span>
                </li>
              </ul>
            </div>
          )}
          <DisplaySkull
            currentSkull={currentSkull}
            currentRow={currentRow}
            currentRowIndex={currentRowIndex}
            wordsForSkull={wordsForSkull}
            enteredWords={enteredWords}
            enterPressed={enterPressed}
          />
          <div className="flex max-w-[800px] max-h-[17.5em] overflow-hidden justify-center items-center flex-col">
            <Keyboard
              currentlyEnteredWords={enteredWords[currentRow]}
              currentWord={wordsForSkull[currentRow]}
            />
            <Keypad
              currentlyEnteredWords={enteredWords[currentRow]}
              currentWord={wordsForSkull[currentRow]}
            />
          </div>
        </div>
      </main>
    </label>
  );
}
