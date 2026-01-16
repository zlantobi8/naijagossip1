import { getVideos } from "../lib/eporner";

const STATIC_PAGES = ["privacy", "terms", "dmca"];
const CATEGORIES = ["top-weekly", "top-today", "latest", "popular"];
const PER_PAGE = 100; // fetch 100 videos per page, adjust if needed
const MAX_PAGES = 5;   // to limit total videos (optional, avoid API overload)

export async function GET() {
  const urls = [];

  // Add homepage
  urls.push(`<url><loc>https://trendzlib.com/</loc></url>`);

  // Add static pages
  STATIC_PAGES.forEach((page) => {
    urls.push(`<url><loc>https://trendzlib.com/${page}</loc></url>`);
  });

  // Add category pages
  CATEGORIES.forEach((cat) => {
    urls.push(`<url><loc>https://trendzlib.com/?order=${cat}</loc></url>`);
  });

  // Fetch videos dynamically (paginated)
  for (let page = 1; page <= MAX_PAGES; page++) {
    try {
      const data = await getVideos({ per_page: PER_PAGE, page });
      const videos = data.videos || [];
      if (videos.length === 0) break; // no more videos

      videos.forEach((v) => {
        urls.push(`<url><loc>https://trendzlib.com/video/${v.id}</loc></url>`);
      });
    } catch (err) {
      console.warn(`Failed to fetch videos for sitemap page ${page}:`, err);
      break;
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join("\n  ")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
