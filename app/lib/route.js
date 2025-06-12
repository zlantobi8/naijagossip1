export const getAllRoutes = async () => {
    const query = encodeURIComponent(`{
      "sportsPost": *[_type == "sportsPost"]{title, _updatedAt},
      "educationPost": *[_type == "educationPost"]{title, _updatedAt},
      "politicsPost": *[_type == "politicsPost"]{title, _updatedAt},
      "technologyPost": *[_type == "technologyPost"]{title, _updatedAt},
      "healthPost": *[_type == "healthPost"]{title, _updatedAt},
      "celebrityPost": *[_type == "celebrityPost"]{title, _updatedAt}
    }`);

    const res = await fetch(
        `https://oja7rnse.api.sanity.io/v2023-01-01/data/query/production1?query=${query}`,
        {
            headers: {
                Authorization: process.env.NEXT_PUBLIC_API_AUTH || '',
            },
            next: { revalidate: 60 },
        }
    );

    const data = await res.json();
    const result = data.result || {};

    const allRoutes = [];

    const mapCategoryToPath = {
        sportsPost: 'sports',
        educationPost: 'education',
        politicsPost: 'politics',
        technologyPost: 'technology',
        healthPost: 'health',
        celebrityPost: 'celebrity',
    };

    const generateSlug = (text) =>
        text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')       // remove punctuation
            .replace(/\s+/g, '-')           // replace spaces with dash
            .replace(/-+/g, '-')            // collapse multiple dashes
            .replace(/^-+|-+$/g, '');       // trim dashes from ends

    for (const category in result) {
        const posts = result[category];
        const path = mapCategoryToPath[category];

        posts.forEach((post) => {
            allRoutes.push({
                slug: `/${path}/${encodeURIComponent(generateSlug(post.title))}`,
                lastModified: post._updatedAt,
            });
        });
    }

    const staticPages = [
        { slug: '/', lastModified: new Date().toISOString() },
        { slug: '/about', lastModified: new Date().toISOString() },
        { slug: '/contact', lastModified: new Date().toISOString() },
        { slug: '/privacy-policy', lastModified: new Date().toISOString() },

    ];

    return [...staticPages, ...allRoutes];
};
