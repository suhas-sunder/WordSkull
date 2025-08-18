import { Link, useLocation } from "react-router-dom";
import { useTheme } from "~/client/components/context/ThemeContext";

type Article = { slug: string; title: string; date?: string };

export default function BlogAside({ className = "" }: { className?: string }) {
  const articles: Article[] = [
    {
      slug: "wordskull-vs-wordle-fantasy-twist",
      title: "WordSkull vs Wordle: A Fantasy Twist on the Word Game Craze",
      date: "2025-08-17",
    },
    {
      slug: "wordskull-vs-nyt-spelling-bee",
      title: "WordSkull vs NYT Spelling Bee: Speed Runs vs Letter Hives",
      date: "2025-08-17",
    },
  ];

  const { darkThemeActive } = useTheme();
  const location = useLocation();

  // Extract the last part of the URL to match against slug
  const currentSlug = location.pathname.split("/").pop();

  // Shuffle and filter out current article
  const shuffledArticles = [...articles]
    .filter((p) => p.slug !== currentSlug)
    .sort(() => Math.random() - 0.5);

  const card =
    "rounded-xl px-4 py-4 mb-6 border " +
    (darkThemeActive
      ? "border-stone-700 bg-stone-900/40"
      : "border-stone-200 bg-white/70");

  const titleCls =
    "font-lora text-xl mb-3 " +
    (darkThemeActive ? "text-stone-200" : "text-skull-super-dark-brown");

  return (
    <aside
      className={`w-[260px] xl:w-[290px] shrink-0 ml-6 hidden lg:block ${className}`}
    >
      {/* Articles list */}
      <div className={card}>
        <h3 className={titleCls}>Articles</h3>
        <ul className="space-y-2 text-sm">
          {shuffledArticles.map((p) => (
            <li key={p.slug} className="leading-snug">
              <Link
                to={`/blog/${p.slug}`}
                className="text-pumpkin-orange hover:text-amber-600 font-lora"
              >
                {p.title}
              </Link>
              {p.date ? (
                <div className="text-xs opacity-70">
                  {new Date(p.date).toLocaleDateString()}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </div>

      {/* Quick game links */}
      <div className={card}>
        <h3 className={titleCls}>Quick Game Links</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <Link
              to="/games/classic/WordSkull Classic - Boneheads-easy-3-to-5-letter-words"
              className="text-pumpkin-orange hover:text-amber-600 font-lora"
            >
              WordSkull Classic - Boneheads (3–5)
            </Link>
          </li>
          <li>
            <Link
              to="/games/classic/specter-knights-medium-3-to-6-letter-words"
              className="text-pumpkin-orange hover:text-amber-600 font-lora"
            >
              WordSkull Classic - Specter (3–6)
            </Link>
          </li>
          <li>
            <Link
              to="/games/classic/grim-reapers-hard-3-to-7-letter-words"
              className="text-pumpkin-orange hover:text-amber-600 font-lora"
            >
              WordSkull Classic - Reapers (3–7)
            </Link>
          </li>
          <li>
            <Link
              to="/games/classic/royal-lichen-extreme-3-to-9-letter-words"
              className="text-pumpkin-orange hover:text-amber-600 font-lora"
            >
              WordSkull Classic - Royal Lichen (3–9)
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
