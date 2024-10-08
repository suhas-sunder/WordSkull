
interface PropType {
  currentSkull: string[][][];
  currentRow: number;
  currentRowIndex: number;
}

function ShiftIndexBackward({
  currentSkull, currentRow, currentRowIndex}: PropType) {
  let shiftedIndex = currentRowIndex - 1;

  //Skip squares that start with "@" or "~" so that empty and eyeball squares are not changed
  while (
    currentSkull[0][currentRow][shiftedIndex] === "@" ||
    currentSkull[0][currentRow][shiftedIndex] === "~"
  ) {
    shiftedIndex--;
  }

  //For corner squares that start with "@" or "~", the index can be less than 0. If so, set it back to the first empty position in the row.
  if (shiftedIndex < 0) {
    currentSkull[0][currentRow].forEach((square, index) => {
      if (shiftedIndex < 0 && square === "") shiftedIndex = index;
    });
  }

  return shiftedIndex;
}

export default ShiftIndexBackward