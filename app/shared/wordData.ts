import Words from "../client/components/data/Words";

export type StaticWordsByLength = Record<number, string[]>;

const wordsByLength = Words() as StaticWordsByLength;

export const WORD_LENGTHS = [3, 4, 5, 6, 7, 8, 9] as const;

export function getWordsByLength(length: number) {
  return wordsByLength[length] ?? [];
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
  return wordsByLength;
}
