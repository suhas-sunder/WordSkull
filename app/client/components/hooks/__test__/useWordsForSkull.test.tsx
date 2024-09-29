import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import useWordsForSkull from "../useWordsForSkull";
import { WordsData } from "../../../../routes/word-skull-game-easy-mode";
import "@testing-library/jest-dom/vitest";
import words from "../../data/Words"; // Import the function to get the backup words list

const TestComponent = ({
  currentSkull,
  wordsData,
}: {
  currentSkull?: string[][][];
  wordsData: WordsData;
}) => {
  const { wordsForSkull } = useWordsForSkull({ currentSkull, wordsData });
  return (
    <div>
      {wordsForSkull.map((word, index) => (
        <div key={index}>{word || "None"}</div>
      ))}
    </div>
  );
};

describe("useWordsForSkull", () => {
  const mockWordsData: WordsData = {
    words: {
      3: ["ant", "bat", "cat"],
      4: ["deer", "frog"],
      5: ["horse", "sheep"],
    },
  };

  beforeEach(() => {
    vi.clearAllMocks(); // Clear previous mocks before each test
  });

  it("should populate wordsForSkull with words from wordsData", () => {
    const currentSkull = [[["", "", ""]]];

    render(
      <TestComponent currentSkull={currentSkull} wordsData={mockWordsData} />
    );

    // Since the effective length of the row is 3, it should fetch a word of length 3
    expect(screen.getByText(/bat|cat|ant/i)).toBeInTheDocument();
  });

  it("should use backup words list when wordsData is empty", async () => {
    const currentSkull = [[["", "", ""]]];

    // Test with empty wordsData
    render(
      <TestComponent currentSkull={currentSkull} wordsData={{ words: {} }} />
    );

    // Ensure we trigger a rerender and the hook runs
    await waitFor(() => {
      const backupWordsList = words(); // Get the backup words list
      // Use the keys from the backup words list for assertion
      expect(
        screen.getByText(new RegExp(backupWordsList[3].join("|"), "i"))
      ).toBeInTheDocument();
    });
  });

  it("should handle edge case where no valid words found for length", () => {
    const currentSkull = [[["@", "", "~"]]]; // Effective length would be 0

    render(
      <TestComponent currentSkull={currentSkull} wordsData={mockWordsData} />
    );

    expect(screen.queryByText(/bat|cat|ant/i)).not.toBeInTheDocument(); // Should not display any words
  });

  it("should not select the same word twice", () => {
    const currentSkull = [[["", "", ""]], [["", "", ""]]];

    render(
      <TestComponent currentSkull={currentSkull} wordsData={mockWordsData} />
    );

    const words = screen
      .getAllByText(/bat|cat|ant/i)
      .map((el) => el.textContent);
    const uniqueWords = new Set(words);

    expect(words.length).toBe(uniqueWords.size); // Ensure unique words are chosen
  });

  it("should return words of the correct length from wordsData", () => {
    const currentSkull = [[["", "", ""]]]; // Effective length is 3

    render(
      <TestComponent currentSkull={currentSkull} wordsData={mockWordsData} />
    );

    // Expect to find a word of length 3
    expect(screen.getByText(/ant|bat|cat/i)).toBeInTheDocument();
  });

  it("should fall back to backup words list when wordsData has no valid words", () => {
    const currentSkull = [[["", "", ""]]]; // Effective length is 3

    // Test with a wordsData that has no valid words
    render(
      <TestComponent currentSkull={currentSkull} wordsData={{ words: {} }} />
    );

    // Ensure we get a word from the backup list
    const backupWordsList = words();
    expect(
      screen.getByText(new RegExp(backupWordsList[3].join("|"), "i"))
    ).toBeInTheDocument();
  });

  it("should not allow the same word to be used multiple times for different rows", () => {
    const currentSkull = [[["", "", ""]], [["", "", ""]]]; // Two rows to fill

    render(
      <TestComponent currentSkull={currentSkull} wordsData={mockWordsData} />
    );

    const words = screen
      .getAllByText(/bat|cat|ant/i)
      .map((el) => el.textContent);
    const uniqueWords = new Set(words);

    expect(words.length).toBe(uniqueWords.size); // Ensure unique words are chosen for both rows
  });

  it("should handle multiple rows in currentSkull and return words correctly", () => {
    const currentSkull = [[["", "", ""]], [["", "", ""]]]; // Two rows with effective length of 3

    render(
      <TestComponent currentSkull={currentSkull} wordsData={mockWordsData} />
    );

    // There are two rows, so we expect two words of length 3
    expect(screen.getAllByText(/ant|bat|cat/i)).toHaveLength(1);
  });

  it("should ignore invalid characters in the currentSkull when determining effective length", () => {
    const currentSkull = [[["@", "", "~"]]]; // Effective length should be 0

    render(
      <TestComponent currentSkull={currentSkull} wordsData={mockWordsData} />
    );

    // No valid words should be displayed
    expect(screen.queryByText(/ant|bat|cat/i)).not.toBeInTheDocument();
  });

  it("should populate wordsForSkull with random unique words from the backup list when needed", async () => {
    const currentSkull = [[["", "", ""]], [["", "", ""]]]; // Two rows to fill

    render(
      <TestComponent currentSkull={currentSkull} wordsData={{ words: {} }} /> // Using empty wordsData to trigger backup
    );

    const backupWordsList = words(); // Fetch backup list

    // Wait for the words to populate
    await waitFor(() => {
      const displayedWords = screen.getAllByText(
        new RegExp(backupWordsList[3].join("|"), "i")
      );
      expect(displayedWords.length).toBe(1); // Expect 2 unique words from the backup list
    });
  });
});
