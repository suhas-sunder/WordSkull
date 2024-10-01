import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import GameOverStatsCapture from "../GameOverStatsCapture";
import MockThemeProvider from "../../../mocks/components/MockThemeContext";
import { MemoryRouter } from "react-router-dom";
import SecondsToTime from "../../utils/converters/SecondsToTime";

interface PropType {
  darkthemeActive: boolean;
  isGameOver: boolean;
  showGameOverMenu: boolean;
  setShowGameOverMenu: (value: boolean) => void;
  lives: number | null;
  maxLives: number | null;
  currentRow: number;
  lettersPerSkull?: string;
  wordsForSkull: string[];
  seconds: number;
}

const MockGameOverStatsCapture = (props: PropType) => {
  return render(
    <MemoryRouter>
      <MockThemeProvider darkThemeActive={props.darkthemeActive}>
        <GameOverStatsCapture {...props} />
      </MockThemeProvider>
    </MemoryRouter>
  );
};

const props = {
  darkthemeActive: true,
  isGameOver: true,
  showGameOverMenu: true,
  setShowGameOverMenu: vi.fn(),
  lives: 3,
  maxLives: 5,
  currentRow: 2,
  wordsForSkull: ["word1", "word2", "word3"],
  seconds: 120,
};

beforeEach(() => {
  MockGameOverStatsCapture(props);
});

describe("GameOverStatsCapture Component", () => {
  it("should renders element with text 'Correct Words'", () => {
    expect(screen.getByText("Correct Words")).toBeInTheDocument();
  });

  it("should renders element with text 'Lives Left'", () => {
    expect(screen.getByText("Lives Left")).toBeInTheDocument();
  });

  it("should renders element with text 'Time Spent'", () => {
    expect(screen.getByText("Time Spent")).toBeInTheDocument();
  });

  it("should conditionally render stats when game over menu is shown", () => {
    expect(screen.getByText("3/5")).toBeInTheDocument(); // Lives
    expect(screen.getByText("2/3")).toBeInTheDocument(); // Correct words
    expect(screen.getByText(SecondsToTime(120))).toBeInTheDocument(); // Time spent
  });

  it("should render heading element by integrating with Header", () => {
    expect(
      screen.getByRole("heading", { name: /W💀RD SKULL/i })
    ).toBeInTheDocument();
  });
});
