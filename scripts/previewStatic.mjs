import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, "..");
const publicDir = path.join(projectRoot, "build", "client");

const args = process.argv.slice(2);
const portArgIndex = args.indexOf("--port");
const hostArgIndex = args.indexOf("--host");
const port =
  portArgIndex >= 0 && args[portArgIndex + 1]
    ? Number(args[portArgIndex + 1])
    : 4173;
const host =
  hostArgIndex >= 0 && args[hostArgIndex + 1]
    ? args[hostArgIndex + 1]
    : "0.0.0.0";

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
  [".woff2", "font/woff2"],
  [".xml", "application/xml; charset=utf-8"],
]);

function getContentType(filePath) {
  return contentTypes.get(path.extname(filePath)) ?? "application/octet-stream";
}

function toSafeFilePath(urlPathname) {
  const decoded = decodeURIComponent(urlPathname);
  const normalizedPath = decoded === "/" ? "/index.html" : decoded;
  const candidate = path.normalize(path.join(publicDir, normalizedPath));

  if (!candidate.startsWith(publicDir)) {
    return path.join(publicDir, "404.html");
  }

  return candidate;
}

async function findFile(urlPathname) {
  const direct = toSafeFilePath(urlPathname);
  const stat = await fs.stat(direct).catch(() => null);

  if (stat?.isFile()) return { filePath: direct, status: 200 };
  if (stat?.isDirectory()) {
    const directoryIndex = path.join(direct, "index.html");
    const indexStat = await fs.stat(directoryIndex).catch(() => null);
    if (indexStat?.isFile()) return { filePath: directoryIndex, status: 200 };
  }

  if (!path.extname(direct)) {
    const nestedIndex = path.join(direct, "index.html");
    const nestedStat = await fs.stat(nestedIndex).catch(() => null);
    if (nestedStat?.isFile()) return { filePath: nestedIndex, status: 200 };
  }

  return { filePath: path.join(publicDir, "404.html"), status: 404 };
}

const server = http.createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url ?? "/", `http://${req.headers.host}`);
    const { filePath, status } = await findFile(requestUrl.pathname);
    const body = await fs.readFile(filePath);

    res.writeHead(status, {
      "Content-Type": getContentType(filePath),
      "Cache-Control": filePath.includes(`${path.sep}assets${path.sep}`)
        ? "public, max-age=31536000, immutable"
        : "no-cache",
    });
    res.end(body);
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(error instanceof Error ? error.message : "Internal server error");
  }
});

server.listen(port, host, () => {
  console.log(`Static preview serving ${publicDir}`);
  console.log(`Local: http://127.0.0.1:${port}/`);
});
