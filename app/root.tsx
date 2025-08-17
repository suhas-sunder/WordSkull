import "./tailwind.css";
import NavBar from "./client/components/navigation/NavBar";
import Footer from "./client/components/navigation/Footer";
import Skull_1 from "./client/assets/images/skull_1.png";
import Skull_2 from "./client/assets/images/skull_2.png";
import Skull_3 from "./client/assets/images/skull_3.png";
import Skull_4 from "./client/assets/images/skull_4.png";
import Skull_1_Webp from "./client/assets/images/skull_1.webp";
import Skull_2_Webp from "./client/assets/images/skull_2.webp";
import Skull_3_Webp from "./client/assets/images/skull_3.webp";
import Skull_4_Webp from "./client/assets/images/skull_4.webp";

import {
  Outlet,
  Links,
  Meta,
  Scripts,
  ClientLoaderFunctionArgs,
  useLocation,
  useNavigation,
} from "@remix-run/react";

import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import {
  ThemeProvider,
  useTheme,
} from "./client/components/context/ThemeContext";
import { SettingsProvider } from "./client/components/context/SettingsContext";
import { StatsProvider } from "./client/components/context/StatsContext";
import ErrorBoundary from "./client/components/utils/errors/ErrorBoundary";
import GetWordsForSkull from "./client/components/utils/requests/GetWordsForSkull";
import { useEffect, lazy, Suspense, useState } from "react";

/* ========= simple server memo cache for words ========= */
type WordsPayload = { words: Record<number, string[]> };
let WORDS_CACHE: WordsPayload | null = null;
let WORDS_LOADED_AT = 0;
const WORDS_TTL_MS = 60 * 60 * 1000; // 1 hour
/* ===================================================== */

// --- Loader / action / clientLoader ---

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);

  // Normalize: strip trailing slashes on non-root
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.replace(/\/+$/, "");
    throw redirect(url.toString(), { status: 301 });
  }

  // Normalize: strip trailing periods or spaces
  if (/[.\s]+$/.test(url.pathname)) {
    url.pathname = url.pathname.replace(/[.\s]+$/, "");
    throw redirect(url.toString(), { status: 301 });
  }

  // Build canonical (no trailing slash on path)
  const canonical = url.origin + (url.pathname || "/") + url.search;

  // Memoize/fetch words once per TTL, robust to Response|object shapes
  const now = Date.now();
  if (!WORDS_CACHE || now - WORDS_LOADED_AT > WORDS_TTL_MS) {
    try {
      const resOrObj = await GetWordsForSkull();
      let words: Record<number, string[]> | undefined;

      if (resOrObj && typeof (resOrObj as any).json === "function") {
        const data = await (resOrObj as Response).json();
        words = (data as any)?.words ?? (data as any);
      } else {
        words = (resOrObj as any)?.words ?? (resOrObj as any);
      }

      WORDS_CACHE = { words: words ?? {} };
      WORDS_LOADED_AT = now;
    } catch (e) {
      console.error("GetWordsForSkull failed in root loader:", e);
      WORDS_CACHE = { words: {} };
      WORDS_LOADED_AT = now;
    }
  }

  return json(
    { ...WORDS_CACHE, canonical },
    {
      headers: {
        "Cache-Control":
          "public, s-maxage=86400, max-age=1800, stale-while-revalidate=604800",
      },
    }
  );
};

export const action = async ({ request }: { request: Request }) => {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  return new Response("Not Found", { status: 404 });
};

export async function clientLoader({ serverLoader }: ClientLoaderFunctionArgs) {
  const cacheKey = "words";
  try {
    const { default: localforage } = await import("localforage");

    const cachedWords = await localforage.getItem(cacheKey);
    if (cachedWords) {
      return { words: cachedWords };
    } else {
      const { words }: { words: { [keys: number]: string[] } } =
        await serverLoader();
      await localforage.setItem(cacheKey, words);
      return { words };
    }
  } catch (error) {
    console.error("Error fetching or caching words data:", error);
    return { words: [] };
  }
}

// --- Meta ---

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const canonical = data?.canonical ?? "";
  return [
    { title: "Word Skull" },
    {
      name: "description",
      content:
        "Play Word Skull: Classic, Royal Lichen, and more. Fast word challenges with 3 to 9 letter play.",
    },
    { tagName: "link", rel: "canonical", href: canonical },
    { property: "og:url", content: canonical },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
};

// NEW: document-level headers to avoid stale HTML pointing to deleted chunks
export const headers = () => {
  return {
    "Cache-Control": "no-store",
  };
};

// --- UI shells ---

function Shell({ children }: { children: React.ReactNode }) {
  const { darkThemeActive } = useTheme();
  return (
    <div
      suppressHydrationWarning
      className={`pt-6 transition-colors duration-[600ms] ${
        darkThemeActive ? "bg-stone-900" : "bg-amber-50/10"
      }`}
    >
      <NavBar />
      <div className="min-h-[100vh]">{children}</div>
      <Footer />
    </div>
  );
}

export function Body({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>;
}

/** Disable native scroll restoration once */
function UseManualScrollRestoration() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      const prev = window.history.scrollRestoration as "auto" | "manual";
      window.history.scrollRestoration = "manual";
      return () => {
        window.history.scrollRestoration = prev ?? "auto";
      };
    }
  }, []);
  return null;
}

/* ---------- NEW: Anchor-aware scroll handler ---------- */

function getFixedHeaderOffset() {
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>("nav, header, [data-fixed-header]")
  );
  for (const el of candidates) {
    const cs = getComputedStyle(el);
    if (cs.position === "fixed" || cs.position === "sticky") {
      return el.getBoundingClientRect().height || 0;
    }
  }
  return 0;
}

function AnchorAwareScroll() {
  const location = useLocation();
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state !== "idle") return;

    // Keep a CSS var other parts can use with `scroll-margin-top`
    const offset = getFixedHeaderOffset();
    document.documentElement.style.setProperty(
      "--anchor-offset",
      `${offset + 12}px`
    );

    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      let tries = 0;
      const maxTries = 24; // ~24 frames ≈ 400ms at 60fps

      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          const y =
            el.getBoundingClientRect().top + window.pageYOffset - (offset + 12);
          window.scrollTo({ top: y, behavior: "smooth" });
          return;
        }
        if (tries++ < maxTries) requestAnimationFrame(tryScroll);
      };

      requestAnimationFrame(tryScroll);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [location.pathname, location.search, location.hash, navigation.state]);

  return null;
}

/** Client-only, lazy-loaded Google ads */
const GoogleAutoAdsLazy = lazy(
  () => import("./client/components/utils/other/GoogleAutoAds")
);

function AdsClientOnly() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // no SSR markup; no hydration race
  return (
    <Suspense fallback={null}>
      <GoogleAutoAdsLazy />
    </Suspense>
  );
}

// --- Document layout ---
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          rel="preload"
          href="/fonts/Nunito-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Lato-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Lora-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Overlock-BlackItalic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        <link rel="preload" href={Skull_1_Webp} as="image" />
        <link rel="preload" href={Skull_2_Webp} as="image" />
        <link rel="preload" href={Skull_3_Webp} as="image" />
        <link rel="preload" href={Skull_4_Webp} as="image" />
        <link rel="preload" href={Skull_1} as="image" />
        <link rel="preload" href={Skull_2} as="image" />
        <link rel="preload" href={Skull_3} as="image" />
        <link rel="preload" href={Skull_4} as="image" />

        <Meta />
        <Links />
      </head>
      <body>
        <ErrorBoundary>
          <ThemeProvider>
            <SettingsProvider>
              <StatsProvider>
                <UseManualScrollRestoration />
                {/* replaced ScrollToTopOnRouteChange with anchor-aware scroll */}
                <AnchorAwareScroll />
                <Body>{children}</Body>
              </StatsProvider>
            </SettingsProvider>
          </ThemeProvider>
        </ErrorBoundary>

        <Scripts />
        <AdsClientOnly />
      </body>
    </html>
  );
}

// --- App ---

export default function App() {
  return <Outlet />;
}
