import React from "react";
import ModalWrapper from "./ModalWrapper";
import useOnlyOnClient from "../../hooks/useOnlyOnClient";
import GameOverStats from "../visual/GameOverStats";
import ShareYourResults from "./ShareYourResults";

interface PropType {
  isGameOver: boolean;
  showGameOverMenu: boolean;
  setShowGameOverMenu: (value: boolean) => void;
  lives: number | null;
  maxLives: number | null;
  currentRow: number;
  wordsForSkull: string[];
  seconds: number;
}

// Memoize so it doesn't re-render every keypress (unchanged)
const GameOverMenu = React.memo(function GameOverMenu({
  isGameOver,
  showGameOverMenu,
  setShowGameOverMenu,
  lives,
  maxLives,
  currentRow,
  wordsForSkull,
  seconds,
}: PropType) {
  const handleGameOverMsg = () => {
    const rowsCompleted = currentRow;
    if (rowsCompleted === 3) return "Great Effort!";
    if (rowsCompleted === 4) return "So Close!";
    if (rowsCompleted >= 5) return "You Won!";
    return "You Lose!";
  };

  const isClient = useOnlyOnClient(); // Prevent hydration issues
  if (!isClient) return null;

  return (
    <>
      {isGameOver && (
        <ModalWrapper
          showModal={showGameOverMenu}
          setShowModal={setShowGameOverMenu}
          // let the header go edge-to-edge; pad body ourselves
          customClass="top-[6em] px-0 pb-6 pt-0 w-[min(92vw,960px)]"
        >
          <>
            {/* Edge-to-edge banner that matches modal width */}
            <div
              data-testid="game-over-menu"
              className="bg-skull-brown text-white w-full text-2xl text-center py-3 rounded-t-xl font-nunito"
            >
              {handleGameOverMsg()}
            </div>

            {/* Body container: even padding, consistent spacing */}
            <div className="px-6 sm:px-8 pt-6 flex flex-col items-center gap-6">
              <GameOverStats
                lives={lives}
                maxLives={maxLives}
                isGameOver={isGameOver}
                wordsForSkull={wordsForSkull}
                currentRow={currentRow}
                seconds={seconds}
              />

              <button
                onClick={() => window.location.reload()}
                className="cursor-pointer inline-flex items-center justify-center rounded-lg bg-green-500 hover:bg-green-600 text-white px-6 py-2 text-lg font-nunito shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500/40"
              >
                Play Again
              </button>

              <div className="w-full">
                <ShareYourResults isGameOver={isGameOver} seconds={seconds} />
              </div>
            </div>
          </>
        </ModalWrapper>
      )}
    </>
  );
});

export default GameOverMenu;
