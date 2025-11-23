// app/robots.txt/route.js - FIXED
export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /
Allow: /category/entertainment
Allow: /category/sport

# Block old/unused categories
Disallow: /api/
Disallow: /category/politics
Disallow: /category/education
Disallow: /category/metro
Disallow: /category/celebrity
Disallow: /category/general

# Crawl delay
Crawl-delay: 1

Sitemap: https://www.trendzlib.com.ng/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  });
}

export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate daily