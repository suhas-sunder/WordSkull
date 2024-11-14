import { Link } from "react-router-dom";
import { useTheme } from "../client/components/context/ThemeContext";
import {  useState } from "react";
import Icon from "../client/components/utils/other/Icon";
import SocialLinks from "../client/components/navigation/SocialLinks";
import TextInput from "../client/components/form/TextInput";
import TextArea from "../client/components/form/TextArea";
import UploadImage from "../client/components/form/UploadImage";
import IndieTOSCheckbox from "../client/components/form/IndieTOSCheckbox";
import SaveAndSubmit from "../client/components/ui/interactive/SaveAndSubmit";
import AllIndieGameLinks from "../client/components/form/AllIndieGameLinks";
import { Form } from "@remix-run/react";

export default function EditIndieGame() {
  const [showPassword, setShowPassword] = useState(false);

  const { darkThemeActive } = useTheme();

  return (
    <div
      className={`${
        darkThemeActive ? "text-slate-300" : "text-skull-dark-brown"
      } flex justify-center flex-col items-center mt-[3em]`}
    >
      <header className="flex flex-col justify-center items-center gap-3 mb-3 mx-5 text-center">
        <h1
          className={`${
            darkThemeActive ? "text-slate-400" : "text-skull-dark-brown"
          } w-full z-1  flex justify-center items-center flex-col md:flex-row text-5xl text-center mt-1 leading-snug -translate-y-[0.3em] sm:translate-y-0 font-lora tracking-wide`}
        >
          {showPassword
            ? "Login: Edit Your Game's Page"
            : "Your Game's Page Header"}
        </h1>
      </header>
      <main className="flex flex-col gap-5 justify-center items-center w-full max-w-[1200px]">
        {showPassword ? (
          <Form
            method="post"
            className="flex flex-col gap-8 mt-10 font-lato tracking-wider"
          >
            <div className="flex gap-5 justify-center items-center text-xl">
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                className="border-2 rounded-md px-2 py-1"
              />
            </div>
            <div className="flex relative w-full min-h-10">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="flex border-2 rounded-md px-2 py-1 w-full"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="flex absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <Icon icon="dice" /> : <Icon icon="copy" />}
              </button>
            </div>
          </Form>
        ) : (
          <div className="flex flex-col w-full max-w-[800px] mx-auto tracking-wider px-5 mt-2">
            <Form method="post" className="flex flex-col w-full gap-5">
              <TextInput
                id="game-name"
                name="game-name"
                label="* Title Of Your Game (1 to 80 chars)"
                required={true}
                minLength={1}
                maxLength={80}
                placeholder="Enter title"
              />
              <TextArea
                label="* Brief Description (200 to 500 chars)"
                id="brief-description"
                name="brief-description"
                required={true}
                minLength={200}
                maxLength={500}
                placeholder="The text you enter here will be displayed in the header of your game's page. It will also be the preview text when displayed on other pages. I have just two requests: 

                  1. Please write a unique and original description of your game. If I get too many submissions that are 'copy pasted' from other websites, I run the risk of being flagged for duplicate content.
                  
                  2. Keep it safe for work. Don't include any profanity or adult content.

                  Thank you 😊!
                  "
              />
              <UploadImage
                id="image"
                type="file"
                accept="image/*"
                optionalText="game's promotional"
              />
              <IndieTOSCheckbox id="indie-terms-one" />
              <SaveAndSubmit />
            </Form>
            <AllIndieGameLinks />
            <Form
              method="post"
              className="flex flex-col gap-8 mt-10 font-lato tracking-wider"
            >
              <h2 className="flex py-2 text-4xl font-lora text-center w-full justify-center items-center">
                YouTube Game Trailer (Optional)
              </h2>
              Video title, youtube url
              <IndieTOSCheckbox id="indie-terms-three" />
              <SaveAndSubmit />
            </Form>
            <Form
              method="post"
              className="flex flex-col gap-8 mt-10 font-lato tracking-wider"
            >
              <h2 className="flex py-2 text-4xl font-lora text-center w-full justify-center items-center">
                Additional Game Details (Optional)
              </h2>
              Developer, Publisher, Genre, Platforms, Single Player,
              Multiplayer, Co-op, Achievements, Release Date, Demo, Base Game
              Price, Controller Support, Tags
              <IndieTOSCheckbox id="indie-terms-four" />
              <SaveAndSubmit />
            </Form>
            <Form
              method="post"
              className="flex flex-col gap-8 mt-10 font-lato tracking-wider"
            >
              <h2 className="flex py-2 text-4xl font-lora text-center w-full justify-center items-center">
                Article (Optional)
              </h2>
              title, image or youtube url, description
              <IndieTOSCheckbox id="indie-terms-five" />
              <SaveAndSubmit />
            </Form>

            <Form
              method="post"
              className="flex flex-col gap-8 justify-center items-center"
            >
              <h2 className="flex py-2 text-4xl font-lora text-center w-full justify-center items-center">
                Account Settings (Optional?)
              </h2>
              <button
                type="submit"
                className="flex justify-center items-center rounded-md bg-skull-dark-brown text-white px-4 py-2 w-[20em] hover:bg-skull-brown whitespace-nowrap"
              >
                Update Password
              </button>
              <button
                type="submit"
                className="flex justify-center items-center rounded-md bg-rose-600 text-white px-4 py-2 w-[20em] hover:bg-rose-500 whitespace-nowrap"
              >
                Delete Account
              </button>
            </Form>
          </div>
        )}
      </main>
      <section className="flex relative flex-col gap-4 mt-14 mb-10 font-lato tracking-wider max-w-[1200px] text-lg leading-loose">
        <div
          className="absolute -top-[5em]"
          id="indie-game-terms-of-service"
        ></div>
        <h2 className="flex py-2 text-4xl font-lora text-center w-full justify-center items-center mb-2">
          Terms and Conditions for Game Submission
        </h2>
        <p>
          By submitting your indie game to be featured on{" "}
          <Link
            to="/"
            className={`${
              darkThemeActive ? "text-orange-600" : "text-pumpkin-orange"
            } hover:text-amber-600 font-lora`}
          >
            WordSkull
          </Link>
          , you agree to the following terms and conditions:
        </p>
        <ul className="font-nunito pl-5 flex gap-5 flex-col list-disc">
          <li>
            You will post original content that does not infringe any
            third-party intellectual property rights.
          </li>
          <li>You will not post duplicate content from other websites.</li>
          <li>
            You will not post content that is illegal, threatening, abusive,
            harassing, defamatory, vulgar, obscene, pornographic, or hateful.
          </li>
          <li>
            You will not post content that is spammy, misleading, or deceptive.
          </li>
          <li>
            You will not post content that violates any applicable laws or
            regulations.
          </li>
          <li>You will not link to any obscene or illegal websites.</li>
          <li>You will post content that is related to your game.</li>
          <li>
            If your content violates any of our terms or fails to meet our
            standards, we reserve the right to modify or remove your content,
            and account, without notice.
          </li>
        </ul>
        <p>
          Once you have submitted your game, I may post a link to your page on
          social media. If you don&apos;t want me to share it for any reason,
          please let me know.
        </p>
        <p>
          I&apos;m planning on displaying all games in random order on the{" "}
          <Link
            to="/best-indie-games-showcase"
            className={`${
              darkThemeActive ? "text-orange-600" : "text-pumpkin-orange"
            } hover:text-amber-600 font-lora`}
          >
            Indie Games page
          </Link>
          , as well as, the sidebar on relevant pages. This way all contributors
          get a fair chance at being featured. I won&apos;t put priority towards
          any game on the{" "}
          <Link
            to="/best-indie-games-showcase"
            className={`${
              darkThemeActive ? "text-orange-600" : "text-pumpkin-orange"
            } hover:text-amber-600 font-lora`}
          >
            Indie Games page
          </Link>
          , including my own. Additionally, I will not be accepting paid
          promotions to have any games featured above others.
        </p>
        <p>
          Eventually, depending on how things go with my games, I may monetize
          it with ads. I haven&apos;t thought that far ahead to be honest. Just
          working on getting my word and puzzle games finished. However, I
          don&apos;t want it to come as a surprise if I do decide to monetize my
          site in the future, so this is the disclaimer.{" "}
        </p>
        <p>
          Thank you for your submission. If my submission form is missing any
          features, or if you have any questions or concerns, please don&apos;t
          hesitate to{" "}
          <Link
            to="/socials"
            className={`${
              darkThemeActive ? "text-orange-600" : "text-pumpkin-orange"
            } hover:text-amber-600 font-lora`}
          >
            contact me
          </Link>
          . I&apos;m excited to have your game showcased on{" "}
          <Link
            to="/"
            className={`${
              darkThemeActive ? "text-orange-600" : "text-pumpkin-orange"
            } hover:text-amber-600 font-lora`}
          >
            WordSkull
          </Link>
          !
        </p>
        <p>
          You can view your{" "}
          <Link
            to="/"
            className={`${
              darkThemeActive ? "text-orange-600" : "text-pumpkin-orange"
            } hover:text-amber-600 font-lora`}
          >
            indie game&apos;s featured page here
          </Link>
          !
        </p>
      </section>
      <section>
        <SocialLinks />
      </section>
    </div>
  );
}
