// app/robots.txt/route.js
export async function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nSitemap: https://naijagossip.vercel.app/sitemaps.xml`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
}
