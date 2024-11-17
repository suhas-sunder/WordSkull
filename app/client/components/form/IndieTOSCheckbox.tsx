import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

interface PropType {
  id: string;
}

function IndieTOSCheckbox({ id }: PropType) {
  const { darkThemeActive } = useTheme();

  return (
    <div className="flex gap-3 my-5">
      <input type="checkbox" id={id} name="terms" required />
      <label htmlFor={id} className="font-nunito">
        I have read and accept the{" "}
        <Link
          to="#indie-game-terms-of-service"
          className={`${
            darkThemeActive ? "text-orange-600" : "text-pumpkin-orange"
          } hover:text-amber-600 font-lora`}
        >
          game submission Terms and Conditions
        </Link>
      </label>
    </div>
  );
}

export default IndieTOSCheckbox;
