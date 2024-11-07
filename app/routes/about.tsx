/* eslint-disable jsx-a11y/heading-has-content */
import { MetaFunction } from "@remix-run/node";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "../client/components/context/ThemeContext";
import SocialLinks from "../client/components/navigation/SocialLinks";
import emojiKitchenJPG from "../client/assets/images/emoji-kitchen-game-preview.jpg";
import emojiKitchenWEBP from "../client/assets/images/emoji-kitchen-game-preview.webp";
import * as AboutMDX from "./mdx/about-en.mdx";
import { MDXProvider } from "@mdx-js/react";
import useFormatMDX from "../client/components/hooks/useFormatMDX";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const meta: MetaFunction = ({ data }: any) => {
  return [
    { title: data?.title ? data?.title : "WordSkull About Page" },
    {
      name: "description",
      content: data?.description
        ? data?.description
        : "WordSkull the ultimate word game inspired by word & puzzle games like Wordle, crosswords, cryptogram, with new features and daily challenges! 🎉📲",
    },
  ];
};

function About() {
  const { darkThemeActive } = useTheme();
  const CustomComponents = useFormatMDX();
  const location = useLocation();

  return (
    <div
      className={`${
        darkThemeActive ? "text-slate-300" : "text-skull-dark-brown"
      } flex justify-center flex-col items-center mt-[3em]`}
    >
      <header className="flex flex-col justify-center items-center gap-6 mb-3 mx-5 text-center">
        <h1
          className={`${
            darkThemeActive ? "text-slate-400" : "text-skull-dark-brown"
          } w-full z-1 flex-row flex justify-center items-center text-4xl sm:text-5xl text-center mt-1 leading-snug -translate-y-[0.3em] sm:translate-y-0 font-lora tracking-wide`}
        >
          <span className="mr-2">Discover the Story Behind</span>
          <span className="whitespace-nowrap">
            {" "}
            <span className="inline-flex">W</span>
            <span className="inline-flex animate-scalePulse">💀</span>
            <span className="inline-flex">rd</span>
          </span>
          <span className="inline-flex">Skull</span>
        </h1>
        <p className="font-lato text-lg tracking-wider leading-loose  mb-3 pl-5 max-w-[1200px]">
          👋🏽Hi! My name is Suhas, and I’m excited to share my journey creating a
          word game website that provides a fun and engaging learning
          experience. Here is a link to my
          <Link
            className={`${
              darkThemeActive
                ? "text-orange-600"
                : "text-skull-super-dark-brown"
            } hover:text-amber-600 font-lora`}
            to="https://github.com/suhas-sunder"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            GitHub profile
          </Link>
          . If you want to learn more about me, feel free to visit my
          <Link
            className={`${
              darkThemeActive
                ? "text-orange-600"
                : "text-skull-super-dark-brown"
            } hover:text-amber-600 font-lora`}
            to="https://www.suhassunder.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            portfolio website
          </Link>{" "}
          or visit any of my
          <Link
            className={`${
              darkThemeActive
                ? "text-orange-600"
                : "text-skull-super-dark-brown"
            } hover:text-amber-600 font-lora`}
            to="/socials"
          >
            {" "}
            social pages
          </Link>
          .
        </p>
      </header>
      <main className="flex max-w-[1200px] w-full mt-4 justify-center px-5">
        <article className="flex flex-col max-w-[900px] mr-5">
          {location.pathname === "/about" ? (
            <MDXProvider>
              <AboutMDX.default components={CustomComponents} />
            </MDXProvider>
          ) : (
            <Outlet />
          )}
        </article>
        <section className="flex w-full mt-4 min-w-[180px] justify-center text-center">
          <div className="flex flex-col gap-2">
            <h3
              className={`font-lora text-xl ${
                darkThemeActive ? "text-white" : "text-skull-super-dark-brown"
              }`}
            >
              Related Websites
            </h3>
            <Link
              to="https://www.emoji-kitchen.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-2 hover:scale-105 transition duration-300 ease-in-out"
            >
              <h4
                className={`font-nunito ${
                  darkThemeActive ? "text-white" : "text-skull-super-dark-brown"
                }`}
              >
                Emoji Kitchen Game
              </h4>
              <picture className="rounded-md overflow-hidden">
                <source srcSet={emojiKitchenWEBP} type="image/webp" />
                <source srcSet={emojiKitchenJPG} type="image/jpeg" />
                <img
                  loading="lazy"
                  className="flex w-full"
                  src={emojiKitchenJPG}
                  alt="Description of the article"
                />
              </picture>
              <p className="mt-1">
                😍👾Unleash your creativity by creating your favorite emoji
                combos! Copy paste text faces (ʘ‿ʘ) & emojis in a snap! 🎉💫
              </p>
            </Link>
          </div>
        </section>
      </main>
      <section>
        <SocialLinks />
      </section>
    </div>
  );
}

export default About;
