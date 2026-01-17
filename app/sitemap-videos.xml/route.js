// ===========================================
// FILE 2: app/sitemap-videos.xml/route.js
// Dedicated sitemap for video pages
// ===========================================
import { getVideos } from '../lib/eporner';

export async function GET(request) {
  // Get the actual host from the request
  const host = request.headers.get('host') || 'trendzlib.com.ng';
  const protocol = request.headers.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;
  
  const currentDate = new Date().toISOString().split('T')[0];
  
  let videoUrls = [];
  
  try {
    // Fetch multiple pages for better coverage
    const pages = [1, 2, 3, 4, 5]; // 120 videos total
    const videoPromises = pages.map(page =>
      getVideos({ order: 'latest', per_page: 24, page })
        .catch(err => {
          console.error(`Error fetching page ${page}:`, err);
          return { videos: [] };
        })
    );

    const results = await Promise.all(videoPromises);
    const allVideos = results.flatMap(data => data.videos || []);
    
    videoUrls = allVideos.map(video => ({
      url: `/video/${video.id}`,
      changefreq: 'weekly',
      priority: '0.6',
      lastmod: currentDate
    }));

    console.log(`Video sitemap: ${videoUrls.length} URLs`);
  } catch (error) {
    console.error('Error generating video sitemap:', error);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${videoUrls.map(({ url, changefreq, priority, lastmod }) => `  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

export const dynamic = 'force-dynamic';
export const revalidate = 3600;