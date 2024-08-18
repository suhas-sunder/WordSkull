import { useTheme } from "../context/ThemeContext";

interface PropType {
  lives: number | null;
  isGameOver: boolean;
}

function Header({ lives, isGameOver }: PropType) {
  const { darkThemeActive } = useTheme();

  return (
    <header className="animate-fadeIn relative w-full justify-center items-center flex-col flex -mb-6 sm:-mb-8">
      <h1 className=" flex justify-center items-center mb-2 sm:mb-0 text-xl sm:text-2xl text-center mt-2 leading-snug -translate-y-[0.3em] sm:translate-y-0 text-slate-500 font-lora">
        W💀RD SKULL
      </h1>
      {!isGameOver && (
        <ul
          className={`flex absolute z-[100] -top-10  sm:-top-12 font-nunito -translate-y-2 sm:translate-y-0  gap-2 my-1 justify-center items-center ${
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
