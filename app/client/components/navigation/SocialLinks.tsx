import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import insta_png from "../../assets/images/instagram_icon.png";
import insta_webp from "../../assets/images/instagram_icon.webp";
import twitter_png from "../../assets/images/twitter_icon.png";
import twitter_webp from "../../assets/images/twitter_icon.webp";
import pinterest_png from "../../assets/images/pinterest_icon.png";
import pinterest_webp from "../../assets/images/pinterest_icon.webp";
import linkedin_png from "../../assets/images/linkedin_icon.png";
import linkedin_webp from "../../assets/images/linkedin_icon.webp";
import instructables_png from "../../assets/images/instructables_icon.png";
import instructables_webp from "../../assets/images/instructables_icon.webp";
import reddit_png from "../../assets/images/reddit_icon.png";
import reddit_webp from "../../assets/images/reddit_icon.webp";
import tiktok_png from "../../assets/images/tiktok_icon.png";
import tiktok_webp from "../../assets/images/tiktok_icon.webp";
import facebook_png from "../../assets/images/facebook_icon.png";
import facebook_webp from "../../assets/images/facebook_icon.webp";
import youtube_png from "../../assets/images/youtube_icon.png";
import youtube_webp from "../../assets/images/youtube_icon.webp";
import dev_png from "../../assets/images/dev_icon.png";
import dev_webp from "../../assets/images/dev_icon.webp";
import github_png from "../../assets/images/github_icon.png";
import github_webp from "../../assets/images/github_icon.webp";

function SocialLinks() {
  const { darkThemeActive } = useTheme();
  const linksData = [
    {
      id: 1,
      name: "Facebook",
      url: "https://www.facebook.com/profile.php?id=61566613301910",
      pngImg: facebook_png,
      webpImg: facebook_webp,
    },
    {
      id: 2,
      name: "Twitter (X)",
      url: "https://x.com/WordSkullGame",
      pngImg: twitter_png,
      webpImg: twitter_webp,
    },
    {
      id: 3,
      name: "Pinterest",
      url: "https://ca.pinterest.com/WordSkull",
      pngImg: pinterest_png,
      webpImg: pinterest_webp,
    },
    {
      id: 4,
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/104154929/",
      pngImg: linkedin_png,
      webpImg: linkedin_webp,
    },
    {
      id: 5,
      name: "Instructables",
      url: "https://www.instructables.com/member/SunderOrigami/",
      pngImg: instructables_png,
      webpImg: instructables_webp,
    },
    {
      id: 6,
      name: "Reddit",
      url: "https://www.reddit.com/r/WordSkull/",
      pngImg: reddit_png,
      webpImg: reddit_webp,
    },
    {
      id: 7,
      name: "TikTok",
      url: "https://www.tiktok.com/@wordskull",
      pngImg: tiktok_png,
      webpImg: tiktok_webp,
    },
    {
      id: 8,
      name: "YouTube",
      url: "https://www.youtube.com/@WordSkullYT",
      pngImg: youtube_png,
      webpImg: youtube_webp,
    },
    {
      id: 9,
      name: "Dev.to",
      url: "https://dev.to/productivitygarden",
      pngImg: dev_png,
      webpImg: dev_webp,
    },
    {
      id: 10,
      name: "GitHub",
      url: "https://github.com/suhas-sunder/EmojiKitchenGame",
      pngImg: github_png,
      webpImg: github_webp,
    },
    {
      id: 11,
      name: "Instagram",
      url: "https://www.instagram.com/productivitygarden/",
      pngImg: insta_png,
      webpImg: insta_webp,
    },
  ];
  return (
    <div className="flex flex-col gap-8 w-full justify-center items-center pb-[5em]">
      <h2
        className={`${
          darkThemeActive ? "text-stone-400" : "text-skull-dark-brown"
        } flex py-2 text-2xl text-center sm:text-4xl font-lora mt-4 tracking-wide`}
      >
        Follow WordSkull On Social Media
      </h2>
      <ul className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-12 md:gap-6 justify-center lg:pl-8 items-center">
        {linksData.map((link) => (
          <li key={link.id}>
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-pumpkin-orange"
              } group hover:text-amber-600 font-lora flex gap-3 items-center`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              to={link.url}
            >
              <picture className="group-hover:scale-105 block">
                <source srcSet={`${link.webpImg}`} type="image/webp" />
                <source srcSet={`${link.pngImg}`} type="image/png" />
                <img
                  src={link.pngImg}
                  alt={link.name + " icon that links to social media page"}
                  className="w-[28px] h-[28px] block"
                  width="48"
                  height="48"
                  loading="lazy"
                />
              </picture>
              <h3>{link.name}</h3>
            </Link>{" "}
          </li>
        ))}
      </ul>
    
    </div>
  );
}

export default SocialLinks;
