import { useEffect, useMemo, useState } from "react";
import useHighlightKeys from "../hooks/useHighlightKeys";
import KeyboardData from "../data/KeyboardData";
import GenerateDefaultStylingForKeys from "../utils/generators/GenerateDefaultStylingForKeys";
import useKeyPress from "../hooks/useKeyPress";
import { useTheme } from "../context/ThemeContext";

//Theres a lot of object/array manipulation for the initial setup so to improve readability it is going into it's own function
function DefaultKeyboardSetup() {
  //Used to track validity of inputs
  const validKeys: string[] = useMemo(() => [], []);

  const keyboardData = useMemo(() => KeyboardData(), []); //Saved presets for keyboard layout

  //Generate list of valid keys from saved data
  Object.values(keyboardData).forEach((row) =>
    row.map((data) => {
      validKeys.push(data.defaultKey);
      validKeys.push(data.shiftKey);
    })
  );

  //Updating all valid keys with uppercase letters too
  const allValidKeys = useMemo(
    () => [
      ...new Set([...validKeys, ...validKeys.join("").toUpperCase().split("")]),
    ],
    [validKeys]
  );

  //Used to mange styling for each key
  const defaultKeyStyles = useMemo(
    () =>
      GenerateDefaultStylingForKeys({
        keyArr: allValidKeys,
        styling: "bg-white",
      }),
    [allValidKeys]
  );

  return {
    keyboardData,
    defaultKeyStyles,
  };
}

interface PropType {
  currentlyEnteredWords: string[];
  currentWord: string;
}

export default function Keyboard({
  currentlyEnteredWords,
  currentWord,
}: PropType) {
  const { darkThemeActive } = useTheme();
  const [correctCharCount, setCorrectCharCount] = useState<{
    [key: string]: number;
  }>({});

  const { defaultKeyStyles, keyboardData } = DefaultKeyboardSetup();

  const [keyStyles, setKeyStyles] = useState<{ [key: string]: string }>(
    defaultKeyStyles
  );

  useHighlightKeys({
    setKeyStyles,
  });

  const { keyPressed } = useKeyPress(); //Handle key press highlight & toggle between capital and small letters on keyboard

  const handleKeyStyling = (key: { defaultKey: string; shiftKey: string }) => {
    return keyStyles[`${key.shiftKey}`] !== "bg-white"
      ? keyStyles[`${key.shiftKey}`]
      : keyStyles[`${key?.defaultKey}`];
  };

  //Apply styling to button based on input keys
  const handleBtnStyle = (key: string) => {
    let style = "flex justify-center items-center  h-full ";

    if (key === " ") {
      style += "  px-[8em] lg:px-[10em]";
    } else if (key === "Enter") {
      style += "  px-6 lg:px-8";
    } else if (key === "Caps" || key === "Option" || key === "Menu") {
      style += "  px-4 lg:px-5";
    } else if (key === "Shift") {
      style += "  px-5 lg:px-6";
    } else {
      style += "px-[1.25em] lg:px-5";
    }

    key.length === 1 ? (style += " min-w-[3.3em]") : (style += " text-xs");

    return style;
  };

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
      className={`${
        darkThemeActive ? "bg-slate-700" : "bg-slate-600"
      }  hidden text-slate-600 min-h-[23em] scale-[0.75] select-none flex-col gap-y-5 font-nunito rounded-xl border-2  p-6 text-xs md:flex lg:text-base`}
    >
      {Object.values(keyboardData).map((keysArr, index) => {
        return (
          <div key={`keyboard-rows${index}-id`} className="flex gap-3">
            {keysArr.map((key) => (
              <div
                key={key.id}
                className={`${
                  keyStyles[`${key.defaultKey} `]
                }  relative flex w-full items-center justify-center`}
              >
                {key.shiftKey !== "" && (
                  <span
                    className={`absolute left-1/2 top-[12px] flex -translate-x-1/2 -translate-y-1/2 `}
                  >
                    {key.shiftKey}
                  </span>
                )}
                <span
                  className={` ${
                    key.defaultKey !== "Shift" &&
                    key.defaultKey !== " " &&
                    key.defaultKey !== "Backspace"
                      ? handleKeyStyling(key)
                      : keyPressed !== key.defaultKey
                      ? "bg-white"
                      : ""
                  }  ${
                    keyPressed === key.defaultKey &&
                    (keyPressed === " " ||
                      keyPressed === "Backspace" ||
                      keyPressed === "Shift") &&
                    "bg-slate-600 text-white"
                  } ${handleBtnStyle(key.defaultKey)}   mx-auto rounded-lg  ${
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
                   "!bg-slate-500 !text-white"
                 }`}
                >
                  <span
                    className={`${
                      key.shiftKey !== "" && "translate-y-[8.5px]"
                    } flex items-center uppercase justify-center py-3 `}
                  >
                    {key.defaultKey === " " ? "SpaceBar" : key.defaultKey}
                  </span>
                </span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
