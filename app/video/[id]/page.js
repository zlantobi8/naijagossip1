import { getVideoById } from "./../../lib/eporner";

export async function generateMetadata({ params }) {
  const data = await getVideoById(params.id);
  const v = data.video;

  return {
    title: v.title + " | Trendzlib",
    description: v.title,
    openGraph: {
      title: v.title,
      description: v.title,
      images: [{ url: v.default_thumb.src }],
      siteName: "Trendzlib",
      type: "video.other",
    },
  };
}

export default async function VideoPage({ params }) {
  const data = await getVideoById(params.id);
  const v = data.video;

  return (
    <div className="player-wrap">
      <iframe src={v.embed} allowFullScreen />
      <h1>{v.title}</h1>
    </div>
  );
}
