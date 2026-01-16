import { getVideos } from "../lib/eporner";

export default async function sitemap() {
  const data = await getVideos({ order: "top-weekly" });

  const videos = data.videos.map(v => ({
    url: `https://trendzlib.com/video/${v.id}`,
    lastModified: new Date(),
  }));

  return [
    { url: "https://trendzlib.com", lastModified: new Date() },
    ...videos,
  ];
}
