import { Link, useLocation } from "react-router-dom";
import Icon from "../utils/other/Icon";

interface PropType {
  setShowGameOverMenu: (value: boolean) => void;
  isGameOver: boolean;
  dontFade?: boolean;
  difficulty?: string;
  setShowSettings: (value: boolean) => void;
}
function HeaderMenu({
  setShowGameOverMenu,
  isGameOver,
  dontFade,
  difficulty,
  setShowSettings,
}: PropType) {
  const location = useLocation();

  return (
    <div
      className={`${
        !dontFade && "animate-fadeIn"
      } flex w-full items-center px-2 sm:mt-2 justify-center max-w-[700px] sm:mb-0 text-slate-500 font-lora leading-snug text-xs sm:text-base`}
    >
      <h1 className="flex w-full gap-1 items-center">
        <span>W💀RD SKULL</span>
        {difficulty && <span>({difficulty})</span>}
      </h1>
      <ul className="flex gap-1 justify-center items-center">
        {isGameOver && (
          <li className="flex justify-center items-center">
            <button
              data-testid="results-button"
              onClick={() => setShowGameOverMenu(true)}
              className="cursor-pointer py-2 px-1 w-[2em]  fill-slate-500 hover:fill-skull-brown flex justify-center items-center"
            >
              <Icon icon="flag" title="Results" />
            </button>
          </li>
        )}
        <li className="flex justify-center items-center">
          <button className="cursor-pointer py-2 px-1 w-[2em]  fill-slate-500 hover:fill-skull-brown flex justify-center items-center">
            <Icon icon="barGraph" title="Stats" />
          </button>
        </li>
        <li className="flex justify-center items-center">
          <Link
            to={`${
              location?.pathname === "/" ? "" : location?.pathname
            }/#gameplay-instructions`}
            className="cursor-pointer py-2 px-1 w-[2em]  fill-slate-500 hover:fill-skull-brown flex justify-center items-center"
          >
            <Icon icon="question" title="Rules" />
          </Link>
        </li>
        <li className="flex justify-center items-center">
          <button
            data-testid="settings-button"
            onClick={() => setShowSettings(true)}
            className="cursor-pointer py-2 px-1 w-[2em]  fill-slate-500 hover:fill-skull-brown flex justify-center items-center"
          >
            <Icon icon="settingSparkle" title="Settings" />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default HeaderMenu;
