import { fireEvent, render, screen } from "@testing-library/react";
import MockThemeProvider from "../../../mocks/components/MockThemeContext"; // Adjust the import path as necessary
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import GameOverMenu from "../GameOverMenu";
interface PropType {
  darkThemeActive: boolean;
  isGameOver: boolean;
  showGameOverMenu: boolean;
  setShowGameOverMenu: (value: boolean) => void;
  lives: number | null;
  maxLives: number | null;
  seconds: number;
  currentRow: number;
  wordsForSkull: string[];
}

const setShowGameOverMenu = vi.fn();

const MockGameOverMenu = ({
  darkThemeActive,
  isGameOver,
  showGameOverMenu,
  setShowGameOverMenu,
  lives,
  maxLives,
  seconds,
  currentRow,
  wordsForSkull,
}: PropType) => {
  render(
    <MemoryRouter>
      <MockThemeProvider darkThemeActive={darkThemeActive}>
        <GameOverMenu
          isGameOver={isGameOver}
          showGameOverMenu={showGameOverMenu}
          setShowGameOverMenu={setShowGameOverMenu}
          lives={lives}
          maxLives={maxLives}
          seconds={seconds}
          currentRow={currentRow}
          wordsForSkull={wordsForSkull}
        />
      </MockThemeProvider>
    </MemoryRouter>
  );
};

afterEach(() => {
  vi.clearAllMocks();
});

describe("should render default elements when game is over and game over menu is open", () => {
  beforeEach(() => {
    MockGameOverMenu({
      darkThemeActive: false,
      isGameOver: true,
      lives: 5,
      maxLives: 5,
      seconds: 0,
      currentRow: 0,
      wordsForSkull: ["hello", "world", "hello"],
      showGameOverMenu: true,
      setShowGameOverMenu: setShowGameOverMenu,
    });
  });

  it("should render game over modal background underlay", () => {
    const buttonElement = screen.getByTestId(/game-over-background/i);

    expect(buttonElement).toBeInTheDocument();
  });

  it("should render close menu button", () => {
    const buttonElement = screen.getByTestId(/close-menu-button/i);

    expect(buttonElement).toBeInTheDocument();
  });

  it("should render 'You Lose!' message when the current row is less than 3", () => {
    const messageElement = screen.getByText(/You Lose!/i);
    expect(messageElement).toBeInTheDocument();
  });

  it("should display the correct number of lives left", () => {
    const livesElement = screen.getByText(/5\/5/i);
    expect(livesElement).toBeInTheDocument();
  });

  it("should display the correct number of correct words", () => {
    const wordsElement = screen.getByText(/0\/3/i); // currentRow = 0, wordsForSkull.length = 3
    expect(wordsElement).toBeInTheDocument();
  });

  it("should display the correct time spent", () => {
    const timeElement = screen.getByText(/00:00:00/i); // seconds = 0
    expect(timeElement).toBeInTheDocument();
  });

  it("should render the 'Play Again' button", () => {
    const playAgainButton = screen.getByText(/Play Again/i);
    expect(playAgainButton).toBeInTheDocument();
  });

  it("should render the 'Share Your Results!' section", () => {
    const shareSection = screen.getByText(/Share Your Results!/i);
    expect(shareSection).toBeInTheDocument();
  });

  it("should render the 'Download' button", () => {
    const downloadButton = screen.getByText(/Download/i);
    expect(downloadButton).toBeInTheDocument();
  });

  it("should render the 'Copy' button", () => {
    const copyButton = screen.getByText(/Copy/i);
    expect(copyButton).toBeInTheDocument();
  });

  it("should call setShowGameOverMenu(false) when the background is clicked", () => {
    const backgroundElement = screen.getByTestId(/game-over-background/i);
    fireEvent.click(backgroundElement);
    expect(setShowGameOverMenu).toHaveBeenCalledWith(false);
  });

  it("should call window.location.reload() when 'Play Again' is clicked", () => {
    // Backup the original window.location object
    const originalLocation = window.location;

    // Mock window.location with a reload method
    window.location = { ...window.location, reload: vi.fn() };

    const playAgainButton = screen.getByText(/Play Again/i);
    fireEvent.click(playAgainButton);

    expect(window.location.reload).toHaveBeenCalled();

    // Restore the original window.location object after the test
    window.location = originalLocation;
  });

  it("should show 'Copied!' text after clicking the 'Copy' button", async () => {
    window.alert = vi.fn();
    const copyButton = screen.getByText(/Copy/i);
    fireEvent.click(copyButton);

    const copiedText = await screen.findByText(/Copied!/i);
    expect(copiedText).toBeInTheDocument();
  });

  it("should render the 'Share' button if web share is supported", () => {
    // Mock the condition where web share is supported
    vi.mock("../hooks/useCaptureHTML", () => ({
      default: () => ({
        isWebShareSupported: true,
        shareImage: vi.fn(),
      }),
    }));

    const shareButton = screen.getByText(/Share/i);
    expect(shareButton).toBeInTheDocument();
  });

  it("should not render the 'Share' button if web share is not supported", () => {
    const shareButton = screen.queryByRole("button", { name: /Share/i });
    expect(shareButton).not.toBeInTheDocument();
  });
});

describe("should not render ", () => {
  beforeEach(() => {
    MockGameOverMenu({
      darkThemeActive: false,
      isGameOver: false,
      lives: 5,
      maxLives: 5,
      seconds: 0,
      currentRow: 0,
      wordsForSkull: ["hello", "world", "hello"],
      showGameOverMenu: false,
      setShowGameOverMenu: setShowGameOverMenu,
    });
  });
  it("should not render menu if game is not over or game over menu is not open", () => {
    const divElement = screen.queryByTestId(/game-over-menu/i);

    expect(divElement).not.toBeInTheDocument();
  });
});
