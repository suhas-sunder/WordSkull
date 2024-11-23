import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

interface PropType {
  id: string;
}

function IndieTOSCheckbox({ id }: PropType) {
  const { darkThemeActive } = useTheme();

  return (
    <div className="flex items-center gap-3 my-5">
      <input
        type="checkbox"
        id={id}
        name={id}
        required
        className="appearance-none w-4 h-4 border-2 border-orange-400 rounded-[4px] bg-white checked:bg-orange-500 checked:border-orange-200 focus:outline-none relative"
      />
      <label htmlFor={id} className="font-nunito">
        I have read and accept the{" "}
        <Link
          to="#indie-game-terms-of-service"
          className={`${
            darkThemeActive ? "text-amber-600" : "text-pumpkin-orange"
          } hover:text-amber-600 font-lora `}
        >
          game submission Terms and Conditions
        </Link>
      </label>
    </div>
  );
}

export default IndieTOSCheckbox;
