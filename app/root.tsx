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
  ScrollRestoration,
  ClientLoaderFunctionArgs,
} from "@remix-run/react";
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

// Loader function to fetch and return data
export const loader = async () => {
  return await GetWordsForSkull();
};

export const action = async ({ request }: { request: Request }) => {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // Handle POST request (bot or other unknown POST routes)
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

export function Body({ children }: { children: React.ReactNode }) {
  const { darkThemeActive } = useTheme();

  return (
    <body
      className={`pt-6 transition-colors duration-[600ms] ${
        darkThemeActive ? "bg-stone-900" : "bg-amber-50/10"
      }`}
    >
      <NavBar />
      <div className="min-h-[100vh]">{children}</div>
      <ScrollRestoration />
      <Scripts />
      <GoogleAutoAds />
      <Footer />
    </body>
  );
}

// Layout Component for rendering HTML structure
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
      </head>{" "}
      <ErrorBoundary>
        <ThemeProvider>
          <SettingsProvider>
            <StatsProvider>
              <Body>{children}</Body>
            </StatsProvider>
          </SettingsProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </html>
  );
}

// App Component for managing application state
export default function App() {
  return <Outlet />;
}
