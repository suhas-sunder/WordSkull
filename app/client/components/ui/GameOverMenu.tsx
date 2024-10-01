import { useEffect, useState } from "react";
import useCaptureHTML from "../hooks/useCaptureHTML";
import SecondsToTime from "../utils/converters/SecondsToTime";
import Icon from "../utils/other/Icon";
import { StatsDataType, useStats } from "../context/StatsContext";
import { v4 as uuidv4 } from "uuid";

interface PropType {
  isGameOver: boolean;
  showGameOverMenu: boolean;
  setShowGameOverMenu: (value: boolean) => void;
  lives: number | null;
  maxLives: number | null;
  seconds: number;
  currentRow: number;
  wordsForSkull: string[];
}

function GameOverMenu({
  isGameOver,
  showGameOverMenu,
  setShowGameOverMenu,
  lives,
  maxLives,
  seconds,
  currentRow,
  wordsForSkull,
}: PropType) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

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

  const {
    downloadPuzzle,
    copyImageToClipboard,
    shareImage,
    isWebShareSupported,
  } = useCaptureHTML({ isGameOver });

  const handleGameOverMsg = () => {
    const rowsCompleted = currentRow;

    if (rowsCompleted === 3) return "Great Effort!";

    if (rowsCompleted === 4) return "So Close!";

    if (rowsCompleted >= 5) return "You Won!";

    return "You Lose!";
  };

  return (
    <>
      {isGameOver && showGameOverMenu && (
        <div
          data-testid="game-over-menu"
          className="flex absolute w-full justify-center items-center"
        >
          <button
            data-testid="game-over-background"
            onClick={() => setShowGameOverMenu(false)}
            className="fixed inset-0 h-full w-full flex bg-skull-brown bg-opacity-10 z-30 justify-center"
          ></button>
          <div className="flex relative flex-col bg-white shadow-lg pb-10 w-full gap-5 z-40 max-w-[700px] font-nunito overflow-hidden mt-[4em] tracking-widest leading-loose min-h-[27em] min-w-40 mb-auto rounded-lg justify-center items-center">
            <button
              data-testid="close-menu-button"
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

            <button
              onClick={() => window.location.reload()}
              className="cursor-pointer py-2 gap-2 bg-green-500 text-white px-4 rounded-md fill-slate-500 hover:fill-skull-brown flex justify-center items-center"
            >
              Play Again
            </button>
            <div className="cursor-pointer py-2 gap-2 px-4 rounded-md fill-slate-500 hover:fill-skull-brown flex justify-center items-center">
              <span className="flex whitespace-nowrap text-xl text-slate-600">
                Share Your Results!
              </span>
            </div>
            <ul className="grid sm:grid-cols-3 gap-5 justify-center items-center mb-auto">
              {isWebShareSupported && (
                <li className="flex justify-center items-center w-full">
                  <button
                    className="cursor-pointer w-[8em] hover:border-skull-brown hover:text-skull-super-dark-brown h-[3.5em] py-2 gap-2 border-2 rounded-md fill-slate-500 hover:fill-skull-brown flex justify-center items-center"
                    onClick={shareImage}
                  >
                    Share
                  </button>
                </li>
              )}
              <li className="flex justify-center items-center w-full">
                {" "}
                <button
                  onClick={downloadPuzzle}
                  className="cursor-pointer py-2 w-[8em] hover:border-skull-brown hover:text-skull-super-dark-brown h-[3.5em] border-2 rounded-md fill-slate-500 hover:fill-skull-brown flex justify-center items-center"
                >
                  Download
                </button>
              </li>
              <li className="flex justify-center items-center w-full">
                <button
                  onClick={() => {
                    copyImageToClipboard();
                    setIsCopied(true);

                    setTimeout(() => {
                      setIsCopied(false);
                    }, 500);
                  }}
                  className="cursor-pointer py-2 gap-2 border-2 hover:border-skull-brown hover:text-skull-super-dark-brown w-[8em] h-[3.5em] rounded-md fill-slate-500 hover:fill-skull-brown flex justify-center items-center"
                >
                  {isCopied ? "Copied!" : "Copy"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default GameOverMenu;
