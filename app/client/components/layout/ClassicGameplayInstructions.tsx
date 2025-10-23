/* eslint-disable react/no-unescaped-entities */
import { Link } from "@remix-run/react";
import KeyboardJpg from "../../assets/images/keyboard.jpg";
import KeyboardWebp from "../../assets/images/keyboard.webp";
import KeypadJpg from "../../assets/images/mobile-keypad.jpg";
import KeypadWebp from "../../assets/images/mobile-keypad.webp";
import SkullInstructions from "../../assets/images/first_row.jpg";
import SkullFirstRow from "../../assets/images/first_row_entry.jpg";
import SkullFirstRowEntered from "../../assets/images/first_row_submitted.jpg";
import Life from "../../assets/images/life.jpg";
import GameEndsEarly from "../../assets/images/failed_attempt_game_over.jpg";
import NotInList from "../../assets/images/not_in_list.jpg";
import Delete from "../../assets/images/delete.jpg";
import Dance from "../../assets/images/dance.jpg";
import Difficulty from "../../assets/images/difficulty.jpg";
import EntryBar from "../../assets/images/entered_preview.jpg";
import EntryPreview from "../../assets/images/entered_list.jpg";
import KeyboardEntered from "../../assets/images/keyboard_entered.jpg";
import Timer from "../../assets/images/timer.jpg";
import Blank from "../../assets/images/blank.jpg";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useSettings } from "../context/SettingsContext";

function ClassicGameplayInstructions() {
  const [isClient, setIsClient] = useState(false);
  const { darkThemeActive } = useTheme();
  const { showInstructions } = useSettings();

  useEffect(() => {
    // This will set the component to render only on the client side
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Prevent rendering on the server
  }

  return (
    <div className="flex flex-col justify-center items-center -mt-14">
      {/* === Related Sites Section === */}
      <section className="mb-20 w-full justify-center items-center max-w-[1200px]">
        <h2
          className={`${
            darkThemeActive ? "text-stone-300" : "text-skull-dark-brown"
          } flex py-2 text-3xl sm:text-4xl font-lora text-center w-full justify-center items-center mb-6`}
        >
          <span aria-hidden="true">✦</span>{" "}
          <span className="ml-2">More Fun Games & Projects</span>
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* 1 */}
          <a
            href="https://www.freetypingcamp.com"
            className={`block rounded-2xl border ${
              darkThemeActive
                ? "border-stone-700 bg-stone-900/40 hover:bg-stone-800/60"
                : "border-pumpkin-orange/60 bg-white/70 hover:bg-stone-50"
            } p-6 transition`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="font-lora text-xl mb-2 text-pumpkin-orange">
              Free Typing Camp
            </h3>
            <p className="font-lato text-base leading-relaxed tracking-wide">
              Practice typing speed and accuracy through fun drills and
              challenges. Perfect for improving words-per-minute skills.
            </p>
          </a>

          {/* 2 */}
          <a
            href="https://www.morsewords.com"
            className={`block rounded-2xl border ${
              darkThemeActive
                ? "border-stone-700 bg-stone-900/40 hover:bg-stone-800/60"
                : "border-pumpkin-orange/60 bg-white/70 hover:bg-stone-50"
            } p-6 transition`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="font-lora text-xl mb-2 text-pumpkin-orange">
              Morse Words
            </h3>
            <p className="font-lato text-base leading-relaxed tracking-wide">
              Learn Morse code interactively. Decode, translate, and test your
              signal speed with words and sentences.
            </p>
          </a>

          {/* 3 */}
          <a
            href="https://www.ilovecoloringpage.com"
            className={`block rounded-2xl border ${
              darkThemeActive
                ? "border-stone-700 bg-stone-900/40 hover:bg-stone-800/60"
                : "border-pumpkin-orange/60 bg-white/70 hover:bg-stone-50"
            } p-6 transition`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="font-lora text-xl mb-2 text-pumpkin-orange">
              I Love Coloring Page
            </h3>
            <p className="font-lato text-base leading-relaxed tracking-wide">
              Thousands of printable and digital coloring pages for all ages.
              Relax, create, and share your art.
            </p>
          </a>

          {/* 4 */}
          <a
            href="https://www.wordmythology.com"
            className={`block rounded-2xl border ${
              darkThemeActive
                ? "border-stone-700 bg-stone-900/40 hover:bg-stone-800/60"
                : "border-pumpkin-orange/60 bg-white/70 hover:bg-stone-50"
            } p-6 transition`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="font-lora text-xl mb-2 text-pumpkin-orange">
              Word Mythology
            </h3>
            <p className="font-lato text-base leading-relaxed tracking-wide">
              Explore the origins and myths behind everyday words. Learn
              etymology through stories and symbolism.
            </p>
          </a>

          {/* 5 */}
          <a
            href="https://www.funmoneygames.com"
            className={`block rounded-2xl border ${
              darkThemeActive
                ? "border-stone-700 bg-stone-900/40 hover:bg-stone-800/60"
                : "border-pumpkin-orange/60 bg-white/70 hover:bg-stone-50"
            } p-6 transition`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="font-lora text-xl mb-2 text-pumpkin-orange">
              Fun Money Games
            </h3>
            <p className="font-lato text-base leading-relaxed tracking-wide">
              Play interactive finance and math games to learn saving,
              budgeting, and spending in a fun way.
            </p>
          </a>

          {/* 6 */}
          <a
            href="https://www.ilovemythology.com"
            className={`block rounded-2xl border ${
              darkThemeActive
                ? "border-stone-700 bg-stone-900/40 hover:bg-stone-800/60"
                : "border-pumpkin-orange/60 bg-white/70 hover:bg-stone-50"
            } p-6 transition`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="font-lora text-xl mb-2 text-pumpkin-orange">
              I Love Mythology
            </h3>
            <p className="font-lato text-base leading-relaxed tracking-wide">
              Dive into gods, heroes, and folklore from around the world with
              easy-to-read mythology summaries and art.
            </p>
          </a>

          {/* 7 */}
          <a
            href="https://www.sushiclicker.com"
            className={`block rounded-2xl border ${
              darkThemeActive
                ? "border-stone-700 bg-stone-900/40 hover:bg-stone-800/60"
                : "border-pumpkin-orange/60 bg-white/70 hover:bg-stone-50"
            } p-6 transition`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="font-lora text-xl mb-2 text-pumpkin-orange">
              Sushi Clicker
            </h3>
            <p className="font-lato text-base leading-relaxed tracking-wide">
              A fast-paced incremental clicker game where you build your sushi
              empire. Tap, upgrade, and grow.
            </p>
          </a>

          {/* 8 */}
          <a
            href="https://www.focusclimber.com"
            className={`block rounded-2xl border ${
              darkThemeActive
                ? "border-stone-700 bg-stone-900/40 hover:bg-stone-800/60"
                : "border-pumpkin-orange/60 bg-white/70 hover:bg-stone-50"
            } p-6 transition`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="font-lora text-xl mb-2 text-pumpkin-orange">
              Focus Climber
            </h3>
            <p className="font-lato text-base leading-relaxed tracking-wide">
              Gamify your focus sessions. Set timers, climb digital peaks, and
              track progress one task at a time.
            </p>
          </a>

          {/* 9 */}
          <a
            href="https://www.pomotomato.com"
            className={`block rounded-2xl border ${
              darkThemeActive
                ? "border-stone-700 bg-stone-900/40 hover:bg-stone-800/60"
                : "border-pumpkin-orange/60 bg-white/70 hover:bg-stone-50"
            } p-6 transition`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="font-lora text-xl mb-2 text-pumpkin-orange">
              Pomo Tomato
            </h3>
            <p className="font-lato text-base leading-relaxed tracking-wide">
              A cheerful Pomodoro timer with playful tomato animations. Stay
              productive while keeping it lighthearted.
            </p>
          </a>

          {/* 10 */}
          <a
            href="https://www.ilovepomodoro.com"
            className={`block rounded-2xl border ${
              darkThemeActive
                ? "border-stone-700 bg-stone-900/40 hover:bg-stone-800/60"
                : "border-pumpkin-orange/60 bg-white/70 hover:bg-stone-50"
            } p-6 transition`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="font-lora text-xl mb-2 text-pumpkin-orange">
              I Love Pomodoro
            </h3>
            <p className="font-lato text-base leading-relaxed tracking-wide">
              Classic Pomodoro timer for serious focus. Minimal design, clean
              stats, and simple productivity tracking.
            </p>
          </a>

          {/* 11 */}
          <a
            href="https://www.dragontyping.com"
            className={`block rounded-2xl border ${
              darkThemeActive
                ? "border-stone-700 bg-stone-900/40 hover:bg-stone-800/60"
                : "border-pumpkin-orange/60 bg-white/70 hover:bg-stone-50"
            } p-6 transition`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="font-lora text-xl mb-2 text-pumpkin-orange">
              Dragon Typing
            </h3>
            <p className="font-lato text-base leading-relaxed tracking-wide">
              Type to train your dragon. Improve typing speed while hatching
              eggs, collecting treasures, and conquering speed trials.
            </p>
          </a>

          {/* 12 */}
          <a
            href="https://www.ilovewordsearch.com"
            className={`block rounded-2xl border ${
              darkThemeActive
                ? "border-stone-700 bg-stone-900/40 hover:bg-stone-800/60"
                : "border-pumpkin-orange/60 bg-white/70 hover:bg-stone-50"
            } p-6 transition`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="font-lora text-xl mb-2 text-pumpkin-orange">
              I Love Word Search
            </h3>
            <p className="font-lato text-base leading-relaxed tracking-wide">
              Find hidden words in themed puzzles. Relax, challenge your brain,
              and improve pattern recognition with daily word searches.
            </p>
          </a>
        </div>
      </section>

      {showInstructions && (
        <>
          <div className="flex relative flex-col w-full justify-center items-center  mb-5">
            <div id="gameplay-instructions" className="absolute -top-[5em]" />
            <h2
              className={`text-4xl font-nunito  uppercase mb-5 ${
                darkThemeActive ? "text-stone-400" : "text-skull-dark-brown"
              }`}
            >
              How to play
            </h2>
            <ul
              className={`flex max-w-[900px] flex-col gap-6 font-lato text-center sm:text-start mx-5 text-xl tracking-wider leading-loose ${
                darkThemeActive ? "text-stone-300" : "text-skull-dark-brown"
              }`}
            >
              <li className="mx-auto text-center">
                Use a keyboard or mobile keypad to start typing a word.
              </li>
              <li className="flex flex-col w-full justify-center gap-6 items-center">
                <picture>
                  <source srcSet={KeyboardWebp} type="image/webp" />
                  <img
                    className="rounded-md"
                    width={600}
                    src={KeyboardJpg}
                    loading="lazy"
                    alt="Virtual keyboard"
                  />
                </picture>
                <picture>
                  <source srcSet={KeypadWebp} type="image/webp" />
                  <img
                    className="rounded-md"
                    width={300}
                    height={153}
                    src={KeypadJpg}
                    loading="lazy"
                    alt="Virtual keyboard"
                  />
                </picture>
              </li>
              <li className="mx-auto text-center">
                The length of each word depends on the row you are on. Each
                square is labelled with the number of letters in that row.
              </li>
              <li className="flex w-full justify-center">
                <img
                  className="mx-auto rounded-md"
                  width={400}
                  src={SkullInstructions}
                  loading="lazy"
                  alt="First row instructions"
                />
              </li>
              <li className="mx-auto text-center">
                Once you have typed your word, press enter to submit it.
              </li>
              <li className="flex w-full justify-center">
                <img
                  className="mx-auto rounded-md"
                  width={400}
                  src={SkullFirstRow}
                  loading="lazy"
                  alt="Typed word"
                />
              </li>
              <li className="mx-auto text-center">
                If the word exists in the{" "}
                <span className="text-pumpkin-orange hover:text-amber-500">
                  <Link to="/words-list">dictionary (word list)</Link>
                </span>
                , and you get it right, you will be moved to the next row. This
                repeats until you complete all rows and win.
              </li>
              <li className="flex w-full justify-center">
                <img
                  className="mx-auto rounded-md"
                  width={400}
                  src={SkullFirstRowEntered}
                  loading="lazy"
                  alt="Entered word"
                />
              </li>
              <li className="mx-auto text-center">
                If your submitted word exists in the{" "}
                <span className="text-pumpkin-orange hover:text-amber-500">
                  <Link to="/words-list">dictionary (word list)</Link>
                </span>{" "}
                but does not match the correct word, you lose a life.
              </li>
              <li className="flex w-full justify-center">
                <img
                  className="mx-auto rounded-md"
                  width={400}
                  src={Life}
                  alt="Lives left"
                />
              </li>
              <li className="mx-auto text-center">
                When you lose all lives, the game ends. You will be shown the
                game over menu where you can view and share your results or play
                again.
              </li>
              <li className="flex w-full justify-center">
                <img
                  className="mx-auto rounded-md"
                  width={700}
                  src={GameEndsEarly}
                  loading="lazy"
                  alt="Game over menu"
                />
              </li>
              <li className="mx-auto text-center">
                If a word does not exist in the{" "}
                <span className="text-pumpkin-orange hover:text-amber-500">
                  <Link to="/words-list">dictionary (word list)</Link>
                </span>
                , you are not penalized for it. There will be a message
                displayed that informs you that the word is not valid for this
                game and no lives will be deducted.
              </li>
              <li className="flex w-full justify-center">
                <img
                  className="mx-auto rounded-md"
                  width={400}
                  src={NotInList}
                  loading="lazy"
                  alt="Invalid word message"
                />
              </li>
              <li className="mx-auto text-center">
                If you have typed a wrong word and want to try another, use the
                backspace key to delete existing characters.
              </li>
              <li className="flex w-full justify-center">
                <img
                  className="mx-auto rounded-md"
                  width={400}
                  src={Delete}
                  alt="Word deletion"
                />
              </li>
              <li className="mx-auto text-center">
                If you repeat a word that has already been typed, you will not
                be penalized for it. For example, if you type in the word
                'dance' and press enter. Then you type the word 'dance' again
                and press enter. You will not lose a life.
              </li>{" "}
              <li className="flex w-full justify-center">
                <img
                  className="mx-auto rounded-md"
                  width={400}
                  src={Dance}
                  loading="lazy"
                  alt="First row is the word 'dance'"
                />
              </li>
              <li className="mx-auto text-center">
                The difficulty of the game determines how long the maximum
                length of any given word will be, as well as, the total number
                of rows and lives. The higher the difficulty, the longer the
                words and rows.
              </li>
              <li className="flex w-full justify-center">
                <img
                  className="mx-auto rounded-md"
                  width={600}
                  src={Difficulty}
                  loading="lazy"
                  alt="Difficulty menu"
                />
              </li>
              <li className="mx-auto text-center">
                You will notice a bar sitting on top of the skull. This bar will
                fill up with your attempted word when you submit it, and will
                display the exactly matching characters in green, and slightly
                matching characters in yellow. An exactly matching character is
                one which exists in the correct word and is located in the same
                position. A slightly matching character is one that exists in
                the word but is not located in the same position.
              </li>
              <li className="flex w-full justify-center">
                <img
                  className="mx-auto rounded-md"
                  width={600}
                  src={EntryBar}
                  loading="lazy"
                  alt="Entered word preview"
                />
              </li>
              <li className="mx-auto text-center">
                To view all attempts at guessing the current word, either click
                on the bar above the skull, or press either space bar to toggle
                the display or press and hold the shift button to temporarily
                display the attempted words list.
              </li>
              <li className="flex w-full justify-center">
                <img
                  className="mx-auto rounded-md"
                  width={600}
                  src={EntryPreview}
                  loading="lazy"
                  alt="Entered word preview full list"
                />
              </li>
              <li className="mx-auto text-center">
                Additionally, the keyboard or keypad displayed below the skull
                will highlight characters based on whether or not you have
                guessed them in your attempted words. So if you have guessed an
                exactly matching character, it will highlight that character in
                green on the keyboard. Similarly, slightly matching characters
                will be highlighted yellow. Characters that do not exist in the
                word will be a shade of grey.
              </li>
              <li className="flex w-full justify-center">
                <img
                  className="mx-auto rounded-md"
                  width={600}
                  src={KeyboardEntered}
                  loading="lazy"
                  alt="Entered word yellow and green character highlights"
                />
              </li>
              <li className="mx-auto text-center">
                There is a timer that runs in the background to inform you of
                how long you took to complete the puzzle. It will not be
                displayed in the classic game mode by default but can be toggled
                on the settings menu. The timer will automatically start when an
                alphanumeric or enter key on the keyboard or keypad is pressed.
              </li>
              <li className="flex w-full justify-center">
                <img
                  className="mx-auto rounded-md"
                  width={200}
                  src={Timer}
                  alt="Timer"
                />
              </li>
              <li className="mx-auto text-center">
                The black (eyes) and transparent (outline) squares can be
                ignored as they do not count as a character. They are easy to
                identify as they are not numbered. They are for illustration
                purposes only (to make the game somewhat resemble a skull). So
                when you type, those squares will automatically be skipped.
              </li>
              <li className="flex w-full justify-center">
                <img
                  className="mx-auto rounded-md"
                  width={600}
                  src={Blank}
                  loading="lazy"
                  alt="Placeholder squares"
                />
              </li>
              <li className="mx-auto text-center">
                If you have any questions, or found any of the instructions
                unclear, please feel free to contact me at{" "}
                <a
                  href="mailto:admin@wordskull.com"
                  className="text-pumpkin-orange hover:text-amber-500"
                >
                  admin@wordskull.com
                </a>
                . I would love to get your feedback!
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default ClassicGameplayInstructions;
