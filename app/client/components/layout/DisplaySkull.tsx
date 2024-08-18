import { useTheme } from "../context/ThemeContext";
import HandleShiftIndex from "../utils/other/HandleShiftIndex";
import { v4 as uuidv4 } from "uuid";

interface PropType {
  currentSkull: string[][][];
  currentRow: number;
  currentRowIndex: number;
  wordsForSkull: string[];
  enteredWords: string[][];
  enterPressed: boolean;
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
  enterPressed,
}: PropType) {
  const { darkThemeActive } = useTheme();
  const handleListItem = (
    square: string,
    squareCount: number,
    rowIndex: number,
    squareIndex: number
  ) => {
    if (square === "@")
      return (
        <li
          key={uuidv4()}
          className={`  text-[1.2rem] relative border-slate-700 bg-slate-800 border-2 sm:text-[2rem] rounded-md sm:rounded-lg min-w-[1.8em] min-h-[1.8em] sm:min-w-[1.7em] sm:min-h-[1.7em] flex justify-center items-center`}
        ></li>
      );

    if (square === "~")
      return (
        <li
          key={uuidv4()}
          className={`${
            darkThemeActive && "bg-white opacity-95"
          } text-[1.2rem] relative border-2 sm:text-[2rem] rounded-md sm:rounded-lg min-w-[1.8em] min-h-[1.8em] sm:min-w-[1.7em] sm:min-h-[1.7em] flex justify-center items-center`}
        ></li>
      );

    const shiftIndex = HandleShiftIndex({
      currentRowIndex,
      currentRow,
      currentSkull,
    });

    //Controls styling of characters that have been guessed correctly. Green for exact match, and yellow for partial.
    const handleValidationStyling = ({
      enteredWords,
      currentRow,
      square,
      wordsForSkull,
      squareIndex,
    }: ValidationPropType) => {
      if (!enteredWords[currentRow] || enteredWords[currentRow]?.length <= 0)
        return;

      //Offset calculation for index of guessed word when answer has ~ and @ for mapping blank squares and eyes.
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

      let style = "border-slate-300 text-slate-500";
      const correctCharCount: { [key: string]: number } = { [`${square}`]: 0 }; //This is used to track the total green squares so that yellow squares do not count as green

      //Count total number of correct characters in guessed word
      wordGuessed[guessLength].split("").forEach((character, index) => {
        if (answer[index] === character) {
          correctCharCount[character] = correctCharCount[character] + 1;
        }
      });

      //Count total number of characters in answer
      function countChar(str: string, char: string) {
        if (!str) return 0;

        let count = 0;
        for (let i = 0; i < str?.length; i++) {
          if (str[i] === char) {
            count++;
          }
        }
        return count;
      }

      const charIndexesInEnteredWord = [];

      for (let i = 0; i < wordGuessed[guessLength].length; i++) {
        if (wordGuessed[guessLength][i] === square) {
          charIndexesInEnteredWord.push(i);
        }
      }

      //Count remaining characters in guess after valid characters are accounted for from answer
      function countRemainingChars() {
        return countChar(answer, square) - correctCharCount[`${square}`];
      }

      if (answer[adjustedIndex] === square) {
        style = "!border-green-400 !text-green-600 !bg-green-100 ";
      } else if (
        answer.includes(square) &&
        charIndexesInEnteredWord
          .slice(0, countChar(answer, square))
          .includes(adjustedIndex) &&
        countRemainingChars() > 0
      ) {
        style = "!border-yellow-400 !text-yellow-600 !bg-yellow-100 ";
      }

      return style;
    };

    return (
      <li
        key={uuidv4()}
        className={`${
          rowIndex === currentRow &&
          squareIndex === currentRowIndex + shiftIndex
            ? `${
                darkThemeActive
                  ? "bg-slate-300  text-slate-700"
                  : "bg-slate-300 bg-opacity-20 border-opacity-75"
              }  scale-110 z-[10] border-[2.5px] border-slate-500`
            : `${
                darkThemeActive
                  ? "bg-white text-slate-400 "
                  : "text-slate-300 border-slate-400"
              }   border-2`
        } ${
          square !== "" &&
          rowIndex === currentRow &&
          `${
            darkThemeActive
              ? "border-slate-200 text-slate-500 "
              : "border-slate-400 text-slate-500 "
          }  border-[2.5px] `
        }  text-[1.2rem] relative border-2 sm:text-[2rem] rounded-md sm:rounded-lg min-w-[1.8em] min-h-[1.8em] sm:min-w-[1.7em] sm:min-h-[1.7em] flex justify-center items-center  ${
          enterPressed &&
          rowIndex === currentRow &&
          handleValidationStyling({
            enteredWords,
            currentRow,
            square,
            wordsForSkull,
            squareIndex,
          })
        } `}
      >
        <span
          className={`${
            darkThemeActive
              ? "brightness-[0.9]"
              : "opacity-75 brightness-[0.75]"
          } absolute text-[0.5rem]  sm:text-sm flex top-[0.02em] left-[0.3em]`}
        >
          {squareCount}
        </span>
        <span className="translate-y-[0.16em] sm:translate-y-1">{square}</span>
      </li>
    );
  };

  return (
    <>
      {currentSkull.map((skull, index) => {
        return index === 0 ? (
          <div
            key={index}
            className="relative flex-col w-full max-w-[800px] -translate-y-6 sm:-translate-y-7 sm:scale-[0.9] capitalize flex font-nunito text-slate-400 items-center"
          >
            {skull.map((row, rowIndex) => {
              let squareCount = 0; // Reset squareCount at the start of each row

              return (
                <ul key={uuidv4()} className="flex">
                  {row.map((square, squareIndex) => {
                    if (square !== "@" && square !== "~") {
                      squareCount += 1; // Increment squareCount only for empty squares
                    }
                    return handleListItem(
                      square,
                      squareCount,
                      rowIndex,
                      squareIndex
                    );
                  })}
                </ul>
              );
            })}
          </div>
        ) : null;
      })}
    </>
  );
}

export default DisplaySkull;
