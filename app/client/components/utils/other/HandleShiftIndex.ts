interface PropType {
  currentSkull: string[][][];
  currentRow: number;
  currentRowIndex: number;
}

const cache = new Map<string, number>();

function HandleShiftIndex({
  currentSkull,
  currentRow,
  currentRowIndex,
}: PropType) {
  const cacheKey = JSON.stringify({ currentRow, currentRowIndex });

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  if (currentRow > currentSkull[0].length - 1) {
    return 0;
  }

  const row = currentSkull[0][currentRow];
  const length = row.length;
  let defaultIndex = 0;

  while (
    currentRowIndex + defaultIndex < length &&
    (row[currentRowIndex + defaultIndex] === "@" ||
      row[currentRowIndex + defaultIndex] === "~")
  ) {
    defaultIndex++;
  }

  cache.set(cacheKey, defaultIndex);
  return defaultIndex;
}

export default HandleShiftIndex;
