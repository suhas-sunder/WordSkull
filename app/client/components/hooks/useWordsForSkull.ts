import { useEffect, useMemo, useState } from "react";
import words from "../data/Words";
import { WordsData } from "../../../routes/word-skull-game-easy-mode";

interface PropType {
  currentSkull?: string[][][];
  wordsData: WordsData;
}

function useWordsForSkull({ currentSkull, wordsData }: PropType) {
  const [wordsForSkull, setWordsForSkull] = useState<string[]>([]);
  const [dispWordHistory, setDispWordHistory] = useState<boolean>(false);

  // Memoize the backup words list
  const backupWordsList = useMemo(() => words(), []);

  // Use the fetched words if available and valid, otherwise use the static backup words list
  const wordsList: { [key: number]: string[] } = useMemo(() => {
    // Check if wordsData exists and has valid words; otherwise, use backupWordsList
    if (
      wordsData &&
      wordsData.words &&
      Object.keys(wordsData.words).length > 0
    ) {
      return wordsData.words;
    } else {
      return backupWordsList;
    }
  }, [wordsData, backupWordsList]);

  useEffect(() => {
    if (wordsForSkull[0] || currentSkull === undefined) return;

    // Get words of a specific length (Looking back I'm not sure why I excluded words with "@" or "~" here. I'm going to leave it in since it does no harm, but the code is probably unnecessary)
    const getWordsOfLength = (length: number) => {
      if (!wordsList[length]) return [];

      return wordsList[length]
        .filter((word) => word.length === length)
        .filter((word) => !word.includes("@") && !word.includes("~"));
    };

    // Calculate the effective length of a row, ignoring "@" and "~"
    const calculateEffectiveLength = (row: string[]) => {
      const flattenedRow = Array.isArray(row) ? row.flat() : [row];
      const validCharsCount = flattenedRow.filter((cell) => cell === "").length;
      return validCharsCount;
    };

    // Set to store used words and avoid duplicates
    const usedWords = new Set<string>();

    currentSkull[0]?.forEach((row, index) => {
      // Calculate effective length of the row ignoring "@" and "~"
      const rowLength = calculateEffectiveLength(row);
      let wordsOfCorrectLength = getWordsOfLength(rowLength);

      if (wordsOfCorrectLength.length === 0) {
        return; //Handle edge case where no valid words found for length
      }

      // Filter out words that have already been used
      wordsOfCorrectLength = wordsOfCorrectLength.filter(
        (word) => !usedWords.has(word)
      );

      if (wordsOfCorrectLength.length === 0) {
        return; //Handle edge case where no remaining unused words for length
      }

      // Select a random unused word
      const randomWord =
        wordsOfCorrectLength[
          Math.floor(Math.random() * wordsOfCorrectLength.length)
        ];

      // Add the chosen word to the usedWords set
      usedWords.add(randomWord);

      setWordsForSkull((prevState) => {
        const newState = [...prevState];
        newState[index] = randomWord;
        return newState;
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSkull]);

  //Displays list of all answers for debugging purposes
  // useEffect(() => {
  //   wordsForSkull.length > 0 && console.log(wordsForSkull);
  // }, [wordsForSkull]);

  return { wordsForSkull, wordsList, dispWordHistory, setDispWordHistory };
}

export default useWordsForSkull;
