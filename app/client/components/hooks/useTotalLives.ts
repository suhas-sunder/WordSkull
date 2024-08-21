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
    //Lives calculated based on average length of each row in currentSkull[0] times total length of currentSkull[0] times 0.8
    // if (lives === null && currentSkull[0]?.length > 0) {
    //   // Calculate the average length of rows in currentSkull[0]
    //   const totalLength = currentSkull[0].reduce(
    //     (sum, row) => sum + row.length,
    //     0
    //   );
    //   const averageLength = totalLength / currentSkull[0].length;

    //   // Set lives to the product of currentSkull[0].length and the averageLength
    //   setLives(Math.ceil(currentSkull[0].length * averageLength * 0.8));
    // }

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

  useEffect(() => {
    if (lives !== null && lives <= 0) {
      setIsGameOver(true);
    }
  }, [lives, setIsGameOver]);

  return { lives, setLives, maxLives };
}

export default useTotalLives;
