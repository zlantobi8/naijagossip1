// app/robots.txt/route.js
export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /category/politics
Disallow: /category/education
Disallow: /category/metro
Disallow: /category/celebrity
Disallow: /category/general

Sitemap: https://www.trendzlib.com.ng/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

export const dynamic = 'force-static';