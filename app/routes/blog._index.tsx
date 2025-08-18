import { Link, useMatches } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

/* ===================== TYPES ===================== */
type RootData = { canonical?: string };
type Match = { id: string; data?: RootData };

type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO, e.g. "2025-08-17"
  imageWebp?: string;
  imageJpg?: string;
  imageAlt?: string;
};

/* ===================== DATA ===================== */
// Temporary static list — swap to your loader later
const posts: Post[] = [
  {
    slug: "wordskull-vs-wordle-fantasy-twist",
    title: "WordSkull vs Wordle: A Fantasy Twist on the Word Game Craze",
    description:
      "How WordSkull builds on Wordle’s addictive formula with a fantasy dungeon theme, unique skull battles, and fresh mechanics.",
    date: "2025-08-17",
    imageWebp:
      "https://www.doodlegarden.com/img/wordskull-vs-nyt-wordle-game.webp",
    imageJpg:
      "https://www.doodlegarden.com/img/wordskull-vs-nyt-wordle-game.jpg",
    imageAlt: "WordSkull vs Wordle comparison artwork",
  },
  // {
  //   slug: "wordskull-vs-nyt-spelling-bee",
  //   title: "WordSkull vs NYT Spelling Bee: A Battle of Wits",
  //   description:
  //     "Comparing WordSkull's unique mechanics with the NYT Spelling Bee's challenge.",
  //   date: "2025-08-18",
  //   imageWebp:
  //     "https://www.wordskull.com/og/blog/wordskull-vs-nyt-spelling-bee.webp",
  //   imageJpg:
  //     "https://www.wordskull.com/og/blog/wordskull-vs-nyt-spelling-bee.jpg",
  //   imageAlt: "WordSkull vs NYT Spelling Bee cover",
  // },
];

/* ===================== META ===================== */
export const meta: MetaFunction = ({ matches }) => {
  const root = matches.find((m) => m.id === "root") as Match | undefined;

  const url = root?.data?.canonical ?? "https://www.wordskull.com/blog";
  const title = "WordSkull Blog | Word Game Strategy, Fantasy & Fun";
  const description =
    "Dive into the WordSkull blog for word game tips, fantasy lore, strategy guides, and behind-the-scenes updates. Perfect for word puzzle fans and fantasy enthusiasts.";
  const ogImage = "https://www.wordskull.com/og/blog/wordskull-blog.jpg";

  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:site_name", content: "WordSkull" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: ogImage },
    { property: "og:image:alt", content: "WordSkull Blog cover" },
    { property: "og:locale", content: "en_US" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
    {
      name: "robots",
      content:
        "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    },
  ];
};

/* ===================== HELPERS ===================== */
function formatDate(iso: string) {
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
}

function buildJsonLdBlog(canonical: string, items: Post[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "WordSkull Blog",
    url: canonical,
    hasPart: {
      "@type": "ItemList",
      itemListElement: items.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://www.wordskull.com/blog/${p.slug}`,
        name: p.title,
      })),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.wordskull.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: canonical,
        },
      ],
    },
  };
}

function PostThumb({
  post,
  priority = false,
}: {
  post: Post;
  priority?: boolean;
}) {
  // Fallback to whichever exists
  const hasSources = post.imageWebp || post.imageJpg;
  if (!hasSources) return null;

  const alt = post.imageAlt ?? post.title;
  // Fixed intrinsic size to reduce CLS; adjust to your real aspect
  const width = 900;
  const height = 400;

  return (
    <Link to={`/blog/${post.slug}`} className="block mb-3">
      <picture>
        {post.imageWebp ? (
          <source srcSet={post.imageWebp} type="image/webp" />
        ) : null}
        {post.imageJpg ? (
          <source srcSet={post.imageJpg} type="image/jpeg" />
        ) : null}
        <img
          src={post.imageJpg || post.imageWebp!}
          alt={alt}
          width={width}
          height={height}
          className="h-40 w-full rounded-xl object-cover"
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
        />
      </picture>
    </Link>
  );
}

/* ===================== PAGE ===================== */
export default function BlogIndex() {
  const matches = useMatches();
  const root = matches.find((m) => m.id === "root") as Match | undefined;
  const canonical = root?.data?.canonical ?? "https://www.wordskull.com/blog";

  // Sort newest first
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const jsonLd = buildJsonLdBlog(canonical, sorted);

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-stone-200 bg-stone-100 mt-5">
        <div className="mx-auto max-w-[1200px] px-6 pt-8 pb-5">
          <nav aria-label="Breadcrumb" className="mb-2 text-sm">
            <ol className="flex flex-wrap items-center gap-1 text-stone-600">
              <li>
                <Link
                  to="/"
                  className="hover:underline text-amber-600 font-bold"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" className="text-amber-600 font-bold">
                Blog
              </li>
            </ol>
          </nav>

          <h1 className="mt-1 font-nunito text-2xl tracking-wide text-skull-dark-brown">
            WordSkull Blog
          </h1>
          <p className="mt-2 max-w-2xl font-lato text-stone-700">
            Articles about word game strategy, fantasy themes, and the making of
            WordSkull.
          </p>
        </div>
      </header>

      {/* Grid of posts */}
      <main className="mx-auto max-w-[1200px] px-6 py-8">
        <section aria-labelledby="blog-list">
          <h2 id="blog-list" className="sr-only">
            Recent posts
          </h2>

          {sorted.length === 0 ? (
            <p className="text-stone-600">No posts yet. Check back soon.</p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sorted.map((post, idx) => (
                <li
                  key={post.slug}
                  className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <article className="flex h-full flex-col">
                    <PostThumb post={post} priority={idx < 3} />

                    <header>
                      <h3 className="font-lora text-lg leading-snug">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="text-pumpkin-orange transition group-hover:text-amber-600"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-1 text-xs text-stone-500">
                        {formatDate(post.date)}
                      </p>
                    </header>

                    <p className="mt-3 line-clamp-3 text-sm text-stone-700">
                      {post.description}
                    </p>

                    <div className="mt-4">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-block rounded-full bg-pumpkin-orange px-4 py-1 text-sm text-white transition hover:bg-amber-600"
                        aria-label={`Read ${post.title}`}
                      >
                        Read
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
