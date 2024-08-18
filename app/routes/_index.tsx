import { useNavigate } from "@remix-run/react";
import { useState, useEffect, useMemo } from "react";
import Skulls from "../client/components/data/skulls";
import seedrandom from "seedrandom";
import { useTheme } from "../client/components/context/ThemeContext";

const getRandomTransform = () => {
  const scale = Math.random() * (1 - 0.6) + 0.6; // Random scale between 0.7 and 1.1
  const rotate = Math.floor(Math.random() * 360); // Random rotation between 0 and 360 degrees
  const translateX = Math.random() * 60 - 30; // Random horizontal translation
  const translateY = Math.random() * 60 - 30; // Random vertical translation

  return {
    scale: `scale(${scale.toFixed(2)})`,
    rotate: `rotate(${rotate}deg)`,
    translateX: `translateX(${Math.round(translateX)}px)`,
    translateY: `translateY(${Math.round(translateY)}px)`,
  };
};

// Function to generate a unique seed
const generateSeed = () => `${Date.now()}-${Math.random()}`;

// Deterministic shuffle function with seed
const shuffleArray = (array: string[][][], seed: string) => {
  const rng = seedrandom(seed);
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const difficulties = ["easy", "medium", "hard", "extreme"];

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transformStyle, setTransformStyle] = useState({});
  const [fadeClass, setFadeClass] = useState("fade-in"); // State to manage fade class
  const [shuffledSkulls, setShuffledSkulls] = useState<string[][][]>([]); // Initial empty array
  const [difficulty, setDifficulty] = useState<string>("easy");
  const navigate = useNavigate();

  const { darkThemeActive } = useTheme();

  const skulls = useMemo(() => Skulls(), []);

  useEffect(() => {
    // Generate a new seed and shuffle skulls on the client side
    const seed = generateSeed();
    const shuffled = shuffleArray(skulls, seed);
    setShuffledSkulls(shuffled);
  }, [skulls]);

  useEffect(() => {
    if (shuffledSkulls.length === 0) return; // Ensure skulls are shuffled before setting up the interval

    const interval = setInterval(() => {
      const fadeOutTransform = getRandomTransform();
      setFadeClass("fade-out"); // Start fade-out
      setTransformStyle({
        transform: `${fadeOutTransform.scale} ${fadeOutTransform.rotate} ${fadeOutTransform.translateX} ${fadeOutTransform.translateY}`,
        opacity: 0, // Fade out to opacity 0
      });

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledSkulls.length);
        const fadeInTransform = getRandomTransform(); // Get new transform for fade-in
        setTransformStyle({
          transform: `${fadeInTransform.scale} ${fadeInTransform.rotate} ${fadeInTransform.translateX} ${fadeInTransform.translateY}`,
          opacity: 1, // Fade in to opacity 1
        });
        setFadeClass("fade-in"); // Start fade-in
      }, 2000); // Duration to match fade-out
    }, 5000); // Duration to show each skull

    return () => clearInterval(interval);
  }, [shuffledSkulls, currentIndex]);

  const handleListItem = (
    square: string,
    squareCount: number,
    index: number
  ) => {
    if (square === "@")
      return (
        <li
          key={index + "eye-square"}
          className={` text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center`}
        ></li>
      );

    if (square === "~")
      return (
        <li
          key={index + "empty-square"}
          className={`${
            darkThemeActive ? "bg-white opacity-95" : ""
          } text-[1.1rem] sm:text-[2rem] border-2 rounded-lg w-[2em] h-[2em] flex justify-center items-center`}
        ></li>
      );

    return (
      <li
        key={index + "num-square"}
        className={`${
          darkThemeActive ? "bg-white text-slate-500" : "text-slate-300"
        } text-[1.1rem] relative sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center`}
      >
        <span className="absolute text-sm  flex top-[0.02em] left-[0.3em]">
          {squareCount}
        </span>
        <span>{square}</span>
      </li>
    );
  };

  return (
    <div className="flex  flex-col overflow-hidden">
      <header>
        <h1 className="w-full flex-col z-10 sm:flex-row flex justify-center gap-2 sm:gap-5 items-center text-6xl text-center mt-10 leading-snug -translate-y-[0.3em] sm:translate-y-0 sm:mt-5 sm:mb-1 text-slate-500 font-lora animate-fadeIn">
          <span className="whitespace-nowrap">
            <span className="inline-flex">W</span>
            <span className="inline-flex animate-scalePulse">💀</span>
            <span className="inline-flex">RD</span>
          </span>
          <span className="inline-flex">SKULL</span>
        </h1>
      </header>
      <main
        className={`${
          darkThemeActive && "text-white"
        } flex flex-col sm:gap-14 items-center animate-fadeIn`}
      >
        <div className="relative flex-col w-full max-w-[800px] capitalize flex font-nunito text-slate-400 items-center min-h-[28em] sm:min-h-[40em]">
          <div
            className={`absolute top-0 left-0  w-full h-full   flex flex-col justify-center items-center transition-opacity duration-2000 ease-in-out ${fadeClass}`}
            style={{
              ...transformStyle,
              transition: "opacity 2s ease-in-out, transform 2s ease-in-out",
            }}
          >
            {shuffledSkulls[currentIndex]?.map(
              (row: string[], listIndex: number) => {
                let squareCount = 0; // Reset squareCount at the start of each row

                return (
                  <ul key={listIndex} className="flex">
                    {row.map((square: string, index: number) => {
                      if (square !== "@" && square !== "~") {
                        squareCount += 1; // Increment squareCount only for empty squares
                      }

                      return handleListItem(
                        square,
                        squareCount,
                        index + listIndex
                      );
                    })}
                  </ul>
                );
              }
            )}
          </div>
        </div>

        <button
          onClick={() => navigate(`/word-skull-game-${difficulty}-mode`)}
          className={`${
            darkThemeActive
              ? "text-white  hover:text-slate-300"
              : " text-slate-500  hover:text-slate-600"
          } flex z-10 border-2 px-4  text-xl font-nunito rounded-lg tracking-widest leading-loose border-slate-300 hover:border-slate-400`}
        >
          Play
        </button>

        <ul className="grid grid-cols-2 my-8 sm:my-0 sm:grid-cols-4 text-sm gap-4 uppercase font-nunito">
          {difficulties.map((level) => (
            <li
              key={level}
              className="flex mx-auto items-center gap-2 justify-center rounded-lg cursor-pointer group hover:border-slate-200 border-2 border-transparent"
            >
              <input
                checked={difficulty === level}
                onChange={() => setDifficulty(level)}
                id={level}
                type="radio"
                name="difficulty"
                className="hidden"
              />
              <label
                htmlFor={level}
                className="cursor-pointer flex items-center gap-2 py-2 px-4"
              >
                <div
                  className={`w-4 h-4 border rounded-full flex items-center justify-center ${
                    difficulty === level
                      ? "bg-slate-600 border-transparent"
                      : "border-gray-300"
                  }`}
                >
                  <svg
                    className={`w-3 h-3 text-white translate-y-[0.05em] transition-opacity duration-300 ${
                      difficulty === level || "group-hover:opacity-100"
                    } ${difficulty === level ? "opacity-100" : "opacity-0"}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9 16.293l-4-4 1.414-1.414L9 13.465l8.586-8.586L19 6.293l-10 10z"
                    />
                  </svg>
                </div>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </label>
            </li>
          ))}
        </ul>
        <div className="max-w-[800px] text-center font-nunito text-lg text-slate-500">
          Hello friend! Unfortunately this website/game is still in development
          and is currently in a non-functioning state. I am working hard to get
          it up and running as soon as possible! Thanks for stopping by :)
        </div>
      </main>
    </div>
  );
}
