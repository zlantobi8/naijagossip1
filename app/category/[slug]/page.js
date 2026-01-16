import { getVideos } from "./../../lib/eporner";
import VideoGrid from "./../../components/VideoGrid";

export default async function CategoryPage({ params, searchParams }) {
  // params and searchParams are already objects
  const slug = params.slug;
  const q = searchParams?.q;

  const data = await getVideos(
    q ? { query: q, per_page: 24 } : { order: slug === "search" ? "" : slug, per_page: 24 }
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
