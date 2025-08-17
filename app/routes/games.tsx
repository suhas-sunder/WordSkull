import { Outlet, useLocation } from "@remix-run/react";
import SocialLinks from "../client/components/navigation/SocialLinks";

export default function Games() {
  const { pathname } = useLocation();
  const isJustGames = pathname === "/games";

  return (
    <div>
      {isJustGames ? (
        <>
          <header>
            <h1 className="flex bg-black min-h-20">games</h1>
          </header>
          <main>
            <SocialLinks />
          </main>
        </>
      ) : null}
      <Outlet />
    </div>
  );
}
