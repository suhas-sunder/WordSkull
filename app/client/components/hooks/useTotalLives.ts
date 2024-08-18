import { useEffect, useState } from "react";

function useTotalLives({ currentSkull }: { currentSkull: string[][][] }) {
  const [lives, setLives] = useState<number | null>(null);

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
    !lives &&
      setLives(
        currentSkull[0]?.reduce(
          (sum, array) =>
            sum + array.filter((char) => char !== "@" && char !== "~").length,
          0
        )
      );
  }, [currentSkull, lives]);

  useEffect(() => {
    if (lives !== null && lives <= 0) {
      alert("Game Over!");
    }
  }, [lives]);

  return { lives, setLives };
}

export default useTotalLives;
