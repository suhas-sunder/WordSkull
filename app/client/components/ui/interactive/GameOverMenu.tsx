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
}

//Memoize the game over menu so that it doesn't re-rendered every time a keypress event is fired
const GameOverMenu = React.memo(function GameOverMenu({
  isGameOver,
  showGameOverMenu,
  setShowGameOverMenu,
  lives,
  maxLives,
  currentRow,
  wordsForSkull,
}: PropType) {
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
            <ShareYourResults isGameOver={isGameOver} />
          </>
        </ModalWrapper>
      )}
    </>
  );
});

export default GameOverMenu;
