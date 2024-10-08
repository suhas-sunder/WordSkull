import { useEffect, useMemo, useState } from "react";
import seedrandom from "seedrandom";
import Skulls from "../../data/Skulls";
import { useTheme } from "../../context/ThemeContext";

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

//Animation of skulls for home page. For aesthetic purposes only.
function SkullAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transformStyle, setTransformStyle] = useState({});
  const [fadeClass, setFadeClass] = useState("fade-in"); // State to manage fade class
  const [shuffledSkulls, setShuffledSkulls] = useState<string[][][]>([]); // Initial empty array

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
    <div className="relative flex-col w-full max-w-[800px] capitalize flex font-nunito text-slate-400 items-center min-h-[24em] sm:min-h-[40em]">
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

                  return handleListItem(square, squareCount, index + listIndex);
                })}
              </ul>
            );
          }
        )}
      </div>
    </div>
  );
}

export default SkullAnimation;
