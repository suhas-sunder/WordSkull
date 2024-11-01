/* eslint-disable react/no-unescaped-entities */
import { MetaFunction } from "@remix-run/node";
import { Link } from "react-router-dom";
import { useTheme } from "../client/components/context/ThemeContext";
import SocialLinks from "../client/components/navigation/SocialLinks";
import randomImg from "../client/assets/images/dance.jpg";

export const meta: MetaFunction = () => {
  return [
    {
      title:
        "💀 About WordSkull - A Unique Collection of Word and Puzzle Games 🎉✨",
    },
    {
      name: "description",
      content:
        "WordSkull the ultimate word game inspired by word & puzzle games like Wordle, crosswords, cryptogram, with new features and daily challenges! 🎉📲",
    },
  ];
};

function About() {
  const { darkThemeActive } = useTheme();
  // Get the current year
  const currentYear = new Date().getFullYear();

  // Static date components
  const month = "November";
  const day = 1;

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
          <span className="whitespace-nowrap">
            <span className="inline-flex">W</span>
            <span className="inline-flex animate-scalePulse">💀</span>
            <span className="inline-flex">rd</span>
          </span>
          <span className="inline-flex">Skull</span>
        </h1>
        <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 pl-5 max-w-[1200px]">
          👋🏽Hi! My name is Suhas, and I’m excited to share my journey creating a
          word game website that provides a fun and engaging learning
          experience. Here is a link to my{" "}
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
      <main className="flex max-w-[1200px] w-full mt-4 justify-center">
        <article className="flex flex-col max-w-[800px] mx-10">
          <h2
            className={`${
              darkThemeActive ? "text-white" : "text-skull-super-dark-brown"
            } flex py-2 text-3xl font-lora mt-4 leading-[0.7em] capitalize text-skull-super-dark-brown mb-3`}
          >
            Learn About WordSkull
          </h2>
          {/* <p className="text-xl">Text about what the image is about</p> */}
          <div className="flex gap-3 items-center text-base mb-3 px-3">
            <img
              src={randomImg}
              alt="Author Name"
              className="w-[40px] h-[40px] rounded-full overflow-hidden"
            />
            <p>Suhas Sunder</p>
            <time dateTime={`${currentYear}-11-01`}>
              {`${month} ${day}, ${currentYear}`}
            </time>
          </div>
          <figure className="mb-3 px-3">
            <picture>
              {/* <source srcSet={randomImgWebP} type="image/webp" />
              <source srcSet={randomImgJpg} type="image/jpeg" /> */}
              <img
                className="flex w-full"
                src={randomImg}
                alt="Description of the article"
              />
            </picture>
            <figcaption className="text-center mt-2 text-gray-600">
              This is a caption for the image, providing additional context.
            </figcaption>
          </figure>
          <h3
            className={`${
              darkThemeActive ? "text-white" : "text-skull-super-dark-brown"
            } flex py-2 text-2xl font-nunito mt-4 text-skull-super-dark-brown`}
          >
            What is WordSkull?
          </h3>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3">
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="/word-skull-game-easy-mode"
            >
              WordSkull
            </Link>{" "}
            is a fun and fast-paced word puzzle game where you tackle word
            challenges, with cool animations and effects to keep things
            exciting. The classic mode feels a lot like Wordle but more of a
            challenge as you solve for multiple words instead of just one. The
            goal is to guess the correct words in as few tries as possible. More
            game modes are on the way to mix things up and word it out!
          </p>
          <h3
            className={`${
              darkThemeActive ? "text-white" : "text-skull-super-dark-brown"
            } flex py-2 text-2xl font-nunito mt-4 text-skull-super-dark-brown`}
          >
            Why did I make this website?
          </h3>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            As a software developer, I was searching for a challenging project
            to advance my programming skills and to add to my portfolio for
            potential employers to review. In mid-2022, I decided to take a
            break from playing Steam games to be more productive and instead
            focused on shorter puzzle and word games that offered much greater
            learning value. I started by spending a little time each day on
            typing test websites such as
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="https://www.typingclub.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Typing Club
            </Link>{" "}
            (not affiliated) and decided to make my own improved version called
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="https://freetypingcamp.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Free Typing Camp
            </Link>
            .
          </p>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            However, after making significant progress, I realized that building
            the entire keyboard typing test application in React and Express as
            a single-page application might not have been the best approach for
            several reasons. I completed a working prototype, which was an
            amazing learning experience, but decided to revisit it in the
            future. I want to refactor the touch typing test project using a
            React framework like Next.js or Remix to handle server-side
            rendering (SSR) and offload more of the heavy lifting to the server
            side.
          </p>
          <h3
            className={`${
              darkThemeActive ? "text-white" : "text-skull-super-dark-brown"
            } flex py-2 text-2xl font-nunito mt-4 text-skull-super-dark-brown`}
          >
            What was the inspiration for this project?
          </h3>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            Around the middle of 2023, I was spending a lot of my free time
            playing online puzzle games and word games. I was having fun playing
            and trying various online puzzle games, which led me to create my
            own unique take on the word game genre. There were several games
            that inspired me to create this website including
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="https://www.nytimes.com/games/wordle/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              NYT Wordle
            </Link>
            ,{" "}
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="https://www.nytimes.com/games/wordle/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Scrabble
            </Link>
            ,{" "}
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="https://en.wikipedia.org/wiki/Boggle"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Boggle
            </Link>
            ,{" "}
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="https://wordswithfriends.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Words with Friends
            </Link>
            ,{" "}
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="https://bananagrams.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Bananagrams
            </Link>
            ,{" "}
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="https://en.wikipedia.org/wiki/Letterpress_(video_game)"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Letterpress
            </Link>
            ,{" "}
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="https://nationalpost.com/life/your-daily-puzzmo-play-todays-spelltower"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Spelltower
            </Link>
            ,{" "}
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="https://en.wikipedia.org/wiki/Jumble"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Jumble
            </Link>
            ,{" "}
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="https://en.wikipedia.org/wiki/Bookworm_(video_game)"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Bookworm
            </Link>
            ,{" "}
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="https://en.wikipedia.org/wiki/Ruzzle"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Ruzzle
            </Link>
            ,{" "}
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="https://www.7littlewords.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              7 Little Words
            </Link>
            , amongst other popular word games. The first game I made is the
            classic version of
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="/word-skull-game-easy-mode"
            >
              {" "}
              WordSkull
            </Link>
            , named after the domain itself, which is a word game where you have
            to guess words of varying length before your run out of guesses
            (lives).
          </p>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            Other games I drew inspiration from include:
          </p>
          <ol className="font-lato text-lg tracking-wider text-skull-super-dark-brown leading-loose pl-8 gap-8 px-4 sm:px-6 md:px-14 list-decimal list-inside space-y-2 mb-3">
            <li>CrossWordSkull (crossword puzzles)</li>
            <li>CrypSkull (cryptogram puzzles)</li>
            <li>NumSkull (cross math and related math games)</li>
            <li>SumSkull (cross math and related math games)</li>
            <li>DivSkull (cross math and related math games)</li>
            <li>MulSkull (cross math and related math games)</li>
            <li>SubSkull (cross math and related math games)</li>
            <li>SkullEater (classic snake)</li>
            <li>WordGobbler (classic snake)</li>
            <li>☠️ SkullNBones (tic-tac-toe)</li>
          </ol>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            I also have some unique ideas to explore, like creating a rogue-lite
            version.
          </p>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            Obviously, building all of this is a lot of work and time-consuming,
            so I don't intend to rush it or expect to have everything done
            anytime soon. I’m taking an{" "}
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="https://en.wikipedia.org/wiki/Agile_software_development"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              agile development approach
            </Link>{" "}
            , starting with the most important features first. Over time, I’ll
            continue to improve it and gradually add new game modes and
            features.
          </p>
          <h3
            className={`${
              darkThemeActive ? "text-white" : "text-skull-super-dark-brown"
            } flex py-2 text-2xl font-nunito mt-4 text-skull-super-dark-brown`}
          >
            So, what's the game plan?
          </h3>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            Once I’ve implemented a few game modes focused on word games that
            I’m fully satisfied with, I plan to promote the site to gather user
            and community feedback on these engaging puzzle games. If users
            enjoy the games, I’ll continue building out the site until I’ve
            achieved all my target milestones for the project. If not, I’ll be
            content knowing I’ve at least reached the key milestones and will
            shift focus to other project ideas.
          </p>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            The quality of the project and creating a fun, engaging user
            experience are extremely important to me, so I’d love to hear your
            thoughts and feedback. I hope this website helps enhance your
            learning experience and brings some fun along the way!
          </p>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            I’ll also be creating a checklist of{" "}
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="/project-milestones"
            >
              {" "}
              future plans and posting feature updates
            </Link>{" "}
            on the development progress page to keep everyone in the loop.
          </p>
          <h3
            className={`${
              darkThemeActive ? "text-white" : "text-skull-super-dark-brown"
            } flex py-2 text-2xl font-nunito mt-4 text-skull-super-dark-brown`}
          >
            What do I like about the game so far?
          </h3>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            I was skeptical about the game design because it looked good in my
            head, but I wasn't sure how good it would look once rendered in the
            browser. As expected, it did end up looking different than I had
            imagined, but I'm fairly satisfied with the results. It looks close
            enough to a skull to me anyway, and the aesthetics don't hinder the
            gameplay too much.
          </p>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            Having tested out the game almost daily, I’ve thoroughly enjoyed
            playing this first version of WordSkull, a fun addition to the
            growing world of puzzle games. I'm not very great at it, so I stick
            to the easy mode for the most part, but I enjoy it a lot which I
            think is a good sign. If I didn't enjoy the gameplay, I would likely
            have scrapped the idea altogether.
          </p>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            It's not all sunshine and rainbows though.
          </p>
          <h3
            className={`${
              darkThemeActive ? "text-white" : "text-skull-super-dark-brown"
            } flex py-2 text-2xl font-nunito mt-4 text-skull-super-dark-brown`}
          >
            What issues did I face when making this word game?
          </h3>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            One thing I need to work on improving is the{" "}
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="/all-words-for-word-game"
            >
              {" "}
              words list
            </Link>{" "}
            for my word game. Some of the common English words I've aggregated
            are just impossible to guess at times, and since I'm using a massive
            list of words to incorporate 3 to 9 letters, it's going to be tough
            narrowing down that list until it becomes fun for users of all
            levels. Hopefully, it's not too bad of an issue. If you find any
            word that causes you trouble, please let me know.
          </p>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            Another thing I noticed was the amount of time I spend on the game.
            Each run lasts around 6 minutes on average while playing on easy
            difficulty, which could be too long considering how short each round
            in{" "}
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="https://www.nytimes.com/games/wordle/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Wordle NYTimes
            </Link>{" "}
            lasts. I didn't find it to be an issue myself, but in the back of my
            mind, I felt like it was maybe taking too long, which I think could
            be a pain point for users. Only time will tell, I guess.
          </p>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            The third issue is the layout and user experience, which does annoy
            me to an extent. Similar to the NYTimes game, I want the classic
            mode to display the guessed words in an intuitive manner while also
            showing and highlighting the correct and incorrect characters. In
            Wordle, you're dealing with one word at a time on a 5 x 5 grid, so
            you can see every row clearly after completion.
          </p>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            Unfortunately, with the skull design, after an attempt is made on
            any given row, if the answer is not correct, once you clear the row,
            you can't see the previous rows. Obviously, for my version of the
            word game, this means you can't see the previous attempts for any
            given row on the skull itself.
          </p>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            The only solution I could think of without cluttering the user
            interface was to have a little window above the skull that displays
            the correct word. That looked great, but what about displaying the
            words for all previous attempts? Since you can't see those, it makes
            guessing significantly harder. So, to my dismay, I had to resort to
            adding a modal (pop-up window) that displays all prior entries for
            the row, which I feel is not the best user experience.
            Unfortunately, I don't really see any way around it.
          </p>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            I did my best to make it easy to toggle between the two modes by
            making the modal clickable while also binding it to the shift and
            spacebar keys for easy access. I find it tolerable when playing with
            a keyboard but do find it annoying at times, especially on small
            screens when using the mobile keypad. It is definitely my biggest
            gripe about the game, and I truly wish I had a better solution. If
            you have any ideas, I'm all ears.
          </p>
          <h3
            className={`${
              darkThemeActive ? "text-white" : "text-skull-super-dark-brown"
            } flex py-2 text-2xl font-nunito mt-4 text-skull-super-dark-brown`}
          >
            Will there be an Android and iOS version?
          </h3>
          <p className="font-lato text-lg  tracking-wider leading-loose gap-8 flex flex-col">
            That's the plan! I've done a little bit of mobile game development
            in the past using Corona SDK and Godot game engines. I feel like
            using React Native for this application because it's a framework I'm
            very excited to learn. The fact that it uses the React framework
            also makes it a natural choice for me. I'm excited to learn the
            nuances of React Native and the challenges it brings in contrast to
            working with React and browser based web application development in
            general.
          </p>
          <h3
            className={`${
              darkThemeActive ? "text-white" : "text-skull-super-dark-brown"
            } flex py-2 text-2xl font-nunito mt-4 text-skull-super-dark-brown`}
          >
            Why WordSkull 💀?
          </h3>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            I was looking for a cool domain name that would make for a clever
            play on words to use for the design of this word game. I had a list
            of domain names that were mostly unavailable. I almost settled on
            WordSnail (grid formed from different shell shapes), but I'm glad I
            didn't because WordSkull was available and it's a really cool name,
            especially since it fits well with the rogue-light version I have
            planned. Hopefully, things go well enough that I can get around to
            developing the rogue-lite (fingers crossed 🤞🏽😊). As an added bonus,
            I get to use the skull emoji all over my site without making it seem
            cringe 💀.
          </p>
          <h3
            className={`${
              darkThemeActive ? "text-white" : "text-skull-super-dark-brown"
            } flex py-2 text-2xl font-nunito mt-4 text-skull-super-dark-brown`}
          >
            What else?
          </h3>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            I plan to add subtle details in the future to breathe life into each
            skull design, such as animated eyes that track the words and
            characters being typed, dialogue text with witty banter, and
            character bios. However, my priority right now is implementing word
            games and optimizing the user interface and user experience.
          </p>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            One thing I didn't mention is that when I started developing
            WordSkull, I stumbled upon Google Gboard's{" "}
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="https://www.emojikitchengame.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Emoji Kitchen
            </Link>{" "}
            website. I thought it was a fantastic concept and realized I could
            build a similar app in a relatively short time. This project turned
            out to be beneficial because it covered many concepts I hadn't yet
            learned, which I knew would be essential for my future projects.
          </p>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            I used it as a playground, and I'm quite proud of the result. While
            the code quality is far from perfect, everything works as intended.
            I got to experiment with features like taking HTML screenshots and
            making them shareable, as well as working with the Clipboard API to
            copy and paste image blobs and Unicode emojis. It was a lot of fun.
            Feel free to check out the{" "}
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="https://github.com/suhas-sunder/EmojiKitchenGame"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              source code
            </Link>{" "}
            if you're interested.
          </p>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            Another quick project I'm working on is a{" "}
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="https://www.makeconfetti.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              confetti maker website application
            </Link>{" "}
            which I decided to build because I need to implement a confetti
            maker component for this word game in order to add a little bit of
            fun to the winning animation. Turning it into it's own website
            didn't seem very difficult, so I decided to build a minimum viable
            product for now. It's not very fancy and I don't have any major
            plans for it, but it lets me experiment with the{" "}
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Canvas API
            </Link>{" "}
            in a standalone project and I like how it's turned out so far.
          </p>
          <h3
            className={`${
              darkThemeActive ? "text-white" : "text-skull-super-dark-brown"
            } flex py-2 text-2xl font-nunito mt-4 text-skull-super-dark-brown`}
          >
            Free 4K HD Wallpapers
          </h3>
          <figure className="mb-3 px-3">
            <picture>
              {/* <source srcSet={randomImgWebP} type="image/webp" />
              <source srcSet={randomImgJpg} type="image/jpeg" /> */}
              <img
                className="flex w-full"
                src={randomImg} 
                alt="Description of the article"
              />
            </picture>
            <figcaption className="text-center mt-2 text-gray-600">
              This is a caption for the image, providing additional context.
            </figcaption>
          </figure>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            Aside from word games and puzzles, WordSkull also offers high
            quality 4K HD wallpapers for free! You can download the
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="/wallpaper"
            >
              {" "}
              wallpapers
            </Link>{" "}
            here.
          </p>
          <h3
            className={`${
              darkThemeActive ? "text-white" : "text-skull-super-dark-brown"
            } flex py-2 text-2xl font-nunito mt-4 text-skull-super-dark-brown`}
          >
            Thank you!
          </h3>
          <p className="font-lato text-lg tracking-wider leading-loose pl-2 mb-3 gap-8">
            If you've reached this far, I'd like to thank you for reading
            through all that. If you have any feedback, I'd love to hear about
            it. If you want to share pictures of your progress or just want to
            say hi, you can find me on any of my socials listed on the{" "}
            <Link
              className={`${
                darkThemeActive
                  ? "text-orange-600"
                  : "text-skull-super-dark-brown"
              } hover:text-amber-600 font-lora`}
              to="/socials"
            >
              socials page
            </Link>
            . Thanks again. I really hope you enjoy playing this game!{" "}
          </p>
        </article>
        <section className="flex w-full mt-4">
          This will be the section where related blogs are displayed. Maybe
          filtered by tags or keywords based on what this page is about.
        </section>
      </main>
      <section>
        <SocialLinks />
      </section>
    </div>
  );
}

export default About;
