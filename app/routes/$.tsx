import type {
  MetaFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useEffect, useMemo, useState } from "react";
import { Link } from "@remix-run/react";
import Error from "../client/components/ui/interactive/Error";
import SkullAnimation from "~/client/components/ui/visual/SkullAnimation";

export const meta: MetaFunction = () => [
  { title: "Not Found or Restricted | Word Skull" },
  {
    name: "description",
    content:
      "This page is missing or restricted. Head back to Word Skull games or try a different link.",
  },
  { name: "robots", content: "noindex, nofollow" },
  { property: "og:type", content: "website" },
  { property: "og:title", content: "Not Found or Restricted | Word Skull" },
  {
    property: "og:description",
    content:
      "This page is missing or restricted. Head back to Word Skull games or try a different link.",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  if (url.pathname === "/403") {
    return json({ code: 403 }, { status: 403 });
  }
  return json({ code: 404 }, { status: 404 });
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  return new Response("Not Found", { status: 404 });
}

export default function Wildcard() {
  const [status, setStatus] = useState<number>(404);
  const [message, setMessage] = useState<string>(
    "Oops! The page you are looking for does not exist."
  );

  const title = useMemo(
    () => (status === 403 ? "Restricted Area" : "Page Not Found"),
    [status]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      if (path === "/403") {
        setStatus(403);
        setMessage(
          "Restricted area. You are either not authorized to view this page or your session has expired. Please try logging in again."
        );
      }
    }
  }, []);

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center px-6 py-16">
      {/* full-page brand gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10  from-amber-100/70 via-white to-amber-50 dark:from-amber-400/10 dark:via-zinc-900 dark:to-zinc-900" />

      {/* card */}
      <div className="flex  flex-col justify-center  gap-5 items-center w-full max-w-3xl rounded-2xl border border-zinc-200/80 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-zinc-800/80 dark:bg-zinc-900/70">
        {/* Skull badge */}
        <div className="mb-6 grid place-items-center">
          <div className="relative h-24 w-24 rounded-full ring-4 ring-amber-500/30">
            <div className="absolute inset-0 rounded-full border border-zinc-200/80 dark:border-zinc-800/80" />
            <div className="absolute inset-3 rounded-full border border-zinc-200/70 dark:border-zinc-800" />
            <div className="absolute inset-6 rounded-full border border-zinc-200/70 dark:border-zinc-800" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="text-4xl" role="img" aria-label="skull">
                💀
              </span>
            </div>
          </div>
        </div>

        {/* Heading + copy */}
        <p className="text-6xl uppercase tracking-[0.18em] text-amber-700/80 dark:text-amber-400/80">
          {status === 403 ? "403" : "404"}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-prose text-base text-zinc-600 dark:text-zinc-300">
          {message}
        </p>

        {/* Divider */}
        <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-amber-500/70" />

        {/* Actions */}
        <div className="mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-amber-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
          >
            Go Home
          </Link>
          <Link
            to="/games"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:focus-visible:ring-zinc-700"
          >
            Browse Games
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center rounded-xl border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:focus-visible:ring-zinc-700"
            type="button"
          >
            Go Back
          </button>
        </div>

        {/* Keep existing error component for telemetry/ARIA */}
        <div className="sr-only">
          <Error status={status} message={message} />
        </div>

        <div className="flex my-20">
          <SkullAnimation />
        </div>
      </div>
    </section>
  );
}
