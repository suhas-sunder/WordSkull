import { NavLink, Outlet, useMatches } from "@remix-run/react";

export default function ClassicLayout() {
  const matches = useMatches();
  const isIndex = matches.some((m) => m.id.endsWith("games.classic._index")); // index is active only at /games/classic

  return (
    <div className="min-h-screen">
      {isIndex ? (
        <>
          <header className="border-b">
            <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Classic Games</h1>
              <nav className="flex gap-4 text-sm">
                <NavLink to="/games" className="hover:underline">
                  All Games
                </NavLink>
                <NavLink to="/games/classic" className="hover:underline">
                  Classic Home
                </NavLink>
              </nav>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-4 py-6 grid gap-6 md:grid-cols-[260px_1fr]">
            <aside className="space-y-4">
              <h2 className="text-lg font-semibold">Menu</h2>
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to="word-scramble"
                    className={({ isActive }) =>
                      `block rounded px-3 py-2 ${
                        isActive ? "bg-black text-white" : "hover:bg-gray-100"
                      }`
                    }
                  >
                    Word Scramble
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="letter-rush"
                    className={({ isActive }) =>
                      `block rounded px-3 py-2 ${
                        isActive ? "bg-black text-white" : "hover:bg-gray-100"
                      }`
                    }
                  >
                    Letter Rush
                  </NavLink>
                </li>
              </ul>
            </aside>

            <main>
              <Outlet />
            </main>
          </div>
        </>
      ) : (
        // When not index, let the child take the whole page
        <Outlet />
      )}
    </div>
  );
}
