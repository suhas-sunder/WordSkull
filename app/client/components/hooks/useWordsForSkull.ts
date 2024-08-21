import { useEffect, useMemo, useState } from "react";
import words from "../data/words";
import { useMatches } from "@remix-run/react";

interface WordsData {
  words?: { [key: number]: string[] };
}

function useWordsForSkull({ currentSkull }: { currentSkull?: string[][][] }) {
  const [wordsForSkull, setWordsForSkull] = useState<string[]>([]);
  const [dispWordHistory, setDispWordHistory] = useState<boolean>(false);
  // Get all matched routes and their data
  const matches = useMatches();

  // Memoize the extraction of words data from matches
  const wordsData = useMemo(() => {
    // Find the first match with valid data
    const match = matches.find((match) => (match.data as WordsData)?.words);
    return match?.data as WordsData;
  }, [matches]);

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

  //If wordsForSkull is empty, generate a random array of words that are of the correct length which matches each skull row.
  useEffect(() => {
    if (wordsForSkull[0] || currentSkull === undefined) return;

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

  return { wordsForSkull, wordsList, dispWordHistory, setDispWordHistory };
}

export default useWordsForSkull;
