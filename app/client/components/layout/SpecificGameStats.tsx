import { StatsDataType, useStats } from "../context/StatsContext";
import ModalWrapper from "../ui/ModalWrapper";
import SecondsToTime from "../utils/converters/SecondsToTime";
import { useMemo } from "react";

interface PropType {
  showStats: boolean;
  setShowStats: (value: boolean) => void;
}

function SpecificGameStats({ showStats, setShowStats }: PropType) {
  const { stats, difficulty, gameMode } = useStats();

  // Total games played
  const gamesPlayed = stats.length;

  // Total games won
  const gamesWon = stats.filter((data) => data.livesLeft > 0).length;

  // Win percentage calculation
  const winPercentage =
    gamesPlayed > 0 ? ((gamesWon / gamesPlayed) * 100).toFixed(2) : "0.00";

  // Maximum rows completed in any game
  const maxRowsCompleted = useMemo(() => {
    return Math.max(...stats.map((game) => game.correctWords), 0); // Ensure at least 0 if stats is empty
  }, [stats]);

  // Best time among games won
  const bestTime = useMemo(() => {
    const wonGames = stats.filter((data) => data.livesLeft > 0); // Only consider games won
    if (wonGames.length === 0) return null; // Handle case when no games are won

    return wonGames.sort((a, b) => {
      // Primary sort: time spent
      if (a.timeSpentSec === b.timeSpentSec) {
        // Tie-breaker: fewer lives used
        return b.livesLeft - a.livesLeft;
      }
      return a.timeSpentSec - b.timeSpentSec;
    })[0]; // Shortest time
  }, [stats]);

  // Calculate current and max streak
  const { currentStreak, maxStreak } = useMemo(() => {
    let current = 0;
    let max = 0;

    stats.forEach((game) => {
      if (game.livesLeft > 0) {
        current++;
        max = Math.max(max, current);
      } else {
        current = 0; // Reset on a loss
      }
    });

    return { currentStreak: current, maxStreak: max };
  }, [stats]);

  // Row completion distribution
  const rowCompletionDistribution = useMemo(() => {
    const distribution = Array(maxRowsCompleted).fill(0); // Create an array of length maxRowsCompleted

    stats.forEach((game) => {
      const rowsCompleted = game.correctWords; // Number of rows completed in this game
      // Increment counts for all rows up to the current completed row
      for (let i = 0; i < rowsCompleted; i++) {
        distribution[i] += 1;
      }
    });

    return distribution;
  }, [stats, maxRowsCompleted]);

  // Best win with least lives lost
  const bestWinWithLeastLivesLost = useMemo(() => {
    return stats.reduce<{
      livesLost: number;
      game: StatsDataType[number];
    } | null>((best, game) => {
      const livesLost = game.totalLives - game.livesLeft;

      // Check if the game is a win with a perfect score
      const isWinWithPerfectScore =
        game.livesLeft > 0 && game.correctWords === game.totalWords;

      // If it is a win and it has fewer lives lost, update the best win
      if (isWinWithPerfectScore) {
        if (best === null || livesLost < best.livesLost) {
          return {
            livesLost,
            game,
          };
        }
      }

      return best;
    }, null);
  }, [stats]);

  return (
    <>
      {showStats && (
        <ModalWrapper
          setShowModal={setShowStats}
          customClass="top-[25em] sm:top-[28em] py-[2em] overflow-auto max-h-[80vh] px-14"
        >
          <>
            <h2 className="text-2xl font-nunito text-skull-super-dark-brown">
              Statistics
              <span className="flex flex-col font-nunito w-full justify-center items-center gap-3 mt-3 text-xs">
                <span>Difficulty: {difficulty}</span>
                <span>Game Mode: {gameMode}</span>
              </span>
            </h2>
            <ul className="grid grid-cols-3 gap-4 mb-4">
              <li className="stat-box">
                <p className="text-lg font-semibold">{gamesPlayed}</p>
                <p>Games Played</p>
              </li>
              <li className="stat-box">
                <p className="text-lg font-semibold">{gamesWon}</p>
                <p>Games Won</p>
              </li>
              <li className="stat-box">
                <p className="text-lg font-semibold">{winPercentage}%</p>
                <p>% of Wins</p>
              </li>
              <li className="stat-box">
                <p className="text-lg font-semibold">
                  {bestTime ? SecondsToTime(bestTime.timeSpentSec) : "N/A"}
                </p>
                <p>Best Time</p>
              </li>
              <li className="stat-box">
                <p className="text-lg font-semibold">{currentStreak}</p>
                <p>Current Streak</p>
              </li>
              <li className="stat-box">
                <p className="text-lg font-semibold">{maxStreak}</p>
                <p>Max Streak</p>
              </li>
            </ul>
            <div className="mb-4 w-full">
              <p className="text-lg font-semibold">Best Tries Distribution</p>
              <div className="flex flex-col mt-2">
                {rowCompletionDistribution.map((count, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="flex whitespace-nowrap">
                      Row {index + 1}
                    </span>
                    <div className="w-full bg-gray-200 h-2 rounded mx-4">
                      <div
                        className="bg-blue-500 h-full rounded"
                        style={{ width: `${(count / gamesPlayed) * 100}%` }}
                      />
                    </div>
                    <span className="whitespace-nowrap">
                      ({((count / gamesPlayed) * 100).toFixed(0)}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Best Win with Least Lives Lost:
            </h3>
            <div className="flex gap-4">
              {bestWinWithLeastLivesLost ? (
                <ul className="grid grid-cols-4 gap-10">
                  <li>
                    <h4 className="text-sm font-semibold">Date</h4>
                    <p className="text-lg font-semibold">
                      {new Date(
                        bestWinWithLeastLivesLost.game.date
                      ).toLocaleDateString()}
                    </p>
                  </li>
                  <li>
                    <h4 className="text-sm font-semibold">Words</h4>
                    <p className="text-lg font-semibold">
                      {bestWinWithLeastLivesLost.game.correctWords}/
                      {bestWinWithLeastLivesLost.game.totalWords}
                    </p>
                  </li>
                  <li>
                    <h4 className="text-sm font-semibold">Lives Left</h4>
                    <p className="text-lg font-semibold">
                      {bestWinWithLeastLivesLost.game.livesLeft}/
                      {bestWinWithLeastLivesLost.game.totalLives}
                    </p>
                  </li>
                  <li>
                    <h4 className="text-sm font-semibold">Time Spent</h4>
                    <p className="text-lg font-semibold">
                      {SecondsToTime(
                        bestWinWithLeastLivesLost.game.timeSpentSec
                      )}
                    </p>
                  </li>
                </ul>
              ) : (
                <div className="stat-box">
                  <p className="text-lg font-semibold">N/A</p>
                  <p>No wins found with perfect score.</p>
                </div>
              )}
            </div>
          </>
        </ModalWrapper>
      )}
    </>
  );
}

export default SpecificGameStats;
