import type { MetaFunction } from "@remix-run/node";
import { useCallback, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Skulls from "../client/components/data/skulls";
import words from "../client/components/data/words";
import Keyboard from "../client/components/ui/Keyboard";

export const meta: MetaFunction = () => {
  return [
    {
      title:
        "💀 Word Skull - An educational word puzzle game designed to look like skulls and other fun shapes... 🎉✨",
    },
    {
      name: "description",
      content:
        "Are you worthy? Find out by playing this fun word guessing game! Challenge your mind, and improve your vocabulary in no time! 🎉📲",
    },
  ];
};

export default function WordSkullMedium() {
  const skulls = useMemo(
    () =>
      Skulls()
        .map((skull) => [...skull])
        .slice(4, 8),
    []
  );
  const [currentSkull, setCurrentSkull] = useState<string[][][]>([]);
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);
  const [wordsForSkull, setWordsForSkull] = useState<string[]>([]);
  const [enteredWords, setEnteredWords] = useState<string[][]>([]);
  const [lives, setLives] = useState<number | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const wordsList: { [key: number]: string[] } = useMemo(() => words(), []);

  useEffect(() => {
    if (lives === null && currentSkull[0]?.length > 0) {
      // Calculate the average length of rows in currentSkull[0]
      const totalLength = currentSkull[0].reduce(
        (sum, row) => sum + row.length,
        0
      );
      const averageLength = totalLength / currentSkull[0].length;

      // Set lives to the product of currentSkull[0].length and the averageLength
      setLives(currentSkull[0].length * averageLength);
    }
  }, [lives, currentSkull]);

  useEffect(() => {
    if (lives !== null && lives <= 0) {
      alert("Game Over!");
    }
  }, [lives]);

  //If wordsForSkull is empty, generate a random array of words that are of the correct length which matches each skull row.
  useEffect(() => {
    if (wordsForSkull[0]) return;

    // Helper function to get words of a specific length and exclude words with "@" or "~"
    const getWordsOfLength = (length: number) => {
      return wordsList[length]
        .filter((word) => word.length === length)
        .filter((word) => !word.includes("@") && !word.includes("~"));
    };

    // Function to calculate effective length of a row, ignoring "@" and "~"
    const calculateEffectiveLength = (row: string[]) => {
      // Flatten the row if it's an array of arrays
      const flattenedRow = Array.isArray(row) ? row.flat() : [row];
      // Count the characters that are not "@" or "~"
      const validCharsCount = flattenedRow.filter((cell) => cell === "").length;
      return validCharsCount;
    };

    currentSkull[0]?.forEach((row, index) => {
      // Calculate effective length of the row ignoring "@" and "~"
      const rowLength = calculateEffectiveLength(row);
      const wordsOfCorrectLength = getWordsOfLength(rowLength);

      if (wordsOfCorrectLength.length === 0) {
        // If no valid words are found, handle accordingly
        console.warn(`No valid words found for length ${rowLength}`);
        return;
      }

      const randomWord =
        wordsOfCorrectLength[
          Math.floor(Math.random() * wordsOfCorrectLength.length)
        ];

      setWordsForSkull((prevState) => {
        // Replace the existing word at the index with the new word
        const newState = [...prevState];
        newState[index] = randomWord;
        return newState;
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSkull]);

  useEffect(() => {
    wordsForSkull.length > 0 && console.log(wordsForSkull);
  }, [wordsForSkull]);

  useEffect(() => {
    console.log(enteredWords);
  }, [enteredWords]);

  useEffect(() => {
    const randomizeCurrentSkull = () => {
      setCurrentSkull([skulls[Math.floor(Math.random() * skulls?.length)]]);
    };

    randomizeCurrentSkull();
  }, [skulls]);

  const handleShiftIndex = useCallback(() => {
    let defaultIndex = 0;

    if (currentRow > currentSkull[0].length - 1) {
      console.log("You Won! Game Over...");
      return 0;
    }

    while (
      currentSkull[0][currentRow][currentRowIndex + defaultIndex] === "@" ||
      currentSkull[0][currentRow][currentRowIndex + defaultIndex] === "~"
    ) {
      defaultIndex++;
    }

    return defaultIndex;
  }, [currentSkull, currentRow, currentRowIndex]);

  useEffect(() => {
    //If a square is marked with "@" or "~" it can't be changed so shift the index to a square that can.

    const handleUpdateSquare = (key: string) => {
      const shiftIndex = handleShiftIndex();

      //Update the current square with a letter
      if (
        currentRowIndex + shiftIndex <=
        currentSkull[0][currentRow].length - 1
      ) {
        setCurrentSkull((prevState) => {
          // Create a new copy of the previous state array
          const newState: string[][][] = [...prevState];

          // Update the specific element within the row
          newState[0][currentRow][currentRowIndex + shiftIndex] = key;

          // Return the updated state
          return newState;
        });

        setCurrentRowIndex((prevState) => prevState + 1 + shiftIndex);
      }
    };

    const handleShiftIndexBackwards = () => {
      let defaultIndex = currentRowIndex - 1;

      //Skip squares that start with "@" or "~" so that empty and eyeball squares are not changed
      while (
        currentSkull[0][currentRow][defaultIndex] === "@" ||
        currentSkull[0][currentRow][defaultIndex] === "~"
      ) {
        defaultIndex--;
      }

      //For corner squares that start with "@" or "~", the index can be less than 0. If so, set it back to the first empty position in the row.
      if (defaultIndex < 0) {
        currentSkull[0][currentRow].forEach((square, index) => {
          if (defaultIndex < 0 && square === "") defaultIndex = index;
        });
      }

      return defaultIndex;
    };

    const handleDeleteSquare = () => {
      if (currentRowIndex > 0) {
        const shiftIndexBackwards = handleShiftIndexBackwards();

        console.log(shiftIndexBackwards);

        setCurrentSkull((prevState) => {
          // Create a new copy of the previous state array
          const newState: string[][][] = [...prevState];

          // Update the specific element within the row
          newState[0][currentRow][shiftIndexBackwards] = "";

          // Return the updated state
          return newState;
        });

        setCurrentRowIndex(shiftIndexBackwards);
      }
    };
    const handleNextRow = () => {
      const shiftIndex = handleShiftIndex();

      if (currentRowIndex + shiftIndex === currentSkull[0][currentRow].length) {
        setCurrentRowIndex(0);
        setCurrentRow((prevState) => prevState + 1);
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === "tab") return; //Allow tab for accessability reasons but don't track the input for test

      e.preventDefault();

      if (
        !/^[a-zA-Z]$/.test(key) &&
        key.toLowerCase() !== "backspace" &&
        key.toLowerCase() !== "enter"
      )
        return;

      const handleEnteredWord = () => {
        if (
          currentSkull[0][currentRow].join("") !== wordsForSkull[currentRow] &&
          !currentSkull[0][currentRow].includes("")
        ) {
          if (
            !wordsList[
              currentSkull[0][currentRow].join("").replace(/[@~]/g, "").length
            ].includes(
              currentSkull[0][currentRow].join("").replace(/[@~]/g, "")
            )
          ) {
            alert("Not in word list!");
            return;
          } else {
            setLives((prevState) =>
              prevState !== null ? prevState - 1 : prevState
            );
          }
        } else {
          handleNextRow();
        }

        setEnteredWords((prevState) => {
          const updatedWords = [...prevState];

          // Check if there's an existing entry for the current row
          if (updatedWords[currentRow]) {
            // Update the existing array with the current character
            updatedWords[currentRow] = [
              ...updatedWords[currentRow],
              currentSkull[0][currentRow].join("").replace(/[@~]/g, ""),
            ];
          } else {
            // Initialize the array if it doesn't exist, then push the character
            updatedWords[currentRow] = [
              currentSkull[0][currentRow].join("").replace(/[@~]/g, ""),
            ];
          }

          return updatedWords;
        });
      };

      if (key === "enter") {
        console.log(key);
        if (
          currentSkull[0][currentRow].join("").replace(/[@~]/g, "") !==
            wordsForSkull[currentRow] &&
          !currentSkull[0][currentRow].includes("")
        ) {
          handleEnteredWord();
        } else {
          handleNextRow();
        }
      } else if (key === "backspace") {
        handleDeleteSquare();
      } else {
        handleUpdateSquare(key);
      }
    };

    addEventListener("keydown", handleKeydown);

    return () => {
      removeEventListener("keydown", handleKeydown);
    };
  }, [
    currentRow,
    currentRowIndex,
    currentSkull,
    handleShiftIndex,
    wordsForSkull,
    wordsList,
  ]);

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
          className="text-[1.2rem] sm:text-[2rem] border-2 rounded-lg w-[1.7em] h-[1.7em] flex justify-center items-center"
        ></li>
      );

    const shiftIndex = handleShiftIndex();

    return (
      <li
        key={uuidv4()}
        className={`${
          rowIndex === currentRow &&
          squareIndex === currentRowIndex + shiftIndex
            ? "bg-slate-600 bg-opacity-20 border-opacity-75 scale-110 z-10 border-[2.5px] border-slate-600"
            : "text-slate-300 border-slate-400 border-2"
        } ${
          square !== "" &&
          rowIndex === currentRow &&
          "!border-slate-600 border-[2.5px] !text-slate-600"
        }  text-[1.2rem] relative border-2 sm:text-[2rem] rounded-md sm:rounded-lg min-w-[1.8em] min-h-[1.8em] sm:min-w-[1.7em] sm:min-h-[1.7em] flex justify-center items-center`}
      >
        <span
          className={`${
            (rowIndex === currentRow &&
              squareIndex === currentRowIndex + shiftIndex) ||
            (square !== "" && rowIndex === currentRow)
              ? "text-slate-600 text-opacity-75 border-slate-600"
              : "text-slate-300"
          } absolute text-[0.5rem] sm:text-sm flex top-[0.02em] left-[0.3em]`}
        >
          {squareCount}
        </span>
        <span className="translate-y-[0.16em] sm:translate-y-1">{square}</span>
      </li>
    );
  };

  const handleValidationStyling = (char: string, charIndex: number) => {
    let style = "border-slate-300 text-slate-500 ";

    if (wordsForSkull[currentRow].includes(char))
      style = "border-yellow-400 text-yellow-600 bg-yellow-100 ";

    if (wordsForSkull[currentRow][charIndex] === char)
      style = "border-green-400 text-green-600 bg-green-100 ";

    return style;
  };

  return (
    <div>
      <header className="animate-fadeIn -mb-4 sm:-mb-8">
        <h1 className="w-full flex justify-center items-center  text-xl sm:text-2xl text-center mt-5 leading-snug -translate-y-[0.3em] sm:translate-y-0 sm:mt-2 text-slate-500 font-lora">
          W💀RD SKULL
        </h1>
      </header>
      <main className="flex min-h-[21.5em] sm:min-h-[32.7em] justify-center flex-col pt-0 sm:pt-10 gap-5 mx-5 items-center animate-fadeIn">
        <div
          title="Hold 'Space Bar' or press 'Caps' key to view your attempts."
          className="flex flex-col h-5 z-10 w-full cursor-pointer min-h-10 max-w-[400px] sm:max-w-[600px] bg-white border-2 gap-3 mt-[1em] sm:mt-0 mb-3 sm:mb-2 rounded-md sm:rounded-xl border-slate-200 justify-center items-center"
        >
          {enteredWords[currentRow]?.length > 0 ? (
            <div className="relative flex gap-[4px] justify-center px-3 rounded-md sm:rounded-lg items-center">
              {enteredWords[currentRow]
                ?.slice(-1)[0]
                .split("")
                .map((char, charIndex) => (
                  <span
                    key={uuidv4()}
                    className={`${handleValidationStyling(
                      char,
                      charIndex
                    )}} text-[0.8rem] font-nunito capitalize border-2 rounded-sm sm:rounded-lg w-[1.7em] h-[1.7em] flex justify-center items-center`}
                  >
                    {char}
                  </span>
                ))}
            </div>
          ) : (
            <div className="h-5"></div>
          )}
        </div>
        {/* {enteredWords[currentRow]?.map((enteredWord, rowIndex) => {
          return (
            <>
              <h2>Row {rowIndex + 1} Guesses</h2>
              <ul
                className="h-10 relative flex gap-[2px] justify-center items-center"
                key={uuidv4()}
              >
                {enteredWord.split("").map((char, charIndex) => (
                  <li
                    key={uuidv4()}
                    className={`${handleValidationStyling(
                      char,
                      charIndex
                    )}} text-[1.2rem] p-0 m-0 sm:text-[1rem] font-nunito capitalize border-2 rounded-lg w-[1.7em] h-[1.7em] flex justify-center items-center`}
                  >
                    {charIndex === 0 && (
                      <span className="absolute -left-6 bottom-[0.35em] text-black">
                        {rowIndex + 1}.
                      </span>
                    )}{" "}
                    {char}
                  </li>
                ))}
              </ul>
            </>
          );
        })} */}
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
      </main>
      <div className="flex justify-center items-center -translate-y-5 sm:-translate-y-9 mt-2 flex-col">
        <Keyboard cursorPosition={0} lives={lives} />
      </div>
    </div>
  );
}
