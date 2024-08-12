import { useNavigate } from "@remix-run/react";
import { useState, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import Skulls from "../client/components/data/skulls";

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

// Function to shuffle an array
const shuffleArray = (array: string[][][]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transformStyle, setTransformStyle] = useState({});
  const [fadeClass, setFadeClass] = useState("fade-in"); // State to manage fade class
  const navigate = useNavigate();

  const skulls = useMemo(() => Skulls(), []);

  // Shuffle skulls initially
  const [shuffledSkulls] = useState(shuffleArray(skulls));

  useEffect(() => {
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
  }, [shuffledSkulls.length]);

  const handleListItem = (square: string, squareCount: number) => {
    if (square === "@")
      return (
        <li
          key={uuidv4()}
          className="text-[1.1rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[2em] h-[2em] flex justify-center items-center"
        ></li>
      );

    if (square === "~")
      return (
        <li
          key={uuidv4()}
          className="text-[1.1rem] sm:text-[2rem] border-2 rounded-lg w-[2em] h-[2em] flex justify-center items-center"
        ></li>
      );

    return (
      <li
        key={uuidv4()}
        className="text-[1.1rem] relative sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[2em] h-[2em] flex justify-center items-center"
      >
        <span className="absolute text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
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
      <main className="flex flex-col-reverse sm:flex-col sm:gap-14 items-center">
        <div className="relative flex-col w-full max-w-[800px] capitalize flex font-nunito text-slate-400 items-center min-h-[28em] sm:min-h-[40em]">
          <div
            className={`absolute top-0 left-0  w-full h-full   flex flex-col justify-center items-center transition-opacity duration-2000 ease-in-out ${fadeClass}`}
            style={{
              ...transformStyle,
              transition: "opacity 2s ease-in-out, transform 2s ease-in-out",
            }}
          >
            {shuffledSkulls[currentIndex].map((row: string[]) => {
              let squareCount = 0; // Reset squareCount at the start of each row

              return (
                <ul key={uuidv4()} className="flex">
                  {row.map((square: string) => {
                    if (square !== "@" && square !== "~") {
                      squareCount += 1; // Increment squareCount only for empty squares
                    }
                    return handleListItem(square, squareCount);
                  })}
                </ul>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => navigate("/word-skull-game-medium-mode")}
          className="flex z-10 border-2 px-8 py-1 text-2xl font-nunito rounded-lg tracking-widest leading-loose text-slate-500 hover:text-skull-dark-brown hover:border-skull-brown"
        >
          Play
        </button>
      </main>
    </div>
  );
}
