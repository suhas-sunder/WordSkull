import SecondsToTime from "../utils/converters/SecondsToTime";
import Header from "./Header";

interface PropType {
  isGameOver: boolean;
  showGameOverMenu: boolean;
  setShowGameOverMenu: (value: boolean) => void;
  lives: number | null;
  maxLives: number | null;
  currentRow: number;
  lettersPerSkull?: string;
  wordsForSkull: string[];
  seconds: number;
}

//Temporairly displays stats above word skull when game over menu is open so that when screen is captured, the stats hidden behind the menu are included along with it.
function GameOverStatsCapture({
  isGameOver,
  showGameOverMenu,
  setShowGameOverMenu,
  lives,
  maxLives,
  currentRow,
  wordsForSkull,
  lettersPerSkull,
  seconds,
}: PropType) {
  return (
    <>
      {isGameOver && showGameOverMenu && (
        <div data-testid="game-over-stats-capture" className="flex font-nunito w-full flex-col justify-center items-center gap-4">
          <Header
            lives={lives}
            isGameOver={isGameOver}
            lettersPerSkull={lettersPerSkull || ""}
            dontFade={true}
            setShowGameOverMenu={setShowGameOverMenu}
          />
          <ul className="grid gap-5 sm:grid-cols-3 w-full justify-center items-center">
            <li className="flex col-span-1 flex-col gap-1 w-full justify-center items-center">
              <span className="text-skull-dark-brown text-2xl">
                {`${lives || 0}/${maxLives}`}
              </span>
              <span className="text-skull-super-dark-brown text-xs">
                Lives Left
              </span>
            </li>
            <li className="flex flex-col gap-1 w-full justify-center items-center">
              <span className="text-skull-dark-brown text-3xl sm:text-4xl">
                {`${currentRow || 0}/${wordsForSkull.length || 0}`}
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
      )}
    </>
  );
}

export default GameOverStatsCapture;
