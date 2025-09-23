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
      // Always return fresh sitemap
      cache: "no-store",
    }
  );

  const data = await res.json();
  const result = data.result || {};

  const allRoutes = [];

  // Map Sanity doc type -> category path
  const mapCategoryToPath = {
    sportsPost: "sports",
    educationPost: "education",
    politicsPost: "politics",
    technologyPost: "technology",
    healthPost: "health",
    celebrityPost: "celebrity",
  };

  // Clean slug generator
  const generateSlug = (text) =>
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // spaces -> dash
      .replace(/-+/g, "-") // multiple dashes -> one
      .replace(/^-+|-+$/g, ""); // trim dashes

  // Loop through posts in each category
  for (const category in result) {
    const posts = result[category];
    const categoryPath = mapCategoryToPath[category];

    posts.forEach((post) => {
      const slug = generateSlug(post.title);

      allRoutes.push({
        // ✅ FIX: match your actual site structure
        slug: `/category/${categoryPath}/${slug}`,
        lastModified: new Date(post._updatedAt || post.date).toISOString(),
        changefreq: "daily",
        priority: 0.9,
      });
    });
  }

  // Static pages
  const staticPages = [
    {
      slug: "/",
      lastModified: new Date().toISOString(),
      changefreq: "daily",
      priority: 1.0,
    },
    {
      slug: "/about",
      lastModified: new Date().toISOString(),
      changefreq: "monthly",
      priority: 0.7,
    },
    {
      slug: "/contact",
      lastModified: new Date().toISOString(),
      changefreq: "monthly",
      priority: 0.6,
    },
    {
      slug: "/privacy-policy",
      lastModified: new Date().toISOString(),
      changefreq: "monthly",
      priority: 0.5,
    },
  ];

  return [...staticPages, ...allRoutes];
};
