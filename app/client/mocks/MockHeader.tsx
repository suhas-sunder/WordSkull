import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useContext, useEffect } from "react";
import MockThemeProvider, { MockThemeContext } from "../mocks/MockThemeContext";
import Header from "../components/layout/Header";

interface MockHeaderProps {
  darkThemeActive: boolean;
  lives: number | null;
  isGameOver: boolean;
  difficulty?: string;
  dontFade?: boolean;
  showKeyboard: boolean;
  setShowGameOverMenu: (value: boolean) => void;
  setShowKeyboard: (value: (prevState: boolean) => boolean) => void;
}

const MockHeader = ({
  darkThemeActive,
  lives,
  isGameOver,
  difficulty = "medium",
  dontFade = false,
  showKeyboard,
  setShowGameOverMenu,
  setShowKeyboard,
}: MockHeaderProps) => {
  // Render Header component inside MemoryRouter and MockThemeProvider
  return render(
    <MemoryRouter>
      <MockThemeProvider darkThemeActive={darkThemeActive}>
        <Header
          lives={lives}
          isGameOver={isGameOver}
          difficulty={difficulty}
          dontFade={dontFade}
          showKeyboard={showKeyboard}
          setShowGameOverMenu={setShowGameOverMenu}
          setShowKeyboard={setShowKeyboard}
        />
        <ToggleButton darkThemeActive={darkThemeActive} />
      </MockThemeProvider>
    </MemoryRouter>
  );
};

// Define the ToggleButton component separately
const ToggleButton = ({ darkThemeActive }: { darkThemeActive: boolean }) => {
  const { setDarkThemeActive } = useContext(MockThemeContext);
  useEffect(() => {
    setDarkThemeActive(darkThemeActive);
  }, [darkThemeActive, setDarkThemeActive]);

  return <></>;
};

export default MockHeader;
