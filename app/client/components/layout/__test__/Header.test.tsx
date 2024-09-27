import { fireEvent, screen, waitFor } from "@testing-library/react";
import MockHeader from "../../../mocks/MockHeader";
import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

const setShowGameOverMenu = vi.fn();
const setShowKeyboard = vi.fn();

afterEach(() => {
  vi.clearAllMocks();
});

describe("should display the correct number of lives", () => {
  it("should display white heart when dark theme is active", async () => {
    // Render the MockHeader with necessary props
    MockHeader({
      darkThemeActive: true,
      lives: 3,
      isGameOver: false,
      showKeyboard: true,
      setShowGameOverMenu: setShowGameOverMenu,
      setShowKeyboard: setShowKeyboard,
    });

    // Query the life icon element and assert its content
    const lifeIcon = await waitFor(() => screen.getByTestId("life-icon"));
    expect(lifeIcon).toHaveTextContent("🤍"); // Expect white heart icon to be displayed
  });

  it("should render the header with the correct number of lives and icons", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: false,
      showKeyboard: true,
      setShowGameOverMenu: setShowGameOverMenu,
      setShowKeyboard: setShowKeyboard,
    });

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("x")).toBeInTheDocument();
    expect(screen.getByText("🖤")).toBeInTheDocument();
  });

  it("should not display lives and icons when the game is over", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: true,
      showKeyboard: false,
      setShowGameOverMenu: setShowGameOverMenu,
      setShowKeyboard: setShowKeyboard,
    });

    expect(screen.queryByText("3")).not.toBeInTheDocument();
    expect(screen.queryByText("x")).not.toBeInTheDocument();
    expect(screen.queryByText("🖤")).not.toBeInTheDocument();
  });

  it("should display black heart when light theme is active", async () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: false,
      showKeyboard: true,
      setShowGameOverMenu: setShowGameOverMenu,
      setShowKeyboard: setShowKeyboard,
    });

    // Use findByTestId to wait for the element to appear
    const lifeIcon = await screen.findByTestId("life-icon");
    expect(lifeIcon).toHaveTextContent("🖤");
  });

  it("should display correct lives count", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 5,
      isGameOver: false,
      showKeyboard: true,
      setShowGameOverMenu: setShowGameOverMenu,
      setShowKeyboard: setShowKeyboard,
    });

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should load showKeyboard from localStorage on initial render", () => {
    localStorage.setItem("showKeyboard", "true");

    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: false,
      showKeyboard: false,
      setShowGameOverMenu: vi.fn(),
      setShowKeyboard: setShowKeyboard,
    });

    expect(setShowKeyboard).toHaveBeenCalledWith(true);
    localStorage.removeItem("showKeyboard");
  });
});

describe("should render and integrate with GameSettings component correctly", () => {
  it("should call setShowKeyboard when toggling the keyboard", async () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: false,
      showKeyboard: true,
      setShowGameOverMenu: setShowGameOverMenu,
      setShowKeyboard: setShowKeyboard,
    });

    const settingsBtnElement = screen.getByTestId(/settings-button/i);
    fireEvent.click(settingsBtnElement);

    const textElement = await screen.findByText("On");

    fireEvent.click(textElement);

    expect(setShowKeyboard).toHaveBeenCalled();
  });

  it("should render settings text lables when showSettings is true", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: true,
      showKeyboard: true,
      setShowGameOverMenu: vi.fn(),
      setShowKeyboard: setShowKeyboard,
    });

    const settingsBtnElement = screen.getByTestId(/settings-button/i);
    fireEvent.click(settingsBtnElement);

    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Virtual Keyboard:")).toBeInTheDocument();
    expect(screen.getByText("Difficulty:")).toBeInTheDocument();
  });

  it("should not render when showSettings is false", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: true,
      showKeyboard: true,
      setShowGameOverMenu: vi.fn(),
      setShowKeyboard: setShowKeyboard,
    });

    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
    expect(screen.queryByText("Virtual Keyboard:")).not.toBeInTheDocument();
    expect(screen.queryByText("Difficulty:")).not.toBeInTheDocument();
  });

  it("should render a link to Easy mode with the correct href", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: true,
      showKeyboard: true,
      setShowGameOverMenu: vi.fn(),
      setShowKeyboard: setShowKeyboard,
    });

    const settingsBtnElement = screen.getByTestId(/settings-button/i);
    fireEvent.click(settingsBtnElement);

    const easyLink = screen.getByText("Easy");
    expect(easyLink).toHaveAttribute("href", "/word-skull-game-easy-mode");
  });

  it("should render a link to Medium mode with the correct href", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: true,
      showKeyboard: true,
      setShowGameOverMenu: vi.fn(),
      setShowKeyboard: setShowKeyboard,
    });

    const settingsBtnElement = screen.getByTestId(/settings-button/i);
    fireEvent.click(settingsBtnElement);

    const mediumLink = screen.getByText("Medium");
    expect(mediumLink).toHaveAttribute("href", "/word-skull-game-medium-mode");
  });

  it("should render a link to Hard mode with the correct href", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: true,
      showKeyboard: true,
      setShowGameOverMenu: vi.fn(),
      setShowKeyboard: setShowKeyboard,
    });

    const settingsBtnElement = screen.getByTestId(/settings-button/i);
    fireEvent.click(settingsBtnElement);

    const hardLink = screen.getByText("Hard");
    expect(hardLink).toHaveAttribute("href", "/word-skull-game-hard-mode");
  });

  it("should render a link to Extreme mode with the correct href", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: true,
      showKeyboard: true,
      setShowGameOverMenu: vi.fn(),
      setShowKeyboard: setShowKeyboard,
    });

    const settingsBtnElement = screen.getByTestId(/settings-button/i);
    fireEvent.click(settingsBtnElement);

    const extremeLink = screen.getByText("Extreme");
    expect(extremeLink).toHaveAttribute(
      "href",
      "/word-skull-game-extreme-mode"
    );
  });

  it("should display 'On' when showKeyboard is true", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: true,
      showKeyboard: true,
      setShowGameOverMenu: vi.fn(),
      setShowKeyboard: setShowKeyboard,
    });

    const settingsBtnElement = screen.getByTestId(/settings-button/i);
    fireEvent.click(settingsBtnElement);

    const keyboardToggleLabel = screen.getByText("On");
    expect(keyboardToggleLabel).toBeInTheDocument();
  });

  it("should display 'Off' when showKeyboard is false", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: true,
      showKeyboard: false,
      setShowGameOverMenu: vi.fn(),
      setShowKeyboard: setShowKeyboard,
    });

    const settingsBtnElement = screen.getByTestId(/settings-button/i);
    fireEvent.click(settingsBtnElement);

    const keyboardToggleLabel = screen.getByText("Off");
    expect(keyboardToggleLabel).toBeInTheDocument();
  });
});

describe("handles user input correctly when integrating with GameSettings", () => {
  it("should toggle the keyboard visibility when the checkbox is clicked", async () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: true,
      showKeyboard: true,
      setShowGameOverMenu: vi.fn(),
      setShowKeyboard: setShowKeyboard,
    });

    const settingsBtnElement = screen.getByTestId(/settings-button/i);
    fireEvent.click(settingsBtnElement);

    const checkbox = await screen.findByRole("checkbox");
    fireEvent.click(checkbox);

    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("should close settings modal when background underlay close button is clicked", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: true,
      showKeyboard: false,
      setShowGameOverMenu: vi.fn(),
      setShowKeyboard: setShowKeyboard,
    });

    const settingsBtnElement = screen.getByTestId(/settings-button/i);
    fireEvent.click(settingsBtnElement);

    const closeButton = screen.getByTestId(/settings-background/i);

    fireEvent.click(closeButton);

    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
  });

  it("should close settings modal when close button is clicked", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: true,
      showKeyboard: false,
      setShowGameOverMenu: vi.fn(),
      setShowKeyboard: setShowKeyboard,
    });

    const settingsBtnElement = screen.getByTestId(/settings-button/i);
    fireEvent.click(settingsBtnElement);

    const closeButton = screen.getByTestId(/close-settings/i);
    fireEvent.click(closeButton);

    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
  });

  it("should call setShowKeyboard with false when toggled from true to false", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: true,
      showKeyboard: true,
      setShowGameOverMenu: vi.fn(),
      setShowKeyboard: setShowKeyboard,
    });

    const settingsBtnElement = screen.getByTestId(/settings-button/i);
    fireEvent.click(settingsBtnElement);

    const toggleInput = screen.getByRole("checkbox");
    fireEvent.click(toggleInput);

    const keyboardToggleLabel = screen.getByText("On");
    expect(keyboardToggleLabel).toBeInTheDocument();
  });

  it("should call setShowKeyboard with true when toggled from false to true", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: true,
      showKeyboard: false,
      setShowGameOverMenu: vi.fn(),
      setShowKeyboard: setShowKeyboard,
    });

    const settingsBtnElement = screen.getByTestId(/settings-button/i);
    fireEvent.click(settingsBtnElement);

    const toggleInput = screen.getByRole("checkbox");
    fireEvent.click(toggleInput);

    const keyboardToggleLabel = screen.getByText("Off");
    expect(keyboardToggleLabel).toBeInTheDocument();
  });
});

describe("should render and integrate with HeaderMenu component correctly", () => {
  it("should call setShowGameOverMenu when game is over & the results button is clicked", async () => {
    MockHeader({
      darkThemeActive: false,
      lives: 0,
      isGameOver: true,
      showKeyboard: false,
      setShowGameOverMenu: setShowGameOverMenu,
      setShowKeyboard: setShowKeyboard,
    });

    const resultsButton = screen.getByTestId("results-button");

    fireEvent.click(resultsButton);

    expect(setShowGameOverMenu).toHaveBeenCalledWith(true);
  });
});
