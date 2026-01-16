export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Crawl delay
Crawl-delay: 1

Sitemap: https://trendzlib.com/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}

export const dynamic = 'force-static';
export const revalidate = 86400;