export const DEFAULT_WORD_LIST_CDN_BASE_URL = "https://www.doodlegarden.com";
export const REMOTE_WORD_LIST_VERSION_PATH = "/words/v1";
export const REMOTE_WORD_LIST_FALLBACK_VERSION = "v1";
export const REMOTE_WORD_LIST_CACHE_PREFIX = "wordskull:remote-word-list";

const configuredBaseUrl = import.meta.env.VITE_WORD_LIST_CDN_BASE_URL?.trim();

export const WORD_LIST_CDN_BASE_URL = stripTrailingSlash(
  configuredBaseUrl || DEFAULT_WORD_LIST_CDN_BASE_URL
);

type RemoteWordListObject = {
  words?: unknown;
  data?: unknown;
  items?: unknown;
  list?: unknown;
};

function stripTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function stripLeadingSlash(value: string) {
  return value.replace(/^\/+/, "");
}

function joinUrl(baseUrl: string, path: string) {
  return `${stripTrailingSlash(baseUrl)}/${stripLeadingSlash(path)}`;
}

export function getRemoteWordManifestUrl(baseUrl = WORD_LIST_CDN_BASE_URL) {
  return joinUrl(baseUrl, `${REMOTE_WORD_LIST_VERSION_PATH}/manifest.json`);
}

export function getRemoteWordListUrl(
  length: number,
  baseUrl = WORD_LIST_CDN_BASE_URL
) {
  return joinUrl(
    baseUrl,
    `${REMOTE_WORD_LIST_VERSION_PATH}/${length}-letter.json`
  );
}

export function getRemoteWordListCacheKey(
  length: number,
  version = REMOTE_WORD_LIST_FALLBACK_VERSION
) {
  return `${REMOTE_WORD_LIST_CACHE_PREFIX}:${version}:${length}`;
}

export function resolveManifestVersion(manifest: unknown) {
  if (!manifest || typeof manifest !== "object") return null;

  const version = (manifest as { version?: unknown }).version;

  return typeof version === "string" && version.trim()
    ? version.trim()
    : null;
}

function readWordsFromObject(payload: RemoteWordListObject, length: number) {
  const sources = [payload.words, payload.data, payload.items, payload.list];

  for (const source of sources) {
    if (Array.isArray(source)) return source;

    if (source && typeof source === "object") {
      const wordsByLength = source as Record<string, unknown>;
      const lengthWords =
        wordsByLength[String(length)] ??
        wordsByLength[`${length}-letter`] ??
        wordsByLength[`${length}Letter`] ??
        wordsByLength[`${length}Letters`];

      if (Array.isArray(lengthWords)) return lengthWords;
    }
  }

  return [];
}

function extractRemoteWords(payload: unknown, length: number) {
  if (Array.isArray(payload)) return payload;

  if (payload && typeof payload === "object") {
    return readWordsFromObject(payload as RemoteWordListObject, length);
  }

  return [];
}

export function normalizeRemoteWordList(payload: unknown, length: number) {
  const words = extractRemoteWords(payload, length);
  const normalizedWords = words
    .filter((word): word is string => typeof word === "string")
    .map((word) => word.trim().toLowerCase())
    .filter((word) => word.length === length)
    .filter((word) => /^[a-z]+$/.test(word));

  return Array.from(new Set(normalizedWords)).sort((a, b) =>
    a.localeCompare(b)
  );
}
