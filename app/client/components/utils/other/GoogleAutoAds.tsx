// app/client/components/utils/other/GoogleAutoAds.tsx
import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: { push: (config: object) => void };
  }
}

export default function GoogleAutoAds() {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    const ensureScriptOnce = () => {
      let s = document.querySelector<HTMLScriptElement>(
        "#adsbygoogleaftermount"
      );
      if (!s) {
        s = document.createElement("script");
        s.id = "adsbygoogleaftermount";
        s.async = true;
        s.crossOrigin = "anonymous";
        s.src =
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4810616735714570";
        document.head.appendChild(s);
      }
    };

    const initSlots = () => {
      if (!window.adsbygoogle)
        window.adsbygoogle = { push: (config: object) => {} };
      document.querySelectorAll<HTMLElement>(".adsbygoogle").forEach((el) => {
        if (el.dataset.adsbygoogleInitialized === "true") return;
        if (el.getAttribute("data-ad-status") === "filled") {
          el.dataset.adsbygoogleInitialized = "true";
          return;
        }
        try {
          window.adsbygoogle!.push({});
          el.dataset.adsbygoogleInitialized = "true";
        } catch {
          /* script may not be ready yet; retries below will cover it */
        }
      });
    };

    ensureScriptOnce();
    // First attempts (script is async)
    initSlots();
    const t1 = window.setTimeout(initSlots, 400);
    const t2 = window.setTimeout(initSlots, 1200);

    // Watch for route-driven DOM changes (no router hooks needed)
    const mo = new MutationObserver(initSlots);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      mo.disconnect();
    };
  }, []);

  return null;
}
