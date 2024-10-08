import { useEffect, useState } from "react";

interface PropType {
  currentRow: number;
  currentSkull: string[][][];
}

function useHandleGameOver({ currentRow, currentSkull }: PropType) {
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  //If current row is greater than total number of rows available, game is over && player wins
  useEffect(() => {
    if (currentRow > currentSkull[0]?.length - 1) {
      setIsGameOver(true);
    }
  }, [currentRow, currentSkull]);

  return { isGameOver, setIsGameOver };
}

export default useHandleGameOver;
