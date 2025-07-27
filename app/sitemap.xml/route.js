// app/sitemap/route.js
import { getAllRoutes } from '../lib/route';

export async function GET() {
  const routes = await getAllRoutes();
  console.log("SITEMAP ROUTES:", routes); // ✅ ADD THIS LINE

  const baseUrl = 'https://trendzlib.com.ng';

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    ({ slug, lastModified }) => `
  <url>
    <loc>${baseUrl}${slug}</loc>
    <lastmod>${new Date(lastModified).toISOString()}</lastmod>
  </url>`
  )
  .join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
