import { getVideos } from "./lib/eporner";
import Header from "./components/Header";
import VideoGrid from "./components/VideoGrid";

export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  const order = params?.order || "top-weekly";
  const page = parseInt(params?.page || "1");

  const data = await getVideos({ order, page });

  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = data.videos.length > 0 ? page + 1 : null;

  return (
    <main>

      <h2 className="section-title">Videos</h2>
      <VideoGrid videos={data.videos} />

      <div className="pagination">
        {prevPage && (
          <a href={`/?order=${order}&page=${prevPage}`} className="page-btn">
            ← Previous
          </a>
        )}
        <span className="current-page">Page {page}</span>
        {nextPage && (
          <a href={`/?order=${order}&page=${nextPage}`} className="page-btn">
            Next →
          </a>
        )}
      </div>
    </main>
  );
}