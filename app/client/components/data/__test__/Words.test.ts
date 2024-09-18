import { describe, it, expect } from "vitest";
import words from "../Words";

type WordsList = {
  [key: string]: string[];
};

describe("renders default words list", () => {
  it("should return an object", () => {
    const result: WordsList = words();
    expect(typeof result).toBe("object");
  });

  it("should contain keys for word lengths", () => {
    const result: WordsList = words();
    expect(result).toHaveProperty("3");
    expect(result).toHaveProperty("4");
    expect(result).toHaveProperty("5");
    expect(result).toHaveProperty("6");
    expect(result).toHaveProperty("7");
    expect(result).toHaveProperty("8");
    expect(result).toHaveProperty("9");
  });

  it("should return arrays for each key", () => {
    const result: WordsList = words();
    (Object.keys(result) as Array<keyof WordsList>).forEach((key) => {
      expect(Array.isArray(result[key])).toBe(true);
    });
  });

  it("should contain only strings in the arrays", () => {
    const result: WordsList = words();
    (Object.keys(result) as Array<keyof WordsList>).forEach((key) => {
      result[key].forEach((word) => {
        expect(typeof word).toBe("string");
      });
    });
  });

  it("should have words of correct lengths for each key", () => {
    const result: WordsList = words();
    expect(result["3"].every((word) => word.length === 3)).toBe(true);
    expect(result["4"].every((word) => word.length === 4)).toBe(true);
    expect(result["5"].every((word) => word.length === 5)).toBe(true);
    expect(result["6"].every((word) => word.length === 6)).toBe(true);
    expect(result["7"].every((word) => word.length === 7)).toBe(true);
    expect(result["8"].every((word) => word.length === 8)).toBe(true);
    expect(result["9"].every((word) => word.length === 9)).toBe(true);
  });
});
