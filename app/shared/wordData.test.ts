import { describe, expect, it } from "vitest";
import { getTotalWordCount, getWordCountByLength, getWordsByLength } from "./wordData";

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
});
