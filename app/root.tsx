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
  // REMOVED: ScrollRestoration,
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
// REMOVED top-level localforage import
import { SettingsProvider } from "./client/components/context/SettingsContext";
import { StatsProvider } from "./client/components/context/StatsContext";
import ErrorBoundary from "./client/components/utils/errors/ErrorBoundary";
// REMOVED top-level GoogleAutoAds import
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

  // translate ?trk=slug into a pretty path /slug
  if (url.pathname === "/" && url.searchParams.has("trk")) {
    const trk = url.searchParams.get("trk") || "";
    const safe = trk.toLowerCase().match(/^[a-z0-9_-]+$/)?.[0];
    if (safe) {
      url.pathname = `/${safe}`;
      url.search = ""; // drop the tracking querystring
      throw redirect(url.toString(), { status: 301 });
    }
  }

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

  // Memoize/fetch words once per TTL
  const now = Date.now();
  if (!WORDS_CACHE || now - WORDS_LOADED_AT > WORDS_TTL_MS) {
    const data = (await GetWordsForSkull()) as
      | WordsPayload
      | { [k: string]: any };
    WORDS_CACHE = (data as WordsPayload).words
      ? (data as WordsPayload)
      : { words: data as any };
    WORDS_LOADED_AT = now;
  }

  return json(
    { ...WORDS_CACHE, canonical },
    {
      headers: {
        // CDN+browser friendly; keeps SSR snappy without redoing work
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
    // CLIENT-ONLY import to keep it out of the server bundle
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
    console.error("Error fetching or decompressing words data:", error);
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
    // canonical link via Meta API
    { tagName: "link", rel: "canonical", href: canonical },
    // social tags
    { property: "og:url", content: canonical },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
};

// --- UI shells ---

function Shell({ children }: { children: React.ReactNode }) {
  const { darkThemeActive } = useTheme();
  return (
    <div
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

// Body is now a shell DIV, not a <body>
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

/** Scroll to top after route navigation completes */
function ScrollToTopOnRouteChange() {
  const location = useLocation();
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "idle") {
      const id = requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        // extra safety across engines
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
      return () => cancelAnimationFrame(id);
    }
  }, [location.pathname, location.search, navigation.state]);

  return null;
}

/** Client-only, lazy-loaded Google ads */

const GoogleAutoAdsLazy = lazy(async () => {
  try {
    const mod = await import("./client/components/utils/other/GoogleAutoAds"); // .tsx file
    return { default: mod.default ?? (() => null) };
  } catch (err) {
    if (import.meta.env.DEV) console.warn("GoogleAutoAds failed to load:", err);
    return { default: () => null };
  }
});

function AdsClientOnly() {
  // Ensure server and first client render match (both render nothing)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Suspense fallback={null}>
      <GoogleAutoAdsLazy />
    </Suspense>
  );
}

// --- Document layout ---

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
                {/* ensure manual control + force scroll-to-top */}
                <UseManualScrollRestoration />
                <ScrollToTopOnRouteChange />
                <Body>{children}</Body>
              </StatsProvider>
            </SettingsProvider>
          </ThemeProvider>
        </ErrorBoundary>

        {/* Removed <ScrollRestoration /> to avoid conflicts */}
        <Scripts />
        {/* Lazy, client-only ads */}
        <div id="ads-root" suppressHydrationWarning>
          <AdsClientOnly />
        </div>
      </body>
    </html>
  );
}

// --- App ---

export default function App() {
  return <Outlet />;
}
