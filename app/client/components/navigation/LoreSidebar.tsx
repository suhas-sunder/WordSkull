import { Link, useLocation } from "react-router-dom";
import { useTheme } from "~/client/components/context/ThemeContext";

type Entry = { slug: string; title: string; date?: string; arc?: string };

export default function LoreSidebar({
  className = "",
}: {
  className?: string;
}) {
  // Only the existing chapter right now
  const entries: Entry[] = [
    {
      slug: "wordskull-chapter-1-the-wizards-rise-who-was-atriocsoul",
      title: "Chapter 1: The Wizard’s Rise",
      date: "2025-08-20",
      arc: "Origins",
    },
  ];

  const { darkThemeActive } = useTheme();
  const location = useLocation();

  // Extract the last part of the URL to match against slug
  const currentSlug = location.pathname.split("/").pop();

  // Filter out current entry (so we don't link to the page you're on)
  const otherChapters = entries.filter((p) => p.slug !== currentSlug);

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
      {/* Chapters list */}
      <div className={card}>
        <h3 className={titleCls}>Chapters</h3>

        {otherChapters.length > 0 ? (
          <ul className="space-y-2 text-sm">
            {otherChapters.map((p) => (
              <li key={p.slug} className="leading-snug">
                <Link
                  to={`/lore/${p.slug}`}
                  className="text-pumpkin-orange hover:text-amber-600 font-lora"
                >
                  {p.title}
                </Link>
                <div className="text-xs opacity-70">
                  {p.date ? new Date(p.date).toLocaleDateString() : null}
                  {p.arc ? (
                    <span className="ml-2 rounded-full bg-stone-100 px-2 py-0.5 text-[10px] uppercase tracking-wide">
                      {p.arc}
                    </span>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-stone-600">More chapters coming soon.</p>
        )}
      </div>

      {/* Quick game links (unchanged) */}
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
