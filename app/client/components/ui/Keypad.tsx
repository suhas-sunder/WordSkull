import { useEffect, useMemo, useState } from "react";
import KeypadData from "../data/KeypadData";
import { useTheme } from "../context/ThemeContext";
import { v4 as uuidv4 } from "uuid";
import useKeyPress from "../hooks/useKeyPress";
import SimulateKeyPress from "../utils/other/SimulateKeyPress";
interface PropType {
  currentlyEnteredWords: string[];
  currentWord: string;
}

function DefaultKeypadSetup() {
  //Used to track validity of inputs
  const validKeys: string[] = useMemo(() => [], []);

  const keypadData = useMemo(() => KeypadData(), []); //Saved presets for keyboard layout

  //Generate list of valid keys from saved data
  Object.values(keypadData).forEach((row) =>
    row.map((data) => {
      validKeys.push(data.defaultKey);
    })
  );

  return {
    keypadData,
  };
}

function Keypad({ currentlyEnteredWords, currentWord }: PropType) {
  const { darkThemeActive } = useTheme();
  const { keypadData } = DefaultKeypadSetup();
  const { keyPressed } = useKeyPress(); //Handle key press highlight & toggle between capital and small letters on keyboard
  const [correctCharCount, setCorrectCharCount] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    // Create a new object for updated character counts
    const newCharCount: { [key: string]: number } = {};

    currentlyEnteredWords?.forEach((word) => {
      word.split("").forEach((char, index) => {
        // Initialize char count if not present
        if (!(char in newCharCount)) {
          newCharCount[char] = 0;
        }
        // Update count if conditions are met
        if (currentWord[index] === char) {
          newCharCount[char] = (newCharCount[char] || 0) + 1;
        }
      });
    });

    // Update state with the new char count object
    setCorrectCharCount(newCharCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentlyEnteredWords, currentWord]);

  return (
    <div
      data-testid="keypad"
      className={` text-slate-600 flex min-h-[13em] select-none flex-col gap-y-5 mt-5 xs:mt-3 font-nunito rounded-xl uppercase  text-base md:hidden`}
    >
      {Object.values(keypadData).map((keysArr) => {
        return (
          <ul
            className="flex w-full gap-[0.25em] justify-center items-center"
            key={uuidv4()}
          >
            {keysArr.map((key) => (
              <li className="flex w-full" key={key.id}>
                <button
                  onClick={() => SimulateKeyPress(key.defaultKey)}
                  className={` h-[2.3em] min-w-[1.7em] w-full justify-center items-center flex rounded-sm ${
                    darkThemeActive
                      ? "bg-white text-slate-600"
                      : "bg-slate-600 text-white"
                  } ${
                    (keyPressed.toLowerCase() === key.defaultKey ||
                      (keyPressed === " " && key.defaultKey === "space") ||
                      (keyPressed.toLowerCase() === "capslock" &&
                        key.defaultKey === "caps") ||
                      (keyPressed.toLowerCase() === "backspace" &&
                        key.defaultKey === "delete")) &&
                    "opacity-75"
                  } ${
                    currentWord?.includes(key.defaultKey) &&
                    currentlyEnteredWords?.join("").includes(key.defaultKey) &&
                    correctCharCount[key.defaultKey] > 0 &&
                    "!bg-green-300 !text-green-800"
                  }
              ${
                currentWord?.includes(key.defaultKey) &&
                currentlyEnteredWords?.join("").includes(key.defaultKey) &&
                correctCharCount[key.defaultKey] === 0 &&
                "!bg-yellow-200 !text-yellow-800"
              }
               ${
                 !currentWord?.includes(key.defaultKey) &&
                 currentlyEnteredWords?.join("").includes(key.defaultKey) &&
                 key.defaultKey !== "enter" &&
                 "!bg-slate-400 !text-white"
               }`}
                >
                  {key.defaultKey}
                </button>
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}

export default Keypad;
