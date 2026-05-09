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
import type { StaticWordsByLength } from "../../../shared/wordData";
import { useSettings } from "../context/SettingsContext";
import { useStats } from "../context/StatsContext";
import OffScreenTimer from "../utils/trackers/OffScreenTimer";
import { useTheme } from "../context/ThemeContext";

interface PropType {
  startPosition: number;
  endPosition: number;
  lettersPerSkull: string;
  wordsData?: {
    words?: StaticWordsByLength;
  };
  difficulty: string;
  gameMode: string;
  skullNumber?: number; // NEW: variable for selecting skull
}

/** Client hydration flag (used only to fade the skeleton away) */
function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

/** Simple, light skeleton overlay with the same grid footprint */
function SkeletonSkull({
  rows,
  cols,
  show,
}: {
  rows: number;
  cols: number;
  show: boolean;
}) {
  return (
    <div
      aria-hidden
      className={`absolute inset-0 transition-opacity duration-250 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col mt-2 gap-2 h-full w-full items-center justify-center">
        <p className="text-pumpkin-orange animate-pulse">Loading...</p>
        <div className="flex flex-col gap-[2px]">
          {Array.from({ length: rows }).map((_, r) => (
            <div key={r} className="flex gap-[2px]">
              {Array.from({ length: cols }).map((_, c) => (
                <div
                  key={c}
                  className="h-[1.8em] w-[1.8em] xs:h-[1.7em] xs:w-[1.7em] lg:w-8 lg:h-8 rounded-md xs:rounded-lg bg-stone-200/70 animate-pulse"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClassicGameLogic({
  startPosition,
  endPosition,
  lettersPerSkull,
  wordsData,
  difficulty,
  gameMode,
  skullNumber,
}: PropType) {
  const [showGameOverMenu, setShowGameOverMenu] = useState<boolean>(true);
  const [startOffscreenTimer, setStartOffscreenTimer] =
    useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);

  const hydrated = useHydrated();
  const { setDifficulty, setGameMode } = useStats();
  const { showKeyboard } = useSettings();
  const { darkThemeActive } = useTheme();

  // Stable skull slice
  const skulls = useMemo(
    () =>
      Skulls()
        .map((skull) => [...skull])
        .slice(startPosition, endPosition),
    [endPosition, startPosition]
  );

  // Pick skull by skullNumber (1-based), default to first skull
  const pickIndex = useMemo(() => {
    if (!skulls.length) return 0;
    if (skullNumber && skullNumber > 0 && skullNumber <= skulls.length) {
      return skullNumber - 1;
    }
    return 0;
  }, [skulls.length, skullNumber]);

  // First skull chosen
  const initialSkullRef = useRef<string[][] | null>(null);
  if (initialSkullRef.current == null) {
    initialSkullRef.current = skulls[pickIndex] ?? [];
  }

  const [currentSkull, setCurrentSkull] = useState<string[][][]>([
    initialSkullRef.current,
  ]);

  // Update skull if pickIndex or skull slice changes
  useEffect(() => {
    const next = skulls[pickIndex] ?? [];
    if (currentSkull[0] !== next) setCurrentSkull([next]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickIndex, skulls]);

  // Manage words list
  const { wordsForSkull, wordsList, dispWordHistory, setDispWordHistory } =
    useWordsForSkull({ currentSkull, wordsData });

  // Main gameplay logic
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

  // Stats flags
  useEffect(() => {
    if (difficulty) setDifficulty(difficulty);
    if (gameMode) setGameMode(gameMode);
  }, [difficulty, gameMode, setDifficulty, setGameMode]);

  // Reserve space for initial skull
  const baseRows = initialSkullRef.current?.length ?? 0;
  const baseCols =
    baseRows > 0
      ? Math.max(...(initialSkullRef.current ?? []).map((r) => r.length))
      : 0;

  const CELL_PX = 28;
  const GAP_PX = 2;
  const gridHeight =
    baseRows > 0 ? baseRows * CELL_PX + (baseRows - 1) * GAP_PX : 0;
  const gridWidth =
    baseCols > 0 ? baseCols * CELL_PX + (baseCols - 1) * GAP_PX : 0;

  const [showSkeleton, setShowSkeleton] = useState(true);
  useEffect(() => {
    if (!hydrated) return;
    const id = requestAnimationFrame(() => setShowSkeleton(false));
    return () => cancelAnimationFrame(id);
  }, [hydrated]);

  const KEYBOARD_BLOCK_HEIGHT = 240;

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

          <div
            className="relative"
            style={{ minHeight: gridHeight, minWidth: gridWidth }}
          >
            <DisplaySkull
              currentSkull={currentSkull}
              currentRow={currentRow}
              currentRowIndex={currentRowIndex}
              wordsForSkull={wordsForSkull}
              enteredWords={enteredWords}
              isEnterPressed={isEnterPressed}
            />

            <SkeletonSkull
              rows={baseRows}
              cols={baseCols}
              show={showSkeleton}
            />
          </div>
        </label>

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
