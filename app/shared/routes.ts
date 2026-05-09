import publicRoutes from "./public-routes.json";

export const SITE_ORIGIN = "https://www.wordskull.com";

export type PublicRoute = {
  path: string;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: number;
};

export const PUBLIC_ROUTES = publicRoutes as PublicRoute[];

export function normalizePublicPath(pathname: string) {
  if (!pathname || pathname === "/") return "/";

  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const withoutQuery = withLeadingSlash.split(/[?#]/)[0] || "/";
  const withoutTrailingSlash =
    withoutQuery.length > 1 ? withoutQuery.replace(/\/+$/, "") : withoutQuery;

  return withoutTrailingSlash || "/";
}

export function getCanonicalUrl(pathname: string) {
  const normalized = normalizePublicPath(pathname);
  return normalized === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${normalized}`;
}

export function getPrerenderPaths() {
  return PUBLIC_ROUTES.map((route) => normalizePublicPath(route.path));
}

export function isRegisteredPublicPath(pathname: string) {
  const normalized = normalizePublicPath(pathname);
  return PUBLIC_ROUTES.some((route) => route.path === normalized);
}
