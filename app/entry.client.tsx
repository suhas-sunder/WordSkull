import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";
import { posthog } from "posthog-js";

function PosthogInit() {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        requestIdleCallback(() => {
          posthog.init("phc_2IQDpa7YpxYMhcOXtPMlgcrrHmNjX4pY3wuvr3LKjS3", {
            api_host: "https://us.i.posthog.com",
            person_profiles: "identified_only", // or 'always' for anonymous users
          });
        });
      } else {
        posthog.init("phc_2IQDpa7YpxYMhcOXtPMlgcrrHmNjX4pY3wuvr3LKjS3", {
          api_host: "https://us.i.posthog.com",
          person_profiles: "identified_only",
        });
      }
    } catch (error: unknown) {
      // Check if the error is an instance of Error
      if (error instanceof Error) {
        // Suppress specific error messages
        if (
          error.message.includes("CSP") ||
          error.message.includes("inline script")
        ) {
          // Do nothing
        } else {
          console.error(error); // Log other errors
        }
      } else {
        console.error("An unknown error occurred:", error);
      }
    }
  }, []);

  return null;
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
      <PosthogInit />
    </StrictMode>
  );
});
