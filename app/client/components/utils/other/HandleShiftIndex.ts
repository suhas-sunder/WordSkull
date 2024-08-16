interface PropType {
  currentSkull: string[][][];
  currentRow: number;
  currentRowIndex: number;
}

function HandleShiftIndex({
  currentSkull,
  currentRow,
  currentRowIndex,
}: PropType) {
  let defaultIndex = 0;

  if (currentRow > currentSkull[0].length - 1) {
    console.log("You Won! Game Over...");
    return 0;
  }

  while (
    currentSkull[0][currentRow][currentRowIndex + defaultIndex] === "@" ||
    currentSkull[0][currentRow][currentRowIndex + defaultIndex] === "~"
  ) {
    defaultIndex++;
  }

  return defaultIndex;
}

export default HandleShiftIndex;
