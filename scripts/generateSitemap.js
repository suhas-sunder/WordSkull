// scripts/generateSitemap.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Config -----------------------------------------------------------------
const SITE = "https://www.wordskull.com"; // no trailing slash
const projectRoot = path.join(__dirname, "..");
const routesDir = path.join(projectRoot, "app", "routes");
const publicDir = path.join(projectRoot, "public");

// ensure public dir exists
fs.mkdirSync(publicDir, { recursive: true });

// --- Helpers ----------------------------------------------------------------
function toRouteFromRel(relNoExt) {
  let r = relNoExt.replace(/\\/g, "/"); // windows -> posix

  // strip misc. prefix for flat routes
  r = r.replace(/^misc\./i, "");

  // flat-route: dots become path separators
  r = r.replace(/\./g, "/");

  // remove trailing '/index'
  r = r.replace(/\/index$/i, "");

  // collapse duplicate slashes
  r = r.replace(/\/{2,}/g, "/");

  // ensure leading slash
  if (!r.startsWith("/")) r = "/" + r;

  // trim trailing slash (not root)
  if (r.length > 1) r = r.replace(/\/+$/, "");

  // trim trailing dots/spaces
  r = r.replace(/[.\s]+$/, "");

  return r || "/";
}

function isPublicRoute(route) {
  // Exclude /misc folder routes (folder-based only, not flat-route prefix)
  if (route === "/misc" || route.startsWith("/misc/")) return false;

  const segs = route.split("/").filter(Boolean);
  for (const seg of segs) {
    if (seg.startsWith("_")) return false; // private files (_index, etc.)
    if (seg.startsWith("$")) return false; // dynamic params
  }
  return true;
}

function collectRoutes(dir, relBase = "") {
  const entries = [];
  const items = fs.readdirSync(dir);

  for (const name of items) {
    const full = path.join(dir, name);
    const stat = fs.lstatSync(full);

    // skip mdx folder
    if (stat.isDirectory()) {
      if (name.toLowerCase() === "mdx") continue;
      if (name.toLowerCase() === "misc") continue; // skip misc folder
      const childRelBase = path.join(relBase, name);
      entries.push(...collectRoutes(full, childRelBase));
      continue;
    }

    // Only include .tsx or .mdx files
    if (!/\.(tsx|mdx)$/i.test(name)) continue;

    const relPathNoExt = path.join(relBase, name.replace(/\.(tsx|mdx)$/i, ""));

    // Convert to normalized route
    const route = toRouteFromRel(relPathNoExt);

    if (!isPublicRoute(route)) continue;

    entries.push({ route, mtime: stat.mtime });
  }

  return entries;
}

// --- Build list --------------------------------------------------------------
if (!fs.existsSync(routesDir)) {
  console.error(`Routes dir not found: ${routesDir}`);
  process.exit(1);
}

const rawEntries = collectRoutes(routesDir);

// Deduplicate by route, keep latest mtime
const byRoute = new Map();
for (const e of rawEntries) {
  const prev = byRoute.get(e.route);
  if (!prev || e.mtime > prev.mtime) byRoute.set(e.route, e);
}
let pages = Array.from(byRoute.values()).sort((a, b) =>
  a.route.localeCompare(b.route)
);

// Ensure homepage is present
if (!pages.find((p) => p.route === "/")) {
  pages.unshift({ route: "/", mtime: new Date() });
}

// --- Create XML --------------------------------------------------------------
function createSitemap(pages) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const { route, mtime } of pages) {
    const loc = route === "/" ? SITE : `${SITE}${route}`;
    const lastmod = new Date(mtime).toISOString();
    xml += "  <url>\n";
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += "  </url>\n";
  }

  xml += "</urlset>";
  return xml;
}

const xml = createSitemap(pages);

// --- Write file --------------------------------------------------------------
const sitemapPath = path.join(publicDir, "sitemap.xml");
fs.writeFileSync(sitemapPath, xml, "utf-8");
console.log(`Sitemap created: ${sitemapPath}`);
