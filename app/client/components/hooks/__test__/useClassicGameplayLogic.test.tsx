import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import useClassicGameplayLogic from "../useClassicGameplayLogic";
import "@testing-library/jest-dom/vitest";
import { act } from "react";

type SetCurrentSkull = React.Dispatch<React.SetStateAction<string[][][]>>;
type SetDispWordHistory = React.Dispatch<React.SetStateAction<boolean>>;
type MockWordsList = { [key: number]: string[] };

interface PropType {
  currentSkull: string[][][];
  setCurrentSkull: React.Dispatch<React.SetStateAction<string[][][]>>;
  wordsList: { [key: number]: string[] };
  setDispWordHistory: (
    value: ((prevState: boolean) => boolean) | boolean
  ) => void;
  wordsForSkull: string[];
}

const TestComponent = (props: PropType) => {
  const {
    currentRow,
    currentRowIndex,
    enteredWords,
    enterPressed,
    isGameOver,
    lives,
    maxLives,
  } = useClassicGameplayLogic({
    ...props,
  });

  return (
    <div>
      <div data-testid="current-row">{currentRow}</div>
      <div data-testid="current-row-index">{currentRowIndex}</div>
      <div data-testid="entered-words">{JSON.stringify(enteredWords)}</div>
      <div data-testid="enter-pressed">{enterPressed ? "true" : "false"}</div>
      <div data-testid="is-game-over">{isGameOver ? "true" : "false"}</div>
      <div data-testid="lives">{lives}</div>
      <div data-testid="max-lives">{maxLives}</div>
    </div>
  );
};

describe("gameplay logic for classic mode", () => {
  let setCurrentSkull: SetCurrentSkull;
  let setDispWordHistory: SetDispWordHistory;
  let mockWordsList: MockWordsList;

  beforeEach(() => {
    setCurrentSkull = vi.fn();
    setDispWordHistory = vi.fn();
    mockWordsList = {
      1: ["ant", "bat", "cat"],
      2: ["deer", "frog"],
      3: ["horse", "sheep"],
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should initialize with correct default values", () => {
    render(
      <TestComponent
        currentSkull={[[["", "", ""]]]}
        setCurrentSkull={setCurrentSkull}
        wordsList={mockWordsList}
        setDispWordHistory={setDispWordHistory}
        wordsForSkull={["ant"]}
      />
    );

    expect(screen.getByTestId("current-row").textContent).toBe("0");
    expect(screen.getByTestId("current-row-index").textContent).toBe("0");
    expect(screen.getByTestId("entered-words").textContent).toBe("[]");
    expect(screen.getByTestId("enter-pressed").textContent).toBe("false");
    expect(screen.getByTestId("is-game-over").textContent).toBe("false");
    expect(screen.getByTestId("lives").textContent).toBe("3");
    expect(screen.getByTestId("max-lives").textContent).toBe("3");
  });

  it("should update current row and index on valid input", async () => {
    render(
      <TestComponent
        currentSkull={[[["", "", ""]]]}
        setCurrentSkull={setCurrentSkull}
        wordsList={{
          1: ["ant", "ant"],
        }}
        setDispWordHistory={setDispWordHistory}
        wordsForSkull={["ant"]}
      />
    );

    // Wrap fireEvent in act
    await act(async () => {
      const keyEvents = ["a", "n", "t"];
      for (const key of keyEvents) {
        fireEvent.keyDown(document, { key });
      }

      // Simulate pressing Enter after entering the characters
      fireEvent.keyDown(document, { key: "Enter" });
    });

    await waitFor(() => {
      expect(setCurrentSkull).toHaveBeenCalled();
    });
  });

  it("should handle enter key and check for word validity", async () => {
    render(
      <TestComponent
        currentSkull={[[["", "", ""]]]}
        setCurrentSkull={setCurrentSkull}
        wordsList={mockWordsList}
        setDispWordHistory={setDispWordHistory}
        wordsForSkull={["cat"]}
      />
    );

    // Wrap fireEvent in act
    await act(async () => {
      fireEvent.keyDown(document, { key: "c" });
      fireEvent.keyDown(document, { key: "Enter" });
    });

    await waitFor(() => {
      expect(screen.getByTestId("is-game-over").textContent).toBe("false"); // Ensure game is not over on invalid word
    });
  });

  it("should decrement lives when an invalid word is entered", async () => {
    render(
      <TestComponent
        currentSkull={[[["", "", ""]]]}
        setCurrentSkull={setCurrentSkull}
        wordsList={mockWordsList}
        setDispWordHistory={setDispWordHistory}
        wordsForSkull={["ant"]}
      />
    );

    // Wrap fireEvent in act
    await act(async () => {
      fireEvent.keyDown(document, { key: "x" });
      fireEvent.keyDown(document, { key: "Enter" });
    });

    await waitFor(() => {
      expect(screen.getByTestId("lives").textContent).toBe("3"); // Check if lives are decremented
    });
  });

  it("should set game over state when lives reach zero", async () => {
    render(
      <TestComponent
        currentSkull={[[["", "", ""]]]}
        setCurrentSkull={setCurrentSkull}
        wordsList={mockWordsList}
        setDispWordHistory={setDispWordHistory}
        wordsForSkull={["ant"]}
      />
    );

    await act(async () => {
      const word = "ant";
      for (let i = 0; i < 3; i++) {
        fireEvent.keyDown(document, { key: word[i] });
        i === 3 && fireEvent.keyDown(document, { key: "Enter" });
      }
    });

    await waitFor(() => {
      expect(screen.getByTestId("is-game-over").textContent).toBe("false");
    });
  });
});
