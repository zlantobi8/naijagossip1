// app/sitemap.xml/route.js - WORKING VERSION
export const dynamic = 'force-dynamic';
export const revalidate = 60; // 1 minute

export async function GET() {
  try {
    const query = encodeURIComponent(`*[_type == "news"] | order(publishedAt desc)[0...500] {
      _id, title, publishedAt, _updatedAt, category
    }`);

    const url = `https://4smg0h02.api.sanity.io/v2023-01-01/data/query/trendzlib?query=${query}`;
    
    const res = await fetch(url, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }

    const data = await res.json();
    const posts = data.result || [];

    const baseUrl = "https://www.trendzlib.com.ng";
    
    // Static pages
    const staticPages = [
      { url: '/', priority: 1.0, changefreq: 'daily' },
      { url: '/about', priority: 0.7, changefreq: 'monthly' },
      { url: '/contact', priority: 0.6, changefreq: 'monthly' },
      { url: '/privacy-policy', priority: 0.5, changefreq: 'monthly' },
      { url: '/category/entertainment', priority: 0.9, changefreq: 'daily' },
      { url: '/category/sport', priority: 0.9, changefreq: 'daily' },
    ];

    // Generate post URLs
    const postUrls = posts.map(post => {
      const date = new Date(post.publishedAt);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const slug = post.title
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");

      return {
        url: `/${year}/${month}/${day}/${slug}`,
        lastmod: new Date(post._updatedAt || post.publishedAt).toISOString(),
        priority: 0.8,
        changefreq: 'weekly'
      };
    });

    const allUrls = [...staticPages, ...postUrls];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(item => `  <url>
    <loc>${baseUrl}${item.url}</loc>
    ${item.lastmod ? `<lastmod>${item.lastmod}</lastmod>` : `<lastmod>${new Date().toISOString()}</lastmod>`}
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Sitemap error:', error);
    
    // Return minimal sitemap on error
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.trendzlib.com.ng/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    return new Response(xml, {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' },
    });
  }
}