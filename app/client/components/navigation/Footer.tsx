import { NavLink } from "react-router-dom";
import styles from "./styles/NavBar.module.css";
import { useTheme } from "../context/ThemeContext";

//Used by App.tsx component
function Footer() {
  const { darkThemeActive } = useTheme();

  return (
    <nav
      className={`${styles.nav} transition-colors duration-[600ms] ${darkThemeActive ? "border-stone-600/10 bg-stone-800" : "border-stone-200 bg-white" } w-full border-t-2 flex gap-5 sm:gap-20 justify-center items-center py-1 sm:py-2 text-xs font-nunito   `}
    >
      <div className={`${darkThemeActive ? "text-amber-600" : "text-skull-dark-brown"} flex gap-1 font-bold tracking-widest`}>
        <span>&copy; 2024</span> <span className="hidden md:flex"> | </span>
        <span className="font-overlock flex">WordSkull</span>
        <span className="hidden md:flex"> - All Rights Reserved.</span>
      </div>
      <ul
        className={`${
          darkThemeActive ? "text-white" : "text-stone-700"
        } flex max-w-[500px] items-center justify-around `}
      >
        <li className="hidden sm:flex">
          <NavLink to="/misc/sitemap" className="flex px-3">
            <span className={`${styles.icon}`}>Sitemap</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/misc/privacy-policy" className="flex px-3">
            <span className={`${styles.icon}`}>Privacy</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/misc/cookies-policy" className="flex px-3">
            <span className={`${styles.icon}`}>Cookie</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/misc/terms-of-service" className="flex px-3">
            <span className={`${styles.icon} hidden sm:flex`}>
              Terms Of Service
            </span>
            <span className={`${styles.icon} flex sm:hidden`}>Terms</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Footer;
