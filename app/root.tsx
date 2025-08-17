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
import localforage from "localforage";
import { SettingsProvider } from "./client/components/context/SettingsContext";
import { StatsProvider } from "./client/components/context/StatsContext";
import ErrorBoundary from "./client/components/utils/errors/ErrorBoundary";
import GoogleAutoAds from "./client/components/utils/other/GoogleAutoAds";
import GetWordsForSkull from "./client/components/utils/requests/GetWordsForSkull";
import { useEffect } from "react";

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

  // Keep your existing data shape, just add canonical
  const wordsData = await GetWordsForSkull(); // { words: ... }
  return json({ ...wordsData, canonical });
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
        <GoogleAutoAds />
      </body>
    </html>
  );
}

// --- App ---

export default function App() {
  return <Outlet />;
}
