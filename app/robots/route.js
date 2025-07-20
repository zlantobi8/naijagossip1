export async function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nSitemap:https://trendzlib.com.ng/sitemap.xml`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
}
