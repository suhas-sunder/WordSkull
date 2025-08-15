import { useEffect } from "react";
import SecondsToTime from "../../utils/converters/SecondsToTime";
import { StatsDataType, useStats } from "../../context/StatsContext";
import { v4 as uuidv4 } from "uuid";

interface PropType {
  lives: number | null;
  maxLives: number | null;
  isGameOver: boolean;
  wordsForSkull: string[];
  currentRow: number;
  seconds: number;
}

function GameOverStats({
  lives,
  maxLives,
  isGameOver,
  wordsForSkull,
  currentRow,
  seconds,
}: PropType) {
  const { setStats, difficulty, gameMode } = useStats();

  // Update stats when game ends (unchanged)
  useEffect(() => {
    const updateSats = () => {
      const newStatEntry: StatsDataType = [
        {
          id: uuidv4(),
          date: new Date().toISOString(),
          totalLives: maxLives !== null ? maxLives : 0,
          livesLeft: lives !== null ? lives : 0,
          totalWords: wordsForSkull.length,
          correctWords: currentRow,
          timeSpentSec: seconds,
          difficulty,
          gameMode,
        },
      ];

      setStats((prevState: StatsDataType) => {
        if (!Array.isArray(prevState)) {
          console.error("prevState is not an array!", prevState);
          return [];
        }
        return [...prevState, ...newStatEntry];
      });
    };

    if (isGameOver) updateSats();
  }, [
    currentRow,
    difficulty,
    gameMode,
    isGameOver,
    lives,
    maxLives,
    seconds,
    setStats,
    wordsForSkull.length,
  ]);

  // Card styles (stronger specificity via "!")
  const card =
    "w-full rounded-2xl border-2 !border-pumpkin-orange/30 !bg-amber-100/10 shadow-sm px-6 py-5 flex flex-col items-center justify-center";
  const value =
    "text-skull-dark-brown font-semibold tracking-wide text-3xl sm:text-4xl";
  const label =
    "text-skull-super-dark-brown uppercase tracking-wide text-[11px] sm:text-xs mt-1";

  return (
    <div className="flex w-full flex-col font-nunito justify-center items-center gap-5">
      <h2 className="text-2xl sm:text-3xl text-skull-dark-brown mb-1">Stats</h2>

      {/* Centered row of 3 cards; stacks on small screens */}
      <ul className="grid w-full max-w-[860px] grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mx-auto px-3 sm:px-4">
        <li className={`${card} min-h-[96px]`}>
          <span className={value}>
            {lives ?? 0}/{maxLives ?? 0}
          </span>
          <span className={label}>Lives Left</span>
        </li>

        <li className={`${card} min-h-[96px]`}>
          <span className={value}>
            {currentRow ?? 0}/{wordsForSkull.length ?? 0}
          </span>
          <span className={label}>Correct Words</span>
        </li>

        <li className={`${card} min-h-[96px]`}>
          <span className={value}>{SecondsToTime(seconds) || "00:00:00"}</span>
          <span className={label}>Time Spent</span>
        </li>
      </ul>
    </div>
  );
}

export default GameOverStats;
