import { useEffect } from "react";

interface PropType {
  cursorPosition: number;
  setKeyStyles: (
    value: (prevState: { [key: string]: string }) => { [key: string]: string }
  ) => void;
}

//Highlight calculator key if it matches user input & update stats for valid/invalid input
//Used by Calculator.tsx
export default function useHighlightKeys({
  cursorPosition,
  setKeyStyles,
}: PropType) {
  useEffect(() => {
    const handleHighlightKeys = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "tab") return; //Allow tab for accessability reasons but don't track the input for test
      e.preventDefault();


      if ( e.key === "Backspace" || e.key === " ") return; //If game ended, prevent default behaviour but don't track keys. Allow tab for accessability reasons but don't track the input for test.

      const enteredKey = e.key === "Enter" ? "↵" : e.key.toLowerCase();
      setKeyStyles((prevState: { [key: string]: string }) => ({
        ...prevState,
        [e.key === "Enter" ? "Enter" : enteredKey.toLowerCase()]:
          "bg-slate-600 text-white",
      }));

      setTimeout(() => {
        setKeyStyles((prevState: { [key: string]: string }) => ({
          ...prevState,
          [e.key === "Enter" ? "Enter" : enteredKey.toLowerCase()]: "bg-white",
        }));
      }, 300);
    };

    addEventListener("keydown", handleHighlightKeys);

    return () => removeEventListener("keydown", handleHighlightKeys);
  }, [ cursorPosition, setKeyStyles]);
}
