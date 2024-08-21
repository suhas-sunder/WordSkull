import { v4 as uuidv4 } from "uuid";
import useWordsForSkull from "../client/components/hooks/useWordsForSkull";

export default function WordsList() {
  const { wordsList } = useWordsForSkull({});

  return (
    <div className="flex flex-col w-full gap-10 justify-center items-center">
      {Object.values(wordsList).map((words: string[], index: number) => {
        return (
          <div key={uuidv4()}>
            <h2 className="mt-10">
              {index + 3} Letter Words ({words.length})
            </h2>
            <ul className="grid text-sm grid-cols-12 gap-5 w-full max-w-[1200px]">
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
