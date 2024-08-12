import type { MetaFunction } from "@remix-run/node";
import { v4 as uuidv4 } from "uuid";

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

export default function Index() {
  //Hard SKull
  const skull_9 = [
    ["", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "@", "", "", "", "", "@", ""],
    ["", "@", "@", "@", "", "", "@", "@", "@", ""],
    ["", "@", "", "", "", "", "@", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "~", "", "~", ""],
  ];

  const skull_10 = [
    ["", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "@", "", "", "", "", "@", ""],
    ["", "@", "@", "@", "", "", "@", "@", "@", ""],
    ["", "@", "@", "@", "", "", "@", "@", "@", ""],
    ["", "@", "", "", "", "", "@", ""],
    ["", "", "", "~", "~", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "~", "", "", "~", ""],
  ];

  const skull_11 = [
    ["", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "@", "@", "@", "", "@", "@", "@", ""],
    ["", "@", "@", "@", "", "@", "@", "@", ""],
    ["", "@", "@", "@", "", "@", "@", "@", ""],
    ["", "", "", "~", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "~", "", "~", ""],
  ];

  const skull_12 = [
    ["", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "@", "@", "", "@", "@", "", ""],
    ["", "", "@", "@", "", "@", "@", "", ""],
    ["", "", "", "~", "~", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "~", "", "~", ""],
  ];

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
    <>
      <header className=" mb-10">
        <h1 className="w-full flex justify-center items-center text-6xl text-center mt-10 leading-snug -translate-y-[0.3em] sm:translate-y-0 sm:mt-5 sm:mb-1 text-slate-500 font-lora">
          W💀RD SKULL
        </h1>
      </header>
      <main className="flex justify-center flex-col pt-10 gap-14 items-center">
        {[skull_9, skull_10, skull_11, skull_12].map((skull, index) => (
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
        ))}
      </main>
    </>
  );
}
