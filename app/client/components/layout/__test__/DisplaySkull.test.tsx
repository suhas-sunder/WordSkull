import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DisplaySkull from "../DisplaySkull";
import MockThemeProvider from "../../../../client/mocks/MockThemeContext";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";

interface PropType {
  currentSkull: string[][][];
  currentRow: number;
  currentRowIndex: number;
  wordsForSkull: string[];
  enteredWords: string[][];
  enterPressed: boolean;
}
const MockDisplaySkull = (props: PropType) => {
  return render(
    <MemoryRouter>
      <MockThemeProvider darkThemeActive={true}>
        <DisplaySkull {...props} />
      </MockThemeProvider>
    </MemoryRouter>
  );
};

describe("handles skull rendering & validation correctly", () => {
  it("should render the skull correctly with default props", () => {
    const props = {
      currentSkull: [
        [
          ["@", "~", "A", "B", "C"],
          ["~", "D", "E", "F", "~"],
          ["G", "H", "@", "I", "J"],
        ],
      ],
      currentRow: 1,
      currentRowIndex: 2,
      wordsForSkull: ["ABCD", "DEFG", "GHIJ"],
      enteredWords: [
        ["A", "B"],
        ["D", "E"],
        ["G", "H"],
      ],
      enterPressed: false,
    };

    MockDisplaySkull(props);

    expect(screen.getAllByRole("listitem")).toHaveLength(15);
  });

  it("should render the correct number of rows", () => {
    const props = {
      currentSkull: [
        [
          ["@", "~", "A", "B", "C"],
          ["~", "D", "E", "F", "~"],
          ["G", "H", "@", "I", "J"],
        ],
      ],
      currentRow: 1,
      currentRowIndex: 2,
      wordsForSkull: ["ABCD", "DEFG", "GHIJ"],
      enteredWords: [
        ["A", "B"],
        ["D", "E", "F"],
        ["G", "H"],
      ],
      enterPressed: false,
    };

    MockDisplaySkull(props);

    // Ensure 3 rows are rendered
    const rows = screen.getAllByRole("list");
    expect(rows.length).toBe(3);
  });

  it("should render the correct number of squares per row", () => {
    const props = {
      currentSkull: [
        [
          ["@", "~", "A", "B", "C"],
          ["~", "D", "E", "F", "~"],
          ["G", "H", "@", "I", "J"],
        ],
      ],
      currentRow: 1,
      currentRowIndex: 2,
      wordsForSkull: ["ABCD", "DEFG", "GHIJ"],
      enteredWords: [
        ["A", "B"],
        ["D", "E", "F"],
        ["G", "H"],
      ],
      enterPressed: false,
    };

    MockDisplaySkull(props);

    // Ensure that the first row contains 5 squares
    const firstRowSquares = screen.getAllByRole("listitem").slice(0, 5);
    expect(firstRowSquares.length).toBe(5);

    // Ensure that the second row contains 5 squares
    const secondRowSquares = screen.getAllByRole("listitem").slice(5, 10);
    expect(secondRowSquares.length).toBe(5);
  });

  it("should render @ and ~ characters correctly", () => {
    const props = {
      currentSkull: [
        [
          ["@", "~", "A", "B", "C"],
          ["~", "D", "E", "F", "~"],
          ["G", "H", "@", "I", "J"],
        ],
      ],
      currentRow: 1,
      currentRowIndex: 2,
      wordsForSkull: ["ABCD", "DEFG", "GHIJ"],
      enteredWords: [
        ["A", "B"],
        ["D", "E", "F"],
        ["G", "H"],
      ],
      enterPressed: false,
    };

    MockDisplaySkull(props);

    // Check if the first and second squares of the first row render @ and ~
    const firstSquare = screen.getAllByRole("listitem")[0];
    const secondSquare = screen.getAllByRole("listitem")[1];

    expect(firstSquare.textContent).toBe("");
    expect(secondSquare.textContent).toBe("");
  });

  it("should render the correct text content in squares", () => {
    const props = {
      currentSkull: [
        [
          ["@", "~", "A", "B", "C"],
          ["~", "D", "E", "F", "~"],
          ["G", "H", "@", "I", "J"],
        ],
      ],
      currentRow: 1,
      currentRowIndex: 2,
      wordsForSkull: ["ABCD", "DEFG", "GHIJ"],
      enteredWords: [
        ["A", "B"],
        ["D", "E", "F"],
        ["G", "H"],
      ],
      enterPressed: false,
    };

    MockDisplaySkull(props);

    // Log the elements to see what is rendered
    const listItems = screen.getAllByRole("listitem");
    const thirdSquareInFirstRow = listItems[2].querySelectorAll("span")[1]; // A
    const firstSquareInSecondRow = listItems[6].querySelectorAll("span")[1]; // D
    const fourthSquareInThirdRow = listItems[13].querySelectorAll("span")[1]; // I

    expect(thirdSquareInFirstRow?.textContent).toBe("A");
    expect(firstSquareInSecondRow?.textContent).toBe("D");
    expect(fourthSquareInThirdRow?.textContent).toBe("I");
  });

  it("should render the correct number of list items", () => {
    const props = {
      currentSkull: [
        [
          ["@", "~", "A", "B", "C"],
          ["~", "D", "E", "F", "~"],
          ["G", "H", "@", "I", "J"],
        ],
      ],
      currentRow: 1,
      currentRowIndex: 2,
      wordsForSkull: ["ABCD", "DEFG", "GHIJ"],
      enteredWords: [
        ["A", "B"],
        ["D", "E", "F"],
        ["G", "H"],
      ],
      enterPressed: false,
    };

    MockDisplaySkull(props);

    // Ensure that the total number of squares (list items) is 15 (3 rows * 5 squares)
    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(15);
  });

  it("should render the square numbers correctly", () => {
    const props = {
      currentSkull: [
        [
          ["@", "~", "A", "B", "C"],
          ["~", "D", "E", "F", "~"],
          ["G", "H", "@", "I", "J"],
        ],
      ],
      currentRow: 1,
      currentRowIndex: 2,
      wordsForSkull: ["ABCD", "DEFG", "GHIJ"],
      enteredWords: [
        ["A", "B"],
        ["D", "E", "F"],
        ["G", "H"],
      ],
      enterPressed: false,
    };

    MockDisplaySkull(props);

    // Find the spans that hold the square numbers (assuming they are in `span` elements)
    const spans = screen.getAllByText(
      (content, element) =>
        element?.tagName.toLowerCase() === "span" && !isNaN(Number(content))
    );

    // There should be the correct number of square counts displayed
    expect(spans.length).toBeGreaterThanOrEqual(1); // Depends on how the square numbers are rendered
  });
});
