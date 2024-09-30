import { useState } from "react";
import GameSettings from "../ui/GameSettings";
import HeaderMenu from "../ui/HeaderMenu";
import { useTheme } from "../context/ThemeContext";


interface PropType {
  lives: number | null;
  isGameOver: boolean;
  lettersPerSkull?: string;
  dontFade?: boolean;
  setShowGameOverMenu: (value: boolean) => void;
}

function Header({
  lives,
  isGameOver,
  lettersPerSkull,
  setShowGameOverMenu,
  dontFade,
}: PropType) {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const { darkThemeActive } = useTheme();

  

  return (
    <header className="relative w-full justify-center items-center flex-col flex">
      <GameSettings
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
      <HeaderMenu
        setShowGameOverMenu={setShowGameOverMenu}
        isGameOver={isGameOver}
        dontFade={dontFade}
        lettersPerSkull={lettersPerSkull}
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
          <span
            data-testid="life-icon"
            className="opacity-85 -translate-x-[0.1em] text-lg"
          >
            {darkThemeActive ? "🤍" : "🖤"}
          </span>
        </ul>
      )}
    </header>
  );
}

export default Header;
