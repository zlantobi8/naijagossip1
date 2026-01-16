"use client";

export default function VideoCard({ video, onClick }) {
  return (
    <div className="card" onClick={() => onClick(video.embed)}>
      <img src={video.default_thumb.src} alt={video.title} />
      <h4>{video.title}</h4>
      <span>{video.duration}</span>
    </div>
  );
}
