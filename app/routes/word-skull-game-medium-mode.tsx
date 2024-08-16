import type { MetaFunction } from "@remix-run/node";
import { Fragment, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Skulls from "../client/components/data/skulls";
import Keyboard from "../client/components/ui/Keyboard";
import useTotalLives from "../client/components/hooks/useTotalLives";
import useWordsForSkull from "../client/components/hooks/useWordsForSkull";
import HandleShiftIndex from "../client/components/utils/other/HandleShiftIndex";
import useClassicGameplayLogic from "../client/components/hooks/useClassicGameplayLogic";

export const meta: MetaFunction = () => {
  return [
    {
      title:
        "💀 Word Skull Medium - Medium difficulty offers learning for three to 6 letter words 🎉✨",
    },
    {
      name: "description",
      content:
        "Are you worthy? Find out by playing this fun word guessing game! Challenge your mind, and improve your vocabulary in no time! 🎉📲",
    },
  ];
};

interface PropType {
  enteredWords: string[][];
  currentRow: number;
  char: string;
  wordsForSkull: string[];
  charIndex: number;
}

export default function WordSkullMedium() {
  const skulls = useMemo(
    () =>
      Skulls()
        .map((skull) => [...skull])
        .slice(4, 8),
    []
  );

  const [currentSkull, setCurrentSkull] = useState<string[][][]>([]);

  //Manage lives
  const { lives, setLives } = useTotalLives({ currentSkull });

  //Manage words list
  const { wordsForSkull, wordsList, dispWordHistory, setDispWordHistory } =
    useWordsForSkull({ currentSkull });

  //Handle the main gameplay logic
  const { currentRow, currentRowIndex, enteredWords, enterPressed } =
    useClassicGameplayLogic({
      currentSkull,
      setCurrentSkull,
      wordsList,
      setDispWordHistory,
      setLives,
      wordsForSkull,
    });

  useEffect(() => {
    const randomizeCurrentSkull = () => {
      setCurrentSkull([skulls[Math.floor(Math.random() * skulls?.length)]]);
    };

    randomizeCurrentSkull();
  }, [skulls]);

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
          className="text-[1.2rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[1.7em] h-[1.7em] flex justify-center items-center"
        ></li>
      );

    if (square === "~")
      return (
        <li
          key={uuidv4()}
          className={`text-[1.2rem] sm:text-[2rem] border-2 rounded-lg w-[1.7em] h-[1.7em] flex justify-center items-center`}
        ></li>
      );

    const shiftIndex = HandleShiftIndex({
      currentRowIndex,
      currentRow,
      currentSkull,
    });

    //Controls styling of characters that have been guessed correctly. Green for exact match, and yellow for partial.

    return (
      <li
        key={uuidv4()}
        className={`${
          rowIndex === currentRow &&
          squareIndex === currentRowIndex + shiftIndex
            ? "bg-slate-300 bg-opacity-20 border-opacity-75 scale-110 z-10 border-[2.5px] border-slate-500"
            : "text-slate-300 border-slate-400 border-2"
        } ${
          square !== "" &&
          rowIndex === currentRow &&
          "!border-slate-400 border-[2.5px] !text-slate-500"
        }  text-[1.2rem] relative border-2 sm:text-[2rem] rounded-md sm:rounded-lg min-w-[1.8em] min-h-[1.8em] sm:min-w-[1.7em] sm:min-h-[1.7em] flex justify-center items-center  ${
          enterPressed &&
          rowIndex === currentRow &&
          handleValidationStylingV2({
            enteredWords,
            currentRow,
            char: square,
            wordsForSkull,
            charIndex: squareIndex,
          })
        }`}
      >
        <span
          className={` absolute text-[0.5rem] opacity-75 brightness-[0.75] sm:text-sm flex top-[0.02em] left-[0.3em]`}
        >
          {squareCount}
        </span>
        <span className="translate-y-[0.16em] sm:translate-y-1">{square}</span>
      </li>
    );
  };

  const handleValidationStyling = ({
    enteredWords,
    currentRow,
    char,
    wordsForSkull,
    charIndex,
  }: PropType) => {
    if (!enteredWords[currentRow] || enteredWords[currentRow]?.length <= 0)
      return;

    let style = "border-slate-300 text-slate-500 ";
    const correctCharCount: { [key: string]: number } = { [`${char}`]: 0 }; //This is used to track the total green squares so that yellow squares do not count as green

    //Count total number of correct characters in guessed word
    enteredWords[currentRow][enteredWords[currentRow]?.length - 1]
      .split("")
      .forEach((character, index) => {
        if (wordsForSkull[currentRow][index] === character) {
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

    for (
      let i = 0;
      i < enteredWords[currentRow][enteredWords[currentRow]?.length - 1].length;
      i++
    ) {
      if (
        enteredWords[currentRow][enteredWords[currentRow]?.length - 1][i] ===
        char
      ) {
        charIndexesInEnteredWord.push(i);
      }
    }

    //Count remaining characters in guess after valid characters are accounted for from answer
    function countRemainingChars() {
      return (
        countChar(wordsForSkull[currentRow], char) - correctCharCount[`${char}`]
      );
    }

    if (wordsForSkull[currentRow][charIndex] === char) {
      style = "!border-green-400 !text-green-600 !bg-green-100 ";
    } else if (
      wordsForSkull[currentRow].includes(char) &&
      charIndexesInEnteredWord
        .slice(0, countChar(wordsForSkull[currentRow], char))
        .includes(charIndex) &&
      countRemainingChars() > 0
    ) {
      style = "!border-yellow-400 !text-yellow-600 !bg-yellow-100 ";
    }

    return style;
  };

  const handleValidationStylingV2 = ({
    enteredWords,
    currentRow,
    char,
    wordsForSkull,
    charIndex,
  }: PropType) => {
    if (!enteredWords[currentRow] || enteredWords[currentRow]?.length <= 0)
      return;

    //Offset calculation for index of guessed word when answer has ~ and @ for mapping blank squares and eyes.
    const adjustedIndex =
      charIndex -
      currentSkull[0][currentRow]
        .slice(0, charIndex + 1)
        .filter((char) => char === "~" || char === "@").length;

    const answer = wordsForSkull[currentRow]
      .split("")
      .filter((char) => char !== "~" && char !== "@")
      .join("");

    const wordGuessed = enteredWords[currentRow];
    const guessLength = wordGuessed.length - 1;

    let style = "border-slate-300 text-slate-500 ";
    const correctCharCount: { [key: string]: number } = { [`${char}`]: 0 }; //This is used to track the total green squares so that yellow squares do not count as green

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
      if (wordGuessed[guessLength][i] === char) {
        charIndexesInEnteredWord.push(i);
      }
    }

    //Count remaining characters in guess after valid characters are accounted for from answer
    function countRemainingChars() {
      return countChar(answer, char) - correctCharCount[`${char}`];
    }

    if (answer[adjustedIndex] === char) {
      style = "!border-green-400 !text-green-600 !bg-green-100 ";
    } else if (
      answer.includes(char) &&
      charIndexesInEnteredWord
        .slice(0, countChar(answer, char))
        .includes(adjustedIndex) &&
      countRemainingChars() > 0
    ) {
      style = "!border-yellow-400 !text-yellow-600 !bg-yellow-100 ";
    }

    return style;
  };

  return (
    <div>
      <header className="animate-fadeIn -mb-4 sm:-mb-8">
        <h1 className="w-full flex justify-center items-center text-xl sm:text-2xl text-center mt-5 leading-snug -translate-y-[0.3em] sm:translate-y-0 sm:mt-2 text-slate-500 font-lora">
          W💀RD SKULL
        </h1>
      </header>
      <main className="flex min-h-[21.5em] sm:min-h-[32.7em] flex-col pt-0 sm:pt-10 gap-5 mx-5 items-center animate-fadeIn">
        {dispWordHistory && (
          <button
            onClick={() => setDispWordHistory(false)}
            className="w-full top-12 z-10 flex absolute h-full bg-black opacity-10"
          ></button>
        )}
        <button
          onClick={() => setDispWordHistory(!dispWordHistory)}
          title="Hold 'Space Bar' or press 'Caps' key to view your attempts."
          className="flex flex-col h-5 w-full cursor-pointer min-h-10 max-w-[400px] sm:max-w-[600px] bg-white border-2 gap-3 mt-[1em] sm:mt-0 mb-3 sm:mb-2 rounded-md sm:rounded-xl border-slate-200 justify-center items-center"
        >
          {enteredWords[currentRow]?.length > 0 ? (
            <div className="relative flex gap-[4px] justify-center px-3 rounded-md sm:rounded-lg items-center">
              {enteredWords[currentRow]
                ?.slice(-1)[0]
                .split("")
                .map((char, charIndex) => (
                  <span
                    key={uuidv4()}
                    className={`${handleValidationStyling({
                      enteredWords,
                      currentRow,
                      char,
                      wordsForSkull,
                      charIndex,
                    })}} text-[0.8rem] font-nunito capitalize border-2 rounded-sm sm:rounded-lg w-[1.7em] h-[1.7em] flex justify-center items-center`}
                  >
                    {char}
                  </span>
                ))}
            </div>
          ) : (
            <div className="h-5"></div>
          )}
        </button>
        {dispWordHistory && (
          <div className="flex flex-col absolute z-10 bg-white w-full font-nunito items-center gap-5 py-10 border-2 overflow-auto max-h-[450px] max-w-[400px] rounded-lg">
            <h2>Guesses for Row {currentRow + 1}</h2>{" "}
            {enteredWords[currentRow]?.map((enteredWord, rowIndex) => (
              <ul
                key={uuidv4()}
                className="h-10 relative flex gap-[2px] justify-center items-center"
              >
                {enteredWord.split("").map((char, charIndex) => (
                  <Fragment key={uuidv4()}>
                    {charIndex === 0 && (
                      <li className="w-[1.7em] pt-[0.2em] h-[1.7em] text-slate-600">
                        {rowIndex + 1}.
                      </li>
                    )}
                    <li
                      className={` ${handleValidationStyling({
                        enteredWords,
                        currentRow,
                        char,
                        wordsForSkull,
                        charIndex,
                      })}} text-[1.2rem] p-0 m-0 sm:text-[1rem] capitalize border-2 rounded-lg w-[1.7em] h-[1.7em] flex justify-center items-center`}
                    >
                      {char}
                    </li>
                  </Fragment>
                ))}
              </ul>
            ))}
          </div>
        )}
        {currentSkull.map((skull, index) => {
          return index === 0 ? (
            <div
              key={index}
              className="relative flex-col w-full max-w-[800px] -translate-y-6 sm:-translate-y-8 sm:scale-[0.9] capitalize flex font-nunito text-slate-400 items-center"
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
        <div className="flex justify-center items-center -translate-y-5 sm:-translate-y-9 mt-2 flex-col">
          <Keyboard
            cursorPosition={0}
            lives={lives}
            currentlyEnteredWords={enteredWords[currentRow]}
            currentWord={wordsForSkull[currentRow]}
          />
        </div>
      </main>
    </div>
  );
}
