import { useEffect, useMemo, useState } from "react";
import useHighlightKeys from "../../hooks/useHighlightKeys";
import KeyboardData from "../../data/KeyboardData";
import GenerateDefaultStylingForKeys from "../../utils/generators/GenerateDefaultStylingForKeys";
import useKeyPress from "../../hooks/useKeyPress";
import SimulateKeyPress from "../../utils/other/SimulateKeyPress";
import { useSettings } from "../../context/SettingsContext";

//Theres a lot of object/array manipulation for the initial setup so to improve readability it is going into it's own function
function DefaultKeyboardSetup() {
  //Used to track validity of inputs
  const validKeys: string[] = useMemo(() => [], []);

  const keyboardData = useMemo(() => KeyboardData(), []); //Saved presets for keyboard layout

  //Generate list of valid keys from saved data
  Object.values(keyboardData).forEach((row) =>
    row.forEach((data) => {
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
        styling:
          "border-pumpkin-orange border-2 bg-amber-100/10 text-pumpkin-orange",
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
  const [correctCharCount, setCorrectCharCount] = useState<{
    [key: string]: number;
  }>({});

  const { makeKeypadInteractive } = useSettings();

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
      style += " px-[10em]";
    } else if (key === "Enter") {
      style += " px-8";
    } else if (key === "Caps" || key === "Option" || key === "Menu") {
      style += " px-5";
    } else if (key === "Shift") {
      style += " px-6";
    } else {
      style += " px-5";
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
  }, [currentlyEnteredWords, currentWord]);

  return (
    <div
      data-testid="keyboard"
      className={"hidden  text-pumpkin-orange -translate-y-[1.5em] -mb-[2.5em] scale-[0.8] select-none flex-col gap-y-5 font-nunito rounded-xl border-2 border-pumpkin-orange p-6 lg-md:flex text-base min-h-[23em]"}
    >
      {Object.values(keyboardData).map((keysArr, index) => {
        return (
          <div key={`keyboard-rows${index}-id`} className="flex gap-3 ">
            {keysArr.map((key) => (
              <div
                key={key.id}
                className={`${
                  keyStyles[`${key.defaultKey} `]
                }  relative flex w-full items-center justify-center group `}
              >
                {key.shiftKey !== "" && (
                  <span
                    className={"absolute left-1/2 top-[12px] flex -translate-x-1/2 -translate-y-[38%] group-hover:text-white "}
                  >
                    {key.shiftKey}
                  </span>
                )}
                <button
                  onClick={() =>
                    makeKeypadInteractive && SimulateKeyPress(key.defaultKey)
                  }
                  className={`group-hover:bg-amber-600 group-hover:border-transparent group-hover:text-white  ${
                    key.defaultKey !== "Shift" &&
                    key.defaultKey !== " " &&
                    key.defaultKey !== "Backspace"
                      ? handleKeyStyling(key)
                      : keyPressed !== key.defaultKey
                      ? "border-pumpkin-orange border-2  text-pumpkin-orange"
                      : "bg-amber-600 text-white border-2 border-transparent"
                  }  ${
                    keyPressed === key.defaultKey &&
                    (keyPressed === " " ||
                      keyPressed === "Backspace" ||
                      keyPressed === "Shift") &&
                    "group-hover:bg-amber-600 group-hover:border-transparent group-text-white"
                  } ${handleBtnStyle(key.defaultKey)}   mx-auto rounded-lg  ${
                    currentWord?.includes(key.defaultKey) &&
                    currentlyEnteredWords?.join("").includes(key.defaultKey) &&
                    correctCharCount[key.defaultKey] > 0 &&
                    "!bg-green-300 !text-green-800 !border-green-500"
                  }
                ${
                  currentWord?.includes(key.defaultKey) &&
                  currentlyEnteredWords?.join("").includes(key.defaultKey) &&
                  correctCharCount[key.defaultKey] === 0 &&
                  "!bg-yellow-100 !text-yellow-800 !border-yellow-500"
                }
                 ${
                   !currentWord?.includes(key.defaultKey) &&
                   currentlyEnteredWords?.join("").includes(key.defaultKey) &&
                   "!bg-stone-400 !text-stone-600 !border-stone-500 !brightness-125"
                 } bg-orange-100/10`}
                >
                  <span
                    className={`${
                      key.shiftKey !== "" && "translate-y-[10.3px] "
                    } flex items-center uppercase justify-center py-3`}
                  >
                    {key.defaultKey === " " ? "SpaceBar" : key.defaultKey}
                  </span>
                </button>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
