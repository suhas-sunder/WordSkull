import { describe, expect, it } from "vitest";
import {
  DEFAULT_SORTED_WORDS_URL,
  SORTED_WORDS_CACHE_KEY,
  getSortedWordsForLength,
  getSortedWordsUrl,
  normalizeSortedWordsPayload,
} from "./remoteWordLists";

describe("remote sorted word-list helpers", () => {
  it("uses the existing gzipped sortedWords file by default", () => {
    expect(DEFAULT_SORTED_WORDS_URL).toBe(
      "https://www.doodlegarden.com/words-for-games/sortedWords.json.gz"
    );
    expect(getSortedWordsUrl()).toBe(DEFAULT_SORTED_WORDS_URL);
    expect(getSortedWordsUrl()).not.toContain("/words/v1/");
    expect(getSortedWordsUrl()).not.toContain("-letter.json");
  });

  it("can build the sortedWords URL from an optional public CDN base", () => {
    expect(getSortedWordsUrl("https://cdn.example.com")).toBe(
      "https://cdn.example.com/words-for-games/sortedWords.json.gz"
    );
  });

  it("reads the selected length from the keyed sortedWords object", () => {
    const payload = {
      "4": ["TREE", "wolf"],
      "5": ["HOUSE", "house", "water", "bad-word", "tree"],
      "6": ["planet"],
    };

    expect(getSortedWordsForLength(payload, 5)).toEqual(["house", "water"]);
  });

  it("filters wrong-length words and removes duplicates", () => {
    expect(
      normalizeSortedWordsPayload({
        "3": ["CAT", "cat", "cats", "c4t", "dog"],
        "5": ["skull", "SKULL", "stone", "stones"],
      })
    ).toEqual({
      "3": ["cat", "dog"],
      "5": ["skull", "stone"],
    });
  });

  it("fails malformed data safely", () => {
    expect(normalizeSortedWordsPayload(null)).toEqual({});
    expect(normalizeSortedWordsPayload(["house"])).toEqual({});
    expect(normalizeSortedWordsPayload({ "5": "house" })).toEqual({});
    expect(getSortedWordsForLength({ nope: ["house"] }, 5)).toEqual([]);
  });

  it("supports the shared sortedWords cache key", () => {
    expect(SORTED_WORDS_CACHE_KEY).toBe("wordskull:sortedWords:v1");

    const cachedPayload = normalizeSortedWordsPayload({
      "5": ["HOUSE", "water", "house"],
      "6": ["planet"],
    });

    expect(getSortedWordsForLength(cachedPayload, 5)).toEqual([
      "house",
      "water",
    ]);
  });
});
