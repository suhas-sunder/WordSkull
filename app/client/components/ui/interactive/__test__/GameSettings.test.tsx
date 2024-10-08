import { render, screen, fireEvent } from "@testing-library/react";
import MockThemeProvider from "../../../../mocks/components/MockThemeContext"; // Adjust the import path as necessary
import { MemoryRouter } from "react-router-dom";
import GameSettings from "../GameSettings";
import "@testing-library/jest-dom/vitest";
interface PropType {
  darkThemeActive: boolean;
  showSettings: boolean;
  setShowSettings: (value: boolean) => void;
  showKeyboard: boolean;
  setShowKeyboard: (value: (prevState: boolean) => boolean) => void;
}

const setShowSettings = vi.fn();
const setShowKeyboard = vi.fn();

const MockGameSettings = ({ darkThemeActive, showSettings }: PropType) => {
  render(
    <MemoryRouter>
      <MockThemeProvider darkThemeActive={darkThemeActive}>
        <GameSettings
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />
      </MockThemeProvider>
    </MemoryRouter>
  );
};

afterEach(() => {
  vi.clearAllMocks();
});

describe("should render default elements", () => {
  it("should render settings text lables when showSettings is true", () => {
    MockGameSettings({
      darkThemeActive: false,
      showSettings: true,
      showKeyboard: true,
      setShowKeyboard: setShowKeyboard,
      setShowSettings: setShowSettings,
    });

    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Virtual Keyboard:")).toBeInTheDocument();
    expect(screen.getByText("Difficulty:")).toBeInTheDocument();
  });

  it("should not render when showSettings is false", () => {
    MockGameSettings({
      darkThemeActive: false,
      showSettings: false,
      showKeyboard: true,
      setShowKeyboard: setShowKeyboard,
      setShowSettings: setShowSettings,
    });

    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
    expect(screen.queryByText("Virtual Keyboard:")).not.toBeInTheDocument();
    expect(screen.queryByText("Difficulty:")).not.toBeInTheDocument();
  });

  it("should render a link to Easy mode with the correct href", () => {
    MockGameSettings({
      darkThemeActive: false,
      showSettings: true,
      showKeyboard: true,
      setShowKeyboard: setShowKeyboard,
      setShowSettings: setShowSettings,
    });
    const easyLink = screen.getByText("Easy");
    expect(easyLink).toHaveAttribute("href", "/word-skull-game-easy-mode");
  });

  it("should render a link to Medium mode with the correct href", () => {
    MockGameSettings({
      darkThemeActive: false,
      showSettings: true,
      showKeyboard: true,
      setShowKeyboard: setShowKeyboard,
      setShowSettings: setShowSettings,
    });
    const mediumLink = screen.getByText("Medium");
    expect(mediumLink).toHaveAttribute("href", "/word-skull-game-medium-mode");
  });

  it("should render a link to Hard mode with the correct href", () => {
    MockGameSettings({
      darkThemeActive: false,
      showSettings: true,
      showKeyboard: true,
      setShowKeyboard: setShowKeyboard,
      setShowSettings: setShowSettings,
    });
    const hardLink = screen.getByText("Hard");
    expect(hardLink).toHaveAttribute("href", "/word-skull-game-hard-mode");
  });

  it("should render a link to Extreme mode with the correct href", () => {
    MockGameSettings({
      darkThemeActive: false,
      showSettings: true,
      showKeyboard: true,
      setShowKeyboard: setShowKeyboard,
      setShowSettings: setShowSettings,
    });
    const extremeLink = screen.getByText("Extreme");
    expect(extremeLink).toHaveAttribute(
      "href",
      "/word-skull-game-extreme-mode"
    );
  });

  // it("should display 'On' when showKeyboard is true", () => {
  //   MockGameSettings({
  //     darkThemeActive: false,
  //     showSettings: true,
  //     showKeyboard: true,
  //     setShowKeyboard: setShowKeyboard,
  //     setShowSettings: setShowSettings,
  //   });

  //   const keyboardToggleLabel = screen.getByText("On");
  //   expect(keyboardToggleLabel).toBeInTheDocument();
  // });

  // it("should display 'Hidden' when showKeyboard is false", () => {
  //   MockGameSettings({
  //     darkThemeActive: false,
  //     showSettings: true,
  //     showKeyboard: false,
  //     setShowKeyboard: setShowKeyboard,
  //     setShowSettings: setShowSettings,
  //   });

  //   const keyboardToggleLabel = screen.getByText("Hidden");
  //   expect(keyboardToggleLabel).toBeInTheDocument();
  // });

  it("should not render an x icon for the close button when settings modal is closed", () => {
    MockGameSettings({
      darkThemeActive: false,
      showSettings: false,
      showKeyboard: false,
      setShowKeyboard: setShowKeyboard,
      setShowSettings: setShowSettings,
    });

    const iconElement = screen.queryByTestId(/CloseRoundedIcon/i);

    expect(iconElement).not.toBeInTheDocument();
  });

  it("should render an x icon for the close button when settings modal is open", () => {
    MockGameSettings({
      darkThemeActive: false,
      showSettings: true,
      showKeyboard: false,
      setShowKeyboard: setShowKeyboard,
      setShowSettings: setShowSettings,
    });

    const iconElement = screen.getByTestId(/CloseRoundedIcon/i);

    expect(iconElement).toBeInTheDocument();
  });
});

describe("handles user input correctly", () => {
  // it("should toggle the keyboard visibility when the checkbox is clicked", () => {
  //   MockGameSettings({
  //     darkThemeActive: false,
  //     showSettings: true,
  //     showKeyboard: false,
  //     setShowKeyboard: setShowKeyboard,
  //     setShowSettings: setShowSettings,
  //   });

  //   const checkbox = screen.getByRole("checkbox");
  //   fireEvent.click(checkbox);

  //   expect(setShowKeyboard).toHaveBeenCalledTimes(1);
  //   expect(setShowKeyboard).toHaveBeenCalledWith(expect.any(Function));
  // });

  it("should close settings modal when background underlay close button is clicked", () => {
    MockGameSettings({
      darkThemeActive: false,
      showSettings: true,
      showKeyboard: true,
      setShowKeyboard: setShowKeyboard,
      setShowSettings: setShowSettings,
    });

    const closeButton = screen.getByTestId(/modal-background/i);

    fireEvent.click(closeButton);

    expect(setShowSettings).toHaveBeenCalledTimes(1);
    expect(setShowSettings).toHaveBeenCalledWith(false);
  });

  it("should close settings modal when close button is clicked", () => {
    MockGameSettings({
      darkThemeActive: false,
      showSettings: true,
      showKeyboard: true,
      setShowKeyboard: setShowKeyboard,
      setShowSettings: setShowSettings,
    });

    const closeButton = screen.getByTestId(/close-modal/i);
    fireEvent.click(closeButton);

    expect(setShowSettings).toHaveBeenCalledTimes(1);
    expect(setShowSettings).toHaveBeenCalledWith(false);
  });

  // it("should call setShowKeyboard with false when toggled from true to false", () => {
  //   MockGameSettings({
  //     darkThemeActive: false,
  //     showSettings: true,
  //     showKeyboard: true,
  //     setShowKeyboard: setShowKeyboard,
  //     setShowSettings: setShowSettings,
  //   });

  //   const toggleInput = screen.getByRole("checkbox");
  //   fireEvent.click(toggleInput);

  //   expect(setShowKeyboard).toHaveBeenCalledTimes(1);
  //   expect(setShowKeyboard).toHaveBeenCalledWith(expect.any(Function));
  // });

  // it("should call setShowKeyboard with true when toggled from false to true", () => {
  //   MockGameSettings({
  //     darkThemeActive: false,
  //     showSettings: true,
  //     showKeyboard: false,
  //     setShowKeyboard: setShowKeyboard,
  //     setShowSettings: setShowSettings,
  //   });

  //   const toggleInput = screen.getByRole("checkbox");
  //   fireEvent.click(toggleInput);

  //   expect(setShowKeyboard).toHaveBeenCalledTimes(1);
  //   expect(setShowKeyboard).toHaveBeenCalledWith(expect.any(Function));
  // });
});
