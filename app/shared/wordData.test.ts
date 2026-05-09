import { describe, expect, it } from "vitest";
import {
  WORD_LENGTHS,
  getTargetWordsByLength,
  getTotalWordCount,
  getValidationWordsByLength,
  getWordCountByLength,
  getWordsByLength,
  isValidGuess,
} from "./wordData";

describe("static word data helpers", () => {
  it("returns stable word lists and counts by length", () => {
    const threeLetterWords = getWordsByLength(3);

    expect(threeLetterWords.length).toBeGreaterThan(0);
    expect(threeLetterWords).toContain("the");
    expect(getWordCountByLength(3)).toBe(threeLetterWords.length);
  });

  it("returns zero for unsupported lengths and a positive total", () => {
    expect(getWordsByLength(2)).toEqual([]);
    expect(getWordCountByLength(2)).toBe(0);
    expect(getTotalWordCount()).toBeGreaterThan(getWordCountByLength(3));
  });

  it("keeps target pools inside broader validation lists", () => {
    for (const length of WORD_LENGTHS) {
      const validationWords = new Set(getValidationWordsByLength(length));
      const targetWords = getTargetWordsByLength(length);

      expect(targetWords.length).toBeGreaterThan(0);
      expect(targetWords.every((word) => validationWords.has(word))).toBe(true);
    }
  });

  it("provides enough first-session validation words by length", () => {
    const minimums = {
      3: 300,
      4: 500,
      5: 800,
      6: 800,
      7: 500,
      8: 300,
      9: 200,
    } as const;

    for (const length of WORD_LENGTHS) {
      const words = getValidationWordsByLength(length);

      expect(words.length).toBeGreaterThanOrEqual(minimums[length]);
      expect(new Set(words).size).toBe(words.length);
      expect(words.every((word) => word.length === length)).toBe(true);
      expect(words.every((word) => /^[a-z]+$/.test(word))).toBe(true);
    }
  });

  it("accepts common supported guesses with case normalization", () => {
    const commonWords = [
      "cat",
      "dog",
      "run",
      "sun",
      "fire",
      "moon",
      "star",
      "game",
      "house",
      "water",
      "light",
      "plant",
      "table",
      "chair",
      "heart",
      "world",
      "smile",
      "train",
      "stone",
      "bread",
      "music",
      "green",
      "black",
      "white",
      "brown",
      "crown",
      "ghost",
      "skull",
      "sword",
      "magic",
      "river",
      "cloud",
      "flame",
      "dream",
    ];

    for (const word of commonWords) {
      expect(isValidGuess(word.length, word)).toBe(true);
      expect(isValidGuess(word.length, word.toUpperCase())).toBe(true);
    }
  });

  it("rejects unsupported lengths and non-alphabetic guesses", () => {
    expect(isValidGuess(5, "zzzzz")).toBe(false);
    expect(isValidGuess(5, "hou5e")).toBe(false);
    expect(isValidGuess(2, "to")).toBe(false);
  });
});
