/* eslint-disable jsx-a11y/heading-has-content */
import { MetaFunction } from "@remix-run/node";
import { Link } from "react-router-dom";
import { useTheme } from "../client/components/context/ThemeContext";
import SocialLinks from "../client/components/navigation/SocialLinks";
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

  return (
    <div
      className={`${
        darkThemeActive ? "text-slate-300" : "text-skull-dark-brown"
      } flex animate-fadeIn justify-center flex-col items-center mt-[3em]`}
    >
      <header className="flex flex-col justify-center items-center gap-3 mb-3 mx-5 text-center">
        <h1
          className={`${
            darkThemeActive ? "text-slate-400" : "text-skull-dark-brown"
          } w-full z-1  flex justify-center items-center flex-col md:flex-row text-5xl text-center mt-1 leading-snug -translate-y-[0.3em] sm:translate-y-0 font-lora tracking-wide`}
        >
          Best Indie Games To Play In {new Date().getFullYear()}
        </h1>
        <p className="font-lato text-lg tracking-wider leading-loose  mb-3 sm:pl-5 max-w-[1200px]">
          These creative indie games include hidden gems and upcoming releases
          you won’t want to miss. Crafted by small teams (or even solo devs) who
          pour their hearts into creating rich stories, fun and engaging
          gameplay, and stunning artwork, each title offers a fresh take on
          various genres with innovative mechanics and unique art styles. If
          you&apos;re looking for a game that&apos;s new and exciting,
          you&apos;ve come to the right place!
        </p>
      </header>
      <main className="grid xs:grid-cols-2 md:grid-cols-3 gap-5 lg:grid-cols-4 max-w-[1200px] w-full mt-2 justify-center flex-col mb-10 px-5 ">
        <Link
          to="preview-of-your-indie-game"
          className="flex flex-col gap-2 hover:scale-105 transition duration-300 ease-in-out mt-3"
        >
          <h4
            className={`font-nunito text-center capitalize ${
              darkThemeActive ? "text-white" : "text-skull-super-dark-brown"
            }`}
          >
            Name of Game 1
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
          <p className="mt-1 text-center">
            A brief description about the game. Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </p>
        </Link>
        <Link
          to="preview-of-your-indie-game"
          className="flex flex-col gap-2 hover:scale-105 transition duration-300 ease-in-out mt-3"
        >
          <h4
            className={`font-nunito text-center capitalize ${
              darkThemeActive ? "text-white" : "text-skull-super-dark-brown"
            }`}
          >
            Name of your Game 2
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
          <p className="mt-1 text-center">
            A brief description about the game. Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </p>
        </Link>
      </main>
      <section className="mb-5">
        <div className="max-w-[1000px] text-center leading-loose">
          Interested in showcasing your indie game?{" "}
          <Link
            to="/socials"
            className={`${
              darkThemeActive ? "text-orange-600" : "text-pumpkin-orange"
            } hover:text-amber-600 font-lora`}
          >
            Contact us
          </Link>{" "}
          with information about your game to find out if it qualifies. Once
          we&apos;ve reviewed your game, we&apos;ll get back to you with
          information on how to submit. Here is a{" "}
          <Link
            to="/edit-indie-game"
            className={`${
              darkThemeActive ? "text-orange-600" : "text-pumpkin-orange"
            } hover:text-amber-600 font-lora`}
          >
            detailed submission guide
          </Link>{" "}
          you can review in the meantime.{" "}
        </div>
      </section>
      <section>
        <SocialLinks />
      </section>
    </div>
  );
}

export default About;
