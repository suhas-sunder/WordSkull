import { useEffect, useState } from "react";

interface PropType {
  currentRow: number;
  currentSkull: string[][][];
}

function useHandleGameOver({ currentRow, currentSkull }: PropType) {
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  //Handle Game Over!
  useEffect(() => {
    if (currentRow > currentSkull[0]?.length - 1) {
      setIsGameOver(true);
    }
  }, [currentRow, currentSkull]);

  return {isGameOver};
}

export default useHandleGameOver;
