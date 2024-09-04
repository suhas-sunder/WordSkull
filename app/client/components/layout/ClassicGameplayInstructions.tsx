/* eslint-disable react/no-unescaped-entities */
import { Link } from "@remix-run/react";

function ClassicGameplayInstructions() {
  return (
    <div
      id="gameplay-instructions"
      className="flex flex-col w-full justify-center items-center mt-[3.5em]"
    >
      <h2 className="text-4xl font-nunito text-slate-700 uppercase mb-10">
        How to play
      </h2>
      <ul className="flex max-w-[1200px] flex-col gap-5 font-nunito text-slate-600 text-lg tracking-wider leading-loose">
        <li>Use a keyboard or mobile keypad to start typing a word.</li>
        <li>
          The length of each word depends on the row you are on. Each square is
          labelled with the number of letters in that row.
        </li>
        <li>
          Once you have typed your word, press enter to submit it. If the word
          exists in the{" "}
          <span className="text-skull-brown hover:text-skull-dark-brown">
            <Link to="/words">dictionary</Link>
          </span>
          , and you get it right, you will be moved to the next row. This
          repeats until you reach the end of the board and win.
        </li>
        <li>
          If your submitted word exists in the{" "}
          <span className="text-skull-brown hover:text-skull-dark-brown">
            <Link to="/words">dictionary</Link>
          </span>
          , but does not match the correct word, you lose a life. When you lose
          all lives, the game ends. You will be shown the game over menu where
          you can see and share your results or play again.
        </li>
        <li>
          If a word does not exist in the{" "}
          <span className="text-skull-brown hover:text-skull-dark-brown">
            <Link to="/words">dictionary</Link>
          </span>
          , you are not penalized for it. There will be a message displayed that
          informs you that the word is not valid for this game and no lives will
          be deducted.
        </li>
        <li>
          If you have typed a wrong word and want to try another, use the
          backspace key to delete existing characters.
        </li>
        <li>
          If you repeat a word that has already been typed, you will not be
          penalized for it. For example, if you type in the word 'food' and
          press enter. Then you type the word 'food' again and press enter. You
          will not lose a life.
        </li>{" "}
        <li>
          The difficulty of the game determines how long the maximum length of
          any given word will be, as well as, the total number of rows. The
          higher the difficulty, the longer the words and rows.
        </li>
        <li>
          You will notice a bar sitting on top of the skull. This bar will fill
          up with your attempted word when you submit it, and will display the
          exactly matching characters in green, and slightly matching characters
          in yellow. An exactly matching character is one which exists in the
          correct word and is located in the same position. A slightly matching
          character is one that exists in the word but is not located in the
          same position.
        </li>
        <li>
          To view all attempts at guessing the current word, either click on the
          bar above the skull, or press either space bar to toggle the display
          or press and hold the shift button to temporarily display the
          attempted words list.
        </li>
        <li>
          Additionally, the keyboard or keypad displayed below the skull will
          highlight characters based on whether or not you have guessed them in
          your attempted words. So if you have guessed an exactly matching
          character, it will highlight that character in green on the keyboard.
          Similarly, slightly matching characters will be highlighted yellow.
          Characters that do not exist in the word will be a shade of grey.
        </li>
        <li>
          There is a timer that runs in the background to inform you of how long
          you took to complete the puzzle. It will not be displayed in the
          classic game mode by default but can be toggled on the settings menu.
          The timer will automatically start when an alphanumeric or enter key
          on the keyboard or keypad is pressed.
        </li>
        <li>
          The black (eyes) and transparent (outline) squares can be ignored as
          they do not count as a character. They are easy to identify as they
          are not numbered. They are for illustration purposes only (to make the
          game somewhat resemble a skull). So when you type, those squares will
          automatically be skipped.
        </li>
        <li>
          If you have any questions, or found any of the instructions unclear,
          please feel free to contact me at{" "}
          <a
            href="mailto:admin@wordskull.com"
            className="text-skull-brown hover:text-skull-dark-brown"
          >
            admin@wordskull.com
          </a>
          . I would love to hear your feedback!
        </li>
      </ul>
    </div>
  );
}

export default ClassicGameplayInstructions;
