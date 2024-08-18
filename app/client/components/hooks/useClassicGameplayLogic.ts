import { useEffect, useState } from "react";
import HandleShiftIndex from "../utils/other/HandleShiftIndex";

interface PropType {
  currentSkull: string[][][];
  setCurrentSkull: React.Dispatch<React.SetStateAction<string[][][]>>;
  wordsList: { [key: number]: string[] };
  setDispWordHistory: (
    value: ((prevState: boolean) => boolean) | boolean
  ) => void;
  setLives: (value: (prevState: number | null) => number | null) => void;
  wordsForSkull: string[];
}

function useClassicGameplayLogic({
  currentSkull,
  setCurrentSkull,
  wordsList,
  setDispWordHistory,
  setLives,
  wordsForSkull,
}: PropType) {
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);
  const [enteredWords, setEnteredWords] = useState<string[][]>([]);
  const [enterPressed, setEnterPressed] = useState(false);

  useEffect(() => {
    //If a square is marked with "@" or "~" it can't be changed so shift the index to a square that can.

    const handleUpdateSquare = (key: string) => {
      const shiftIndex = HandleShiftIndex({
        currentSkull,
        currentRow,
        currentRowIndex,
      });

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
      const shiftIndex = HandleShiftIndex({
        currentSkull,
        currentRow,
        currentRowIndex,
      });

      if (currentRowIndex + shiftIndex === currentSkull[0][currentRow].length) {
        setCurrentRowIndex(0);
        setCurrentRow((prevState) => prevState + 1);
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === "shift") setDispWordHistory((prevState) => !prevState);

      if (key === " ") setDispWordHistory(true);

      if (key === "tab") return; //Allow tab for accessability reasons but don't track the input for test

      e.preventDefault();

      if (
        !/^[a-zA-Z]$/.test(key) &&
        key.toLowerCase() !== "backspace" &&
        key.toLowerCase() !== "enter"
      )
        return;

      const handleEnteredWord = () => {
        //Check if entered word is valid
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
            //Update state to check for character validity
            setEnterPressed(true);

            //Only subtract a life if the entered word is in word list but not repeated
            if (
              !enteredWords[currentRow]?.includes(
                currentSkull[0][currentRow]?.join("").replace(/[@~]/g, "")
              )
            ) {
              setLives((prevState) =>
                prevState !== null ? prevState - 1 : prevState
              );
            }
          }
        } else {
          handleNextRow();
        }


        //If entered word is not repeated add it to enteredWords list
        if (
          !enteredWords[currentRow]?.includes(
            currentSkull[0][currentRow]?.join("").replace(/[@~]/g, "")
          )
        )
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

      //If enter is pressed and entered word isn't repeated for current row
      if (key === "enter") {
        if (
          currentSkull[0][currentRow]?.join("").replace(/[@~]/g, "") !==
            wordsForSkull[currentRow] &&
          !currentSkull[0][currentRow]?.includes("")
        ) {
          handleEnteredWord();
        } else {
          handleNextRow();
        }
      } else if (key === "backspace") {
        setEnterPressed(false); //Update state to stop checking for character validity
        handleDeleteSquare();
      } else {
        handleUpdateSquare(key);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === " ") setDispWordHistory(false);
    };

    addEventListener("keydown", handleKeydown);
    addEventListener("keyup", handleKeyUp);

    return () => {
      removeEventListener("keydown", handleKeydown);
    };
  }, [
    currentRow,
    currentRowIndex,
    currentSkull,
    enteredWords,
    setCurrentSkull,
    setDispWordHistory,
    setLives,
    wordsForSkull,
    wordsList,
  ]);

  return {
    currentRow,
    currentRowIndex,
    enteredWords,
    enterPressed,
  };
}

export default useClassicGameplayLogic;
