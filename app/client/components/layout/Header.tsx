import { Link, useLocation } from "@remix-run/react";
import { useTheme } from "../context/ThemeContext";
import Icon from "../utils/other/Icon";
import { useEffect, useState } from "react";

interface PropType {
  lives: number | null;
  isGameOver: boolean;
  difficulty?: string;
  dontFade?: boolean;
  showKeyboard: boolean;
  setShowGameOverMenu: (value: boolean) => void;
  setShowKeyboard: (value: (prevState: boolean) => boolean) => void;
}

function Header({
  lives,
  isGameOver,
  difficulty,
  setShowGameOverMenu,
  showKeyboard,
  setShowKeyboard,
  dontFade,
}: PropType) {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { darkThemeActive } = useTheme();
  const location = useLocation();

  useEffect(() => {
    // Run this effect only on the client side
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("showKeyboard");

      // Check if there's a valid localStorage entry
      if (savedState !== null) {
        try {
          setShowKeyboard(JSON.parse(savedState));
        } catch (error) {
          console.error("Error parsing localStorage value:", error);
        }
      }

      // Set loading to true after checking localStorage
      setIsLoaded(true);
    }
  }, [setShowKeyboard]);

  useEffect(() => {
    // Don't save to localStorage until it's loaded
    if (typeof window !== "undefined" && isLoaded) {
      localStorage.setItem("showKeyboard", JSON.stringify(showKeyboard));
    }
  }, [showKeyboard, isLoaded]);

  const toggleKeyboard = () => {
    setShowKeyboard((prevState) => !prevState);
  };

  return (
    <header className="relative w-full justify-center items-center flex-col flex">
      {showSettings && (
        <>
          <div className="absolute font-roboto top-[22em] left-1/2 -translate-x-1/2 z-[50] items-center py-[2em] flex -translate-y-1/2 bg-white max-w-[38em] w-full min-h-[20em] rounded-lg flex-col gap-7">
            <button
              onClick={() => setShowSettings(false)}
              className="flex absolute top-[0.8em] right-[0.8em] z-[60]"
            >
              <Icon icon="close" />
            </button>
            <h2 className="text-2xl font-nunito text-skull-super-dark-brown">
              Settings
            </h2>
            <ul className="w-full flex flex-col gap-5 text-skull-dark-brown px-5 md:px-0">
              <li className="flex w-full justify-between md:max-w-[80%] mx-auto">
                <span className="font-lora text-skull-dark-brown">
                  Virtual Keyboard:
                </span>
                <label className="inline-flex items-center gap-5 cursor-pointer">
                  <span className=" text-sm font-nunito">
                    {showKeyboard ? "On" : "Off"}
                  </span>
                  <input
                    type="checkbox"
                    checked={showKeyboard}
                    onChange={toggleKeyboard}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </li>
              <li className="flex w-full justify-between md:max-w-[80%] mx-auto gap-5">
                <span className="font-lora text-skull-dark-brown">
                  Difficulty:
                </span>
                <div
                  className={` grid grid-cols-2  md:flex gap-5 font-nunito text-sm text-slate-400`}
                >
                  <Link
                    to="/word-skull-game-easy-mode"
                    className={`${
                      location.pathname.includes("easy") &&
                      "text-skull-brown border-skull-brown"
                    } border-2 px-4 py-1 rounded-md hover:text-skull-brown hover:border-skull-brown`}
                  >
                    Easy
                  </Link>
                  <Link
                    to="/word-skull-game-medium-mode"
                    className={`${
                      location.pathname.includes("medium") &&
                      "text-skull-brown border-skull-brown"
                    } border-2 px-4 py-1 rounded-md hover:text-skull-brown hover:border-skull-brown`}
                  >
                    Medium
                  </Link>
                  <Link
                    to="/word-skull-game-hard-mode"
                    className={`${
                      location.pathname.includes("hard") &&
                      "text-skull-brown border-skull-brown"
                    } border-2 px-4 py-1 rounded-md hover:text-skull-brown hover:border-skull-brown`}
                  >
                    Hard
                  </Link>
                  <Link
                    to="/word-skull-game-extreme-mode"
                    className={`${
                      location.pathname.includes("extreme") &&
                      "text-skull-brown border-skull-brown"
                    } border-2 px-4 py-1 rounded-md hover:text-skull-brown hover:border-skull-brown`}
                  >
                    Extreme
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          <button
            onClick={() => setShowSettings(false)}
            className="fixed inset-0 h-full w-full flex bg-skull-brown bg-opacity-10 z-30 justify-center"
          ></button>
        </>
      )}
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
              to={`${location?.pathname || "/"}/#gameplay-instructions`}
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
            <button
              onClick={() => setShowSettings(true)}
              className="cursor-pointer py-2 px-1 w-[2em]  fill-slate-500 hover:fill-skull-brown flex justify-center items-center"
            >
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
