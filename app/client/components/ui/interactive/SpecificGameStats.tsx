import { StatsDataType, useStats } from "../../context/StatsContext";
import ModalWrapper from "./ModalWrapper";
import SecondsToTime from "../../utils/converters/SecondsToTime";
import { useMemo } from "react";

interface PropType {
  showStats: boolean;
  setShowStats: (value: boolean) => void;
}

function SpecificGameStats({ showStats, setShowStats }: PropType) {
  const { stats, difficulty, gameMode } = useStats();

  // Totals
  const gamesPlayed = stats.length;
  const gamesWon = stats.filter((data) => data.livesLeft > 0).length;
  const winPercentage =
    gamesPlayed > 0 ? ((gamesWon / gamesPlayed) * 100).toFixed(2) : "0.00";

  // Maximum rows completed in any game
  const maxRowsCompleted = useMemo(() => {
    return Math.max(...stats.map((game) => game.correctWords), 0);
  }, [stats]);

  // Best time among games won (tie-breaker: more lives left)
  const bestTime = useMemo(() => {
    const wonGames = stats.filter((data) => data.livesLeft > 0);
    if (wonGames.length === 0) return null;

    return wonGames.sort((a, b) => {
      if (a.timeSpentSec === b.timeSpentSec) {
        return b.livesLeft - a.livesLeft;
      }
      return a.timeSpentSec - b.timeSpentSec;
    })[0];
  }, [stats]);

  // Current & max streak
  const { currentStreak, maxStreak } = useMemo(() => {
    let current = 0;
    let max = 0;

    stats.forEach((game) => {
      if (game.livesLeft > 0) {
        current++;
        max = Math.max(max, current);
      } else {
        current = 0;
      }
    });

    return { currentStreak: current, maxStreak: max };
  }, [stats]);

  // Row completion distribution
  const rowCompletionDistribution = useMemo(() => {
    const distribution = Array(maxRowsCompleted).fill(0);
    stats.forEach((game) => {
      const rowsCompleted = game.correctWords;
      for (let i = 0; i < rowsCompleted; i++) {
        distribution[i] += 1;
      }
    });
    return distribution;
  }, [stats, maxRowsCompleted]);

  // --- styles ---
  const card =
    "w-full bg-pumpkin-100/10 border border-pumpkin-orange/30 rounded-xl shadow-sm px-4 py-3 text-center";
  const label =
    "text-skull-super-dark-brown text-[11px] tracking-wide uppercase";
  const value = "text-lg font-semibold text-skull-dark-brown";

  // denominator guard to avoid NaN%
  const denom = Math.max(1, gamesPlayed);

  return (
    <ModalWrapper
      setShowModal={setShowStats}
      showModal={showStats}
      customClass="top-[6em] py-[2em] overflow-auto max-h-[80vh] px-6 sm:px-10"
    >
      <>
        <h2 className="text-xl sm:text-2xl font-nunito text-skull-super-dark-brown text-center">
          Statistics
          <span className="flex flex-col font-nunito w-full justify-center items-center gap-1 sm:gap-2 mt-2 text-[11px] text-stone-500">
            <span>Difficulty: {difficulty}</span>
            <span>Game Mode: {gameMode}</span>
          </span>
        </h2>

        {/* Summary cards */}
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 my-4">
          <li className={card}>
            <p className={value}>{gamesPlayed}</p>
            <p className={label}>Games Played</p>
          </li>
          <li className={card}>
            <p className={value}>{gamesWon}</p>
            <p className={label}>Games Won</p>
          </li>
          <li className={card}>
            <p className={value}>{winPercentage}%</p>
            <p className={label}>% of Wins</p>
          </li>
          <li className={card}>
            <p className={value}>
              {bestTime ? SecondsToTime(bestTime.timeSpentSec) : "N/A"}
            </p>
            <p className={label}>Best Time</p>
          </li>
          <li className={card}>
            <p className={value}>{currentStreak}</p>
            <p className={label}>Current Streak</p>
          </li>
          <li className={card}>
            <p className={value}>{maxStreak}</p>
            <p className={label}>Max Streak</p>
          </li>
        </ul>

        {/* Row distribution */}
        <div className="mb-4 w-full">
          <p className="text-base sm:text-lg font-semibold text-skull-dark-brown">
            Best Tries Distribution
          </p>
          <div className="flex flex-col mt-3 gap-2">
            {rowCompletionDistribution.length === 0 ? (
              <div className={card}>
                <p className="text-sm text-stone-500">No data yet.</p>
              </div>
            ) : (
              rowCompletionDistribution.map((count, index) => {
                const pct = (count / denom) * 100 || 0;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <span className="w-[4.5rem] shrink-0 text-xs text-stone-600">
                      Row {index + 1}
                    </span>
                    <div className="w-full bg-stone-200/70 h-2 rounded">
                      <div
                        className="bg-pumpkin-orange/60 h-2 rounded"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-[3.25rem] shrink-0 text-xs text-stone-600 text-right">
                      ({pct.toFixed(0)}%)
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Best win with least lives lost */}
        <h3 className="text-base sm:text-lg font-semibold mb-2 text-skull-dark-brown">
          Best Win with Least Lives Lost
        </h3>
        <div className="flex gap-4">
          {(() => {
            const best = stats.reduce<{
              livesLost: number;
              game: StatsDataType[number];
            } | null>((acc, game) => {
              const livesLost = game.totalLives - game.livesLeft;
              const isWinPerfect =
                game.livesLeft > 0 && game.correctWords === game.totalWords;
              if (!isWinPerfect) return acc;
              if (acc === null || livesLost < acc.livesLost) {
                return { livesLost, game };
              }
              return acc;
            }, null);

            return best ? (
              <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full">
                <li className={card}>
                  <h4 className={label}>Date</h4>
                  <p className={value}>
                    {new Date(best.game.date).toLocaleDateString()}
                  </p>
                </li>
                <li className={card}>
                  <h4 className={label}>Words</h4>
                  <p className={value}>
                    {best.game.correctWords}/{best.game.totalWords}
                  </p>
                </li>
                <li className={card}>
                  <h4 className={label}>Lives Left</h4>
                  <p className={value}>
                    {best.game.livesLeft}/{best.game.totalLives}
                  </p>
                </li>
                <li className={card}>
                  <h4 className={label}>Time Spent</h4>
                  <p className={value}>
                    {SecondsToTime(best.game.timeSpentSec)}
                  </p>
                </li>
              </ul>
            ) : (
              <div className={card}>
                <p className="text-lg font-semibold text-skull-dark-brown">
                  N/A
                </p>
                <p className="text-[12px] text-stone-600">
                  No wins found with perfect score.
                </p>
              </div>
            );
          })()}
        </div>
      </>
    </ModalWrapper>
  );
}

export default SpecificGameStats;
