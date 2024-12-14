import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GoogleAutoAds = () => {
  const location = useLocation();

  // Function to initialize ads (called on page load and route change)
  const initializeAds = () => {
    if (window.adsbygoogle) {
      const adsElements = document.querySelectorAll(".adsbygoogle");

      adsElements.forEach((adElement) => {
        // Check if the ad element already has an iframe or other content
        if (!adElement.querySelector("iframe") && !adElement.innerHTML.trim()) {
          // Only push ads to elements that haven't been populated yet
          window.adsbygoogle.push({});
        }
      });
    }
  };

  useEffect(() => {
    // Function to load the Google Ads script only once
    const loadGoogleAdsScript = () => {
      if (!document.getElementById("adsbygoogleaftermount")) {
        const script = document.createElement("script");
        script.id = "adsbygoogleaftermount";
        script.type = "text/javascript";
        script.async = true;
        script.src =
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4810616735714570";

        script.onload = () => {
          // Once the script is loaded, we can start initializing ads
          initializeAds();
        };

        document.head.appendChild(script);
      }
    };

    // Load Google Ads script on route change
    loadGoogleAdsScript();
  }, [location.key]); // Trigger on route change

  useEffect(() => {
    // Initialize ads on the first render as well
    initializeAds();
  }, []); // Run once on initial load

  return null; // This component does not render anything
};

export default GoogleAutoAds;
