import { Link, useLocation } from "react-router-dom";
import Icon from "../../utils/other/Icon";
import WordHistory from "./WordHistory";

interface PropType {
  setShowGameOverMenu: (value: boolean) => void;
  isGameOver: boolean;
  lettersPerSkull?: string;
  setShowSettings: (value: boolean) => void;
  setShowStats: (value: boolean) => void;
  dispWordHistory: boolean;
  setDispWordHistory: (
    value: ((prevState: boolean) => boolean) | boolean
  ) => void;
  enteredWords: string[][];
  currentRow: number;
  wordsForSkull: string[];
  isEnterPressed: boolean;
}
function HeaderMenu({
  setShowGameOverMenu,
  isGameOver,
  setShowSettings,
  setShowStats,
  dispWordHistory,
  setDispWordHistory,
  enteredWords,
  currentRow,
  wordsForSkull,
  isEnterPressed,
}: PropType) {
  const location = useLocation();

  return (
    <div
      className={` flex relative w-full items-center px-2 mt-5 mb-2 sm:mt-7 justify-between max-w-[700px] gap-2 xs:gap-5  text-stone-500 font-lora leading-snug text-xs sm:text-base`}
    >
      <ul className="flex gap-1 justify-center items-center">
        <li className="flex justify-center items-center">
          <button
            data-testid="results-button"
            aria-label="Results"
            name="results-button"
            onClick={() => isGameOver && setShowGameOverMenu(true)}
            className={`${
              isGameOver
                ? "fill-pumpkin-orange hover:fill-amber-500 cursor-pinter"
                : "fill-skull-brown cursor-default"
            } cursor-pointer py-2 px-1 w-[2em]   flex justify-center items-center`}
          >
            <Icon icon="flag" title="Results" />
          </button>
        </li>
        <li className="flex justify-center items-center">
          <button
            data-testid="stats-button"
            aria-label="Stats"
            name="stats-button"
            onClick={() => setShowStats(true)}
            className="cursor-pointer py-2 px-1 w-[2em]  fill-pumpkin-orange hover:fill-amber-500 flex justify-center items-center"
          >
            <Icon icon="barGraph" title="Stats" />
          </button>
        </li>
      </ul>
      <WordHistory
        dispWordHistory={dispWordHistory}
        setDispWordHistory={setDispWordHistory}
        wordsForSkull={wordsForSkull}
        currentRow={currentRow}
        enteredWords={enteredWords}
        isEnterPressed={isEnterPressed}
      />
      <ul className="flex gap-1 justify-center items-center">
        <li className="flex justify-center items-center">
          <Link
            data-testid="instructions-hashlink"
            aria-label="Instructions"
            to={`${location?.pathname}#gameplay-instructions`}
            className="cursor-pointer py-2 px-1 w-[2em]  fill-pumpkin-orange hover:fill-amber-500 flex justify-center items-center"
          >
            <Icon icon="question" title="Rules" />
          </Link>
        </li>
        <li className="flex justify-center items-center">
          <button
            data-testid="settings-button"
            name="settings-button"
            aria-label="Settings"
            onClick={() => setShowSettings(true)}
            className="cursor-pointer py-2 px-1 w-[2em]  fill-pumpkin-orange hover:fill-amber-500 flex justify-center items-center"
          >
            <Icon icon="settingSparkle" title="Settings" />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default HeaderMenu;
