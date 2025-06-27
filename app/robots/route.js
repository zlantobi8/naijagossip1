export async function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nSitemap:https://dailycrust.vercel.app/sitemap.xml`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
}
