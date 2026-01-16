"use client";
import Script from "next/script";
import { useState } from "react";

export default function Header() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      window.location.href = `/category/search?q=${encodeURIComponent(query)}`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const categories = [
    { name: "Home", path: "/" },           // <-- changed
    { name: "Latest", path: "/?order=latest" },
    { name: "Top Today", path: "/?order=top-today" },
    { name: "Popular", path: "/?order=popular" },
  ];

  const handleCategoryClick = (path) => {
    window.location.href = path;
  };

  return (
    <header>
      <div className="top">
        <a href="/" className="logo" style={{ textDecoration: 'none' }}>Trendzlib</a>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search videos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="search-btn" onClick={handleSearch}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="categories">
        {categories.map((cat) => (
          <div key={cat.name} onClick={() => handleCategoryClick(cat.path)}>
            {cat.name}
          </div>
        ))}
      </div>
    </header>
  );
}
