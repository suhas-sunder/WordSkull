import React, { useState } from "react";
import useCaptureHTML from "../../hooks/useCaptureHTML";
import ModalWrapper from "./ModalWrapper";
import useOnlyOnClient from "../../hooks/useOnlyOnClient";
import GameOverStats from "../visual/GameOverStats";

interface PropType {
  isGameOver: boolean;
  showGameOverMenu: boolean;
  setShowGameOverMenu: (value: boolean) => void;
  lives: number | null;
  maxLives: number | null;
  currentRow: number;
  wordsForSkull: string[];
}

const GameOverMenu = React.memo(function GameOverMenu({
  isGameOver,
  showGameOverMenu,
  setShowGameOverMenu,
  lives,
  maxLives,
  currentRow,
  wordsForSkull,
}: PropType) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const {
    downloadPuzzle,
    copyImageToClipboard,
    shareImage,
    isWebShareSupported,
    loadingStatus,
  } = useCaptureHTML({ isGameOver, captureAreaId: "capture-area" }); //Use captureAreaId prop to identify the element to be captured when game ends

  const handleGameOverMsg = () => {
    const rowsCompleted = currentRow;

    if (rowsCompleted === 3) return "Great Effort!";

    if (rowsCompleted === 4) return "So Close!";

    if (rowsCompleted >= 5) return "You Won!";

    return "You Lose!";
  };

  const isClient = useOnlyOnClient(); //Prevent hydration issues

  // Don't render anything until we're on the client
  if (!isClient) {
    return null;
  }

  return (
    <>
      {isGameOver && (
        <ModalWrapper
          showModal={showGameOverMenu}
          setShowModal={setShowGameOverMenu}
          customClass="top-[6em]"
        >
          <>
            <div
              data-testid="game-over-menu"
              className=" bg-skull-brown text-white w-full justify-center items-center py-2 text-2xl text-center "
            >
              {handleGameOverMsg()}
            </div>
            <GameOverStats
              lives={lives}
              maxLives={maxLives}
              isGameOver={isGameOver}
              wordsForSkull={wordsForSkull}
              currentRow={currentRow}
            />
            <button
              onClick={() => window.location.reload()}
              className="cursor-pointer py-2 gap-2 bg-green-500 text-white px-4 mt-1 text-lg font-nunito rounded-md fill-slate-500 hover:fill-skull-brown flex justify-center items-center"
            >
              Play Again
            </button>
            <div className="cursor-pointer py-2 gap-2 px-4 rounded-md fill-slate-500 hover:fill-skull-brown flex justify-center items-center">
              <span className="flex whitespace-nowrap text-xl text-slate-600">
                Share Your Results!
              </span>
            </div>
            {/* Loading State */}
            {loadingStatus === "loading" && (
              <div className="flex items-center justify-center h-full">
                <span className="text-lg font-semibold animate-pulse">
                  Loading...
                </span>
              </div>
            )}

            {/* Failed State */}
            {loadingStatus === "failed" && <div>Something went wrong</div>}

            {/* Loaded State */}
            {loadingStatus === "loaded" && (
              <ul className="grid sm:grid-cols-3 gap-5 justify-center items-center mb-[2.5em]">
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
            )}
          </>
        </ModalWrapper>
      )}
    </>
  );
});

export default GameOverMenu;
