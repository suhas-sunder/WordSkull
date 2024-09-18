import { describe, it, expect } from "vitest";
import Skulls from "../Skulls";

describe("renders symbols for skull", () => {
  it("should return an array", () => {
    const data = Skulls();
    expect(Array.isArray(data)).toBe(true);
  });

  it("should contain 16 skull patterns", () => {
    const data = Skulls();
    expect(data).toHaveLength(16);
  });

  it("should contain arrays for each skull pattern", () => {
    const data = Skulls();
    data.forEach((skull) => {
      expect(Array.isArray(skull)).toBe(true);
    });
  });

  it("should contain arrays of arrays for each skull pattern", () => {
    const data = Skulls();
    data.forEach((skull) => {
      skull.forEach((row) => {
        expect(Array.isArray(row)).toBe(true);
      });
    });
  });

  it("should contain empty strings and valid symbols", () => {
    const validSymbols = ["", "@", "~"];
    const data = Skulls();
    data.forEach((skull) => {
      skull.forEach((row) => {
        row.forEach((cell) => {
          expect(validSymbols).toContain(cell);
        });
      });
    });
  });
});
