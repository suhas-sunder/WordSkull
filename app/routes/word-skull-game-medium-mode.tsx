import type { MetaFunction } from "@remix-run/node";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Skulls from "../client/components/data/skulls";

export const meta: MetaFunction = () => {
  return [
    {
      title:
        "💀 Word Skull - An educational word puzzle game designed to look like skulls and other fun shapes... 🎉✨",
    },
    {
      name: "description",
      content:
        "Are you worthy? Find out by playing this fun word guessing game! Challenge your mind, and improve your vocabulary in no time! 🎉📲",
    },
  ];
};

export default function WordSkullMedium() {
  const skulls = useMemo(() => Skulls().slice(4, 9), []);
  const [currentSkull, setCurrentSkull] = useState<string[][][]>([]);
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);

  useEffect(() => {
    const randomizeCurrentSkull = () => {
      setCurrentSkull([skulls[Math.floor(Math.random() * skulls?.length)]]);
    };

    randomizeCurrentSkull();
  }, [skulls]);

  useEffect(() => {
    const handleUpdateSquare = (key: string) => {
      //Update the current square with a letter
      if (currentRowIndex <= currentSkull[0][currentRow].length - 1) {
        setCurrentSkull((prevState) => {
          // Create a new copy of the previous state array
          const newState: string[][][] = [...prevState];

          // Update the specific element within the row
          newState[0][currentRow][currentRowIndex] = key;

          // Return the updated state
          return newState;
        });
        setCurrentRowIndex((prevState) => prevState + 1);
      }
    };

    const handleDeleteSquare = () => {
      if (currentRowIndex > 0) {
        setCurrentSkull((prevState) => {
          // Create a new copy of the previous state array
          const newState: string[][][] = [...prevState];

          // Update the specific element within the row
          newState[0][currentRow][currentRowIndex - 1] = "";

          // Return the updated state
          return newState;
        });

        setCurrentRowIndex((prevState) => prevState - 1);
      }
    };
    const handleNextRow = () => {
      console.log(currentRowIndex, currentSkull[0][currentRow].length);
      if (currentRowIndex === currentSkull[0][currentRow].length) {
        setCurrentRowIndex(0);
        setCurrentRow((prevState) => prevState + 1);
      }
    };

    const handleKeydown = (event: KeyboardEvent) => {
      event.preventDefault();
      const key = event.key.toLowerCase();

      if (key === "enter") {
        handleNextRow();
      } else if (key === "backspace") {
        handleDeleteSquare();
      } else {
        handleUpdateSquare(key);
      }
    };

    addEventListener("keydown", handleKeydown);

    return () => {
      removeEventListener("keydown", handleKeydown);
    };
  }, [currentRow, currentRowIndex, currentSkull]);

  const handleListItem = (square: string, squareCount: number) => {
    if (square === "@")
      return (
        <li
          key={uuidv4()}
          className="text-[1.2rem] sm:text-[2rem] border-2 border-slate-700 bg-slate-800 rounded-lg w-[1.7em] h-[1.7em] flex justify-center items-center"
        ></li>
      );

    if (square === "~")
      return (
        <li
          key={uuidv4()}
          className="text-[1.2rem] sm:text-[2rem] border-2 rounded-lg w-[1.7em] h-[1.7em] flex justify-center items-center"
        ></li>
      );

    return (
      <li
        key={uuidv4()}
        className="text-[1.2rem] relative sm:text-[2rem] border-2 border-slate-400 rounded-lg w-[1.7em] h-[1.7em] flex justify-center items-center"
      >
        <span className="absolute text-[0.5rem] sm:text-sm text-slate-300 flex top-[0.02em] left-[0.3em]">
          {squareCount}
        </span>
        <span>{square}</span>
      </li>
    );
  };

  return (
    <div>
      <header className=" -mb-2">
        <h1 className="w-full flex justify-center items-center text-4xl sm:text-6xl text-center mt-10 leading-snug -translate-y-[0.3em] sm:translate-y-0 sm:mt-5 sm:mb-1 text-slate-500 font-lora">
          W💀RD SKULL
        </h1>
      </header>
      <main className="flex justify-center flex-col pt-4 sm:pt-10 gap-14 mx-5 items-center">
        {currentSkull.map((skull, index) => {
          return index === 0 ? (
            <div
              key={index}
              className="relative flex-col w-full max-w-[800px] capitalize flex font-nunito text-slate-400 items-center min-h-[40em]"
            >
              {skull.map((row) => {
                let squareCount = 0; // Reset squareCount at the start of each row

                return (
                  <ul key={uuidv4()} className="flex">
                    {row.map((square) => {
                      if (square !== "@" && square !== "~") {
                        squareCount += 1; // Increment squareCount only for empty squares
                      }
                      return handleListItem(square, squareCount);
                    })}
                  </ul>
                );
              })}
            </div>
          ) : null;
        })}
      </main>
    </div>
  );
}
