// ===========================================
// FILE 1: app/sitemap.xml/route.js
// Main sitemap for static pages and categories
// ===========================================
export async function GET(request) {
  // Get the actual host from the request
  const host = request.headers.get('host') || 'trendzlib.com.ng';
  const protocol = request.headers.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;
  
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Static pages
  const staticPages = [
    { url: '', changefreq: 'daily', priority: '1.0' },
    { url: '/privacy', changefreq: 'monthly', priority: '0.3' },
    { url: '/terms', changefreq: 'monthly', priority: '0.3' },
    { url: '/dmca', changefreq: 'monthly', priority: '0.3' },
  ];

  // Category pages
  const categories = [
    { url: '/category/latest', changefreq: 'hourly', priority: '0.9' },
    { url: '/category/top-today', changefreq: 'daily', priority: '0.8' },
    { url: '/category/popular', changefreq: 'daily', priority: '0.8' },
    { url: '/category/top-weekly', changefreq: 'weekly', priority: '0.7' },
  ];

  const allUrls = [...staticPages, ...categories];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(({ url, changefreq, priority }) => `  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${currentDate}</lastmod>
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