import { Fragment } from "react/jsx-runtime";
import { v4 as uuidv4 } from "uuid";
import Icon from "../utils/other/Icon";
import { useState } from "react";

interface ValidationPropType {
  char: string;
  charIndex: number;
  rowIndex?: number;
}

interface PropType {
  enteredWords: string[][];
  currentRow: number;
  wordsForSkull: string[];
  dispWordHistory: boolean;
  setDispWordHistory: (
    value: ((prevState: boolean) => boolean) | boolean
  ) => void;
}

function WordHistory({
  enteredWords,
  currentRow,
  wordsForSkull,
  setDispWordHistory,
  dispWordHistory,
}: PropType) {
  const [enteredWordsIndexOffset, setEnteredWordsIndexOffset] = useState(0);

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
    <>
      {" "}
      {dispWordHistory && (
        <button
          onClick={() => setDispWordHistory(false)}
          className="fixed inset-0 h-full w-full flex bg-skull-brown bg-opacity-10 z-30 justify-center"
        ></button>
      )}
      <button
        onClick={() => setDispWordHistory(!dispWordHistory)}
        title="Hold 'Shift' or press 'Space Bar' key to view your attempts."
        className="flex z-20 h-5 cursor-pointer min-w-52 min-h-10 max-w-[400px] sm:max-w-[600px] bg-white border-2 hover:border-skull-brown gap-3 mt-[1em] sm:mt-0 mb-4 sm:mb-2 rounded-md sm:rounded-md border-slate-200 justify-center items-center"
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
        <div className="flex flex-col absolute z-[35] bg-white w-full font-nunito items-center gap-5 py-10 border-2 overflow-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300 max-h-[450px] max-w-[400px] rounded-lg">
          <div className="flex justify-center items-center">
            <button
              onClick={() => {
                if (currentRow + enteredWordsIndexOffset - 1 >= 0) {
                  setEnteredWordsIndexOffset((prevState) => prevState - 1);
                }
              }}
              className="pr-3"
            >
              <Icon icon="arrowLeft" title="arrow left" />
            </button>
            <h2>Guesses for Row {currentRow + enteredWordsIndexOffset + 1}</h2>{" "}
            <button
              onClick={() => {
                if (currentRow + enteredWordsIndexOffset + 1 <= currentRow) {
                  setEnteredWordsIndexOffset((prevState) => prevState + 1);
                }
              }}
              className="rotate-180 pr-3"
            >
              <Icon icon="arrowLeft" title="arrow right" />
            </button>
          </div>
          {enteredWords[currentRow + enteredWordsIndexOffset]?.map(
            (enteredWord, rowIndex) => (
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
            )
          )}

          {enteredWordsIndexOffset < 0 && (
            <div className="flex justify-center items-center gap-2">
              <h3>Answer:</h3>
              <p className="uppercase tracking-widest">
                {wordsForSkull[currentRow + enteredWordsIndexOffset]}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default WordHistory;
