import { useTheme } from "../context/ThemeContext";
import ShiftIndexForward from "../utils/other/ShiftIndexForward";
import { v4 as uuidv4 } from "uuid";
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

  //Controls styling of characters that have been guessed correctly. Green for exact match, and yellow for partial.
  const handleValidationStyling = ({
    enteredWords,
    currentRow,
    square,
    wordsForSkull,
    squareIndex,
  }: ValidationPropType) => {
    //If no word entered, do nothing
    if (!enteredWords[currentRow] || enteredWords[currentRow]?.length <= 0)
      return;

    //Offset calculation for index of guessed word when answer has ~ and @ for mapping blank squares and eyes.
    const adjustedIndex =
      squareIndex -
      currentSkull[0][currentRow]
        .slice(0, squareIndex + 1)
        .filter((char) => char === "~" || char === "@").length;

    //Get answer for current row by filtering out ~ and @
    const answer = wordsForSkull[currentRow]
      .split("")
      .filter((char) => char !== "~" && char !== "@")
      .join("");

    //Get some info about guessed word
    const wordGuessed = enteredWords[currentRow];
    const guessLength = wordGuessed.length - 1;

    //Set default styling
    let style = "border-slate-300 text-slate-500";
    const correctCharCount: { [key: string]: number } = { [`${square}`]: 0 }; //This is used to track the total green squares so that yellow squares do not count as green, which is an issue when there are multiple of the same 'valid' character

    //Map the total number of correct characters in guessed word onto 'hashmap'
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

    //Get indexes of valid characters in guessed word
    for (let i = 0; i < wordGuessed[guessLength].length; i++) {
      if (wordGuessed[guessLength][i] === square) {
        charIndexesInEnteredWord.push(i);
      }
    }

    //Count remaining characters in guess after valid characters are accounted for from answer
    function countRemainingChars() {
      return countChar(answer, square) - correctCharCount[`${square}`];
    }

    //Apply styling based on character correctness
    if (answer[adjustedIndex] === square) {
      style =
        "animate-fadeInFast !border-green-400 !text-green-600 !bg-green-100"; //Exact match
    } else if (
      answer.includes(square) &&
      charIndexesInEnteredWord
        .slice(0, countChar(answer, square))
        .includes(adjustedIndex) &&
      countRemainingChars() > 0
    ) {
      style =
        "animate-fadeInFast !border-yellow-400 !text-yellow-600 !bg-yellow-100 "; //Partial match
    }

    return style;
  };

  return (
    <>
      {currentSkull.map((skull, index) => {
        return index === 0 ? (
          <div
            data-testid="display-skull"
            key={index}
            className="relative flex-col w-full max-w-[800px] xs:scale-[0.9]  min-h-[12em] xs:min-h-[20em] capitalize flex font-nunito text-slate-400 items-center"
          >
            {skull.map((row, rowIndex) => {
              let squareCount = 0; // Reset squareCount at the start of each row. This is the value displayed in the top left corner of each square.

              return (
                <ul key={uuidv4()} className="flex ">
                  {row.map((square, squareIndex) => {
                    if (square === "@") {
                      return (
                        <li
                          key={uuidv4()}
                          className={`  text-[1.2rem] relative border-slate-700 bg-slate-800 border-2 xs:text-[2rem] rounded-md xs:rounded-lg min-w-[1.8em] min-h-[1.8em] xs:min-w-[1.7em] xs:min-h-[1.7em] flex justify-center items-center`}
                        ></li>
                      );
                    } else if (square === "~") {
                      //Return empty square with proper styling for "empty squares"
                      return (
                        <li
                          key={uuidv4()}
                          className={`${
                            darkThemeActive && "bg-white opacity-95"
                          } text-[1.2rem] relative border-2 xs:text-[2rem] rounded-md xs:rounded-lg min-w-[1.8em] min-h-[1.8em] xs:min-w-[1.7em] xs:min-h-[1.7em] flex justify-center items-center`}
                        ></li>
                      );
                    } else {
                      //Return all valid characters with proper styling
                      squareCount += 1; // Increment squareCount only for non-empty squares.

                      const shiftedIndex = ShiftIndexForward({
                        currentRowIndex,
                        currentRow,
                        currentSkull,
                      });

                      return (
                        <li
                          key={uuidv4()}
                          className={`text-[1.2rem] relative border-2 xs:text-[2rem] rounded-md xs:rounded-lg min-w-[1.8em] min-h-[1.8em] xs:min-w-[1.7em] xs:min-h-[1.7em] flex justify-center items-center
                              
                            ${
                              //Apply styling for words that match the answer
                              rowIndex !== currentRow &&
                              square !== "" &&
                              `${
                                darkThemeActive
                                  ? "bg-white text-slate-400 "
                                  : "!border-green-400 !text-green-600 !bg-green-100"
                              }   border-2`
                            }
                            
                            ${
                              //Apply default styling to all empty squares & vary styling for current square so user can tell which square will be filled in next
                              rowIndex === currentRow &&
                              squareIndex === currentRowIndex + shiftedIndex
                                ? `${
                                    darkThemeActive
                                      ? "bg-slate-300  text-slate-700"
                                      : "bg-slate-400 bg-opacity-20 border-opacity-75"
                                  }  scale-110 z-[10] border-[2.5px] border-slate-500`
                                : `${
                                    darkThemeActive
                                      ? "bg-white text-slate-400 "
                                      : "text-slate-300 border-slate-400"
                                  }   border-2`
                            } 
                          
                          ${
                            //Apply default styling to all squares that contain text for the current row
                            square !== "" &&
                            rowIndex === currentRow &&
                            `${
                              darkThemeActive
                                ? "border-slate-200 text-slate-500 "
                                : "border-slate-400 text-slate-500 "
                            }  border-[2.5px] `
                          }  ${
                            //Apply styling based on character correctness
                            rowIndex === currentRow &&
                            isEnterPressed &&
                            !isDelaying &&
                            currentRow === rowIndex &&
                            handleValidationStyling({
                              enteredWords,
                              currentRow,
                              square,
                              wordsForSkull,
                              squareIndex,
                            })
                          }`}
                        >
                          <span
                            className={`${
                              darkThemeActive
                                ? "brightness-[0.9]"
                                : "opacity-75 brightness-[0.75]"
                            } absolute text-[0.5rem]  xs:text-sm flex top-[0.02em] left-[0.3em]`}
                          >
                            {squareCount}
                          </span>
                          <span
                            className={`transition-transform ${
                              //If a word is entered and the current square is the last square in the row, apply the flip animation
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
                    }
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
