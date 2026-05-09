import { MetaFunction } from "@remix-run/node";
import SocialLinks from "../client/components/navigation/SocialLinks";

// ---------- META ----------
export const meta: MetaFunction = () => {
  const canonical = "https://www.wordskull.com/misc/faq";

  const title = "WordSkull FAQ | Frequently Asked Questions";
  const description =
    "Find answers to common questions about WordSkull, the fantasy word battle game. Learn how to play, game modes, and where to get support.";

  const ogImage = "https://www.wordskull.com/og/wordskull-faq.jpg";

  return [
    // Title & Description
    { title },
    { name: "description", content: description },

    // Canonical
    { tagName: "link", rel: "canonical", href: canonical },

    // Open Graph
    { property: "og:site_name", content: "WordSkull" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonical },
    { property: "og:image", content: ogImage },
    { property: "og:image:alt", content: "WordSkull FAQ page" },
    { property: "og:locale", content: "en_US" },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },

    // Robots
    {
      name: "robots",
      content:
        "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    },
  ];
};

function Faq() {
  return (
    <div>
      <main>
        <h1>Frequently Asked Questions</h1>
        <SocialLinks />
      </main>
    </div>
  );
}

export default Faq;
