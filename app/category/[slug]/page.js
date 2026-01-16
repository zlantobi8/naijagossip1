import { getVideos } from "./../../lib/eporner";
import Header from "./../../components/Header";
import VideoGrid from "./../../components/VideoGrid";

export default async function CategoryPage({ params, searchParams }) {
  // unwrap both promises
  const p = await params;
  const s = await searchParams;

  const slug = p.slug;
  const q = s.q;

  const data = await getVideos(
    q ? { query: q } : { order: slug === "search" ? "" : slug }
  );

  return (
    <main>
  
      <h2 className="section-title">
        {q ? `Search results for "${q}"` : slug}
      </h2>
      <VideoGrid videos={data.videos} />
    </main>
  );
}
