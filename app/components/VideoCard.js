"use client";
import { useState } from "react";

export default function VideoCard({ video }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleImageError = () => {
    setImgError(true);
    setImgLoaded(true);
  };

  const handleImageLoad = () => {
    setImgLoaded(true);
  };

  const thumbnailSrc = imgError 
    ? `https://via.placeholder.com/640x360/1a1a1a/ffffff?text=${encodeURIComponent(video.title.substring(0, 30))}`
    : video.default_thumb?.src || video.thumb;

  return (
    <a href={`/video/${video.id}`} className="card">
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        aspectRatio: '16/9',
        background: imgLoaded ? 'transparent' : 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)'
      }}>
        {!imgLoaded && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'rgba(255,255,255,0.3)',
            fontSize: '14px'
          }}>
            Loading...
          </div>
        )}
        <img 
          src={thumbnailSrc}
          alt={video.title}
          onError={handleImageError}
          onLoad={handleImageLoad}
          style={{
            opacity: imgLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
          loading="lazy"
        />
      </div>
      <span className="duration">{video.duration || "10:00"}</span>
      <h4>{video.title}</h4>
    </a>
  );
}