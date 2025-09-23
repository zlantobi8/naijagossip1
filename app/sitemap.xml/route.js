// app/sitemap/route.js
import { getAllRoutes } from "../lib/route";

export async function GET() {
  const routes = await getAllRoutes();
  const baseUrl = "https://trendzlib.com.ng";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
                      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

${routes
  .map(
    ({ slug, lastModified, changefreq, priority }) => `  <url>
    <loc>${baseUrl}${slug}</loc>
    <lastmod>${new Date(lastModified).toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=21600, stale-while-revalidate", // 6h cache
    },
  });
}
