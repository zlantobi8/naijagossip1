// app/lib/route.js - FIXED VERSION (Handles nested structure correctly)

// Helper function for static routes
function getStaticRoutes() {
  const now = new Date().toISOString();
  return [
    { slug: "/", lastModified: now, changefreq: "daily", priority: 1.0 },
    { slug: "/about", lastModified: now, changefreq: "monthly", priority: 0.7 },
    { slug: "/contact", lastModified: now, changefreq: "monthly", priority: 0.6 },
    { slug: "/privacy-policy", lastModified: now, changefreq: "monthly", priority: 0.5 },
  ];
}

// Generate SEO slug
const generateSlug = (text) => {
  if (!text) return "";
  return String(text)
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const getAllRoutes = async () => {
  // Start with static routes as fallback
  const staticPages = getStaticRoutes();
  
  try {
    // ✅ Fetch ALL posts (not just 16 from each category) for sitemap
    const query = encodeURIComponent(`*[_type == "news"] | order(publishedAt desc) {
      _id, title, publishedAt, _updatedAt, category
    }`);

    const url = `https://4smg0h02.api.sanity.io/v2023-01-01/data/query/trendzlib?query=${query}`;

    const res = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      console.error(`❌ Failed to fetch routes: ${res.status} ${res.statusText}`);
      return staticPages;
    }

    const data = await res.json();
    
    // ✅ The result should be an array of posts
    const posts = data.result || [];

    if (!Array.isArray(posts)) {
      console.error('❌ Expected array but got:', typeof posts);
      return staticPages;
    }

    console.log(`✅ Fetched ${posts.length} posts for sitemap`);

    // ✅ Generate dynamic post routes
    const dynamicRoutes = [];

    posts.forEach((post) => {
      if (!post.title || !post.publishedAt) return;

      const date = new Date(post.publishedAt);
      if (isNaN(date.getTime())) return;

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const slug = generateSlug(post.title);

      if (!slug) return;

      dynamicRoutes.push({
        slug: `/${year}/${month}/${day}/${slug}`,
        lastModified: new Date(post._updatedAt || post.publishedAt).toISOString(),
        changefreq: "daily",
        priority: 0.9,
      });
    });

    console.log(`✅ Generated ${dynamicRoutes.length} dynamic routes`);

    // ✅ Category pages - ONLY Entertainment + Sport
    const categoryPages = [
      {
        slug: "/category/entertainment",
        lastModified: new Date().toISOString(),
        changefreq: "daily",
        priority: 0.8,
      },
      {
        slug: "/category/sport",
        lastModified: new Date().toISOString(),
        changefreq: "daily",
        priority: 0.8,
      }
    ];

    const allRoutes = [...staticPages, ...dynamicRoutes, ...categoryPages];
    console.log(`✅ Total sitemap URLs: ${allRoutes.length}`);

    return allRoutes;

  } catch (error) {
    console.error('❌ Error in getAllRoutes:', error.message);
    return staticPages;
  }
};