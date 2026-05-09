import { useEffect, useMemo, useState } from "react";
import { TargetWords, ValidationWords } from "../data/Words";
import type { StaticWordsByLength } from "../../../shared/wordData";

interface PropType {
  currentSkull?: string[][][];
  wordsData?: {
    words?: StaticWordsByLength;
  };
}

const RECENT_TARGET_LIMIT = 120;
const RECENT_TARGET_STORAGE_KEY = "wordskull:recent-targets";

function normalizeWord(word: string) {
  return word.trim().toLowerCase();
}

function readRecentTargets() {
  if (typeof sessionStorage === "undefined") return [];

  try {
    const value = sessionStorage.getItem(RECENT_TARGET_STORAGE_KEY);
    if (!value) return [];
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter(Boolean).map(String) : [];
  } catch {
    return [];
  }
}

function rememberRecentTarget(word: string) {
  if (typeof sessionStorage === "undefined") return;

  const normalizedWord = normalizeWord(word);
  const recentTargets = readRecentTargets().filter(
    (recentWord) => recentWord !== normalizedWord
  );
  recentTargets.unshift(normalizedWord);

  try {
    sessionStorage.setItem(
      RECENT_TARGET_STORAGE_KEY,
      JSON.stringify(recentTargets.slice(0, RECENT_TARGET_LIMIT))
    );
  } catch {
    // Session storage is a nice-to-have only; gameplay must continue without it.
  }
}

function useWordsForSkull({ currentSkull, wordsData }: PropType) {
  const [wordsForSkull, setWordsForSkull] = useState<string[]>([]);
  const [dispWordHistory, setDispWordHistory] = useState<boolean>(false);

  // Memoize the backup word lists
  const backupTargetWordsList = useMemo(() => TargetWords(), []);
  const backupValidationWordsList = useMemo(() => ValidationWords(), []);

  // Use the fetched words if available and valid, otherwise use the static validation list
  const wordsList: { [key: number]: string[] } = useMemo(() => {
    if (wordsData?.words && Object.keys(wordsData?.words)?.length > 0) {
      return wordsData.words;
    }

    return backupValidationWordsList;
  }, [wordsData, backupValidationWordsList]);

  const targetWordsList: { [key: number]: string[] } = useMemo(
    () => backupTargetWordsList,
    [backupTargetWordsList]
  );

  useEffect(() => {
    if (wordsForSkull[0] || currentSkull === undefined) return;

    // Get words of a specific length (Looking back I'm not sure why I excluded words with "@" or "~" here. I'm going to leave it in since it does no harm, but the code is probably unnecessary)
    const getWordsOfLength = (length: number) => {
      if (!targetWordsList[length]) return [];

      return targetWordsList[length]
        ?.map(normalizeWord)
        ?.filter((word) => word?.length === length)
        ?.filter((word) => !word?.includes("@") && !word?.includes("~"));
    };

    // Calculate the effective length of a row, ignoring "@" and "~"
    const calculateEffectiveLength = (row: string[]) => {
      const flattenedRow = Array.isArray(row) ? row.flat() : [row];
      const validCharsCount = flattenedRow.filter((cell) => cell === "").length;
      return validCharsCount;
    };

    // Set to store used words and avoid duplicates
    const usedWords = new Set<string>();
    const recentTargets = new Set(readRecentTargets());

    currentSkull[0]?.forEach((row, index) => {
      // Calculate effective length of the row ignoring "@" and "~"
      const rowLength = calculateEffectiveLength(row);
      let wordsOfCorrectLength = getWordsOfLength(rowLength);

      if (wordsOfCorrectLength?.length === 0) {
        return; //Handle edge case where no valid words found for length
      }

      // Filter out words that have already been used
      wordsOfCorrectLength = wordsOfCorrectLength?.filter(
        (word) => !usedWords?.has(word)
      );

      if (wordsOfCorrectLength?.length === 0) {
        return; //Handle edge case where no remaining unused words for length
      }

      const freshWordsOfCorrectLength = wordsOfCorrectLength.filter(
        (word) => !recentTargets.has(word)
      );
      const candidateWords =
        freshWordsOfCorrectLength.length > 0
          ? freshWordsOfCorrectLength
          : wordsOfCorrectLength;

      // Select a random unused word
      const randomWord =
        candidateWords[Math.floor(Math.random() * candidateWords.length)];

      // Add the chosen word to the usedWords set
      usedWords?.add(randomWord);
      recentTargets.add(randomWord);
      rememberRecentTarget(randomWord);

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
