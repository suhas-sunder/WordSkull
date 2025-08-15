import { useEffect, useMemo, useState } from "react";
import KeypadData from "../../data/KeypadData";
import { v4 as uuidv4 } from "uuid";
import useKeyPress from "../../hooks/useKeyPress";
import SimulateKeyPress from "../../utils/other/SimulateKeyPress";
import { useSettings } from "../../context/SettingsContext";

interface PropType {
  currentlyEnteredWords: string[];
  currentWord: string;
}

function DefaultKeypadSetup() {
  const validKeys: string[] = useMemo(() => [], []);
  const keypadData = useMemo(() => KeypadData(), []);

  Object.values(keypadData).forEach((row) =>
    row.forEach((data) => {
      validKeys.push(data.defaultKey);
    })
  );

  return {
    keypadData,
  };
}

// Map physical key names to your keypad's defaultKey ids
function mapPressedToKeypadKey(p: string | ""): string | null {
  if (!p) return null;
  const lower = p.toLowerCase();
  if (p === " ") return "space";
  if (lower === "backspace") return "delete";
  if (lower === "capslock") return "caps";
  if (lower === "enter") return "enter";
  if (p.length === 1) return p.toLowerCase();
  return null;
}

function Keypad({ currentlyEnteredWords, currentWord }: PropType) {
  const { keypadData } = DefaultKeypadSetup();
  const { keyPressed } = useKeyPress();
  const [correctCharCount, setCorrectCharCount] = useState<{
    [key: string]: number;
  }>({});

  const { makeKeypadInteractive } = useSettings();

  useEffect(() => {
    const newCharCount: { [key: string]: number } = {};
    currentlyEnteredWords?.forEach((word) => {
      word.split("").forEach((char, index) => {
        if (!(char in newCharCount)) {
          newCharCount[char] = 0;
        }
        if (currentWord[index] === char) {
          newCharCount[char] = (newCharCount[char] || 0) + 1;
        }
      });
    });
    setCorrectCharCount(newCharCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentlyEnteredWords, currentWord]);

  const pressedKeyId = mapPressedToKeypadKey(keyPressed);

  return (
    <div
      data-testid="keypad"
      className="lg-md:hidden w-full max-w-[600px] mx-auto px-3 sm:px-4 text-stone-600 flex min-h-[13em] select-none flex-col gap-y-5 mt-5 xs:mt-4 font-nunito rounded-xl uppercase text-base pb-[env(safe-area-inset-bottom)]"
    >
      {Object.values(keypadData).map((keysArr) => {
        return (
          <ul
            className="flex w-full gap-[0.56em] xs:gap-2 sm:gap-3 md:gap-4"
            key={uuidv4()}
          >
            {keysArr.map((key) => {
              const isPressed = pressedKeyId === key.defaultKey.toLowerCase();

              // correctness (same as your existing logic, incl. enter exception on stone)
              const inCurrent = currentWord?.includes(key.defaultKey);
              const inEntered = currentlyEnteredWords
                ?.join("")
                .includes(key.defaultKey);
              const count = correctCharCount[key.defaultKey] ?? 0;

              const isGreen = inCurrent && inEntered && count > 0;
              const isYellow = inCurrent && inEntered && count === 0;
              const isStone =
                !inCurrent && inEntered && key.defaultKey !== "enter";

              // We only apply our pumpkin press/highlight when no correctness is active
              const hasCorrectness = isGreen || isYellow || isStone;

              // For a pressed key (no correctness), match keyboard: pumpkin fill + lighter pumpkin border
              const pressedClasses =
                !hasCorrectness && isPressed
                  ? "bg-pumpkin-orange/60 text-white !brightness-[1.2] data-[fill=pumpkin]:!border-pumpkin-orange/30"
                  : "";

              // data-fill drives the border color mapping
              const dataFill =
                !hasCorrectness && isPressed ? "pumpkin" : undefined;

              return (
                <li className="flex w-full" key={key.id}>
                  <button
                    data-fill={dataFill}
                    onClick={() =>
                      makeKeypadInteractive && SimulateKeyPress(key.defaultKey)
                    }
                    className={`
                      h-[2.6em] xs:h-[2.8em] w-full xs:min-w-[2.25em]
                      text-[3.4vw] xs:text-[3.0vw] sm:text-base
                      justify-center items-center flex
                      border-pumpkin-orange text-pumpkin-orange border-2 rounded-md
                      [touch-action:manipulation] select-none shadow-sm
                      hover:bg-pumpkin-orange/60 hover:text-white hover:!border-pumpkin-orange/30
                      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pumpkin-orange/40
                      motion-reduce:transition-none
                      ${
                        ((keyPressed === " " && key.defaultKey === "space") ||
                          (keyPressed.toLowerCase() === "capslock" &&
                            key.defaultKey === "caps") ||
                          (keyPressed.toLowerCase() === "backspace" &&
                            key.defaultKey === "delete")) &&
                        "opacity-75"
                      }
                      ${
                        isGreen &&
                        "!bg-green-300 !text-green-800 !border-green-500"
                      }
                      ${
                        isYellow &&
                        "!bg-yellow-200 !text-yellow-800 !border-yellow-500"
                      }
                      ${
                        isStone &&
                        "!bg-stone-400 !text-stone-600 !border-stone-500 !brightness-125"
                      }
                      ${pressedClasses}
                    `}
                  >
                    {key.defaultKey === "space" ? "word menu" : key.defaultKey}
                  </button>
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
}

export default Keypad;
