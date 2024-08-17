import type { MetaFunction } from "@remix-run/node";
import { Fragment, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Skulls from "../client/components/data/skulls";
import Keyboard from "../client/components/ui/Keyboard";
import useTotalLives from "../client/components/hooks/useTotalLives";
import useWordsForSkull from "../client/components/hooks/useWordsForSkull";
import useClassicGameplayLogic from "../client/components/hooks/useClassicGameplayLogic";
import DisplaySkull from "../client/components/layout/DisplaySkull";

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

interface ValidationPropType {
  char: string;
  charIndex: number;
  rowIndex?: number;
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

  const handleValidationStyling = ({
    char,
    charIndex,
    rowIndex,
  }: ValidationPropType) => {
    if (!enteredWords[currentRow] || enteredWords[currentRow]?.length <= 0)
      return;

    let style = "border-slate-300 text-slate-500 ";
    const correctCharCount: { [key: string]: number } = { [`${char}`]: 0 }; //This is used to track the total green squares so that yellow squares do not count as green

    //Count total number of correct characters in guessed word. If rowIndex is being passed in, it means we're iterating over all guessed words and validating all for display. If not, we're just validating the most recent guess.
    enteredWords[currentRow][
      rowIndex || rowIndex === 0
        ? rowIndex
        : enteredWords[currentRow]?.length - 1
    ]
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
      i <
      enteredWords[currentRow][
        rowIndex || rowIndex === 0
          ? rowIndex
          : enteredWords[currentRow]?.length - 1
      ].length;
      i++
    ) {
      if (
        enteredWords[currentRow][
          rowIndex || rowIndex === 0
            ? rowIndex
            : enteredWords[currentRow]?.length - 1
        ][i] === char
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

  return (
    <div>
      <header className="animate-fadeIn w-full justify-center items-center flex-col flex -mb-6 sm:-mb-8">
        <h1 className=" flex justify-center items-center text-xl sm:text-2xl text-center mt-2 leading-snug -translate-y-[0.3em] sm:translate-y-0 text-slate-500 font-lora">
          W💀RD SKULL
        </h1>
        <ul className="flex font-nunito -translate-y-2 sm:translate-y-0 text-slate-700 gap-2 my-1 justify-center items-center">
          <span className="text-lg translate-y-[0.05em]">{lives || 0}</span>
          <span className="text-xl translate-y-[0.01em]">x</span>
          <span className="opacity-85 -translate-x-[0.1em] text-lg">🖤</span>
        </ul>
      </header>
      <main className="flex overflow-hidden relative min-h-[21.5em] sm:min-h-[32.7em] flex-col pt-0 sm:pt-10 gap-5 mx-5 items-center animate-fadeIn">
        {dispWordHistory && (
          <button
            onClick={() => setDispWordHistory(false)}
            className="w-full top-12 z-10 flex absolute h-full bg-black opacity-10"
          ></button>
        )}
        <button
          onClick={() => setDispWordHistory(!dispWordHistory)}
          title="Hold 'Space Bar' or press 'Caps' key to view your attempts."
          className="flex h-5 cursor-pointer min-w-52 min-h-10 max-w-[400px] sm:max-w-[600px] bg-white border-2 gap-3 mt-[1em] sm:mt-0 mb-4 sm:mb-2 rounded-md sm:rounded-md border-slate-200 justify-center items-center"
        >
          {enteredWords[currentRow]?.length > 0 ? (
            <div className="relative flex gap-[4px] justify-center px-3 items-center">
              {enteredWords[currentRow]
                ?.slice(-1)[0]
                .split("")
                .map((char, charIndex) => (
                  <span
                    key={uuidv4()}
                    className={`${handleValidationStyling({
                      char,
                      charIndex,
                    })}} text-[0.8rem] font-nunito capitalize border-2 rounded-md w-[1.7em] h-[1.7em] flex justify-center items-center`}
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
                        char,
                        rowIndex,
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

        <DisplaySkull
          currentSkull={currentSkull}
          currentRow={currentRow}
          currentRowIndex={currentRowIndex}
          wordsForSkull={wordsForSkull}
          enteredWords={enteredWords}
          enterPressed={enterPressed}
        />

        <div className="flex justify-center items-center -translate-y-5 sm:-translate-y-16 flex-col">
          <Keyboard
            cursorPosition={0}
            currentlyEnteredWords={enteredWords[currentRow]}
            currentWord={wordsForSkull[currentRow]}
          />
        </div>
      </main>
    </div>
  );
}
