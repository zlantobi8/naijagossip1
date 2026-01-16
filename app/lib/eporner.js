const BASE = "https://www.eporner.com/api/v2/video/search/";

export async function getVideos(params = {}) {
  const page = params.page || 1; // default to page 1
  const query = new URLSearchParams({
    per_page: "24",
    thumbsize: "big",
    format: "json",
    page,
    ...params,
  });

  const res = await fetch(`${BASE}?${query}`, {
    next: { revalidate: 3600 }, // cache for SEO & speed
  });

  return res.json();
}

export async function getVideoById(id) {
  const res = await fetch(
    `https://www.eporner.com/api/v2/video/id/?id=${id}&format=json`,
    { next: { revalidate: 86400 } }
  );
  return res.json();
}
