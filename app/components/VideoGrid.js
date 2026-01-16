"use client";
import VideoCard from "./VideoCard";
import { useState } from "react";
import PlayerModal from "./PlayerModal";

export default function VideoGrid({ videos }) {
  const [playerUrl, setPlayerUrl] = useState(null);

  const play = (url) => setPlayerUrl(url);
  const close = () => setPlayerUrl(null);

  return (
    <>
      <div className="grid">
        {videos.map((v) => (
          <VideoCard key={v.id} video={v} onClick={play} />
        ))}
      </div>
      {playerUrl && <PlayerModal url={playerUrl} onClose={close} />}
    </>
  );
}
