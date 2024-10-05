import { fireEvent, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import MockHeader from "../../../../client/mocks/components/MockHeader";

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
});

describe("should render and integrate with GameSettings component correctly", () => {
  it("should not render an x icon for the close button when settings modal is closed", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: false,
      showKeyboard: true,
      setShowGameOverMenu: setShowGameOverMenu,
      setShowKeyboard: setShowKeyboard,
    });

    const iconElement = screen.queryByTestId(/CloseRoundedIcon/i);

    expect(iconElement).not.toBeInTheDocument();
  });

  it("should render an x icon for the close button when settings modal is open", () => {
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

    const iconElement = screen.getByTestId(/CloseRoundedIcon/i);

    expect(iconElement).toBeInTheDocument();
  });

  it("should render settings text lables when showSettings is true", () => {
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

    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Virtual Keyboard:")).toBeInTheDocument();
    expect(screen.getByText("Difficulty:")).toBeInTheDocument();
  });

  it("should not render when showSettings is false", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: false,
      showKeyboard: true,
      setShowGameOverMenu: setShowGameOverMenu,
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
      isGameOver: false,
      showKeyboard: true,
      setShowGameOverMenu: setShowGameOverMenu,
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
      isGameOver: false,
      showKeyboard: true,
      setShowGameOverMenu: setShowGameOverMenu,
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
      isGameOver: false,
      showKeyboard: true,
      setShowGameOverMenu: setShowGameOverMenu,
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
      isGameOver: false,
      showKeyboard: true,
      setShowGameOverMenu: setShowGameOverMenu,
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
});

describe("handles user input correctly when integrating with GameSettings", () => {
  it("should close settings modal when background underlay close button is clicked", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: false,
      showKeyboard: false,
      setShowGameOverMenu: setShowGameOverMenu,
      setShowKeyboard: setShowKeyboard,
    });

    const settingsBtnElement = screen.getByTestId(/settings-button/i);
    fireEvent.click(settingsBtnElement);

    const closeButton = screen.getByTestId(/modal-background/i);

    fireEvent.click(closeButton);

    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
  });

  it("should close settings modal when close button is clicked", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: false,
      showKeyboard: false,
      setShowGameOverMenu: setShowGameOverMenu,
      setShowKeyboard: setShowKeyboard,
    });

    const settingsBtnElement = screen.getByTestId(/settings-button/i);
    fireEvent.click(settingsBtnElement);

    const closeButton = screen.getByTestId(/close-modal/i);
    fireEvent.click(closeButton);

    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
  });

  it("should render two checkboxes when settings button is clicked", () => {
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

    const inputElements = screen.getAllByRole("checkbox");

    expect(inputElements).toHaveLength(3);
  });
});

describe("should render and integrate with HeaderMenu component correctly", () => {
  it("should render a heading with text W💀RD SKULL", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: false,
      showKeyboard: false,
      setShowGameOverMenu: setShowGameOverMenu,
      setShowKeyboard: setShowKeyboard,
    });

    const headerElement = screen.getByRole("heading", { name: /W💀RD SKULL/i });

    expect(headerElement).toBeInTheDocument();
  });

  it("should render a heading with difficulty text that matches the difficulty prop", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: false,
      showKeyboard: false,
      setShowGameOverMenu: setShowGameOverMenu,
      setShowKeyboard: setShowKeyboard,
    });

    const headerElement = screen.getByRole("heading", { name: /Easy/i });

    expect(headerElement).toBeInTheDocument();
  });

  it("should not render a display results button by default", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: false,
      showKeyboard: false,
      setShowGameOverMenu: setShowGameOverMenu,
      setShowKeyboard: setShowKeyboard,
    });

    const buttonElement = screen.queryByTestId(/results-button/i);

    expect(buttonElement).not.toBeInTheDocument();
  });

  it("should render a stats button", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: false,
      showKeyboard: false,
      setShowGameOverMenu: setShowGameOverMenu,
      setShowKeyboard: setShowKeyboard,
    });

    const buttonElement = screen.getByTestId(/stats-button/i);

    expect(buttonElement).toBeInTheDocument();
  });

  it("should render a link for gameplay instructiosn with the correct href", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: false,
      showKeyboard: false,
      setShowGameOverMenu: setShowGameOverMenu,
      setShowKeyboard: setShowKeyboard,
    });

    const linkElement = screen.getByTestId(/instructions-hashlink/i);

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      "href",
      `${
        location?.pathname === "/" ? "" : location?.pathname
      }/#gameplay-instructions`
    );
  });

  it("should render a settings button", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: false,
      showKeyboard: false,
      setShowGameOverMenu: setShowGameOverMenu,
      setShowKeyboard: setShowKeyboard,
    });

    const buttonElement = screen.getByTestId(/settings-button/i);

    expect(buttonElement).toBeInTheDocument();
  });

  it("Should render a bar graph icon for the stats button", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: false,
      showKeyboard: false,
      setShowGameOverMenu: setShowGameOverMenu,
      setShowKeyboard: setShowKeyboard,
    });

    const iconElement = screen.getByTestId(/LeaderboardRoundedIcon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("Should render a questionmark icon for the instructions hashlink", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: false,
      showKeyboard: false,
      setShowGameOverMenu: setShowGameOverMenu,
      setShowKeyboard: setShowKeyboard,
    });

    const iconElement = screen.getByTestId(/HelpOutlineRoundedIcon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("Should render a sparkle gears icon for the settings button", () => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: false,
      showKeyboard: false,
      setShowGameOverMenu: setShowGameOverMenu,
      setShowKeyboard: setShowKeyboard,
    });

    const iconElement = screen.getByTestId(/SettingsSuggestIcon/i);
    expect(iconElement).toBeInTheDocument();
  });
});

describe("handles game over correctly", () => {
  beforeEach(() => {
    MockHeader({
      darkThemeActive: false,
      lives: 3,
      isGameOver: true,
      showKeyboard: false,
      setShowGameOverMenu: setShowGameOverMenu,
      setShowKeyboard: setShowKeyboard,
    });
  });
  it("should not display lives and icons when the game is over", () => {
    expect(screen.queryByText("3")).not.toBeInTheDocument();
    expect(screen.queryByText("x")).not.toBeInTheDocument();
    expect(screen.queryByText("🖤")).not.toBeInTheDocument();
  });

  it("should call setShowGameOverMenu when game is over & the results button is clicked", async () => {
    const resultsButton = screen.getByTestId("results-button");

    fireEvent.click(resultsButton);

    expect(setShowGameOverMenu).toHaveBeenCalledWith(true);
  });

  it("should render a display results button when isGameOver is true", () => {
    const buttonElement = screen.getByTestId(/results-button/i);

    expect(buttonElement).toBeInTheDocument();
  });

  it("Should render a flag icon for results button", () => {
    const iconElement = screen.getByTestId(/SportsScoreIcon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("should call setShowGameOverMenu when the results button is clicked", () => {
    const buttonElement = screen.getByTestId(/results-button/i);

    fireEvent.click(buttonElement);

    expect(setShowGameOverMenu).toHaveBeenCalledWith(true);
  });
});
