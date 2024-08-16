import "./tailwind.css";
import NavBar from "./client/components/navigation/NavBar";
import Footer from "./client/components/navigation/Footer";
import ReactGA from "react-ga4";

import {
  Outlet,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import { useEffect, useState } from "react";

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
      <body className="pt-14">
        <NavBar />
        <div>{children}</div>
        <ScrollRestoration />
        <Scripts />
        <Footer />
      </body>
    </html>
  );
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
