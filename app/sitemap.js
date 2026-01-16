import { getVideos } from "./lib/eporner";

const STATIC_PAGES = ["privacy", "terms", "dmca"];
const CATEGORIES = ["top-weekly", "top-today", "latest", "popular"];
const PER_PAGE = 100;
const MAX_PAGES = 5;

export default async function sitemap() {
  const urls = [];
  const baseUrl = "https://trendzlib.com";

  // Add homepage
  urls.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  });

  // Add static pages
  STATIC_PAGES.forEach((page) => {
    urls.push({
      url: `${baseUrl}/${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  });

  // Add category pages
  CATEGORIES.forEach((cat) => {
    urls.push({
      url: `${baseUrl}/?order=${cat}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    });
  });

  // Fetch videos dynamically (paginated)
  for (let page = 1; page <= MAX_PAGES; page++) {
    try {
      const data = await getVideos({ per_page: PER_PAGE, page });
      const videos = data.videos || [];
      if (videos.length === 0) break;

      videos.forEach((v) => {
        urls.push({
          url: `${baseUrl}/video/${v.id}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.6,
        });
      });
    } catch (err) {
      console.warn(`Failed to fetch videos for sitemap page ${page}:`, err);
      break;
    }
  }

  return urls;
}

// Optional: Set revalidation time
export const revalidate = 3600; // Revalidate every hour