export async function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nSitemap: https://naijagossip.vercel.app/sitemap`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
}
