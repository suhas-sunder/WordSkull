/* eslint-disable react/no-unescaped-entities */
import { MetaFunction } from "@remix-run/node";
import { Link } from "react-router-dom";

export const meta: MetaFunction = () => {
  return [
    {
      title:
        "💀 Word Skull - A Unique Collection of Word and Puzzle Games 🎉✨",
    },
    {
      name: "description",
      content:
        "Explore WordSkull, inspired by popular puzzle games like Wordle, crosswords, and cryptograms. Challenge your mind with unique game modes like Classic WordSkull, Cross Word Skull, Crypto Skull, and more! Continuously evolving with new features and fun game modes! 🎉📲",
    },
  ];
};

function About() {
  return (
    <div className="flex justify-center flex-col items-center mt-[4em] text-slate-600">
      <h1 className="py-2 text-5xl font-lora text-center max-w-[1400px] text-slate-500">
        About WordSkull
      </h1>
      <div className="flex flex-col gap-5 max-w-[1400px] mx-[5em]">
        <h2 className="flex py-2 text-4xl font-nunito mt-4">Who am I?</h2>
        <p className="font-lato text-xl tracking-wider leading-loose">
          👋🏽Hi! My name is Suhas. I've already written a little essay below
          about this project and don't want to make this too long to read. So if
          you really want to learn more about me you can check out my{" "}
          <Link
            className="hover:text-skull-brown text-skull-super-dark-brown font-lora"
            to="www.suhassunder.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            portfolio website
          </Link>{" "}
          or can visit any of my{" "}
          <Link
            className="hover:text-skull-brown text-skull-super-dark-brown font-lora"
            to="/socials"
          >
            {" "}
            socials page
          </Link>
          !
        </p>
        <h2 className="flex py-2 text-4xl font-nunito mt-4">
          Why did I make this website?
        </h2>
        <p className="font-lato text-xl tracking-wider leading-loose">
          As a software developer I was looking for a challenging yet unique
          portfolio project to present to potential employers while accelerating
          my learning at the same time. In mid 2022, I had started taking a
          break from playing steam games to be more productive, and was
          supplementing with games that were short and had some learning value.
          At first I was spending a little time each day on typing test websites
          such as
          <Link
            className="hover:text-skull-brown text-skull-super-dark-brown font-lora"
            to="https://www.typingclub.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            TypingClub
          </Link>{" "}
          (not affiliated) and decided to make my own improved version called
          <Link
            className="hover:text-skull-brown text-skull-super-dark-brown font-lora"
            to="https://freetypingcamp.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            FreeTypingCamp
          </Link>
          . However after making significant progress I realized that building
          out the entire application in React and Express as a single page
          application was probably not the best idea for a number of reasons. I
          completed a working prototype which was an amazing learning experience
          but decided to come back to it because I want to refactor it using a
          React framework like Next.js or Remix to handle SSR and do a lot of
          the heavy lifting on the server side.
        </p>
        <h2 className="flex py-2 text-4xl font-nunito mt-4">
          What was the inspiration for this project?
        </h2>
        <p className="font-lato text-xl tracking-wider leading-loose">
          At around the middle of 2023, I was exploring different ideas and was
          spending a lot of my free time playing puzzle and word games online.
          There were a few games that inspired me to make this website, but
          easiest version of the game to implement was the NYT Wordle version (
          <Link
            className="hover:text-skull-brown text-skull-super-dark-brown font-lora"
            to="/word-skull-game-easy-mode"
          >
            Classic WordSkull
          </Link>
          ) that I implemented first. The other games include cross word puzzles
          (CrossWordSkull), Cryptogram Puzzle (CrypSkull), Cross Math & related
          math games (NumSkull, SumSkull, DivSkull, MulSkull, SubSkull), classic
          snake (two ideas for this called SkullEater & WordGobbler), tic tac
          toe (☠️ SkullNBones) and a few others that I will hopefully get to
          implement over time. I also had some unique ideas that I wanted to
          explore such as making a rogue-lite version. Obviously making all of
          this is a lot of work and extremely time consuming so I don't intend
          to rush it or have it all done anytime soon. I've decided to take the
          agile development approach and start by implementing only the features
          that I feel are most important first. I will continue to work on it
          and make it better over time while gradually adding new game modes and
          features as needed.
        </p>
        <h2 className="flex py-2 text-4xl font-nunito mt-4">
          So what's the game plan?
        </h2>
        <p className="font-lato text-xl tracking-wider leading-loose">
          Once I have implemented a few game modes that I am completely
          satisfied with, I will try to promote the site to get some
          user/community feedback. If people enjoy the games then I will
          continue to build out the site until my vision is complete. If not,
          then I'll be happy that I've at least reached my minimum milestones
          and will continue on with some of my other project ideas. The quality
          of the project and providing a fun and engaging user experience is
          extremely important to me so I'd love to hear about your thoughts and
          feedback about the game. I hope this website helps you in your
          learning experience and allows you to have some fun along the way! I
          will be making a checklist of what I plan to do next, and will try to
          post feature updates along the way on the development progress page.
        </p>
        <h2 className="flex py-2 text-4xl font-nunito mt-4">
          What do I like about the game so far?
        </h2>
        <p className="font-lato text-xl tracking-wider leading-loose">
          I was skeptical about the game design because it looked good in my
          head, but I wasn't sure how good it would look once rendered out in
          the browser. As expected, it did end up looking different than I had
          imagined, but I'm fairly satisfied with the results. Looks close
          enough to a skull to me anyway, and the aesthetics doesn't hinder the
          gameplay too much. Having tested out the game almost daily, I have
          thoroughly enjoyed playing this first version. I'm not very great at
          it, so I stick to the easy mode for the most part but I enjoy it a
          lot, which I think is a good sign. If I didn't enjoy the gameplay I
          would likely have scrapped the idea altogether. Its not all sunshine
          and rainbows though.
        </p>
        <h2 className="flex py-2 text-4xl font-nunito mt-4">
          What do I dislike about the game so far?
        </h2>
        <p className="font-lato text-xl tracking-wider leading-loose">
          One thing I need to work on improving is the words list. Some of the
          words I've aggregated are just impossible to guess at times and since
          I'm using a massive list of words to incorporate 3 to 9 letters, it's
          going to be tough narrowing down that list until it becomes fun for
          users of all levels. Hopefully it's not too bad of an issue. Another
          thing I noticed was the amount of time I spend on the game. Each run
          lasts around 6 minutes on average playing easy difficulty which could
          be a bit too much considering how short Wordle is. I didn't find it to
          be an issue myself, but in the back of my mind I felt like it was
          maybe taking too long, which I think could be a pain point for users.
          Only time will tell I guess. The third issue is the layout and user
          experience which does annoy me to an extent. Similar to wordle, I want
          the classic mode to display the guessed words in an intuitive manner
          while also showing the correct/incorrect characters. In wordle, you're
          dealing with one word at a time on a 5 x 5 grid so you can see every
          row clearly after completion. Unfortunately with the skull design,
          after an attempt is made on any given row, if the answer is not
          correct, once you clear the row, you can't see the previous rows. The
          only solution I could think of without cluttering the UI was to have a
          little window above the skull that displays the correct word. That
          looked great, but what about the previous tries? Since you can't see
          those it makes guessing significantly harder. So, to my dismay, I had
          to restort to adding a modal that displays all prior entries for the
          row, which I feel is not the best user experience, but I don't really
          see any way around it. I did my best to make it easy to toggle between
          the two modes by making the modal clickable while also binding it to
          the shift and spacebar keys for easy access. I think it's tolerable
          when playing with a keyboard but can be annoying especially on small
          screens when using the keypad. It is definitely my biggest gripe about
          the game, and I truly wish I had a better solution. If you have any
          ideas I'm all ears.
        </p>
        <h2 className="flex py-2 text-4xl font-nunito mt-4">
          Will there be an Android and iOS version?
        </h2>
        <p className="font-lato text-xl tracking-wider leading-loose">
          That's the plan! I've done a little bit of mobile game development in
          the past using Corona SDK and Godot game engines. I feel like using
          React Native for this application because it's something I've really
          been meaning to learn and it also uses the React framework, so it
          seems like a natural choice. I'm excited to learn the nuances of React
          Native and the challenges it brings in contrast to React.
        </p>
        <h2 className="flex py-2 text-4xl font-nunito mt-4">
          Why WordSkull 💀?
        </h2>
        <p className="font-lato text-xl tracking-wider leading-loose">
          I was looking for a cool domain name that would substantially make for
          a good design for this game. I had a list of names that were all
          unavailable. I almost settled on WordSnail, but I'm glad I didn't
          because WordSkull was available and it's a really cool name. Would
          especially fit the rogue-light version of the game if I ever end up
          getting around to developing that (fingers crossed 🤞🏽😊).
        </p>
        <h2 className="flex py-2 text-4xl font-nunito mt-4">What else?</h2>
        <p className="font-lato text-xl tracking-wider leading-loose">
          One thing I didn't mention was that when I started developing
          WordSkull, I stumbled upon Google Gboard's Emoji Kitchen website. I
          thought it was a great concept and realized I could build out a
          similar app in a fairly short time. After thinking about it, I found
          it to be a beneficial project to power through, because it covered a
          lot of concepts that I hadn't yet gotten around to learning which I
          knew would be vital for my future projects. So I used it as a playing
          ground and I'm actually quiet proud of the result. The code quality is
          pretty atrocious but everything works as intended. I got to experiment
          with features like taking an HTML screenshot and making it shareable
          and working with the Clipboard API to copy and pasting the image blobs
          and unicode emojis. It was a lot of fun. Have a look at the source
          code if you're interested.{" "}
        </p>
        <h2 className="flex py-2 text-4xl font-nunito mt-4">Thank you!</h2>
        <p className="font-lato text-xl tracking-wider leading-loose">
          If you've reached this far, I'd like to thank you for reading through
          all that. If you have any feedback, I'd love to hear about it. If you
          want to share pictures of your progress or just want to say hi, you
          can find me on any of my socials listed on the{" "}
          <Link
            className="hover:text-skull-brown text-skull-super-dark-brown font-lora"
            to="/socials"
          >
            socials page
          </Link>
          . Thanks again. I really hope you enjoy playing this game!{" "}
        </p>
      </div>
    </div>
  );
}

export default About;
