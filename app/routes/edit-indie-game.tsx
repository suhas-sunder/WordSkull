import { Link } from "react-router-dom";
import { useTheme } from "../client/components/context/ThemeContext";
import { useState } from "react";
import SocialLinks from "../client/components/navigation/SocialLinks";
import IndieGameLinksForm from "../client/components/form/IndieGameLinksForm";
import IndieLoginForm from "../client/components/form/IndieLoginForm";
import IndieGamesHeaderForm from "../client/components/form/IndieGamesHeaderForm";
import IndieGameYTForm from "../client/components/form/IndieGameYTForm";
import IndieGameDetailsForm from "../client/components/form/IndieGameDetailsForm";
import IndieGameArticlesForm from "../client/components/form/IndieGameArticlesForm";
import IndieGameSettingsForm from "../client/components/form/IndieGameSettingsForm";

export default function EditIndieGame() {
  const [showPassword] = useState(false);

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
          <IndieLoginForm />
        ) : (
          <div className="flex flex-col w-full max-w-[800px] mx-auto tracking-wider px-5 mt-2">
            <IndieGamesHeaderForm />
            <IndieGameLinksForm />
            <IndieGameYTForm />
            <IndieGameDetailsForm />
            <IndieGameArticlesForm />
            <IndieGameSettingsForm />
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
