import { describe, it, expect } from "vitest";
import ShiftIndexBackward from "../ShiftIndexBackward";

describe("shifts index correctly", () => {
  it('should move the index back skipping "@" and "~"', () => {
    const currentSkull = [[["@", "~", "", "", "", "@"]]];
  
    const result = ShiftIndexBackward({
      currentSkull,
      currentRow: 0,
      currentRowIndex: 4, // Start near the end
    });
  
    // Expected index should be 3 (moving backwards from index 4)
    expect(result).toBe(3);
  });

  it("should handle when the index goes negative and wrap around to the first empty square", () => {
    const currentSkull = [[["@", "~", "@", "@", "@", ""]]];

    const result = ShiftIndexBackward({
      currentSkull,
      currentRow: 0,
      currentRowIndex: 1, // Should wrap around when less than 0
    });

    // Expected index should wrap to the first empty square, which is at index 5
    expect(result).toBe(5);
  });

  it('should return previous index when no "@" or "~" are encountered', () => {
    const currentSkull = [[["", "", "", "", ""]]];

    const result = ShiftIndexBackward({
      currentSkull,
      currentRow: 0,
      currentRowIndex: 3, // No "@" or "~", just move back one
    });

    // Expected index should be 2, just moving one step back
    expect(result).toBe(2);
  });

  it('should handle a situation where the entire row is filled with "@" and "~"', () => {
    const currentSkull = [[["@", "@", "@", "@", "@", "@"]]];

    const result = ShiftIndexBackward({
      currentSkull,
      currentRow: 0,
      currentRowIndex: 5, // Entire row is filled with "@" or "~"
    });

    // In this case, it should just keep going back and return -1 (no empty space)
    expect(result).toBe(-1);
  });
});
