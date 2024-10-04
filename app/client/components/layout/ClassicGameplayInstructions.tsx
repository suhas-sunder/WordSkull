/* eslint-disable react/no-unescaped-entities */
import { Link } from "@remix-run/react";
import KeyboardImg from "../../assets/images/keyboard.jpg";
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
    <>
      {showInstructions && (
        <div
          id="gameplay-instructions"
          className="flex flex-col w-full justify-center items-center"
        >
          <h2
            className={`text-4xl font-nunito  uppercase mb-10 ${
              darkThemeActive ? "text-slate-300" : "text-slate-700"
            }`}
          >
            How to play
          </h2>
          <ul
            className={`flex max-w-[900px] flex-col gap-14 font-nunito text-center sm:text-start mx-5 text-lg tracking-wider leading-loose ${
              darkThemeActive ? "text-slate-400" : "text-slate-600"
            }`}
          >
            <li className="mx-auto text-center">
              Use a keyboard or mobile keypad to start typing a word.
            </li>
            <li className="flex w-full justify-center">
              <img
                className="rounded-md"
                width={600}
                src={KeyboardImg}
                loading="lazy"
                alt="Virtual keyboard"
              />
            </li>
            <li className="mx-auto text-center">
              The length of each word depends on the row you are on. Each square
              is labelled with the number of letters in that row.
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
            <img
              className="mx-auto rounded-md"
              width={400}
              src={SkullFirstRow}
              loading="lazy"
              alt="Typed word"
            />
            <li className="mx-auto text-center">
              If the word exists in the{" "}
              <span className="text-skull-brown hover:text-skull-dark-brown">
                <Link to="/words">dictionary</Link>
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
              <span className="text-skull-brown hover:text-skull-dark-brown">
                <Link to="/words">dictionary</Link>
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
              When you lose all lives, the game ends. You will be shown the game
              over menu where you can view and share your results or play again.
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
              <span className="text-skull-brown hover:text-skull-dark-brown">
                <Link to="/words">dictionary</Link>
              </span>
              , you are not penalized for it. There will be a message displayed
              that informs you that the word is not valid for this game and no
              lives will be deducted.
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
              If you repeat a word that has already been typed, you will not be
              penalized for it. For example, if you type in the word 'dance' and
              press enter. Then you type the word 'dance' again and press enter.
              You will not lose a life.
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
              The difficulty of the game determines how long the maximum length
              of any given word will be, as well as, the total number of rows
              and lives. The higher the difficulty, the longer the words and
              rows.
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
              position. A slightly matching character is one that exists in the
              word but is not located in the same position.
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
              To view all attempts at guessing the current word, either click on
              the bar above the skull, or press either space bar to toggle the
              display or press and hold the shift button to temporarily display
              the attempted words list.
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
              will highlight characters based on whether or not you have guessed
              them in your attempted words. So if you have guessed an exactly
              matching character, it will highlight that character in green on
              the keyboard. Similarly, slightly matching characters will be
              highlighted yellow. Characters that do not exist in the word will
              be a shade of grey.
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
              There is a timer that runs in the background to inform you of how
              long you took to complete the puzzle. It will not be displayed in
              the classic game mode by default but can be toggled on the
              settings menu. The timer will automatically start when an
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
              The black (eyes) and transparent (outline) squares can be ignored
              as they do not count as a character. They are easy to identify as
              they are not numbered. They are for illustration purposes only (to
              make the game somewhat resemble a skull). So when you type, those
              squares will automatically be skipped.
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
                className="text-skull-dark-brown hover:text-skull-super-dark-brown"
              >
                admin@wordskull.com
              </a>
              . I would love to get your feedback!
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default ClassicGameplayInstructions;
