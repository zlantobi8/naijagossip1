import { getVideos } from "./lib/eporner";

const STATIC_PAGES = ["privacy", "terms", "dmca"];
const CATEGORIES = ["top-weekly", "top-today", "latest", "popular"];
const PER_PAGE = 100;
const MAX_PAGES = 5;

export async function GET() {
  const urls = [];
  const baseUrl = "https://trendzlib.com";

  // Add homepage
  urls.push(`  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`);

  // Add static pages
  STATIC_PAGES.forEach((page) => {
    urls.push(`  <url>
    <loc>${baseUrl}/${page}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`);
  });

  // Add category pages
  CATEGORIES.forEach((cat) => {
    urls.push(`  <url>
    <loc>${baseUrl}/?order=${cat}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`);
  });

  // Fetch videos dynamically (paginated)
  for (let page = 1; page <= MAX_PAGES; page++) {
    try {
      const data = await getVideos({ per_page: PER_PAGE, page });
      const videos = data.videos || [];
      if (videos.length === 0) break;

      videos.forEach((v) => {
        urls.push(`  <url>
    <loc>${baseUrl}/video/${v.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`);
      });
    } catch (err) {
      console.warn(`Failed to fetch videos for sitemap page ${page}:`, err);
      break;
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

export const dynamic = 'force-dynamic';