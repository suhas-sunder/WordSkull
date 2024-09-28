import { useEffect, useMemo, useState } from "react";
import useWordsForSkull from "../hooks/useWordsForSkull";
import Skulls from "../data/Skulls";
import useClassicGameplayLogic from "../hooks/useClassicGameplayLogic";
import useCaptureHTML from "../hooks/useCaptureHTML";
import Header from "./Header";
import WordHistory from "../ui/WordHistory";
import DisplaySkull from "./DisplaySkull";
import Keyboard from "../ui/Keyboard";
import Keypad from "../ui/Keypad";
import GameOverMenu from "../ui/GameOverMenu";
import GameOverStatsCapture from "./GameOverStatsCapture";
import { WordsData } from "../../../routes/word-skull-game-easy-mode";

interface PropType {
  startPosition: number;
  endPosition: number;
  lettersPerSkull: string;
  wordsData: WordsData;
}

function ClassicGameLogic({
  startPosition,
  endPosition,
  lettersPerSkull,
  wordsData,
}: PropType) {
  const [showGameOverMenu, setShowGameOverMenu] = useState<boolean>(true);
  const [showKeyboard, setShowKeyboard] = useState(true);

  const skulls = useMemo(
    () =>
      Skulls()
        .map((skull) => [...skull])
        .slice(startPosition, endPosition),
    [endPosition, startPosition]
  );

  const [currentSkull, setCurrentSkull] = useState<string[][][]>([]);

  //Manage words list
  const { wordsForSkull, wordsList, dispWordHistory, setDispWordHistory } =
    useWordsForSkull({ currentSkull, wordsData });

  //Handle the main game play logic
  const {
    currentRow,
    currentRowIndex,
    enteredWords,
    enterPressed,
    isGameOver,
    lives,
    maxLives,
    seconds,
  } = useClassicGameplayLogic({
    currentSkull,
    setCurrentSkull,
    wordsList,
    setDispWordHistory,
    wordsForSkull,
  });

  const { captureAreaRef } = useCaptureHTML({ isGameOver });

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
        showKeyboard={showKeyboard}
        setShowKeyboard={setShowKeyboard}
        lives={lives}
        isGameOver={isGameOver}
        lettersPerSkull={lettersPerSkull}
        setShowGameOverMenu={setShowGameOverMenu}
      />
      <main
        ref={captureAreaRef}
        className="flex relative flex-col gap-1 pt-1 px-5 items-center animate-fadeIn"
      >
        <GameOverMenu
          isGameOver={isGameOver}
          showGameOverMenu={showGameOverMenu}
          setShowGameOverMenu={setShowGameOverMenu}
          lives={lives}
          maxLives={maxLives}
          seconds={seconds}
          currentRow={currentRow}
          wordsForSkull={wordsForSkull}
        />
        <WordHistory
          dispWordHistory={dispWordHistory}
          setDispWordHistory={setDispWordHistory}
          wordsForSkull={wordsForSkull}
          currentRow={currentRow}
          enteredWords={enteredWords}
        />
        <div id="capture-area" className="flex gap-2 flex-col">
          <GameOverStatsCapture
            isGameOver={isGameOver}
            showGameOverMenu={showGameOverMenu}
            setShowGameOverMenu={setShowGameOverMenu}
            lives={lives}
            maxLives={maxLives}
            currentRow={currentRow}
            lettersPerSkull={lettersPerSkull}
            wordsForSkull={wordsForSkull}
            setShowKeyboard={setShowKeyboard}
            showKeyboard={showKeyboard}
            seconds={seconds}
          />
          <DisplaySkull
            currentSkull={currentSkull}
            currentRow={currentRow}
            currentRowIndex={currentRowIndex}
            wordsForSkull={wordsForSkull}
            enteredWords={enteredWords}
            enterPressed={enterPressed}
          />
          <div
            className={`${
              showKeyboard ? "opacity-100" : "opacity-0"
            } flex max-w-[800px] max-h-[17.5em] overflow-hidden justify-center items-center flex-col`}
          >
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

export default ClassicGameLogic;
