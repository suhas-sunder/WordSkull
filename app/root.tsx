import "./tailwind.css";
import NavBar from "./client/components/navigation/NavBar";
import Footer from "./client/components/navigation/Footer";
import ReactGA from "react-ga4";
import cloudflareR2API from "./client/components/api/cloudflareR2API";
import { ungzip } from "pako";

import {
  Outlet,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useLocation,
  json,
  ClientLoaderFunctionArgs,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import {
  ThemeProvider,
  useTheme,
} from "./client/components/context/ThemeContext";
import localforage from "localforage";
import { SettingsProvider } from "./client/components/context/SettingsContext";
import { StatsProvider } from "./client/components/context/StatsContext";

// Layout Component for rendering HTML structure
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <ThemeProvider>
        <SettingsProvider>
          <StatsProvider>
            <Body>{children}</Body>
          </StatsProvider>
        </SettingsProvider>
      </ThemeProvider>
    </html>
  );
}

export function Body({ children }: { children: React.ReactNode }) {
  const { darkThemeActive } = useTheme();

  return (
    <body className={`pt-6 ${darkThemeActive && "bg-slate-900"}`}>
      <NavBar />
      <div>{children}</div>
      <ScrollRestoration />
      <Scripts />
      <Footer />
    </body>
  );
}

// Loader function to fetch and return data
export const loader = async () => {
  let words = {};

  // Fetch gzipped file from Cloudflare R2 if not cached
  const response = await cloudflareR2API.get(
    "/word-skull/sortedWords.json.gz",
    {
      method: "GET",
      responseType: "arraybuffer",
    }
  );

  const responseData = new Uint8Array(response.data);

  // Check if the response data is Gzipped
  const isGzip = responseData[0] === 0x1f && responseData[1] === 0x8b;

  if (isGzip) {
    const decompressedData = ungzip(responseData, { to: "string" });
    words = JSON.parse(decompressedData);
  } else {
    const textData = new TextDecoder().decode(responseData);
    words = JSON.parse(textData);
  }

  return json(
    { words }, // Return initial empty array or modify as needed
    {
      headers: {
        "Cache-Control": "max-age=3600, public",
      },
    }
  );
};

export const action = () => {
  return new Response("Not Found", { status: 404 });
};

export async function clientLoader({ serverLoader }: ClientLoaderFunctionArgs) {
  const cacheKey = "words";

  try {
    // Check if words are already cached in localForage
    const cachedWords = await localforage.getItem(cacheKey);

    if (cachedWords) {
      return { words: cachedWords };
    } else {
      const { words }: { words: { [keys: number]: string[] } } =
        await serverLoader();

      // Store the words in localForage for future use
      await localforage.setItem(cacheKey, words);

      return { words };
    }
  } catch (error) {
    console.error("Error fetching or decompressing words data:", error);
    return { words: [] }; // Return an empty array in case of failure
  }
}

// App Component for managing application state
export default function App() {
  const [stopGADelayOnStart, setStopGADelayOnStart] = useState(false);
  const pathname = useLocation().pathname;

  useEffect(() => {
    const loadGoogleAnalyticsAdsense = async () => {
      await ReactGA.initialize("G-9C6MJ7Y439"); // Initialize Google Analytics

      // Send page view with a custom path
      ReactGA.send({
        hitType: "pageview",
        page: pathname,
        title: "Custom Title",
      });
    };

    const delay = stopGADelayOnStart ? 0 : 4000;

    setStopGADelayOnStart(true);

    const timer = setTimeout(loadGoogleAnalyticsAdsense, delay);

    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return <Outlet />;
}
