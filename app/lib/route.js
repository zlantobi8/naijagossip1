// app/lib/route.js - FIXED VERSION (Updated for correct category names)
export const getAllRoutes = async () => {
  // ✅ Use correct project ID and dataset
  const query = encodeURIComponent(`{
    "entertainmentPost": *[_type == "news" && category == "entertainment"] | order(publishedAt desc)[0...16] {
      _id, title, content, category, categoryClass, image, source, link, publishedAt, author
    },
    "sportsPost": *[_type == "news" && category == "sport"] | order(publishedAt desc)[0...16] {
      _id, title, content, category, categoryClass, image, source, link, publishedAt, author
    }
  }`);

  const url = `https://4smg0h02.api.sanity.io/v2023-01-01/data/query/trendzlib?query=${query}`;

  const res = await fetch(url, {
    headers: {
    },
    next: { revalidate: 21600 }, // 6 hours
  });

  if (!res.ok) {
    console.error(`Failed to fetch routes: ${res.status} ${res.statusText}`);
    // Return empty array instead of throwing to prevent build failure
    return getStaticRoutes();
  }

  const data = await res.json();
  const posts = data.result || [];

  const allRoutes = [];

  // Generate SEO slug
  const generateSlug = (text) =>
    String(text || "")
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

  // Dynamic posts
  posts.forEach((post) => {
    if (!post.title || !post.publishedAt) return;

    const date = new Date(post.publishedAt);
    if (isNaN(date.getTime())) return;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    allRoutes.push({
      slug: `/${year}/${month}/${day}/${generateSlug(post.title)}`,
      lastModified: new Date(post._updatedAt || post.publishedAt).toISOString(),
      changefreq: "daily",
      priority: 0.9,
    });
  });

  // Category pages - ONLY Entertainment + Sport
  const categoryPages = ["entertainment", "sport"].map((slug) => ({
    slug: `/category/${slug}`,
    lastModified: new Date().toISOString(),
    changefreq: "daily",
    priority: 0.8,
  }));

  // Static pages
  const staticPages = getStaticRoutes();

  return [...staticPages, ...allRoutes, ...categoryPages];
};

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