export const DEFAULT_WORD_LIST_CDN_BASE_URL = "https://www.doodlegarden.com";
export const SORTED_WORDS_PATH = "/words-for-games/sortedWords.json.gz";
export const DEFAULT_SORTED_WORDS_URL = `${DEFAULT_WORD_LIST_CDN_BASE_URL}${SORTED_WORDS_PATH}`;
export const SORTED_WORDS_CACHE_KEY = "wordskull:sortedWords:v1";

const configuredBaseUrl = import.meta.env.VITE_WORD_LIST_CDN_BASE_URL?.trim();

export const WORD_LIST_CDN_BASE_URL = stripTrailingSlash(
  configuredBaseUrl || DEFAULT_WORD_LIST_CDN_BASE_URL
);

const SUPPORTED_LENGTHS = [3, 4, 5, 6, 7, 8, 9] as const;

type SupportedWordLength = (typeof SUPPORTED_LENGTHS)[number];
type SupportedWordLengthKey = `${SupportedWordLength}`;

export type SortedWordsByLength = Partial<
  Record<SupportedWordLengthKey, string[]>
>;

function stripTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function stripLeadingSlash(value: string) {
  return value.replace(/^\/+/, "");
}

function joinUrl(baseUrl: string, path: string) {
  return `${stripTrailingSlash(baseUrl)}/${stripLeadingSlash(path)}`;
}

function isSupportedWordLength(length: number): length is SupportedWordLength {
  return SUPPORTED_LENGTHS.includes(length as SupportedWordLength);
}

export function getSortedWordsUrl(baseUrl = WORD_LIST_CDN_BASE_URL) {
  const normalizedBaseUrl = stripTrailingSlash(baseUrl);

  if (normalizedBaseUrl.endsWith(".json.gz")) {
    return normalizedBaseUrl;
  }

  return joinUrl(normalizedBaseUrl, SORTED_WORDS_PATH);
}

function normalizeWordsForLength(words: unknown, length: SupportedWordLength) {
  if (!Array.isArray(words)) return [];

  const normalizedWords = words
    .filter((word): word is string => typeof word === "string")
    .map((word) => word.trim().toLowerCase())
    .filter((word) => word.length === length)
    .filter((word) => /^[a-z]+$/.test(word));

  return Array.from(new Set(normalizedWords)).sort((a, b) =>
    a.localeCompare(b)
  );
}

export function normalizeSortedWordsPayload(
  payload: unknown
): SortedWordsByLength {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {};
  }

  const sortedWords = payload as Record<string, unknown>;
  const normalizedSortedWords: SortedWordsByLength = {};

  for (const length of SUPPORTED_LENGTHS) {
    const lengthKey = String(length) as SupportedWordLengthKey;
    const normalizedWords = normalizeWordsForLength(
      sortedWords[lengthKey],
      length
    );

    if (normalizedWords.length > 0) {
      normalizedSortedWords[lengthKey] = normalizedWords;
    }
  }

  return normalizedSortedWords;
}

export function getSortedWordsForLength(payload: unknown, length: number) {
  if (!isSupportedWordLength(length)) return [];

  const sortedWords = normalizeSortedWordsPayload(payload);
  const lengthKey = String(length) as SupportedWordLengthKey;

  return sortedWords[lengthKey] ?? [];
}

function looksGzipped(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  return bytes.length >= 2 && bytes[0] === 0x1f && bytes[1] === 0x8b;
}

async function parseTextPayload(buffer: ArrayBuffer) {
  const text = new TextDecoder().decode(buffer);
  return JSON.parse(text);
}

async function parseGzipPayload(buffer: ArrayBuffer) {
  if (typeof DecompressionStream !== "function") {
    throw new Error(
      "Unable to decompress sortedWords.json.gz in this browser. Configure R2 with Content-Type: application/json and Content-Encoding: gzip."
    );
  }

  const stream = new Response(buffer).body;
  if (!stream) {
    throw new Error("Unable to read sortedWords.json.gz response body.");
  }

  const decompressedStream = stream.pipeThrough(new DecompressionStream("gzip"));
  const text = await new Response(decompressedStream).text();

  return JSON.parse(text);
}

export async function readSortedWordsResponse(
  response: Response
): Promise<SortedWordsByLength> {
  if (!response.ok) {
    throw new Error(`Sorted words request failed: ${response.status}`);
  }

  try {
    return normalizeSortedWordsPayload(await response.clone().json());
  } catch {
    const buffer = await response.arrayBuffer();
    const payload = looksGzipped(buffer)
      ? await parseGzipPayload(buffer)
      : await parseTextPayload(buffer);

    return normalizeSortedWordsPayload(payload);
  }
}
