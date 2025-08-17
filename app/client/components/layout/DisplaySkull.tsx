import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import ShiftIndexForward from "../utils/other/ShiftIndexForward";
import useDelay from "../hooks/useDelay";

interface PropType {
  currentSkull: string[][][];
  currentRow: number;
  currentRowIndex: number;
  wordsForSkull: string[];
  enteredWords: string[][];
  isEnterPressed: boolean;
}

interface ValidationPropType {
  enteredWords: string[][];
  currentRow: number;
  square: string;
  wordsForSkull: string[];
  squareIndex: number;
}

function DisplaySkull({
  currentSkull,
  currentRow,
  currentRowIndex,
  wordsForSkull,
  enteredWords,
  isEnterPressed,
}: PropType) {
  const { darkThemeActive } = useTheme();
  const { isDelaying } = useDelay({ isEnterPressed, msecondsToDelay: 900 });

  // ========= SSR GUARD =========
  // Never render the grid on the server. Return a neutral placeholder.
  if (typeof window === "undefined") {
    return (
      <div
        id="skull"
        data-testid="display-skull"
        className="relative flex-col w-full max-w-[800px] xs:scale-[0.9] min-h-[12em] mt-3 xs:mt-2 xs:min-h-[20em] capitalize flex font-nunito text-stone-400 items-center"
        aria-hidden="true"
      >
        <div className="w-full h-[12em] xs:h-[20em]" />
      </div>
    );
  }
  // =============================

  // Make absolutely sure we only render the grid after the client mounts
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  if (!hydrated) {
    return (
      <div
        id="skull"
        data-testid="display-skull"
        className="relative flex-col w-full max-w-[800px] xs:scale-[0.9] min-h-[12em] mt-3 xs:mt-2 xs:min-h-[20em] capitalize flex font-nunito text-stone-400 items-center"
        aria-hidden="true"
      >
        <div className="w-full h-[12em] xs:h-[20em]" />
      </div>
    );
  }

  const handleValidationStyling = ({
    enteredWords,
    currentRow,
    square,
    wordsForSkull,
    squareIndex,
  }: ValidationPropType) => {
    if (!enteredWords[currentRow] || enteredWords[currentRow]?.length <= 0)
      return;

    const adjustedIndex =
      squareIndex -
      currentSkull[0][currentRow]
        .slice(0, squareIndex + 1)
        .filter((char) => char === "~" || char === "@").length;

    const answer = wordsForSkull[currentRow]
      .split("")
      .filter((char) => char !== "~" && char !== "@")
      .join("");

    const wordGuessed = enteredWords[currentRow];
    const guessLength = wordGuessed.length - 1;

    let style = "!bg-stone-400 text-stone-600 !border-stone-500 brightness-125";

    const correctCharCount: Record<string, number> = {};
    wordGuessed[guessLength].split("").forEach((ch, idx) => {
      if (answer[idx] === ch) {
        correctCharCount[ch] = (correctCharCount[ch] || 0) + 1;
      }
    });

    const countChar = (str: string, ch: string) =>
      str ? [...str].reduce((n, c) => n + (c === ch ? 1 : 0), 0) : 0;

    const charIdxs: number[] = [];
    for (let i = 0; i < wordGuessed[guessLength].length; i++) {
      if (wordGuessed[guessLength][i] === square) charIdxs.push(i);
    }

    const remaining = () =>
      countChar(answer, square) - (correctCharCount[square] || 0);

    if (answer[adjustedIndex] === square) {
      style = "!border-green-400 !text-green-600 !bg-green-100";
    } else if (
      answer.includes(square) &&
      charIdxs.slice(0, countChar(answer, square)).includes(adjustedIndex) &&
      remaining() > 0
    ) {
      style = "!border-yellow-400 !text-yellow-600 !bg-yellow-100";
    }

    return style;
  };

  const commonCell =
    "text-[1.2rem] relative xs:text-[2rem] rounded-md xs:rounded-lg w-[1.8em] h-[1.8em] xs:w-[1.7em] xs:h-[1.7em] flex justify-center items-center border-2";

  return (
    <>
      {currentSkull.map((skull, sIdx) =>
        sIdx === 0 ? (
          <div
            id="skull"
            data-testid="display-skull"
            key={`skull-${sIdx}`}
            className="relative flex-col w-full max-w-[800px] xs:scale-[0.9] min-h-[12em] mt-3 xs:mt-2 xs:min-h-[20em] capitalize flex font-nunito text-stone-400 items-center"
          >
            {skull.map((row, rowIndex) => {
              const shiftedIndex =
                ShiftIndexForward({
                  currentRowIndex,
                  currentRow,
                  currentSkull,
                }) || 0;

              return (
                <ul key={`r-${rowIndex}`} className="flex">
                  {row.map((square, squareIndex) => {
                    const isPlayable = square !== "~" && square !== "@";

                    // Cursor highlighting
                    const isCursor =
                      isPlayable &&
                      rowIndex === currentRow &&
                      squareIndex === currentRowIndex + shiftedIndex;

                    // Base cell appearance
                    let typeClasses = "";
                    if (!isPlayable) {
                      typeClasses =
                        square === "@"
                          ? "border-stone-700 bg-stone-800"
                          : "bg-stone-100 bg-opacity-95";
                    } else {
                      typeClasses = darkThemeActive
                        ? "text-stone-400 bg-white"
                        : "text-stone-300 bg-white border-stone-400";
                      if (isCursor) {
                        typeClasses =
                          "bg-orange-50 text-orange-400 border-orange-300 scale-110 z-[10]";
                      }
                    }

                    const currentRowTyped =
                      isPlayable && rowIndex === currentRow && square !== ""
                        ? darkThemeActive
                          ? "border-stone-200 text-stone-500"
                          : "border-stone-400 text-stone-500"
                        : "";

                    const validationClass =
                      isPlayable &&
                      rowIndex === currentRow &&
                      isEnterPressed &&
                      !isDelaying &&
                      handleValidationStyling({
                        enteredWords,
                        currentRow,
                        square,
                        wordsForSkull,
                        squareIndex,
                      });

                    const playableIndex = isPlayable
                      ? row
                          .slice(0, squareIndex + 1)
                          .filter((c) => c !== "~" && c !== "@").length
                      : null;

                    return (
                      <li
                        key={`r-${rowIndex}-c-${squareIndex}`}
                        className={[
                          commonCell,
                          typeClasses,
                          currentRowTyped,
                          validationClass || "",
                        ].join(" ")}
                      >
                        {/* top-left index (always render a span for stable structure) */}
                        <span
                          className={`${
                            darkThemeActive
                              ? "brightness-[0.9]"
                              : "opacity-75 brightness-[0.75]"
                          } absolute text-[0.5rem] xs:text-sm flex top-[0.02em] left-[0.3em]`}
                        >
                          {isPlayable ? playableIndex : ""}
                        </span>

                        {/* main character (always render a span) */}
                        <span
                          className={`transition-transform ${
                            isEnterPressed &&
                            isDelaying &&
                            currentRow === rowIndex
                              ? "animate-flip"
                              : ""
                          } translate-y-[0.16em] xs:translate-y-1`}
                        >
                          {isPlayable ? square : null}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              );
            })}
          </div>
        ) : null
      )}
    </>
  );
}

export default DisplaySkull;
