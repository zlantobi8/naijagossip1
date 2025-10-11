// app/robots.txt/route.js
export async function GET() {
  return new Response(
    `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://trendzlib.com.ng/sitemap.xml`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
}