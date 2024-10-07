import { Link } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";
import ModalWrapper from "./ModalWrapper";
import useOnlyOnClient from "../hooks/useOnlyOnClient";

interface PropType {
  showSettings: boolean;
  setShowSettings: (value: boolean) => void;
}

interface ToggleOptionsPropType {
  value: boolean;
  setValue: (value: (prevState: boolean) => boolean) => void;
  title: string;
  offStateText: string;
  onStateText: string;
}

function CreateToggleOptions({
  value,
  setValue,
  title,
  offStateText,
  onStateText,
}: ToggleOptionsPropType) {
  return (
    <>
      <span className="font-lora text-skull-dark-brown">{title}:</span>
      <label className="inline-flex items-center gap-5 cursor-pointer">
        <span className=" text-sm font-nunito">
          {value ? onStateText : offStateText}
        </span>
        <input
          type="checkbox"
          checked={value}
          onChange={() => setValue((prevState: boolean) => !prevState)}
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

function GameSettings({ showSettings, setShowSettings }: PropType) {
  const {
    showKeyboard,
    setShowKeyboard,
    showInstructions,
    setShowInstructions,
    setMakeKeypadInteractive,
    makeKeypadInteractive,
  } = useSettings();

  const isClient = useOnlyOnClient(); //Prevent hydration issues

  // Don't render anything until we're on the client
  if (!isClient) {
    return null;
  }
  return (
    <ModalWrapper
      showModal={showSettings}
      setShowModal={setShowSettings}
      customClass="top-[6em] py-[2em]"
    >
      <>
        <h2 className="text-2xl font-nunito text-skull-super-dark-brown">
          Settings
        </h2>
        <ul className="w-full flex flex-col gap-5 text-skull-dark-brown px-5 md:px-0">
          <li className="flex w-full justify-between md:max-w-[80%] mx-auto">
            {CreateToggleOptions({
              value: showKeyboard,
              setValue: setShowKeyboard,
              title: "Virtual Keyboard",
              offStateText: "Hidden",
              onStateText: "Visible",
            })}
          </li>
          <li className="flex w-full justify-between md:max-w-[80%] mx-auto">
            {CreateToggleOptions({
              value: makeKeypadInteractive,
              setValue: setMakeKeypadInteractive,
              title: "Interactive Keyboard",
              onStateText: "Yes",
              offStateText: "No",
            })}
          </li>
          <li className="flex w-full justify-between md:max-w-[80%] mx-auto">
            {CreateToggleOptions({
              value: showInstructions,
              setValue: setShowInstructions,
              title: "Gameplay Instructions",
              offStateText: "Hidden",
              onStateText: "Visible",
            })}
          </li>
          <li className="flex w-full justify-between md:max-w-[80%] mx-auto gap-5">
            {DifficultyLinks()}
          </li>
        </ul>
      </>
    </ModalWrapper>
  );
}

export default GameSettings;
