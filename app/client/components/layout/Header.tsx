import { Link } from "@remix-run/react";
import { useTheme } from "../context/ThemeContext";
import Icon from "../utils/other/Icon";

interface PropType {
  lives: number | null;
  isGameOver: boolean;
  difficulty?: string;
  dontFade?: boolean;
  setShowGameOverMenu: (value: boolean) => void;
}

function Header({
  lives,
  isGameOver,
  difficulty,
  setShowGameOverMenu,
  dontFade,
}: PropType) {
  const { darkThemeActive } = useTheme();

  return (
    <header className="relative w-full justify-center items-center flex-col flex">
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
              to={`${location.pathname}/#gameplay-instructions`}
              className="cursor-pointer py-2 px-1 w-[2em]  fill-slate-500 hover:fill-skull-brown flex justify-center items-center"
            >
              <Icon icon="question" title="Rules" />
            </Link>
          </li>
          {/* <li className="flex justify-center items-center">
            <button className="cursor-pointer py-2 px-1 w-[2em]  fill-slate-500 hover:fill-skull-brown">
              <Icon icon="share" title="Share" />
            </button>
          </li> */}
          <li className="flex justify-center items-center">
            <button className="cursor-pointer py-2 px-1 w-[2em]  fill-slate-500 hover:fill-skull-brown flex justify-center items-center">
              <Icon icon="settingSparkle" title="Settings" />
            </button>
          </li>
        </ul>
      </div>
      {!isGameOver && (
        <ul
          className={`animate-fadeIn flex fixed z-[100] top-[0.95em]  sm:top-[0.45em] font-nunito gap-2 my-1 justify-center items-center ${
            darkThemeActive ? "text-white" : "text-slate-700"
          }`}
        >
          <span className="text-lg translate-y-[0.05em]">{lives || 0}</span>
          <span className="text-xl translate-y-[0.01em]">x</span>
          <span className="opacity-85 -translate-x-[0.1em] text-lg">
            {darkThemeActive ? "🤍" : "🖤"}
          </span>
        </ul>
      )}
    </header>
  );
}

export default Header;
