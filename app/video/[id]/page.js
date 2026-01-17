// app/video/[id]/page.js
import { getVideoById, getVideos } from "./../../lib/eporner";
import VideoGrid from "./../../components/VideoGrid";
import VideoPlayer from "./../../components/VideoPlayer";

export async function generateMetadata({ params }) {
  const p = await params;
  
  try {
    const data = await getVideoById(p.id);
    const v = data.video || data;
    const thumbnailUrl = v.default_thumb?.src || v.thumbs?.[0]?.src || v.thumb || '/pics.jpg';

    return {
      title: v.title + " | Trendzlib",
      description: v.title,
      openGraph: {
        title: v.title,
        description: v.title,
        images: [{ url: thumbnailUrl }],
        siteName: "Trendzlib",
        type: "video.other",
      },
      twitter: {
        card: 'summary_large_image',
        title: v.title,
        description: v.title,
        images: [thumbnailUrl],
      },
    };
  } catch (error) {
    return {
      title: "Video | Trendzlib",
      description: "Watch videos on Trendzlib",
    };
  }
}

export default async function VideoPage({ params }) {
  const p = await params;
  
  // Parallel data fetching for faster loading
  const [videoResult, relatedResult] = await Promise.allSettled([
    getVideoById(p.id),
    getVideos({ order: "top-weekly", per_page: 12 })
  ]);
  
  // Handle video fetch error
  if (videoResult.status === 'rejected') {
    console.error("Error fetching video:", videoResult.reason);
    return (
      <main>
        <div className="video-page-container">
          <h1 className="video-title">Video not found</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginTop: '16px' }}>
            Sorry, this video could not be loaded. The video may have been removed or the ID is invalid.
          </p>
          <a href="/" className="page-btn" style={{ display: 'inline-block', marginTop: '24px' }}>
            ← Back to Home
          </a>
        </div>
      </main>
    );
  }
  
  const data = videoResult.value;
  const v = data.video || data;
  const thumbnailUrl = v.default_thumb?.src || v.thumbs?.[0]?.src || v.thumb || '/pics.jpg';
  
  // Get related videos (fallback to empty array if failed)
  const relatedData = relatedResult.status === 'fulfilled' 
    ? relatedResult.value 
    : { videos: [] };

  // Handle missing data gracefully
  if (!v || !v.embed) {
    return (
      <main>
        <div className="video-page-container">
          <h1 className="video-title">Video not found</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginTop: '16px' }}>
            Sorry, this video could not be loaded.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="video-page-container">
        <div className="video-player-section">
          <VideoPlayer embedUrl={v.embed} thumbnailUrl={thumbnailUrl} title={v.title} />
          <div className="video-info">
            <h1 className="video-title">{v.title}</h1>
            <div className="video-meta">
              {(v.length_sec || v.duration) && (
                <span className="meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  {v.length_sec ? Math.floor(v.length_sec / 60) + ' min' : v.duration}
                </span>
              )}
              {v.views && (
                <span className="meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  {v.views.toLocaleString()} views
                </span>
              )}
              {v.rate && (
                <span className="meta-item rating">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  {v.rate}%
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="related-section">
          <h2 className="section-title">Related Videos</h2>
          <VideoGrid videos={relatedData.videos} />
        </div>
      </div>
    </main>
  );
}