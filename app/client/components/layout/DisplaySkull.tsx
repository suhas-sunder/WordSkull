import { useTheme } from "../context/ThemeContext";
import ShiftIndexForward from "../utils/other/ShiftIndexForward";
// Removed uuidv4 import to prevent remount churn and unused import
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
  const { isDelaying } = useDelay({
    isEnterPressed,
    msecondsToDelay: 900,
  });

  // Controls styling of characters that have been guessed correctly.
  // Green = exact match, Yellow = partial match.
  const handleValidationStyling = ({
    enteredWords,
    currentRow,
    square,
    wordsForSkull,
    squareIndex,
  }: ValidationPropType) => {
    // If no word entered, do nothing
    if (!enteredWords[currentRow] || enteredWords[currentRow]?.length <= 0)
      return;

    // Offset calculation for index of guessed word when answer has ~ and @
    // for mapping blank squares and eyes.
    const adjustedIndex =
      squareIndex -
      currentSkull[0][currentRow]
        .slice(0, squareIndex + 1)
        .filter((char) => char === "~" || char === "@").length;

    // Get answer for current row by filtering out ~ and @
    const answer = wordsForSkull[currentRow]
      .split("")
      .filter((char) => char !== "~" && char !== "@")
      .join("");

    // Get info about guessed word
    const wordGuessed = enteredWords[currentRow];
    const guessLength = wordGuessed.length - 1;

    // Default styling (gray)
    let style = "!bg-stone-400 text-stone-600 !border-stone-500 brightness-125";

    // Track exact matches so yellow doesn't over-count duplicates
    const correctCharCount: { [key: string]: number } = {}; // start empty

    // Count exact matches in the latest guess
    wordGuessed[guessLength].split("").forEach((character, index) => {
      if (answer[index] === character) {
        // default to 0 before incrementing
        correctCharCount[character] = (correctCharCount[character] || 0) + 1;
      }
    });

    // Count total occurrences of a character in a string
    function countChar(str: string, char: string) {
      if (!str) return 0;
      let count = 0;
      for (let i = 0; i < str.length; i++) {
        if (str[i] === char) count++;
      }
      return count;
    }

    const charIndexesInEnteredWord: number[] = [];

    // Get indexes of this character in the latest guessed word
    for (let i = 0; i < wordGuessed[guessLength].length; i++) {
      if (wordGuessed[guessLength][i] === square) {
        charIndexesInEnteredWord.push(i);
      }
    }

    // Count remaining characters after exact matches are accounted for
    function countRemainingChars() {
      return countChar(answer, square) - (correctCharCount[square] || 0);
    }

    // Apply styling based on character correctness
    if (answer[adjustedIndex] === square) {
      style = "!border-green-400 !text-green-600 !bg-green-100"; // Exact match
    } else if (
      answer.includes(square) &&
      charIndexesInEnteredWord
        .slice(0, countChar(answer, square))
        .includes(adjustedIndex) &&
      countRemainingChars() > 0
    ) {
      style = "!border-yellow-400 !text-yellow-600 !bg-yellow-100"; // Partial match
    }

    return style;
  };

  return (
    <>
      {currentSkull.map((skull, index) =>
        index === 0 ? (
          <div
            id="skull"
            data-testid="display-skull"
            key={`skull-${index}`}
            className="relative flex-col w-full max-w-[800px] xs:scale-[0.9] min-h-[12em] mt-3 xs:mt-2 xs:min-h-[20em] capitalize flex font-nunito text-stone-400 items-center"
          >
            {skull.map((row, rowIndex) => {
              let squareCount = 0; // Displayed top-left per square

              // Compute once per row
              const shiftedIndex =
                ShiftIndexForward({
                  currentRowIndex,
                  currentRow,
                  currentSkull,
                }) || 0;

              return (
                <ul key={`r-${rowIndex}`} className="flex ">
                  {row.map((square, squareIndex) => {
                    if (square === "@") {
                      return (
                        <li
                          key={`r-${rowIndex}-c-${squareIndex}`}
                          className="text-[1.2rem] relative border-stone-700 bg-stone-800 border-2 xs:text-[2rem] rounded-md xs:rounded-lg w-[1.8em] h-[1.8em] xs:w-[1.7em] xs:h-[1.7em] flex justify-center items-center"
                        />
                      );
                    }

                    if (square === "~") {
                      // Return empty square
                      return (
                        <li
                          key={`r-${rowIndex}-c-${squareIndex}`}
                          className="bg-stone-100 bg-opacity-95 text-[1.2rem] relative border-2 xs:text-[2rem] rounded-md xs:rounded-lg w-[1.8em] h-[1.8em] xs:w-[1.7em] xs:h-[1.7em] flex justify-center items-center"
                        />
                      );
                    }

                    // Valid character square
                    squareCount += 1;

                    const isCursor =
                      rowIndex === currentRow &&
                      squareIndex === currentRowIndex + shiftedIndex;

                    // Base cell classes
                    let baseCell = darkThemeActive
                      ? "text-stone-400 bg-white border-2"
                      : "text-stone-300 bg-white border-stone-400 border-2";

                    // Current square highlight (cursor)
                    if (isCursor) {
                      baseCell =
                        "bg-orange-50 text-orange-400 border-orange-300 scale-110 z-[10] border-2";
                    }

                    // Squares containing text in current row get slightly stronger border
                    const currentRowTyped =
                      square !== "" && rowIndex === currentRow
                        ? darkThemeActive
                          ? "border-stone-200 text-stone-500 border-2"
                          : "border-stone-400 text-stone-500 border-2"
                        : "";

                    // Validation styling ONLY for current row after Enter (as in your original)
                    const validationClass =
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

                    return (
                      <li
                        key={`r-${rowIndex}-c-${squareIndex}`}
                        className={`text-[1.2rem] relative border-2 xs:text-[2rem] rounded-md xs:rounded-lg w-[1.8em] h-[1.8em] xs:w-[1.7em] xs:h-[1.7em] flex justify-center items-center ${baseCell} ${currentRowTyped} ${
                          validationClass || ""
                        }`}
                      >
                        <span
                          className={`${
                            darkThemeActive
                              ? "brightness-[0.9]"
                              : "opacity-75 brightness-[0.75]"
                          } absolute text-[0.5rem] xs:text-sm flex top-[0.02em] left-[0.3em]`}
                        >
                          {squareCount}
                        </span>
                        <span
                          className={`transition-transform ${
                            // Flip animation on submit for current row
                            isEnterPressed &&
                            isDelaying &&
                            currentRow === rowIndex
                              ? "animate-flip"
                              : ""
                          } translate-y-[0.16em] xs:translate-y-1`}
                        >
                          {square}
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
