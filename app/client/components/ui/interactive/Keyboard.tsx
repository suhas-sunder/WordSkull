import { useEffect, useMemo, useState } from "react";
import useHighlightKeys from "../../hooks/useHighlightKeys";
import KeyboardData from "../../data/KeyboardData";
import GenerateDefaultStylingForKeys from "../../utils/generators/GenerateDefaultStylingForKeys";
import useKeyPress from "../../hooks/useKeyPress";
import SimulateKeyPress from "../../utils/other/SimulateKeyPress";
import { useSettings } from "../../context/SettingsContext";

//Theres a lot of object/array manipulation for the initial setup so to improve readability it is going into it's own function
function DefaultKeyboardSetup() {
  const validKeys: string[] = useMemo(() => [], []);
  const keyboardData = useMemo(() => KeyboardData(), []);

  Object.values(keyboardData).forEach((row) =>
    row.forEach((data) => {
      validKeys.push(data.defaultKey);
      validKeys.push(data.shiftKey);
    })
  );

  const allValidKeys = useMemo(
    () => [
      ...new Set([...validKeys, ...validKeys.join("").toUpperCase().split("")]),
    ],
    [validKeys]
  );

  const defaultKeyStyles = useMemo(
    () =>
      GenerateDefaultStylingForKeys({
        keyArr: allValidKeys,
        styling:
          "border-pumpkin-orange border-2 bg-pumpkin-100/10 text-pumpkin-orange",
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

type KeyDef = { id: string; defaultKey: string; shiftKey: string };

export default function Keyboard({
  currentlyEnteredWords,
  currentWord,
}: PropType) {
  const [correctCharCount, setCorrectCharCount] = useState<
    Record<string, number>
  >({});

  const { makeKeypadInteractive } = useSettings();

  const { defaultKeyStyles, keyboardData } = DefaultKeyboardSetup();

  const [keyStyles, setKeyStyles] =
    useState<Record<string, string>>(defaultKeyStyles);

  useHighlightKeys({
    setKeyStyles,
    baseStyles: defaultKeyStyles,
  });

  const { keyPressed } = useKeyPress();

  // Prefer defaultKey style first, then shiftKey (your original rule)
  const baseStyleForKey = (key: KeyDef) => {
    const dk = keyStyles[`${key.defaultKey}`];
    const sk = keyStyles[`${key.shiftKey}`];
    return dk && dk !== "bg-white" ? dk : sk || "";
  };

  const isSpecialKey = (k: string) =>
    k === "Backspace" || k === " " || k === "Shift";

  // Physical press detector (case-insensitive for single-char keys)
  const isPressed = (key: KeyDef) => {
    const p = keyPressed;
    if (!p) return false;
    if (p === key.defaultKey || p === key.shiftKey) return true;
    if (p.length === 1) {
      const pl = p.toLowerCase();
      return (
        (key.defaultKey?.length === 1 && key.defaultKey.toLowerCase() === pl) ||
        (key.shiftKey?.length === 1 && key.shiftKey.toLowerCase() === pl)
      );
    }
    return false;
  };

  const isHighlighted = (key: KeyDef) => {
    const a = keyStyles[key.defaultKey] || "";
    const b = keyStyles[key.shiftKey] || "";
    return (
      a.includes("bg-pumpkin-orange/60") || b.includes("bg-pumpkin-orange/60")
    );
  };

  // Correctness fill (your rules)
  const correctnessFor = (
    key: KeyDef
  ): {
    bg: string;
    text: string;
    border: string;
    fillName: "green" | "yellow" | "stone";
  } | null => {
    const inCurrent = currentWord?.includes(key.defaultKey);
    const inEntered = currentlyEnteredWords?.join("").includes(key.defaultKey);
    const count = correctCharCount[key.defaultKey] ?? 0;

    if (inCurrent && inEntered && count > 0) {
      return {
        bg: "!bg-green-300",
        text: "!text-green-800",
        border: "!border-green-500",
        fillName: "green",
      };
    }
    if (inCurrent && inEntered && count === 0) {
      return {
        bg: "!bg-yellow-100",
        text: "!text-yellow-800",
        border: "!border-yellow-500",
        fillName: "yellow",
      };
    }
    if (!inCurrent && inEntered) {
      return {
        bg: "!bg-stone-400",
        text: "!text-stone-600",
        border: "!border-stone-500",
        fillName: "stone",
      };
    }
    return null;
  };

  // Build size/padding (unchanged)
  const handleBtnStyle = (keyLabel: string) => {
    let style = "flex justify-center items-center  h-full ";

    if (keyLabel === " ") style += " px-[10em]";
    else if (keyLabel === "Enter") style += " px-8";
    else if (
      keyLabel === "Caps" ||
      keyLabel === "Option" ||
      keyLabel === "Menu"
    )
      style += " px-5";
    else if (keyLabel === "Shift") style += " px-6";
    else style += " px-5";

    style += keyLabel.length === 1 ? " min-w-[3.3em]" : " text-xs";
    return style;
  };

  // Compute visual state & classes for each key in one place
  const buildKeyClassesAndFill = (key: KeyDef) => {
    const hover =
      "group-hover:bg-pumpkin-orange/60 group-hover:text-white group-hover:!border-pumpkin-orange/30";

    const sizing = handleBtnStyle(key.defaultKey);
    const baseLook = !isSpecialKey(key.defaultKey)
      ? baseStyleForKey(key)
      : "border-pumpkin-orange border-2 text-pumpkin-orange"; // base for special keys when not pressed

    const correctness = correctnessFor(key);

    let active = "";
    let fillName: "green" | "yellow" | "stone" | "pumpkin" | null = null;

    if (correctness) {
      // correctness is strongest
      active = `${correctness.bg} ${correctness.text} ${correctness.border}`;
      fillName = correctness.fillName;
    } else {
      const pressed = isPressed(key);
      const highlighted = isHighlighted(key);

      // after computing `pressed` and `highlighted`
      if (isSpecialKey(key.defaultKey)) {
        if (pressed) {
          // your special-key pressed look (pumpkin)
          active = "bg-pumpkin-orange/60 text-white border-2";
          fillName = "pumpkin";
        }
      } else if (highlighted || pressed) {
        // normal keys: make press/highlight pumpkin AND mark fillName so the data-variant applies the border
        active = "bg-pumpkin-orange/60 text-white !brightness-[1.2]";
        fillName = "pumpkin";
      }
    }

    // Final class list (no hard-coded border override here)
    const classes = [hover, baseLook, sizing, "mx-auto rounded-lg", active]
      .filter(Boolean)
      .join(" ");

    return { classes, fillName };
  };

  useEffect(() => {
    const newCharCount: Record<string, number> = {};
    currentlyEnteredWords?.forEach((word) => {
      word.split("").forEach((char, index) => {
        if (!(char in newCharCount)) newCharCount[char] = 0;
        if (currentWord[index] === char) {
          newCharCount[char] = (newCharCount[char] || 0) + 1;
        }
      });
    });
    setCorrectCharCount(newCharCount);
  }, [currentlyEnteredWords, currentWord]);

  return (
    <div
      data-testid="keyboard"
      className={
        "hidden text-pumpkin-orange -translate-y-[1.5em] -mb-[2.5em] scale-[0.8] select-none flex-col gap-y-5 font-nunito rounded-xl border-2 border-pumpkin-orange p-6 lg-md:flex text-base text-lg min-h-[23em]"
      }
    >
      {Object.values(keyboardData).map((keysArr, index) => {
        return (
          <div key={`keyboard-rows${index}-id`} className="flex gap-3 ">
            {keysArr.map((key) => {
              const { classes, fillName } = buildKeyClassesAndFill(key);
              return (
                <div
                  key={key.id}
                  className="relative flex w-full items-center justify-center group"
                >
                  {key.shiftKey !== "" && (
                    <span className="absolute left-1/2 top-[12px] flex -translate-x-1/2 -translate-y-[38%] group-hover:text-white ">
                      {key.shiftKey}
                    </span>
                  )}
                  <button
                    data-fill={fillName ?? undefined}
                    onClick={() =>
                      makeKeypadInteractive && SimulateKeyPress(key.defaultKey)
                    }
                    className={`${classes} 
                      /* border should always match current fill while active */
                      data-[fill=green]:!border-green-500 
                      data-[fill=yellow]:!border-yellow-500 
                      data-[fill=stone]:!border-stone-500
                      data-[fill=pumpkin]:!border-pumpkin-orange/30
                    `}
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
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
