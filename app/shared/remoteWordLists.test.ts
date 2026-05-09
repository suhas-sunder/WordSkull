import { describe, expect, it } from "vitest";
import {
  getRemoteWordListUrl,
  normalizeRemoteWordList,
  resolveManifestVersion,
} from "./remoteWordLists";

describe("remote word-list helpers", () => {
  it("builds the length-specific public CDN URL", () => {
    expect(getRemoteWordListUrl(5, "https://cdn.example.com")).toBe(
      "https://cdn.example.com/words/v1/5-letter.json"
    );
  });

  it("normalizes arrays of fetched words by length", () => {
    expect(
      normalizeRemoteWordList(["HOUSE", "house", "water", "bad-word", "tree"], 5)
    ).toEqual(["house", "water"]);
  });

  it("normalizes supported object response shapes", () => {
    expect(
      normalizeRemoteWordList(
        { words: { "4": ["Tree", "TREE", "house", "wolf"] } },
        4
      )
    ).toEqual(["tree", "wolf"]);

    expect(
      normalizeRemoteWordList({ words: ["House", "World", "skull"] }, 5)
    ).toEqual(["house", "skull", "world"]);
  });

  it("fails malformed responses safely", () => {
    expect(normalizeRemoteWordList({ nope: ["house"] }, 5)).toEqual([]);
    expect(normalizeRemoteWordList("house", 5)).toEqual([]);
    expect(normalizeRemoteWordList(null, 5)).toEqual([]);
  });

  it("resolves manifest versions without trusting malformed data", () => {
    expect(resolveManifestVersion({ version: "2026-05-09" })).toBe(
      "2026-05-09"
    );
    expect(resolveManifestVersion({ version: 123 })).toBeNull();
    expect(resolveManifestVersion(null)).toBeNull();
  });
});
