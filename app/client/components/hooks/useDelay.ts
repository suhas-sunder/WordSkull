import { useEffect, useState } from "react";

interface PropType {
  enterPressed: boolean;
  msecondsToDelay: number;
}

//Adds a delay. Eg. current usage is for adding delay to validation styling
function useDelay({ enterPressed, msecondsToDelay }: PropType) {
  const [isDelaying, setIsDelaying] = useState(false); // To control when to apply validation styling

  //Add delay for validation styling to be applied after CSS animation ends
  useEffect(() => {
    let timer = null;

    // When enter is pressed, trigger validation after a delay
    if (enterPressed) {
      setIsDelaying(true); // Start the validation process
      timer = setTimeout(() => {
        setIsDelaying(false); // Reset after the delay
      }, msecondsToDelay); // ms delay
    }

    // Cleanup the timer
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [enterPressed, msecondsToDelay, setIsDelaying]); // Runs when enterPressed changes

  return { isDelaying };
}

export default useDelay;
