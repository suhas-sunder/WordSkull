import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

/* ===================== META ===================== */
export const meta: MetaFunction = () => {
  const title = "WordSkull Blog | Word Game Strategy, Fantasy & Fun";
  const description =
    "Dive into the WordSkull blog for word game tips, fantasy lore, strategy guides, and behind-the-scenes updates. Perfect for word puzzle fans and fantasy enthusiasts.";

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.wordskull.com/blog" },
    { property: "og:site_name", content: "WordSkull" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    {
      name: "robots",
      content:
        "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    },
  ];
};

/* ===================== BLOG DATA ===================== */
// Temporary static list — you can expand this or import from a central registry.
const posts = [
  {
    slug: "wordskull-vs-wordle-fantasy-twist",
    title: "WordSkull vs Wordle: A Fantasy Twist on the Word Game Craze",
    description:
      "How WordSkull builds on Wordle’s addictive formula with a fantasy dungeon theme, unique skull battles, and fresh mechanics.",
    date: "2025-08-17",
  },
];

/* ===================== PAGE ===================== */
export default function BlogIndex() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <h1 className="text-4xl font-bold mb-6">WordSkull Blog</h1>
      <p className="mb-10 text-lg text-gray-600">
        Articles about word game strategy, fantasy themes, and the making of
        WordSkull.
      </p>

      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-6">
            <h2 className="text-2xl font-semibold mb-2">
              <Link
                to={`/blog/${post.slug}`}
                className="text-pumpkin-orange hover:text-amber-600"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-500 text-sm mb-2">{post.date}</p>
            <p className="text-gray-700">{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
