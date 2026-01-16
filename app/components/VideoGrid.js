"use client";
import VideoCard from "./VideoCard";

export default function VideoGrid({ videos }) {
  return (
    <div className="grid">
      {videos.map((v) => (
        <VideoCard key={v.id} video={v} />
      ))}
    </div>
  );
}