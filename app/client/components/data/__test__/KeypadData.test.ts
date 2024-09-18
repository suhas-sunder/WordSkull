import { describe, it, expect } from "vitest";
import KeypadData from "../KeypadData";

describe("KeypadData function", () => {
  it("should return an object", () => {
    const data = KeypadData();
    expect(typeof data).toBe("object");
  });

  it("should contain five rows of keyboard keys", () => {
    const data = KeypadData();
    expect(Object.keys(data)).toHaveLength(5);
  });

  it("should have keys for each row", () => {
    const data = KeypadData();
    expect(data.firstRowKeys).toBeDefined();
    expect(data.secondRowKeys).toBeDefined();
    expect(data.thirdRowKeys).toBeDefined();
    expect(data.fourthRowKeys).toBeDefined();
    expect(data.fifthRowKeys).toBeDefined();
  });

  it("should have the correct number of keys in the first row", () => {
    const data = KeypadData();
    expect(data.firstRowKeys).toHaveLength(10);
  });

  it("should have the correct number of keys in the second row", () => {
    const data = KeypadData();
    expect(data.secondRowKeys).toHaveLength(9);
  });

  it("should have the correct number of keys in the third row", () => {
    const data = KeypadData();
    expect(data.thirdRowKeys).toHaveLength(7);
  });

  it("should have the correct number of keys in the fourth row", () => {
    const data = KeypadData();
    expect(data.fourthRowKeys).toHaveLength(2);
  });

  it("should have the correct number of keys in the fifth row", () => {
    const data = KeypadData();
    expect(data.fifthRowKeys).toHaveLength(1);
  });
});
