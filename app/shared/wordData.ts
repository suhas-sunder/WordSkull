import Words, { TargetWords, ValidationWords } from "../client/components/data/Words";

export type StaticWordsByLength = Record<number, string[]>;

const validationWordsByLength = ValidationWords() as StaticWordsByLength;
const targetWordsByLength = TargetWords() as StaticWordsByLength;
const validationSetsByLength = new Map<number, Set<string>>();

export const WORD_LENGTHS = [3, 4, 5, 6, 7, 8, 9] as const;

export function normalizeWord(word: string) {
  return word.trim().toLowerCase();
}

export function getWordsByLength(length: number) {
  return getPublicWordListWordsByLength(length);
}

export function getValidationWordsByLength(length: number) {
  return validationWordsByLength[length] ?? [];
}

export function getTargetWordsByLength(length: number) {
  return targetWordsByLength[length] ?? [];
}

export function getPublicWordListWordsByLength(length: number) {
  return targetWordsByLength[length] ?? [];
}

export function getWordCountByLength(length: number) {
  return getWordsByLength(length).length;
}

export function getWordCountsByLength() {
  return WORD_LENGTHS.reduce<Record<number, number>>((counts, length) => {
    counts[length] = getWordCountByLength(length);
    return counts;
  }, {});
}

export function getTotalWordCount() {
  return WORD_LENGTHS.reduce(
    (total, length) => total + getWordCountByLength(length),
    0
  );
}

export function getStaticWordsByLength() {
  return Words() as StaticWordsByLength;
}

function getValidationSet(length: number) {
  const existingSet = validationSetsByLength.get(length);
  if (existingSet) return existingSet;

  const words = getValidationWordsByLength(length);
  const nextSet = new Set(words);
  validationSetsByLength.set(length, nextSet);
  return nextSet;
}

export function isValidGuess(length: number, guess: string) {
  const normalizedGuess = normalizeWord(guess);

  return (
    normalizedGuess.length === length &&
    /^[a-z]+$/.test(normalizedGuess) &&
    getValidationSet(length).has(normalizedGuess)
  );
}
