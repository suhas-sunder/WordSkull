import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function SocialLinks() {
  const { darkThemeActive } = useTheme();
  return (
    <div className="flex flex-col gap-8 w-full">
      <h2
        className={`${
          darkThemeActive ? "text-slate-400" : "text-skull-dark-brown"
        } flex py-2 text-4xl font-lora mt-4 tracking-wide`}
      >
        Follow WordSkull On Social Media
      </h2>
      <ul className="grid grid-cols-6 gap-6 justify-center pl-8">
        <li>
          <Link
            className={`${
              darkThemeActive
                ? "text-orange-600"
                : "text-skull-super-dark-brown"
            } hover:text-amber-600 font-lora`}
            target="_blank"
            rel="noopener noreferrer"
            to="/wallpaper"
          >
            <h3>Facebook</h3>
          </Link>{" "}
        </li>
        <li>
          <Link
            className={`${
              darkThemeActive
                ? "text-orange-600"
                : "text-skull-super-dark-brown"
            } hover:text-amber-600 font-lora`}
            target="_blank"
            rel="noopener noreferrer"
            to="https://x.com/WordSkullGame"
          >
            <h3>Twitter (X)</h3>
          </Link>{" "}
        </li>
        <li>
          <Link
            className={`${
              darkThemeActive
                ? "text-orange-600"
                : "text-skull-super-dark-brown"
            } hover:text-amber-600 font-lora`}
            target="_blank"
            rel="noopener noreferrer"
            to="/wallpaper"
          >
            <h3>Pinterest</h3>
          </Link>{" "}
        </li>
        <li>
          <Link
            className={`${
              darkThemeActive
                ? "text-orange-600"
                : "text-skull-super-dark-brown"
            } hover:text-amber-600 font-lora`}
            target="_blank"
            rel="noopener noreferrer"
            to="https://www.linkedin.com/company/104154929/admin/dashboard/"
          >
            <h3>LinkedIn</h3>
          </Link>{" "}
        </li>
        <li>
          <Link
            className={`${
              darkThemeActive
                ? "text-orange-600"
                : "text-skull-super-dark-brown"
            } hover:text-amber-600 font-lora`}
            target="_blank"
            rel="noopener noreferrer"
            to="https://www.instructables.com/member/SunderOrigami/"
          >
            <h3>Instructables</h3>
          </Link>{" "}
        </li>
        <li>
          <Link
            className={`${
              darkThemeActive
                ? "text-orange-600"
                : "text-skull-super-dark-brown"
            } hover:text-amber-600 font-lora`}
            target="_blank"
            rel="noopener noreferrer"
            to="https://www.reddit.com/r/WordSkull/"
          >
            <h3>Reddit</h3>
          </Link>{" "}
        </li>
        <li>
          <Link
            className={`${
              darkThemeActive
                ? "text-orange-600"
                : "text-skull-super-dark-brown"
            } hover:text-amber-600 font-lora`}
            target="_blank"
            rel="noopener noreferrer"
            to="https://www.tiktok.com/@wordskull"
          >
            <h3>TikTok</h3>
          </Link>{" "}
        </li>
        <li>
          <Link
            className={`${
              darkThemeActive
                ? "text-orange-600"
                : "text-skull-super-dark-brown"
            } hover:text-amber-600 font-lora`}
            target="_blank"
            rel="noopener noreferrer"
            to="https://www.youtube.com/@WordSkullYT"
          >
            <h3>YouTube</h3>
          </Link>{" "}
        </li>
        <li>
          <Link
            className={`${
              darkThemeActive
                ? "text-orange-600"
                : "text-skull-super-dark-brown"
            } hover:text-amber-600 font-lora`}
            target="_blank"
            rel="noopener noreferrer"
            to="https://dev.to/productivitygarden"
          >
            <h3>Dev.to</h3>
          </Link>{" "}
        </li>
        <li>
          <Link
            className={`${
              darkThemeActive
                ? "text-orange-600"
                : "text-skull-super-dark-brown"
            } hover:text-amber-600 font-lora`}
            target="_blank"
            rel="noopener noreferrer"
            to="https://github.com/suhas-sunder/EmojiKitchenGame"
          >
            <h3>GitHub</h3>
          </Link>{" "}
        </li>
        <li>
          <Link
            className={`${
              darkThemeActive
                ? "text-orange-600"
                : "text-skull-super-dark-brown"
            } hover:text-amber-600 font-lora`}
            target="_blank"
            rel="noopener noreferrer"
            to="https://www.instagram.com/productivitygarden/"
          >
            <h3>Instagram</h3>
          </Link>{" "}
        </li>
      </ul>
    </div>
  );
}

export default SocialLinks;
