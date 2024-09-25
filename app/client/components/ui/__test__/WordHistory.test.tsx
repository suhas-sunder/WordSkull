import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import WordHistory from "../WordHistory";

describe("handles word history default behavior correctly", () => {
  const mockSetDispWordHistory = vi.fn();

  const enteredWords = [
    ["h", "e", "l", "l", "o"], // Correct word
    ["w", "r", "o", "l", "d"], // Partially correct (wrong character)
    ["h", "a", "l", "l", "o"], // One incorrect character in a correct word
  ];

  const wordsForSkull = ["hello", "world", "hello"];

  it("should render the word history button", () => {
    const currentRow = 1;
    render(
      <WordHistory
        enteredWords={enteredWords}
        currentRow={currentRow}
        wordsForSkull={wordsForSkull}
        setDispWordHistory={mockSetDispWordHistory}
        dispWordHistory={false}
      />
    );

    expect(
      screen.getByTitle(
        "Hold 'Shift' or press 'Space Bar' key to view your attempts."
      )
    ).toBeInTheDocument();
  });

  it("should toggle word history visibility", () => {
    const currentRow = 1;
    render(
      <WordHistory
        enteredWords={enteredWords}
        currentRow={currentRow}
        wordsForSkull={wordsForSkull}
        setDispWordHistory={mockSetDispWordHistory}
        dispWordHistory={false}
      />
    );

    fireEvent.click(
      screen.getByTitle(
        "Hold 'Shift' or press 'Space Bar' key to view your attempts."
      )
    );
    expect(mockSetDispWordHistory).toHaveBeenCalledWith(true);
  });

  it("should navigate through previous word entries", () => {
    const currentRow = 1;
    render(
      <WordHistory
        enteredWords={enteredWords}
        currentRow={currentRow}
        wordsForSkull={wordsForSkull}
        setDispWordHistory={mockSetDispWordHistory}
        dispWordHistory={true}
      />
    );

    const arrowButtons = screen.getAllByTestId(/ArrowLeftIcon/i);
    fireEvent.click(arrowButtons[0]);

    expect(screen.getByText("Guesses for Row 1")).toBeInTheDocument();
  });
});

describe("handles character validation correctly", () => {
  it("should apply correct styles for fully correct characters in the correct word", async () => {
    // Set the props directly
    render(
      <WordHistory
        enteredWords={[["hello"]]} // The guessed word
        currentRow={0} // We're focusing on the first row
        wordsForSkull={["hello"]} // The correct word
        setDispWordHistory={() => {}} // Placeholder function
        dispWordHistory={true} // Make sure history is displayed
      />
    );

    // Wait for the component to render fully before making assertions
    await waitFor(() => {
      const letters = screen.getAllByText(/[a-z]/i);

      // Check styles for the word "hello"
      expect(letters[0]).toHaveClass(
        "!border-green-400 !text-green-600 !bg-green-100"
      ); // 'h' is correct
      expect(letters[1]).toHaveClass(
        "!border-green-400 !text-green-600 !bg-green-100"
      ); // 'e' is correct
      expect(letters[2]).toHaveClass(
        "!border-green-400 !text-green-600 !bg-green-100"
      ); // 'l' is correct
      expect(letters[3]).toHaveClass(
        "!border-green-400 !text-green-600 !bg-green-100"
      ); // 'l' is correct
      expect(letters[4]).toHaveClass(
        "!border-green-400 !text-green-600 !bg-green-100"
      ); // 'o' is correct
    });
  });

  it("should apply correct styles for fully incorrect word", async () => {
    render(
      <WordHistory
        enteredWords={[["apple"]]}
        currentRow={0}
        wordsForSkull={["goods"]}
        setDispWordHistory={() => {}}
        dispWordHistory={true}
      />
    );

    await waitFor(() => {
      const letters = screen.getAllByText(/[a-z]/i);

      // Expect the fully incorrect letters to have the neutral styles
      expect(letters[0]).toHaveClass("border-slate-300 text-slate-500"); // 'a' (incorrect)
      expect(letters[1]).toHaveClass("border-slate-300 text-slate-500"); // 'p'
      expect(letters[2]).toHaveClass("border-slate-300 text-slate-500"); // 'p'
      expect(letters[3]).toHaveClass("border-slate-300 text-slate-500"); // 'l'
      expect(letters[4]).toHaveClass("border-slate-300 text-slate-500"); // 'e'
    });
  });

  it("should apply correct styles for a single character guess", async () => {
    render(
      <WordHistory
        enteredWords={[["h"]]} // Single character
        currentRow={0}
        wordsForSkull={["hello"]}
        setDispWordHistory={() => {}}
        dispWordHistory={true}
      />
    );

    await waitFor(() => {
      const letters = screen.getAllByText(/[a-z]/i);
      expect(letters[0]).toHaveClass(
        "!border-green-400 !text-green-600 !bg-green-100"
      ); // 'h' (correct)
    });
  });
});
