import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";
import GameSettings from "../ui/GameSettings";
import HeaderMenu from "../ui/HeaderMenu";

interface PropType {
  lives: number | null;
  isGameOver: boolean;
  difficulty?: string;
  dontFade?: boolean;
  showKeyboard: boolean;
  setShowGameOverMenu: (value: boolean) => void;
  setShowKeyboard: (value: (prevState: boolean) => boolean) => void;
}

function Header({
  lives,
  isGameOver,
  difficulty,
  setShowGameOverMenu,
  showKeyboard,
  setShowKeyboard,
  dontFade,
}: PropType) {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { darkThemeActive } = useTheme();

  useEffect(() => {
    // Run this effect only on the client side
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("showKeyboard");

      // Check if there's a valid localStorage entry
      if (savedState !== null) {
        try {
          setShowKeyboard(JSON.parse(savedState));
        } catch (error) {
          console.error("Error parsing localStorage value:", error);
        }
      }

      // Set loading to true after checking localStorage
      setIsLoaded(true);
    }
  }, [setShowKeyboard]);

  useEffect(() => {
    // Don't save to localStorage until it's loaded
    if (typeof window !== "undefined" && isLoaded) {
      localStorage.setItem("showKeyboard", JSON.stringify(showKeyboard));
    }
  }, [showKeyboard, isLoaded]);

  return (
    <header className="relative w-full justify-center items-center flex-col flex">
      <GameSettings
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        showKeyboard={showKeyboard}
        setShowKeyboard={setShowKeyboard}
      />
      <HeaderMenu
        setShowGameOverMenu={setShowGameOverMenu}
        isGameOver={isGameOver}
        dontFade={dontFade}
        difficulty={difficulty}
        setShowSettings={setShowSettings}
      />
      {!isGameOver && (
        <ul
          className={`animate-fadeIn flex fixed z-[100] top-[0.95em]  sm:top-[0.45em] font-nunito gap-2 my-1 justify-center items-center ${
            darkThemeActive ? "text-white" : "text-slate-700"
          }`}
        >
          <span className="text-lg translate-y-[0.05em]">{lives || 0}</span>
          <span className="text-xl translate-y-[0.01em]">x</span>
          <span className="opacity-85 -translate-x-[0.1em] text-lg">
            {darkThemeActive ? "🤍" : "🖤"}
          </span>
        </ul>
      )}
    </header>
  );
}

export default Header;
