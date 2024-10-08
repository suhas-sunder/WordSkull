import { useEffect, useMemo, useState } from "react";
import useWordsForSkull from "../hooks/useWordsForSkull";
import Skulls from "../data/Skulls";
import useClassicGameplayLogic from "../hooks/useClassicGameplayLogic";
import useCaptureHTML from "../hooks/useCaptureHTML";
import Header from "./Header";
import WordHistory from "../ui/interactive/WordHistory";
import DisplaySkull from "./DisplaySkull";
import Keyboard from "../ui/interactive/Keyboard";
import Keypad from "../ui/interactive/Keypad";
import GameOverMenu from "../ui/interactive/GameOverMenu";
import GameOverStatsCapture from "./GameOverStatsCapture";
import { WordsData } from "../../../routes/word-skull-game-easy-mode";
import { useSettings } from "../context/SettingsContext";
import { useStats } from "../context/StatsContext";

interface PropType {
  startPosition: number;
  endPosition: number;
  lettersPerSkull: string;
  wordsData: WordsData;
  difficulty: string;
  gameMode: string;
}

function ClassicGameLogic({
  startPosition,
  endPosition,
  lettersPerSkull,
  wordsData,
  difficulty,
  gameMode,
}: PropType) {
  const [showGameOverMenu, setShowGameOverMenu] = useState<boolean>(true);
  const skulls = useMemo(
    () =>
      Skulls()
        .map((skull) => [...skull])
        .slice(startPosition, endPosition),
    [endPosition, startPosition]
  );

  const [currentSkull, setCurrentSkull] = useState<string[][][]>([]);
  const { setDifficulty, setGameMode } = useStats(); //Used to update state vars for stats
  const { showKeyboard } = useSettings(); //Used to show/hide the keyboard

  //Manage words list
  const { wordsForSkull, wordsList, dispWordHistory, setDispWordHistory } =
    useWordsForSkull({ currentSkull, wordsData });

  //Handle the main game play logic
  const {
    currentRow,
    currentRowIndex,
    enteredWords,
    isEnterPressed,
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

  const { captureAreaRef } = useCaptureHTML({ isGameOver });

  useEffect(() => {
    const randomizeCurrentSkull = () => {
      setCurrentSkull([skulls[Math.floor(Math.random() * skulls?.length)]]);
    };

    randomizeCurrentSkull();
  }, [skulls]);

  //Update state vars for stats to be applied on game over menu when game ends
  useEffect(() => {
    difficulty && setDifficulty(difficulty);
    gameMode && setGameMode(gameMode);
  }, [difficulty, gameMode, setDifficulty, setGameMode]);

  return (
    <label className=" flex relative flex-col">
      <input type="textbox" className="opacity-[0.01]" />
      <Header
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
          currentRow={currentRow}
          wordsForSkull={wordsForSkull}
        />
        <WordHistory
          dispWordHistory={dispWordHistory}
          setDispWordHistory={setDispWordHistory}
          wordsForSkull={wordsForSkull}
          currentRow={currentRow}
          enteredWords={enteredWords}
          isEnterPressed={isEnterPressed}
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
          />
          <DisplaySkull
            currentSkull={currentSkull}
            currentRow={currentRow}
            currentRowIndex={currentRowIndex}
            wordsForSkull={wordsForSkull}
            enteredWords={enteredWords}
            isEnterPressed={isEnterPressed}
          />
          <div
            className={`${
              showKeyboard ? "opacity-100" : "opacity-0"
            } flex max-w-[800px] overflow-hidden justify-center items-center`}
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
