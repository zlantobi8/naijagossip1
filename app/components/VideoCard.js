"use client";

export default function VideoCard({ video }) {
  return (
    <a href={`/video/${video.id}`} className="card">
      <img src={video.default_thumb.src} alt={video.title} />
      <span className="duration">{video.duration}</span>
      <h4>{video.title}</h4>
    </a>
  );
}