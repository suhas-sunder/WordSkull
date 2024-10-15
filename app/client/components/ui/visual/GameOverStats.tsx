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
  //Update stats data with new stats when game ends
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
          console.error("prevState is not an array!", prevState); // Debugging line
          return []; // Fallback to an empty array if prevState is not iterable
        }
        return [...prevState, ...newStatEntry]; // Append new stat entry
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

  return (
    <div className="flex w-full flex-col font-nunito justify-center  items-center gap-4 ">
      <h2 className="text-2xl text-slate-600">Stats</h2>
      <ul className="grid gap-5 sm:grid-cols-3 w-full justify-center items-center">
        <li className="flex col-span-1 flex-col gap-1 w-full justify-center items-center">
          <span className="text-skull-dark-brown text-2xl">
            {lives || 0}/{maxLives}
          </span>
          <span className="text-skull-super-dark-brown text-xs">
            Lives Left
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
          <span className="text-2xl">
            {SecondsToTime(seconds) || "00:00:00"}
          </span>
          <span className="text-skull-super-dark-brown text-xs">
            Time Spent
          </span>
        </li>
      </ul>
    </div>
  );
}

export default GameOverStats;
