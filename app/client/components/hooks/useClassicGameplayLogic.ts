import { useCallback, useEffect, useState } from "react";
import HandleShiftIndexForward from "../utils/other/ShiftIndexForward";
import useHandleGameOver from "./useHandleGameOver";
import useTotalLives from "./useTotalLives";
import useDelay from "./useDelay";
import ShiftIndexBackward from "../utils/other/ShiftIndexBackward";

interface PropType {
  currentSkull: string[][][];
  setCurrentSkull: React.Dispatch<React.SetStateAction<string[][][]>>;
  wordsList: { [key: number]: string[] };
  setDispWordHistory: (
    value: ((prevState: boolean) => boolean) | boolean
  ) => void;
  wordsForSkull: string[];
  startOffscreenTimer: boolean;
  setStartOffscreenTimer: (
    value: ((prevState: boolean) => boolean) | boolean
  ) => void;
}

function useClassicGameplayLogic({
  currentSkull,
  setCurrentSkull,
  wordsList,
  setDispWordHistory,
  wordsForSkull,
  startOffscreenTimer,
  setStartOffscreenTimer,
}: PropType) {
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);
  const [enteredWords, setEnteredWords] = useState<string[][]>([]);
  const [isEnterPressed, setIsEnterPressed] = useState(false);
  const [previouslyEnteredKey, setPreviouslyEnteredKey] =
    useState<string>("ResetKeyState"); //Use this to make sure some events only run on keydown and not on when key is pressed
  const [answerCorrect, setAnswerCorrect] = useState<boolean>(false);

  const { isDelaying } = useDelay({ isEnterPressed, msecondsToDelay: 950 });

  const { isGameOver, setIsGameOver } = useHandleGameOver({
    currentRow,
    currentSkull,
  });

  //Manage lives
  const { lives, setLives, maxLives } = useTotalLives({
    currentSkull,
    setIsGameOver,
  });

  //Handles index shift & updates to current row
  const handleNextRow = useCallback(() => {
    const shiftedIndex = HandleShiftIndexForward({
      currentSkull,
      currentRow,
      currentRowIndex,
    });

    if (currentRowIndex + shiftedIndex === currentSkull[0][currentRow].length) {
      setCurrentRowIndex(0);
      setCurrentRow((prevState) => prevState + 1);
    }
  }, [currentSkull, currentRow, currentRowIndex]);

  //Go to next row if answer is correct
  useEffect(() => {
    let timer = null;
    if (answerCorrect) {
      setIsEnterPressed(true);
      timer = setTimeout(() => {
        setAnswerCorrect(false);
        setIsEnterPressed(false);
        handleNextRow();
      }, 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [answerCorrect, handleNextRow, setAnswerCorrect, setIsEnterPressed]);

  useEffect(() => {
    if (isGameOver) return;

    //If a square is marked with "@" or "~" it shouldn't be changed so shift the current row index to a square that should.
    const handleUpdateRowIndex = (key: string) => {
      const shiftIndex = HandleShiftIndexForward({
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

    //Handle backspace key
    const handleDeleteChar = () => {
      if (currentRowIndex > 0) {
        const shiftedIndex = ShiftIndexBackward({
          currentSkull,
          currentRow,
          currentRowIndex,
        }); //Shift index backwards if condition is met

        setCurrentSkull((prevState) => {
          // Create a new copy of the previous state array
          const newState: string[][][] = [...prevState];

          // Update the specific element within the row
          newState[0][currentRow][shiftedIndex] = "";

          // Return the updated state
          return newState;
        });

        setCurrentRowIndex(shiftedIndex);
      }
    };

    const handleKeydown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (isDelaying) return; //Add a delay to match CSS animation so that all inputs are disabled during the delay

      setPreviouslyEnteredKey(key);

      if (key === " " && previouslyEnteredKey !== key)
        //Display modal for word history
        setDispWordHistory((prevState) => !prevState);

      if (key === "shift") setDispWordHistory(true); //Display modal for word history

      if (key === "tab") return; //Allow tab for accessability reasons but don't track the input for test

      e.preventDefault();

      if (
        !/^[a-zA-Z]$/.test(key) &&
        key.toLowerCase() !== "backspace" &&
        key.toLowerCase() !== "enter"
      ) {
        return; //Exit if key doesn't match allowed characters
      } else if (!startOffscreenTimer) {
        setStartOffscreenTimer(true); //Start timer if appropriate input is detected
      }

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
            setIsEnterPressed(true);

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
          //Incorrect word is entered
          handleEnteredWord();
        } else if (
          currentSkull[0][currentRow]?.join("").replace(/[@~]/g, "").length ===
          wordsForSkull[currentRow].length
        ) {
          //Entered word matches answer
          setAnswerCorrect(true);
        }
      } else if (key === "backspace") {
        setIsEnterPressed(false);
        handleDeleteChar();
      } else {
        handleUpdateRowIndex(key);
      }
    };

    //Hide modal for word history (entered words list)
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "shift") setDispWordHistory(false);
      setPreviouslyEnteredKey("ResetKeyState");
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
    isEnterPressed,
    enteredWords,
    handleNextRow,
    isGameOver,
    previouslyEnteredKey,
    setCurrentSkull,
    setDispWordHistory,
    setLives,
    wordsForSkull,
    wordsList,
    isDelaying,
    startOffscreenTimer,
    setStartOffscreenTimer,
  ]);

  return {
    currentRow,
    currentRowIndex,
    enteredWords,
    isEnterPressed,
    isGameOver,
    lives,
    maxLives,
  };
}

export default useClassicGameplayLogic;
