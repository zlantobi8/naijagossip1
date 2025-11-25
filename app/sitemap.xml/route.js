// app/sitemap.xml/route.js - FIXED VERSION WITH BETTER CACHING

export const dynamic = 'force-dynamic'; // Always generate fresh
export const revalidate = 0; // Disable caching for immediate updates

export async function GET() {
  try {
    // Fetch ALL posts without limit, sorted by most recent
    const query = encodeURIComponent(`*[_type == "news"] | order(publishedAt desc) {
      _id, title, publishedAt, _updatedAt, category
    }`);

    const url = `https://4smg0h02.api.sanity.io/v2023-01-01/data/query/trendzlib?query=${query}`;
    
    // Add cache-busting timestamp to force fresh data
    const timestamp = Date.now();
    const fetchUrl = `${url}&t=${timestamp}`;
    
    const res = await fetch(fetchUrl, {
      cache: 'no-store', // Don't cache the fetch
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    });

    if (!res.ok) {
      console.error(`Sitemap fetch failed: ${res.status}`);
      throw new Error('Failed to fetch posts');
    }

    const data = await res.json();
    const posts = data.result || [];

    console.log(`✅ Sitemap: Fetched ${posts.length} posts`);

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

    // Generate slug helper
    const generateSlug = (title) => {
      return title
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
    };

    // Generate post URLs
    const postUrls = posts
      .filter(post => post.title && post.publishedAt) // Only valid posts
      .map(post => {
        const date = new Date(post.publishedAt);
        
        // Skip invalid dates
        if (isNaN(date.getTime())) {
          console.warn(`Invalid date for post: ${post.title}`);
          return null;
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const slug = generateSlug(post.title);

        if (!slug) {
          console.warn(`Empty slug for post: ${post.title}`);
          return null;
        }

        return {
          url: `/${year}/${month}/${day}/${slug}`,
          lastmod: new Date(post._updatedAt || post.publishedAt).toISOString(),
          priority: 0.8,
          changefreq: 'weekly'
        };
      })
      .filter(Boolean); // Remove null entries

    const allUrls = [...staticPages, ...postUrls];

    console.log(`✅ Sitemap: Generated ${allUrls.length} total URLs`);

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
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('❌ Sitemap generation error:', error);
    
    // Return minimal sitemap on error
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.trendzlib.com.ng/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    return new Response(xml, {
      headers: { 
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'no-store'
      },
    });
  }
}