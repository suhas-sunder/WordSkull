import { describe, it, expect } from "vitest";
import GenerateDefaultStylingForKeys from "../GenerateDefaultStylingForKeys";

describe("generates default styling for keys", () => {
  it("should return an object with default styling applied for an array of strings", () => {
    const keyArr = ["a", "b", "c"];
    const styling = "bg-blue-500 text-white";

    const result = GenerateDefaultStylingForKeys({ keyArr, styling });

    expect(result).toEqual({
      a: styling,
      b: styling,
      c: styling,
    });
  });

  it("should return an object with default styling applied for an array of objects", () => {
    const keyArr = [{ key: "a" }, { key: "b" }, { key: "c" }];
    const styling = "bg-blue-500 text-white";

    const result = GenerateDefaultStylingForKeys({
      keyArr,
      styling,
    });

    expect(result).toEqual({
      "[object Object]": styling,
    });
  });

  it("should return an empty object when keyArr is empty", () => {
    const keyArr: never[] = [];
    const styling = "bg-blue-500 text-white";

    const result = GenerateDefaultStylingForKeys({ keyArr, styling });

    expect(result).toEqual({});
  });
});
