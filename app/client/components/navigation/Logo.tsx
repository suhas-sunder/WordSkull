import { NavLink } from "react-router-dom";
import styles from "./styles/NavBar.module.css";
// import LogoImg from "../../../client/assets/images/logo_img.jpg";

interface PropTypes {
  setShowMobileMenu: (value: boolean) => void;
  darkThemeActive: boolean | null;
}

//Used by NavBar.tsx component
function Logo({ setShowMobileMenu, darkThemeActive }: PropTypes) {
  return (
    <NavLink
      data-testid="logo-naviation-link"
      onClick={() => setShowMobileMenu(false)}
      aria-label="freetypingcamp.com logo as navigation link with highlight when hovered or clicked"
      to="/"
      className={`${styles.logo} relative flex items-center  font-overlock text-[1.25rem] font-black italic tracking-wider gap-1`}
    >
      <span className="h-[50px] w-[50px] flex justify-center items-center text-4xl opacity-[1%] sm:opacity-100">
        💀
      </span>
      <div className="flex">
        <p
          className={`translate-x-[-2.5em] sm:translate-x-0 font-Overlock text-lg sm:text-xl italic font-bold ${
            darkThemeActive && "text-pumpkin-orange"
          } ${styles["logo-long"]}`}
        >
          WordSkull
        </p>
        <p
          className={`translate-x-[-2.5em] sm:translate-x-0 font-overlock text-lg sm:text-xl italic ${
            darkThemeActive && "text-pumpkin-orange"
          } font-bold ${styles["logo-com"]}`}
        >
          .com
        </p>
      </div>
    </NavLink>
  );
}

export default Logo;
