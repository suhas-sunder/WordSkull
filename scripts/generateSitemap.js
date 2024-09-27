import fs from "fs";
import path from "path";

// Function to get pages from the routes directory
const getPages = (dir) => {
  const pages = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fs.lstatSync(fullPath).isDirectory()) {
      pages.push(...getPages(fullPath));
    } else if (file.endsWith(".tsx") || file.endsWith(".mdx")) {
      // Replace backslashes with forward slashes
      let route = fullPath
        .replace(/^.*routes/, "")
        .replace(/\\/g, "/") // Replace backslashes with forward slashes
        .replace(".tsx", "")
        .replace(".mdx", "");

      if (route.endsWith("/index")) route = route.replace("/index", "");
      if (route === "/index") route = "/";

      pages.push(route);
    }
  });

  return pages;
};

// Function to read existing sitemap
const readExistingSitemap = (sitemapPath) => {
  if (!fs.existsSync(sitemapPath)) {
    return []; // Return empty array if sitemap does not exist
  }

  const xml = fs.readFileSync(sitemapPath, "utf-8");
  const urls = xml.match(/<loc>(.*?)<\/loc>/g) || [];
  return urls.map((url) => url.replace(/<\/?loc>/g, "").trim());
};

const createSitemap = (pages) => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap-image/1.1">\n`;

  pages.forEach((page) => {
    xml += `  <url>\n`;
    xml += `    <loc>${`https://www.wordskull.com${page}`}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
};

// Remove URLs that are no longer present
const removeDeletedRoutes = (existingPages, newPages) => {
  const newPagesSet = new Set(
    newPages.map((page) => `https://www.wordskull.com${page}`)
  );
  return existingPages.filter((url) => newPagesSet.has(url));
};

const pagesDir = path.join(process.cwd(), "app/routes");
const sitemapPath = path.join(process.cwd(), "public/sitemap.xml");

// Get new pages from the routes directory
const newPages = getPages(pagesDir);

// Read existing sitemap and get existing routes
const existingPages = readExistingSitemap(sitemapPath);

// Identify pages to remove and add
const pagesToRemove = existingPages.filter(
  (url) => !newPages.includes(url.replace(/^https:\/\/www\.wordskull\.com/, ""))
);
const pagesToAdd = newPages.filter(
  (url) => !existingPages.includes(`https://www.wordskull.com${url}`)
);

console.log("Pages added:", pagesToAdd);
console.log("Pages removed:", pagesToRemove);

// Create the new sitemap, filtering out deleted routes and adding new ones
const updatedPages = [
  ...new Set([...removeDeletedRoutes(existingPages, newPages), ...pagesToAdd]),
]; // Remove/update duplicates

const sitemapXml = createSitemap(updatedPages);

// Write the updated sitemap to an XML file
// This will overwrite the existing sitemap if it exists, or create a new one if it doesn't.
fs.writeFileSync(sitemapPath, sitemapXml, "utf-8");

console.log(`Sitemap has been updated successfully: ${sitemapPath}`);
