import { fireEvent, render, screen } from "@testing-library/react";
import MockThemeProvider from "../../../mocks/components/MockThemeContext"; // Adjust the import path as necessary
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import HeaderMenu from "../HeaderMenu";
interface PropType {
  darkThemeActive: boolean;
  setShowGameOverMenu: (value: boolean) => void;
  isGameOver: boolean;
  dontFade?: boolean;
  lettersPerSkull?: string;
  setShowSettings: (value: boolean) => void;
}

const setShowSettings = vi.fn();
const setShowGameOverMenu = vi.fn();

const MockHeaderMenu = ({
  darkThemeActive,
  setShowGameOverMenu,
  isGameOver,
  dontFade,
  lettersPerSkull,
  setShowSettings,
}: PropType) => {
  render(
    <MemoryRouter>
      <MockThemeProvider darkThemeActive={darkThemeActive}>
        <HeaderMenu
          setShowGameOverMenu={setShowGameOverMenu}
          isGameOver={isGameOver}
          dontFade={dontFade}
          lettersPerSkull={lettersPerSkull}
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
  beforeEach(() => {
    MockHeaderMenu({
      darkThemeActive: false,
      setShowGameOverMenu: setShowGameOverMenu,
      isGameOver: false,
      dontFade: true,
      lettersPerSkull: "Easy",
      setShowSettings: setShowSettings,
    });
  });

  it("should render a heading with text W💀RD SKULL", () => {
    const headerElement = screen.getByRole("heading", { name: /W💀RD SKULL/i });

    expect(headerElement).toBeInTheDocument();
  });

  it("should render a heading with difficulty text that matches the difficulty prop", () => {
    const headerElement = screen.getByRole("heading", { name: /Easy/i });

    expect(headerElement).toBeInTheDocument();
  });

  it("should not render a display results button by default", () => {
    const buttonElement = screen.queryByTestId(/results-button/i);

    expect(buttonElement).not.toBeInTheDocument();
  });

  it("should render a stats button", () => {
    const buttonElement = screen.getByTestId(/stats-button/i);

    expect(buttonElement).toBeInTheDocument();
  });

  it("should render a link for gameplay instructiosn with the correct href", () => {
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
    const buttonElement = screen.getByTestId(/settings-button/i);

    expect(buttonElement).toBeInTheDocument();
  });

  it("Should render a bar graph icon for the stats button", () => {
    const iconElement = screen.getByTestId(/LeaderboardRoundedIcon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("Should render a questionmark icon for the instructions hashlink", () => {
    const iconElement = screen.getByTestId(/HelpOutlineRoundedIcon/i);
    expect(iconElement).toBeInTheDocument();
  });

  it("Should render a sparkle gears icon for the settings button", () => {
    const iconElement = screen.getByTestId(/SettingsSuggestIcon/i);
    expect(iconElement).toBeInTheDocument();
  });
});

describe("should behave correctly when the game is over", () => {
  beforeEach(() => {
    MockHeaderMenu({
      darkThemeActive: false,
      setShowGameOverMenu: setShowGameOverMenu,
      isGameOver: true,
      dontFade: true,
      lettersPerSkull: "Easy",
      setShowSettings: setShowSettings,
    });
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
