import { useMemo } from "react";
import words from "../client/components/data/words";
import { v4 as uuidv4 } from "uuid";

export default function WordsList() {
  const wordList: { [key: number]: string[] } = useMemo(() => words(), []);

  return (
    <div className="flex flex-col w-full gap-10 justify-center items-center">
      {Object.values(wordList).map((words: string[], index: number) => {
        return (
          <div key={uuidv4()}>
            <h2 className="mt-10">
              {index + 3} Letter Words ({words.length})
            </h2>
            <ul
              className="grid text-sm grid-cols-12 gap-5 w-full max-w-[1200px]"
            >
              {words.map((word: string) => (
                <li className="uppercase" key={uuidv4()}>
                  <span> {word},</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
