import { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import Error from "../client/components/ui/interactive/Error";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Error - Page Not Found or Restricted! 🥺",
    },
    {
      name: "description",
      content:
        "Oops! The page you are looking for doesn't exist or you do not have access. Please check the URL or return to the homepage! 🎉📲",
    },
  ];
};

export function loader() {
  return new Response(JSON.stringify({ error: "Not Found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
}

export const action = async ({ request }: { request: Request }) => {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  return new Response("Not Found", { status: 404 });
};

export default function Wildcard() {
  const [status, setStatus] = useState<number>(404); // Default to 404 error
  const [message, setMessage] = useState<string>(
    "Oops! The page you are looking for doesn't exist."
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.pathname; // Safe to access window here

      // If the URL contains "restricted", trigger 403
      if (currentUrl === "/403") {
        setStatus(403);
        setMessage("Restricted area. You do not have access to this page.");
      }
    }
  }, []); // Empty dependency array ensures this only runs on the client-side

  return <Error status={status} message={message} />;
}
