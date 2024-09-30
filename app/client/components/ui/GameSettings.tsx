import { Link } from "react-router-dom";
import Icon from "../utils/other/Icon";
import {
  InstructionsType,
  KeyboardType,
  useSettings,
} from "../context/SettingsContext";

interface PropType {
  showSettings: boolean;
  setShowSettings: (value: boolean) => void;
}

function KeyboardToggle({ showKeyboard, setShowKeyboard }: KeyboardType) {
  return (
    <>
      <span className="font-lora text-skull-dark-brown">Virtual Keyboard:</span>
      <label className="inline-flex items-center gap-5 cursor-pointer">
        <span className=" text-sm font-nunito">
          {showKeyboard ? "Visible" : "Hidden"}
        </span>
        <input
          type="checkbox"
          checked={showKeyboard}
          onChange={() => setShowKeyboard((prevState) => !prevState)}
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    </>
  );
}
function DifficultyLinks() {
  return (
    <>
      <span className="font-lora text-skull-dark-brown">Difficulty:</span>
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
    </>
  );
}

function InstructionsToggle({
  showInstructions,
  setShowInstructions,
}: InstructionsType) {
  return (
    <>
      <span className="font-lora text-skull-dark-brown">
        Gameplay Instructions:
      </span>
      <label className="inline-flex items-center gap-5 cursor-pointer">
        <span className=" text-sm font-nunito">
          {showInstructions ? "Visible" : "Hidden"}
        </span>
        <input
          type="checkbox"
          checked={showInstructions}
          onChange={() => setShowInstructions((prevState) => !prevState)}
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    </>
  );
}

function GameSettings({ showSettings, setShowSettings }: PropType) {
  const { showKeyboard, setShowKeyboard, showInstructions, setShowInstructions } = useSettings();
  return (
    <>
      {showSettings && (
        <>
          <div className="absolute font-roboto top-[22em] left-1/2 -translate-x-1/2 z-[50] items-center py-[2em] flex -translate-y-1/2 bg-white max-w-[38em] w-full min-h-[20em] rounded-lg flex-col gap-7">
            <button
              data-testid="close-settings"
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
                {KeyboardToggle({
                  showKeyboard: showKeyboard,
                  setShowKeyboard: setShowKeyboard,
                })}
              </li>
              <li className="flex w-full justify-between md:max-w-[80%] mx-auto">
                {InstructionsToggle({ showInstructions, setShowInstructions })}
              </li>
              <li className="flex w-full justify-between md:max-w-[80%] mx-auto gap-5">
                {DifficultyLinks()}
              </li>
            </ul>
          </div>
          <button
            data-testid="settings-background"
            onClick={() => setShowSettings(false)}
            className="fixed inset-0 h-full w-full flex bg-skull-brown bg-opacity-10 z-30 justify-center"
          ></button>
        </>
      )}
    </>
  );
}

export default GameSettings;
