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
  useLocation,
  useNavigation,
} from "@remix-run/react";

import type { MetaFunction } from "@remix-run/node";

import {
  ThemeProvider,
  useTheme,
} from "./client/components/context/ThemeContext";
import { SettingsProvider } from "./client/components/context/SettingsContext";
import { StatsProvider } from "./client/components/context/StatsContext";
import ErrorBoundary from "./client/components/utils/errors/ErrorBoundary";
import { useEffect, lazy, Suspense, useState } from "react";

// --- Meta ---

export const meta: MetaFunction = () => [
  { title: "Word Skull" },
  {
    name: "description",
    content:
      "Play Word Skull: Classic, Royal Lichen, and more. Fast word challenges with 3 to 9 letter play.",
  },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
];

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
