import { Link, useLocation } from "react-router-dom";
import { useId } from "react";
import { useSettings } from "../../context/SettingsContext";
import ModalWrapper from "./ModalWrapper";
import useOnlyOnClient from "../../hooks/useOnlyOnClient";

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

function ToggleOption({
  value,
  setValue,
  title,
  offStateText,
  onStateText,
}: ToggleOptionsPropType) {
  const id = useId();
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <label
        htmlFor={id}
        className="font-lora text-skull-dark-brown select-none"
      >
        {title}:
      </label>

      <div className="inline-flex items-center gap-4">
        <span
          className={`text-sm font-nunito ${
            value ? "text-skull-dark-brown" : "text-stone-500"
          }`}
        >
          {value ? onStateText : offStateText}
        </span>

        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={value}
          onClick={() => setValue((prev) => !prev)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
            shadow-sm ring-1 ring-inset
            ${
              value
                ? "bg-pumpkin-orange/70 ring-pumpkin-orange/50"
                : "bg-stone-200 ring-stone-300"
            }
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pumpkin-orange/40
          `}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform
              ${value ? "translate-x-5" : "translate-x-1"}
            `}
          />
        </button>
      </div>
    </div>
  );
}

function DifficultyLinks() {
  const { pathname } = useLocation();
  const base =
    "px-4 py-1 rounded-md border-2 transition-colors text-sm font-nunito";
  const hover = "hover:text-skull-brown hover:border-skull-brown";
  const item = (to: string, label: string) => {
    const active = pathname.includes(
      to.split("-mode")[0].split("/").pop() || ""
    );
    return (
      <Link
        to={to}
        className={`${base} ${hover} ${
          active
            ? "text-skull-brown border-skull-brown"
            : "text-stone-400 border-stone-300"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="font-lora text-skull-dark-brown">Difficulty:</span>
      <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3">
        {item("/games/classic/boneheads-easy-3-to-5-letter-words", "Easy")}
        {item(
          "/games/classic/specter-knights-medium-3-to-6-letter-words",
          "Medium"
        )}
        {item("/games/classic/grim-reapers-hard-3-to-7-letter-words", "Hard")}
        {item(
          "/games/classic/royal-lichen-extreme-3-to-9-letter-words",
          "Extreme"
        )}
      </div>
    </div>
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

  const isClient = useOnlyOnClient(); // Prevent hydration issues
  if (!isClient) return null;

  return (
    <ModalWrapper
      showModal={showSettings}
      setShowModal={setShowSettings}
      customClass="top-[6em] py-[2em] px-6 sm:px-8 w-[min(92vw,720px)]"
    >
      <>
        <h2 className="text-2xl font-nunito text-skull-super-dark-brown mb-4">
          Settings
        </h2>

        <div className="w-full space-y-6">
          {/* Toggles card */}
          <div className="rounded-xl border border-pumpkin-orange/30 bg-amber-100/10 p-4 sm:p-5 shadow-sm">
            <ul className="w-full flex flex-col gap-5 text-skull-dark-brown">
              <li>
                <ToggleOption
                  value={showKeyboard}
                  setValue={setShowKeyboard}
                  title="Virtual Keyboard"
                  offStateText="Hidden"
                  onStateText="Visible"
                />
              </li>
              <li>
                <ToggleOption
                  value={makeKeypadInteractive}
                  setValue={setMakeKeypadInteractive}
                  title="Interactive Keyboard"
                  onStateText="Yes"
                  offStateText="No"
                />
              </li>
              <li>
                <ToggleOption
                  value={showInstructions}
                  setValue={setShowInstructions}
                  title="Gameplay Instructions"
                  offStateText="Hidden"
                  onStateText="Visible"
                />
              </li>
            </ul>
          </div>

          {/* Difficulty card */}
          <div className="rounded-xl border border-pumpkin-orange/30 bg-amber-100/10 p-4 sm:p-5 shadow-sm">
            <DifficultyLinks />
          </div>
        </div>
      </>
    </ModalWrapper>
  );
}

export default GameSettings;
