import { useEffect } from "react";

export default function GoogleAutoAds() {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    const w = window as any;

    const injectScriptOnce = () => {
      const id = "adsbygoogleaftermount";
      if (!document.getElementById(id)) {
        const s = document.createElement("script");
        s.id = id;
        s.async = true;
        s.crossOrigin = "anonymous";
        s.src =
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4810616735714570";
        document.head.appendChild(s);
      }
    };

    const pushAd = () => (w.adsbygoogle || (w.adsbygoogle = [])).push({});

    const initSlots = () => {
      document.querySelectorAll<HTMLElement>(".adsbygoogle").forEach((el) => {
        // Don’t double-init the same slot
        if (el.dataset.adsbygoogleInitialized === "true") return;
        if (el.getAttribute("data-ad-status") === "filled") {
          el.dataset.adsbygoogleInitialized = "true";
          return;
        }
        try {
          pushAd();
          el.dataset.adsbygoogleInitialized = "true";
        } catch {
          // Script not ready yet; later retries will catch it
        }
      });
    };

    // Delay until AFTER the first paint + window load, so hydration is done
    const afterLoad = () => {
      injectScriptOnce();
      const idle =
        w.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1000));
      idle(() => setTimeout(initSlots, 150));
    };

    if (document.readyState === "complete") {
      afterLoad();
    } else {
      const onLoad = () => {
        window.removeEventListener("load", onLoad);
        afterLoad();
      };
      window.addEventListener("load", onLoad, { once: true });
    }

    // Re-scan on route changes/dom mutations (throttled)
    let raf = 0;
    const scheduleScan = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        initSlots();
      });
    };
    const mo = new MutationObserver(scheduleScan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      mo.disconnect();
    };
  }, []);

  return null;
}
