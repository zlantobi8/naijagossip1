// app/components/VideoPlayer.js
"use client";
import { useState, useEffect } from "react";

export default function VideoPlayer({ embedUrl, thumbnailUrl, title }) {
  const [imgError, setImgError] = useState(false);
  const [showIframe, setShowIframe] = useState(false);

  const handleImageError = () => {
    setImgError(true);
  };

  // Preload the iframe immediately on mount
  useEffect(() => {
    // Small delay to ensure thumbnail shows first
    const timer = setTimeout(() => {
      setShowIframe(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const fallbackImage = imgError ? '/pics.jpg' : thumbnailUrl;

  return (
    <div className="player-wrapper">
      {/* Thumbnail image that shows before iframe loads */}
      <img 
        src={fallbackImage}
        alt={title}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1
        }}
        loading="eager"
        onError={handleImageError}
      />
      
      {/* Dark overlay with play button */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(255, 61, 61, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          transition: 'transform 0.3s ease'
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
      
      {/* Iframe loads immediately but on top layer */}
      {showIframe && (
        <iframe 
          src={embedUrl}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen 
          style={{ 
            position: 'relative', 
            zIndex: 3,
            border: 'none'
          }}
          loading="eager"
          importance="high"
        />
      )}
    </div>
  );
}