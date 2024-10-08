import { useEffect, useState } from "react";

interface PropType {
  currentSkull: string[][][];
  setIsGameOver: (value: ((prevState: boolean) => boolean) | boolean) => void;
}

function useTotalLives({ currentSkull, setIsGameOver }: PropType) {
  const [lives, setLives] = useState<number | null>(null);
  const [maxLives, setTotalLives] = useState<number | null>(null);

  //Update Lives
  useEffect(() => {
    //Total lives = total number of squares minus total number of (eyes plus blank spaces)
    if (!lives && lives !== 0) {
      const totalLives = currentSkull[0]?.reduce(
        (sum, array) =>
          sum + array.filter((char) => char !== "@" && char !== "~").length,
        0
      );
      setLives(totalLives);
      setTotalLives(totalLives);
    }
  }, [currentSkull, lives]);

  //Check if game is over based on lives
  useEffect(() => {
    if (lives !== null && lives <= 0) {
      setIsGameOver(true);
    }
  }, [lives, setIsGameOver]);

  return { lives, setLives, maxLives };
}

export default useTotalLives;
