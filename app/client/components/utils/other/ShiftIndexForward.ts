interface PropType {
  currentSkull: string[][][];
  currentRow: number;
  currentRowIndex: number;
}

// Create a cache map to store the computed shift index values
const cache = new Map<string, number>();

//Determine if character index needs to be shifted forward
export default function ShiftIndexForward({
  currentSkull,
  currentRow,
  currentRowIndex,
}: PropType) {
  // Construct the cache key using all three inputs
  const cacheKey = JSON.stringify({
    skull: currentSkull,
    row: currentRow,
    index: currentRowIndex,
  });

  // Check if the cache already has a value for this key
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  // Validate that the currentRow is within bounds of the currentSkull array
  if (currentRow > currentSkull[0].length - 1) {
    return 0;
  }

  // Extract the row from the skull and initialize variables
  const row = currentSkull[0][currentRow];
  const length = row.length;
  let shiftedIndex = 0;

  // Calculate the shift index by checking the row's content
  while (
    currentRowIndex + shiftedIndex < length &&
    (row[currentRowIndex + shiftedIndex] === "@" ||
      row[currentRowIndex + shiftedIndex] === "~")
  ) {
    shiftedIndex++;
  }

  // Store the computed value in the cache
  cache.set(cacheKey, shiftedIndex);

  // Return the computed shift index
  return shiftedIndex;
}

