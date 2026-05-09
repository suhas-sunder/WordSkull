import { describe, expect, it } from "vitest";
import {
  PUBLIC_ROUTES,
  SITE_ORIGIN,
  getCanonicalUrl,
  getPrerenderPaths,
} from "./routes";

describe("public route registry", () => {
  it("keeps SEO-critical blog, lore, game, word-list, and misc routes registered", () => {
    const paths = PUBLIC_ROUTES.map((route) => route.path);

    expect(paths).toContain("/");
    expect(paths).toContain("/blog");
    expect(paths).toContain("/blog/wordskull-vs-wordle-fantasy-twist");
    expect(paths).toContain("/lore");
    expect(paths).toContain(
      "/lore/wordskull-chapter-1-the-wizards-rise-who-was-atriocsoul"
    );
    expect(paths).toContain(
      "/games/classic/boneheads-easy-3-to-5-letter-words"
    );
    expect(paths).toContain(
      "/words-list/all-9-letter-words-for-word-games"
    );
    expect(paths).toContain("/misc/privacy-policy");
  });

  it("creates stable canonical URLs and prerender paths", () => {
    expect(SITE_ORIGIN).toBe("https://www.wordskull.com");
    expect(getCanonicalUrl("/blog")).toBe("https://www.wordskull.com/blog");
    expect(getCanonicalUrl("/")).toBe("https://www.wordskull.com");

    const prerenderPaths = getPrerenderPaths();
    expect(prerenderPaths[0]).toBe("/");
    expect(prerenderPaths).toContain("/blog");
    expect(prerenderPaths).toContain("/lore");
    expect(prerenderPaths).toContain("/misc/sitemap");
  });
});
