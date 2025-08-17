import { useEffect, useMemo, useRef, useState } from "react";
import useWordsForSkull from "../hooks/useWordsForSkull";
import Skulls from "../data/Skulls";
import useClassicGameplayLogic from "../hooks/useClassicGameplayLogic";
import Header from "./Header";
import DisplaySkull from "./DisplaySkull";
import Keyboard from "../ui/interactive/Keyboard";
import Keypad from "../ui/interactive/Keypad";
import GameOverMenu from "../ui/interactive/GameOverMenu";
import GameOverStatsCapture from "./GameOverStatsCapture";
import { WordsData } from "../../../routes/games.classic.boneheads-easy-3-to-5-letter-words";
import { useSettings } from "../context/SettingsContext";
import { useStats } from "../context/StatsContext";
import OffScreenTimer from "../utils/trackers/OffScreenTimer";
import { useTheme } from "../context/ThemeContext";

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
  const [startOffscreenTimer, setStartOffscreenTimer] =
    useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);

  // unchanged: one Skulls() call here, sliced by props
  const skulls = useMemo(
    () =>
      Skulls()
        .map((skull) => [...skull])
        .slice(startPosition, endPosition),
    [endPosition, startPosition]
  );

  // ---- CLS FIX 1: pick a skull synchronously on first render
  const initialPickRef = useRef<string[][] | null>(null);
  if (!initialPickRef.current) {
    initialPickRef.current =
      skulls.length > 0
        ? skulls[Math.floor(Math.random() * skulls.length)]
        : [];
  }
  const [currentSkull, setCurrentSkull] = useState<string[][][]>([
    initialPickRef.current,
  ]);

  const { setDifficulty, setGameMode } = useStats(); //Used to update state vars for stats
  const { showKeyboard } = useSettings(); //Used to show/hide the keyboard
  const { darkThemeActive } = useTheme();

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
    setStartOffscreenTimer,
    startOffscreenTimer,
  });

  // Keep your effect but make it a no-op after initial pick (prevents double-paint jump)
  useEffect(() => {
    if (!currentSkull.length && skulls.length) {
      setCurrentSkull([skulls[Math.floor(Math.random() * skulls.length)]]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skulls, currentSkull.length]);

  //Update state vars for stats to be applied on game over menu when game ends
  useEffect(() => {
    difficulty && setDifficulty(difficulty);
    gameMode && setGameMode(gameMode);
  }, [difficulty, gameMode, setDifficulty, setGameMode]);

  // ---- CLS FIX 2: reserve exact space for the skull grid
  const rows = currentSkull?.[0]?.length ?? 0;
  const cols = rows ? currentSkull?.[0]?.[0]?.length ?? 0 : 0;

  // Tune to your actual tile + gap sizing used in DisplaySkull
  const CELL_PX = 28;
  const GAP_PX = 2;
  const gridHeight = rows > 0 ? rows * CELL_PX + (rows - 1) * GAP_PX : 0;
  const gridWidth = cols > 0 ? cols * CELL_PX + (cols - 1) * GAP_PX : 0;

  // ---- CLS FIX 3: always reserve keyboard block height
  const KEYBOARD_BLOCK_HEIGHT = 240; // measure your real keyboard+keypad area

  return (
    <div className=" flex relative flex-col mt-6">
      <Header
        lives={lives}
        isGameOver={isGameOver}
        lettersPerSkull={lettersPerSkull}
        setShowGameOverMenu={setShowGameOverMenu}
        dispWordHistory={dispWordHistory}
        setDispWordHistory={setDispWordHistory}
        enteredWords={enteredWords}
        currentRow={currentRow}
        wordsForSkull={wordsForSkull}
        isEnterPressed={isEnterPressed}
      />

      <main className="flex relative flex-col gap-1 pt-1 px-5 items-center ">
        <GameOverMenu
          isGameOver={isGameOver}
          showGameOverMenu={showGameOverMenu}
          setShowGameOverMenu={setShowGameOverMenu}
          lives={lives}
          maxLives={maxLives}
          currentRow={currentRow}
          wordsForSkull={wordsForSkull}
          seconds={seconds}
        />

        <label id="capture-area" className="flex gap-2 flex-col">
          <input type="text" className="absolute -top-[999px]" />

          <GameOverStatsCapture
            isGameOver={isGameOver}
            showGameOverMenu={showGameOverMenu}
            setShowGameOverMenu={setShowGameOverMenu}
            lives={lives}
            maxLives={maxLives}
            currentRow={currentRow}
            lettersPerSkull={lettersPerSkull}
            wordsForSkull={wordsForSkull}
            seconds={seconds}
          />

          {/* Reserve skull space to prevent layout jump */}
          <div style={{ minHeight: gridHeight, minWidth: gridWidth }}>
            <DisplaySkull
              currentSkull={currentSkull}
              currentRow={currentRow}
              currentRowIndex={currentRowIndex}
              wordsForSkull={wordsForSkull}
              enteredWords={enteredWords}
              isEnterPressed={isEnterPressed}
            />
          </div>
        </label>

        {/* Always reserve keyboard area height to avoid jumps */}
        <div
          className="flex max-w-[800px] w-full justify-center items-center"
          style={{ minHeight: KEYBOARD_BLOCK_HEIGHT }}
        >
          {showKeyboard ? (
            <>
              <Keyboard
                currentlyEnteredWords={enteredWords[currentRow]}
                currentWord={wordsForSkull[currentRow]}
              />
              <Keypad
                currentlyEnteredWords={enteredWords[currentRow]}
                currentWord={wordsForSkull[currentRow]}
              />
            </>
          ) : null}
        </div>

        <h1
          className={`${
            darkThemeActive ? "text-stone-400" : "text-skull-dark-brown"
          } w-full z-1 flex-col flex justify-center mt-[2em] lg-md:mt-[0.3em] items-center gap-5 text-2xl mb-3 sm:text-3xl text-center  leading-snug  font-lora tracking-wide`}
        >
          <span className="flex">W💀RD SKULL CLASSIC</span>
          {lettersPerSkull && (
            <span className="text-xl flex">({lettersPerSkull})</span>
          )}
        </h1>

        <OffScreenTimer
          setSeconds={setSeconds}
          isGameOver={isGameOver}
          startOffscreenTimer={startOffscreenTimer}
        />
      </main>
    </div>
  );
}

export default ClassicGameLogic;
