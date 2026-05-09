import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequestHandler } from "@remix-run/server-runtime";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, "..");
const buildClientDir = path.join(projectRoot, "build", "client");
const buildServerPath = path.join(projectRoot, "build", "server", "index.js");
const publicRoutesPath = path.join(
  projectRoot,
  "app",
  "shared",
  "public-routes.json"
);
const SITE_ORIGIN = "https://www.wordskull.com";

function normalizePublicPath(pathname) {
  if (!pathname || pathname === "/") return "/";

  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const withoutQuery = withLeadingSlash.split(/[?#]/)[0] || "/";
  const withoutTrailingSlash =
    withoutQuery.length > 1 ? withoutQuery.replace(/\/+$/, "") : withoutQuery;

  return withoutTrailingSlash || "/";
}

function outputPathForRoute(routePath) {
  if (routePath === "/") return path.join(buildClientDir, "index.html");
  return path.join(
    buildClientDir,
    ...routePath.split("/").filter(Boolean),
    "index.html"
  );
}

async function writeHtml(routePath, html) {
  const filePath = outputPathForRoute(routePath);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, html, "utf8");
  return filePath;
}

async function renderRoute(handler, routePath) {
  const request = new Request(`${SITE_ORIGIN}${routePath}`, {
    headers: {
      accept: "text/html",
      "user-agent": "Googlebot",
    },
  });
  const response = await handler(request);
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("text/html")) {
    throw new Error(
      `Expected HTML for ${routePath}, received ${contentType || "unknown"}`
    );
  }

  if (response.status >= 500) {
    throw new Error(`Failed to prerender ${routePath}: HTTP ${response.status}`);
  }

  return response.text();
}

const publicRoutes = JSON.parse(await fs.readFile(publicRoutesPath, "utf8"));
const routePaths = [
  ...new Set(publicRoutes.map((route) => normalizePublicPath(route.path))),
];

const build = await import(pathToFileURL(buildServerPath).href);
const handler = createRequestHandler(build, "production");

for (const routePath of routePaths) {
  const html = await renderRoute(handler, routePath);
  const filePath = await writeHtml(routePath, html);
  console.log(`Prerendered ${routePath} -> ${path.relative(projectRoot, filePath)}`);
}

const notFoundHtml = await renderRoute(handler, "/__wordskull_static_404");
const notFoundPath = path.join(buildClientDir, "404.html");
await fs.writeFile(notFoundPath, notFoundHtml, "utf8");
console.log(`Prerendered /404.html -> ${path.relative(projectRoot, notFoundPath)}`);
