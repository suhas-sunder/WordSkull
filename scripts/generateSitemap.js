import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, "..");
const publicRoutesPath = path.join(
  projectRoot,
  "app",
  "shared",
  "public-routes.json"
);
const publicDir = path.join(projectRoot, "public");
const sitemapPath = path.join(publicDir, "sitemap.xml");
const SITE_ORIGIN = "https://www.wordskull.com";

function normalizePublicPath(pathname) {
  if (!pathname || pathname === "/") return "/";

  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const withoutQuery = withLeadingSlash.split(/[?#]/)[0] || "/";
  const withoutTrailingSlash =
    withoutQuery.length > 1 ? withoutQuery.replace(/\/+$/, "") : withoutQuery;

  return withoutTrailingSlash || "/";
}

function canonicalUrl(pathname) {
  const normalized = normalizePublicPath(pathname);
  return normalized === "/" ? SITE_ORIGIN : `${SITE_ORIGIN}${normalized}`;
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const routes = JSON.parse(fs.readFileSync(publicRoutesPath, "utf8"));
const seen = new Set();
const normalizedRoutes = routes
  .map((route) => ({
    ...route,
    path: normalizePublicPath(route.path),
  }))
  .filter((route) => {
    if (seen.has(route.path)) return false;
    seen.add(route.path);
    return true;
  });

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

for (const route of normalizedRoutes) {
  xml += "  <url>\n";
  xml += `    <loc>${escapeXml(canonicalUrl(route.path))}</loc>\n`;
  if (route.changefreq) {
    xml += `    <changefreq>${escapeXml(route.changefreq)}</changefreq>\n`;
  }
  if (typeof route.priority === "number") {
    xml += `    <priority>${route.priority.toFixed(1)}</priority>\n`;
  }
  xml += "  </url>\n";
}

xml += "</urlset>\n";

fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(sitemapPath, xml, "utf8");
console.log(`Sitemap created from route registry: ${sitemapPath}`);
