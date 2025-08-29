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
      next: { revalidate: 60 },
    }
  );

  const data = await res.json();
  const result = data.result || {};

  const allRoutes = [];

  const mapCategoryToPath = {
    sportsPost: "sports",
    educationPost: "education",
    politicsPost: "politics",
    technologyPost: "technology",
    healthPost: "health",
    celebrityPost: "celebrity",
  };

  const generateSlug = (text) =>
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

  for (const category in result) {
    const posts = result[category];
    const path = mapCategoryToPath[category];

    posts.forEach((post) => {
      const date = new Date(post.date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      allRoutes.push({
        slug: `/${year}/${month}/${day}/${encodeURIComponent(
          generateSlug(post.title)
        )}`,
        lastModified: new Date(post._updatedAt || post.date).toISOString(),
        changefreq: "daily",
        priority: 0.9,
      });
    });
  }

  const staticPages = [
    { slug: "/", lastModified: new Date().toISOString(), changefreq: "daily", priority: 1.0 },
    { slug: "/about", lastModified: new Date().toISOString(), changefreq: "monthly", priority: 0.7 },
    { slug: "/contact", lastModified: new Date().toISOString(), changefreq: "monthly", priority: 0.6 },
    { slug: "/privacy-policy", lastModified: new Date().toISOString(), changefreq: "monthly", priority: 0.5 },
  ];

  return [...staticPages, ...allRoutes];
};
