"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const search = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      router.push(`/category/search?q=${encodeURIComponent(query)}`);
    }
  };

  const categories = [
    { name: "Trending", order: "top-weekly" },
    { name: "Latest", order: "latest" },
    { name: "Top Today", order: "top-today" },
    { name: "Popular", order: "popular" },
  ];

  return (
    <header>
      <div className="top">
        <div className="logo">Trendzlib</div>
        <input
          type="text"
          placeholder="Search videos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={search}
        />
      </div>
      <div className="categories">
        {categories.map((cat) => (
          <div key={cat.order} onClick={() => router.push(`/?order=${cat.order}`)}>
            {cat.name}
          </div>
        ))}
      </div>
    </header>
  );
}
