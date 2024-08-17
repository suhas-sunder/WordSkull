import { useEffect, useState } from "react";

function useTotalLives({ currentSkull }: { currentSkull: string[][][] }) {
  const [lives, setLives] = useState<number | null>(null);

  //Update Lives
  useEffect(() => {
    if (lives === null && currentSkull[0]?.length > 0) {
      // Calculate the average length of rows in currentSkull[0]
      const totalLength = currentSkull[0].reduce(
        (sum, row) => sum + row.length,
        0
      );
      const averageLength = totalLength / currentSkull[0].length;

      // Set lives to the product of currentSkull[0].length and the averageLength
      setLives(Math.ceil(currentSkull[0].length * averageLength));
    }
  }, [lives, currentSkull]);

  useEffect(() => {
    if (lives !== null && lives <= 0) {
      alert("Game Over!");
    }
  }, [lives]);

  return { lives, setLives };
}

export default useTotalLives;
