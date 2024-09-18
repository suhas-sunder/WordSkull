import { describe, it, expect } from "vitest";
import KeyboardData from "../KeyboardData";

describe("KeyboardData function", () => {
  it("should return an object", () => {
    const data = KeyboardData();
    expect(typeof data).toBe("object");
  });

  it("should contain five rows of keyboard keys", () => {
    const data = KeyboardData();
    expect(Object.keys(data)).toHaveLength(5);
  });

  it("should have keys for each row", () => {
    const data = KeyboardData();
    expect(data.firstRowKeys).toBeDefined();
    expect(data.secondRowKeys).toBeDefined();
    expect(data.thirdRowKeys).toBeDefined();
    expect(data.fourthRowKeys).toBeDefined();
    expect(data.fifthRowKeys).toBeDefined();
  });

  it("should have the correct number of keys in the first row", () => {
    const data = KeyboardData();
    expect(data.firstRowKeys).toHaveLength(14);
  });

  it("should have the correct number of keys in the second row", () => {
    const data = KeyboardData();
    expect(data.secondRowKeys).toHaveLength(14);
  });

  it("should have the correct number of keys in the third row", () => {
    const data = KeyboardData();
    expect(data.thirdRowKeys).toHaveLength(13);
  });

  it("should have the correct number of keys in the fourth row", () => {
    const data = KeyboardData();
    expect(data.fourthRowKeys).toHaveLength(12);
  });

  it("should have the correct number of keys in the fifth row", () => {
    const data = KeyboardData();
    expect(data.fifthRowKeys).toHaveLength(8);
  });
});
