// lib/route.js
export const getAllRoutes = async () => {
  const query = encodeURIComponent(`{
    "sportsPost": *[_type == "sportsPost"]{title, date, _updatedAt},
    "educationPost": *[_type == "educationPost"]{title, date, _updatedAt},
    "politicsPost": *[_type == "politicsPost"]{title, date, _updatedAt},
    "technologyPost": *[_type == "technologyPost"]{title, date, _updatedAt},
    "healthPost": *[_type == "healthPost"]{title, date, _updatedAt},
    "celebrityPost": *[_type == "celebrityPost"]{title, date, _updatedAt}
  }`);

  const res = await fetch(
    `https://oja7rnse.api.sanity.io/v2023-01-01/data/query/production1?query=${query}`,
    {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_AUTH || "",
      },
      next: { revalidate: 21600 }, // refresh sitemap every 6h
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch routes: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  const result = data.result || {};

  const allRoutes = [];

  // Generate SEO slug
  const generateSlug = (text) =>
    String(text || "")
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

  // Dynamic posts
  for (const category in result) {
    const posts = result[category] || [];

    posts.forEach((post) => {
      if (!post.title || !post.date) return; // Skip invalid posts

      const date = new Date(post.date);
      if (isNaN(date.getTime())) return; // Skip invalid dates

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      allRoutes.push({
        slug: `/${year}/${month}/${day}/${generateSlug(post.title)}`,
        lastModified: new Date(post._updatedAt || post.date).toISOString(),
        changefreq: "daily",
        priority: 0.9,
      });
    });
  }
    const categoryPages = [
    'sport', 'education', 'politics', 'metro', 'entertainment', 'celebrity', 'general'
  ].map(slug => ({
    slug: `/category/${slug}`,
    lastModified: new Date().toISOString(),
    changefreq: 'daily',
    priority: 0.8
  }));

  // Static pages
  const now = new Date().toISOString();
  const staticPages = [
    { slug: "/", lastModified: now, changefreq: "daily", priority: 1.0 },
    { slug: "/about", lastModified: now, changefreq: "monthly", priority: 0.7 },
    { slug: "/contact", lastModified: now, changefreq: "monthly", priority: 0.6 },
    { slug: "/privacy-policy", lastModified: now, changefreq: "monthly", priority: 0.5 },
  ];

  return [...staticPages, ...allRoutes, ...categoryPages];
};