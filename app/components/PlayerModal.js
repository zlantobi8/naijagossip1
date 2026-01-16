"use client";

export default function PlayerModal({ url, onClose }) {
  return (
    <div className="player" onClick={onClose}>
      <iframe src={url} allowFullScreen onClick={(e) => e.stopPropagation()} />
      <span className="close" onClick={onClose}>×</span>
    </div>
  );
}
