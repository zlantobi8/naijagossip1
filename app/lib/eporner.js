import videosData from './../../public/videos.json';

// Cache the data to avoid re-processing
let cachedVideos = null;

function initializeVideos() {
  if (cachedVideos) return cachedVideos;

  cachedVideos = videosData.map(video => ({
    id: video.id,
    title: video.title,
    url: video.url,
    embed: video.embedUrl,
    default_thumb: {
      src: video.thumb,
      // Fallback placeholder if thumbnail fails
      fallback: `https://via.placeholder.com/640x360/1a1a1a/ffffff?text=${encodeURIComponent(video.title.substring(0, 20))}`
    },
    thumbs: [{ src: video.thumb }],
    duration: "10:00",
    length_sec: 600,
    views: Math.floor(Math.random() * 500000) + 100000,
    rate: Math.floor(Math.random() * 25) + 75
  }));

  return cachedVideos;
}

export async function getVideos(params = {}) {
  // Simulate minimal delay for realistic feel
  await new Promise(resolve => setTimeout(resolve, 10));

  const page = params.page || 1;
  const perPage = parseInt(params.per_page) || 24;
  const query = params.query?.toLowerCase();
  const order = params.order;

  let videos = initializeVideos();

  // Filter by search query if provided
  if (query) {
    videos = videos.filter(video => 
      video.title.toLowerCase().includes(query)
    );
  }

  // Sort based on order parameter
  if (order === 'latest') {
    videos = [...videos].reverse();
  } else if (order === 'top-today' || order === 'popular') {
    // Sort by views descending
    videos = [...videos].sort((a, b) => b.views - a.views);
  } else if (order === 'top-weekly') {
    // Sort by rating
    videos = [...videos].sort((a, b) => b.rate - a.rate);
  }

  // Pagination
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedVideos = videos.slice(startIndex, endIndex);

  return {
    videos: paginatedVideos,
    count: paginatedVideos.length,
    total_count: videos.length
  };
}

export async function getVideoById(id) {
  // Simulate minimal delay
  await new Promise(resolve => setTimeout(resolve, 10));

  const videos = initializeVideos();
  const video = videos.find(v => v.id === id);
  
  if (!video) {
    throw new Error(`Video not found: ${id}`);
  }

  return {
    video: video
  };
}