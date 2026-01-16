import { getVideos } from './../lib/eporner';

export async function GET() {
  const baseUrl = 'https://trendzlib.com';
  
  // Static pages
  const staticPages = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/privacy', changefreq: 'monthly', priority: '0.5' },
    { url: '/terms', changefreq: 'monthly', priority: '0.5' },
    { url: '/dmca', changefreq: 'monthly', priority: '0.5' },
  ];

  // Category pages
  const categories = [
    { url: '/?order=latest', changefreq: 'hourly', priority: '0.9' },
    { url: '/?order=top-today', changefreq: 'daily', priority: '0.8' },
    { url: '/?order=popular', changefreq: 'daily', priority: '0.8' },
    { url: '/?order=top-weekly', changefreq: 'weekly', priority: '0.7' },
  ];

  // Fetch recent videos for dynamic URLs
  let videoUrls = [];
  try {
    const data = await getVideos({ order: 'latest', per_page: 100 });
    videoUrls = data.videos.map(video => ({
      url: `/video/${video.id}`,
      changefreq: 'weekly',
      priority: '0.6',
      lastmod: new Date().toISOString().split('T')[0]
    }));
  } catch (error) {
    console.error('Error fetching videos for sitemap:', error);
  }

  // Combine all URLs
  const allUrls = [...staticPages, ...categories, ...videoUrls];

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allUrls.map(({ url, changefreq, priority, lastmod }) => `  <url>
    <loc>${baseUrl}${url}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : `<lastmod>${new Date().toISOString().split('T')[0]}</lastmod>`}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour