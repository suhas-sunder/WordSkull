/* eslint-disable jsx-a11y/heading-has-content */
import { MetaFunction } from "@remix-run/node";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "../client/components/context/ThemeContext";
import SocialLinks from "../client/components/navigation/SocialLinks";
import * as AboutMDX from "./mdx/about-en.mdx";
import useFormatMDX from "../client/components/hooks/useFormatMDX";
import emojiKitchenJPG from "../client/assets/images/emoji-kitchen-game-preview.jpg";
import emojiKitchenWEBP from "../client/assets/images/emoji-kitchen-game-preview.webp";
import dragonMythologyJPG from "../client/assets/images/sakura-dragon-skull-anime-fantasy-dungeon-wordskull-993.jpg";
import dragonMythologyWEBP from "../client/assets/images/sakura-dragon-skull-anime-fantasy-dungeon-wordskull-993.webp";
import wallpaperJPG from "../client/assets/images/wicked-witch-fantasy-dungeon-wordskull-1047.jpg";
import wallpaperWEBP from "../client/assets/images/wicked-witch-fantasy-dungeon-wordskull-1047.webp";

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
        darkThemeActive ? "text-stone-300" : "text-skull-dark-brown"
      } flex  justify-center flex-col items-center mt-12`}
    >
      <header className="flex flex-col justify-center items-center gap-3 mb-3 mx-5 text-center">
        <h1
          className={`${
            darkThemeActive ? "text-stone-400" : "text-skull-dark-brown"
          } w-full z-1  flex justify-center items-center flex-col md:flex-row text-5xl text-center mt-1 leading-snug -translate-y-[0.3em] sm:translate-y-0 font-lora tracking-wide`}
        >
          <span className="mr-2">
            Discover the Story Behind{" "}
            <span className="whitespace-nowrap">
              {" "}
              <span className="inline-flex">W</span>
              <span className="inline-flex animate-scalePulse">💀</span>
              <span className="inline-flex">rd</span>
              <span className="inline-flex">Skull</span>
            </span>
          </span>
        </h1>
        <p className="font-lato text-lg tracking-wider leading-loose  mb-3 sm:pl-5 max-w-[1200px]">
          👋🏽Hi! My name is Suhas, and I’m excited to share my journey creating a
          word game website that provides a fun and engaging learning
          experience. Here is a link to my
          <Link
            className={"text-pumpkin-orange hover:text-amber-600 font-lora"}
            to="https://github.com/suhas-sunder"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            GitHub profile
          </Link>
          . If you want to learn more about me, feel free to visit my
          <Link
            className={"text-pumpkin-orange hover:text-amber-600 font-lora"}
            to="https://www.suhassunder.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            portfolio website
          </Link>{" "}
          or visit any of my
          <Link
            className={"text-pumpkin-orange hover:text-amber-600 font-lora"}
            to="/socials"
          >
            {" "}
            social pages
          </Link>
          .
        </p>
      </header>
      <main className="flex max-w-[1200px] w-full mt-4 justify-center flex-col lg:flex-row px-5">
        <article className="flex flex-col max-w-[900px] sm:mr-5">
          {location.pathname === "/about" ? (
            <AboutMDX.default components={CustomComponents} />
          ) : (
            <Outlet />
          )}
        </article>
        <section className="flex flex-col w-full mt-4 min-w-[180px] gap-5 text-center">
          {/* <div className="flex flex-col gap-2">
            <h3
              className={`font-lora text-xl ${
                darkThemeActive ? "text-stone-200" : "text-skull-super-dark-brown"
              }`}
            >
              Related Blogs
            </h3>
            <Link
              to="https://www.emoji-kitchen.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-2 hover:scale-105 transition duration-300 ease-in-out"
            >
              <h4
                className={`font-nunito ${
                  darkThemeActive ? "text-stone-200" : "text-skull-super-dark-brown"
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
                  width={460}
                  height={260}
                />
              </picture>
              <p className="mt-1 group-hover:text-amber-600">
                😍👾Unleash your creativity by creating your favorite emoji
                combos! Copy paste text faces (ʘ‿ʘ) & emojis in a snap! 🎉💫
              </p>
            </Link>
            <Link
              to="https://www.emoji-kitchen.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-2 hover:scale-105 transition duration-300 ease-in-out mt-3"
            >
              <h4
                className={`font-nunito ${
                  darkThemeActive ? "text-stone-200" : "text-skull-super-dark-brown"
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
                  width={460}
                  height={260}
                />
              </picture>
              <p className="mt-1 group-hover:text-amber-600">
                😍👾Unleash your creativity by creating your favorite emoji
                combos! Copy paste text faces (ʘ‿ʘ) & emojis in a snap! 🎉💫
              </p>
            </Link>
            <Link
              to="https://www.emoji-kitchen.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-2 hover:scale-105 transition duration-300 ease-in-out mt-3"
            >
              <h4
                className={`font-nunito ${
                  darkThemeActive ? "text-stone-200" : "text-skull-super-dark-brown"
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
                  width={460}
                  height={260}
                />
              </picture>
              <p className="mt-1 group-hover:text-amber-600">
                😍👾Unleash your creativity by creating your favorite emoji
                combos! Copy paste text faces (ʘ‿ʘ) & emojis in a snap! 🎉💫
              </p>
            </Link>
            <Link
              to="https://www.emoji-kitchen.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-2 hover:scale-105 transition duration-300 ease-in-out mt-3"
            >
              <h4
                className={`font-nunito ${
                  darkThemeActive ? "text-stone-200" : "text-skull-super-dark-brown"
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
                  width={460}
                  height={260}
                />
              </picture>
              <p className="mt-1 group-hover:text-amber-600">
                😍👾Unleash your creativity by creating your favorite emoji
                combos! Copy paste text faces (ʘ‿ʘ) & emojis in a snap! 🎉💫
              </p>
            </Link>
          </div> */}
          <div className="flex flex-col gap-2">
            <h3
              className={`font-lora text-xl ${
                darkThemeActive
                  ? "text-stone-200"
                  : "text-skull-super-dark-brown"
              }`}
            >
              Board Game Reviews
            </h3>
            <div className="flex xs:grid grid-cols-2 gap-5 lg:gap-2 lg:flex flex-col">
              <Link
                to="/board-game-reviews/learn-how-to-play-settlers-of-catan"
                className="group flex flex-col gap-2 hover:scale-105 transition duration-300 ease-in-out mt-3 text-pumpkin-orange group-hover:text-amber-600 shadow-md hover:shadow-lg hover:shadow-amber-600/30 rounded-xl py-4 px-4 shadow-pumpkin-orange/20 bg-opacity-10"
              >
                <h4
                  className={"font-nunito text-lg group-hover:text-amber-600"}
                >
                  Settlers Of Catan
                </h4>
                <picture className="rounded-md overflow-hidden">
                  <source srcSet={dragonMythologyWEBP} type="image/webp" />
                  <source srcSet={dragonMythologyJPG} type="image/jpeg" />
                  <img
                    loading="lazy"
                    className="flex w-full"
                    src={dragonMythologyJPG}
                    alt="A massive pink and purple dragon surrounded by sakura trees and clouds"
                    width={460}
                    height={260}
                  />
                </picture>
                <p className="mt-1 group-hover:text-amber-600">
                  Learn how to play Catan, game setup, strategy tips, and
                  insights perfect for newcomers and experienced players.
                </p>
              </Link>
              <Link
                to="/board-game-reviews/learn-how-to-play-monopoly"
                className="group flex flex-col gap-2 hover:scale-105 transition duration-300 ease-in-out mt-3 text-pumpkin-orange group-hover:text-amber-600 shadow-md hover:shadow-lg hover:shadow-amber-600/30 rounded-xl py-4 px-4 shadow-pumpkin-orange/20 bg-opacity-10"
              >
                <h4
                  className={"font-nunito text-lg group-hover:text-amber-600"}
                >
                  Monopoly
                </h4>
                <picture className="rounded-md overflow-hidden">
                  <source srcSet={wallpaperWEBP} type="image/webp" />
                  <source srcSet={wallpaperJPG} type="image/jpeg" />
                  <img
                    loading="lazy"
                    className="flex w-full"
                    src={wallpaperJPG}
                    alt="A cartoony witch girl with pink hair in a majestic forest with glowing leave and trees"
                    width={460}
                    height={260}
                  />
                </picture>
                <p className="mt-1 group-hover:text-amber-600">
                  A comprehensive guided on how to play the Monopoly board game:
                  setup, strategy, and tips to help you win. Perfect for anyone
                  ready to rule the board!
                </p>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3
              className={`font-lora text-xl ${
                darkThemeActive
                  ? "text-stone-200"
                  : "text-skull-super-dark-brown"
              }`}
            >
              Games & Apps
            </h3>
            <div className="flex xs:grid grid-cols-2 gap-5 lg:gap-2 lg:flex flex-col">
              <Link
                to="https://www.emojikitchengame.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 hover:scale-105 transition duration-300 ease-in-out mt-3 text-pumpkin-orange group-hover:text-amber-600 shadow-md hover:shadow-lg hover:shadow-amber-600/30 rounded-xl py-4 px-4 shadow-pumpkin-orange/20 bg-opacity-10"
              >
                <h4
                  className={"font-nunito text-lg group-hover:text-amber-600"}
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
                    alt="Colorful emojis surrounding text that reads emoji kitchen game"
                    width={460}
                    height={260}
                  />
                </picture>
                <p className="mt-1 group-hover:text-amber-600">
                  😍👾Unleash your creativity by creating your favorite emoji
                  combos! Copy paste text faces (ʘ‿ʘ) & emojis in a snap! 🎉💫
                </p>
              </Link>
              <Link
                to="https://www.dragonmythology.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 hover:scale-105 transition duration-300 ease-in-out mt-3 text-pumpkin-orange group-hover:text-amber-600 shadow-md hover:shadow-lg hover:shadow-amber-600/30 rounded-xl py-4 px-4 shadow-pumpkin-orange/20 bg-opacity-10"
              >
                <h4
                  className={"font-nunito text-lg group-hover:text-amber-600"}
                >
                  Dragon Mythology
                </h4>
                <picture className="rounded-md overflow-hidden">
                  <source srcSet={dragonMythologyWEBP} type="image/webp" />
                  <source srcSet={dragonMythologyJPG} type="image/jpeg" />
                  <img
                    loading="lazy"
                    className="flex w-full"
                    src={dragonMythologyJPG}
                    alt="A massive pink and purple dragon surrounded by sakura trees and clouds"
                    width={460}
                    height={260}
                  />
                </picture>
                <p className="mt-1 group-hover:text-amber-600">
                  🐲 Explore captivating myths and legends from around the
                  world. Discover Greek, Hindu, Norse, Chinese, and Japanese
                  mythology, and dive into ancient stories and cultural lore. 🐉
                </p>
              </Link>

              <Link
                to="/wallpaper"
                className="group flex flex-col gap-2 hover:scale-105 transition duration-300 ease-in-out mt-3 text-pumpkin-orange group-hover:text-amber-600 shadow-md hover:shadow-lg hover:shadow-amber-600/30 rounded-xl py-4 px-4 shadow-pumpkin-orange/20 bg-opacity-10"
              >
                <h4
                  className={"font-nunito text-lg group-hover:text-amber-600"}
                >
                  Fantasy 4K HD Wallpapers
                </h4>
                <picture className="rounded-md overflow-hidden">
                  <source srcSet={wallpaperWEBP} type="image/webp" />
                  <source srcSet={wallpaperJPG} type="image/jpeg" />
                  <img
                    loading="lazy"
                    className="flex w-full"
                    src={wallpaperJPG}
                    alt="A cartoony witch girl with pink hair in a majestic forest with glowing leave and trees"
                    width={460}
                    height={260}
                  />
                </picture>
                <p className="mt-1 group-hover:text-amber-600">
                  Similar to the online word games and puzzle on WordSkull,
                  these wallpapers are fantasy dungeon themed and are perfect
                  for your desktop, laptop, social media, profile pics, and
                  more.
                </p>
              </Link>
              <Link
                to="https://www.dragonmythology.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 hover:scale-105 transition duration-300 ease-in-out mt-3 text-pumpkin-orange group-hover:text-amber-600 shadow-md hover:shadow-lg hover:shadow-amber-600/30 rounded-xl py-4 px-4 shadow-pumpkin-orange/20 bg-opacity-10"
              >
                <h4
                  className={"font-nunito text-lg group-hover:text-amber-600"}
                >
                  Productivity Garden
                </h4>
                <picture className="rounded-md overflow-hidden">
                  <source srcSet={dragonMythologyWEBP} type="image/webp" />
                  <source srcSet={dragonMythologyJPG} type="image/jpeg" />
                  <img
                    loading="lazy"
                    className="flex w-full"
                    src={dragonMythologyJPG}
                    alt="A massive pink and purple dragon surrounded by sakura trees and clouds"
                    width={460}
                    height={260}
                  />
                </picture>
                <p className="mt-1 group-hover:text-amber-600">
                  🌱 Discover tips, tricks, tools, and strategies to optimize
                  your workflow and boost your productivity. 🌿📚
                </p>
              </Link>
            </div>
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
