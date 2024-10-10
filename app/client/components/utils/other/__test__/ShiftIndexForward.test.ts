import { describe, expect, it } from "vitest";
import ShiftIndexForward from "../ShiftIndexForward";

describe("shifts index correctly", () => {
  it("should return 0 for an out-of-bounds currentRow", () => {
    const currentSkull = [
      [
        ["@", "~"],
        ["~", "@"],
      ],
    ];
    const currentRow = 2; // Out of bounds
    const currentRowIndex = 0;

    const result = ShiftIndexForward({
      currentSkull,
      currentRow,
      currentRowIndex,
    });

    expect(result).toBe(0);
  });

  it("should return the correct shift index when there are leading special characters", () => {
    const currentSkull = [[["@", "~", "~", "A", "B", "C"]]];
    const currentRow = 0;
    const currentRowIndex = 0;

    const result = ShiftIndexForward({
      currentSkull,
      currentRow,
      currentRowIndex,
    });

    expect(result).toBe(3); // There are three special characters '@' and '~' and '~'
  });

  it("should return the correct shift index when there are no leading special characters", () => {
    const currentSkull = [[["A", "B", "C", "~", "@"]]];
    const currentRow = 0;
    const currentRowIndex = 0;

    const result = ShiftIndexForward({
      currentSkull,
      currentRow,
      currentRowIndex,
    });

    expect(result).toBe(0); // No special characters at the start
  });

  it("should cache the computed shift index values", () => {
    const currentSkull = [[["@", "~", "A", "B", "C"]]];
    const currentRow = 0;
    const currentRowIndex = 0;

    // First call should compute and cache the result
    const resultFirstCall = ShiftIndexForward({
      currentSkull,
      currentRow,
      currentRowIndex,
    });
    expect(resultFirstCall).toBe(2);

    // Second call should retrieve the cached value
    const resultSecondCall = ShiftIndexForward({
      currentSkull,
      currentRow,
      currentRowIndex,
    });
    expect(resultSecondCall).toBe(2); // Should return cached value

    // Modify the inputs slightly to ensure cache is used correctly
    const currentRowIndexModified = 1;
    const resultThirdCall = ShiftIndexForward({
      currentSkull,
      currentRow,
      currentRowIndex: currentRowIndexModified,
    });
    expect(resultThirdCall).toBe(1); // Should compute a new value
  });
});
