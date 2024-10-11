import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, Mock } from "vitest";
import GameOverStats from "../GameOverStats"; // Adjust the path as needed
import MockStatsProvider from "../../../../../client/mocks/components/MockStatsContext";
import MockThemeProvider from "../../../../../client/mocks/components/MockThemeContext";
import useSecondsTimer from "../../../hooks/useSecondsTimer";
import { useStats } from "../../../context/StatsContext";

// Mock the necessary hooks and context
vi.mock("../../../hooks/useSecondsTimer");
vi.mock("../../../context/StatsContext", () => ({
  useStats: vi.fn(),
}));

const mockSetStats = vi.fn();

const MockGameOverStats = () => {
  return render(
    <MockThemeProvider darkThemeActive={true}>
      <MockStatsProvider>
        <GameOverStats
          lives={2}
          maxLives={5}
          isGameOver={true}
          wordsForSkull={["apple", "banana", "cherry"]}
          currentRow={1}
        />
      </MockStatsProvider>
    </MockThemeProvider>
  );
};

describe("GameOverStats component", () => {
  beforeEach(() => {
    // Mock the useSecondsTimer return value
    (useSecondsTimer as Mock).mockReturnValue({
      seconds: 120, // Mock seconds value
      setStartTimer: vi.fn(), // Mock function
    });

    // Mock the useStats hook
    (useStats as Mock).mockReturnValue({
      setStats: mockSetStats,
      difficulty: "medium",
      gameMode: "standard",
    });
    MockGameOverStats();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render the Stats heading", () => {
    const headingElement = screen.getByRole("heading", { name: /stats/i });
    expect(headingElement).toBeInTheDocument();
  });

  it("should render the correct lives left label", () => {
    const textElement = screen.getByText(/lives left/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render the correct lives count", () => {
    const textElement = screen.getByText("2/5");
    expect(textElement).toBeInTheDocument();
  });

  it("should render the correct words count", () => {
    const textElement = screen.getByText("1/3");
    expect(textElement).toBeInTheDocument();
  });

  it("should render the time spent label", () => {
    const textElement = screen.getByText("Time Spent");
    expect(textElement).toBeInTheDocument();
  });

  it("should render the correctly formatted time spent", () => {
    const textElement = screen.getByText("00:02:00");
    expect(textElement).toBeInTheDocument();
  });

  it("should update stats when the game is over", async () => {
    await waitFor(() => {
      expect(mockSetStats).toHaveBeenCalledWith(expect.any(Function));
    });

    // Check that the setStats function is called with the correct new stats
    expect(mockSetStats).toHaveBeenCalledTimes(1);
  });
});

describe("should not render", () => {
  it("should not update stats when the game is not over", async () => {
    render(
      <MockThemeProvider darkThemeActive={true}>
        <MockStatsProvider>
          <GameOverStats
            lives={2}
            maxLives={5}
            isGameOver={false}
            wordsForSkull={["apple", "banana", "cherry"]}
            currentRow={1}
          />
        </MockStatsProvider>
      </MockThemeProvider>
    );

    await waitFor(() => {
      expect(mockSetStats).not.toHaveBeenCalled();
    });
  });
});
