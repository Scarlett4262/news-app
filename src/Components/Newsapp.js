import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./Newsapp.css";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "business", label: "Business" },
  { id: "entertainment", label: "Entertainment" },
  { id: "general", label: "General" },
  { id: "health", label: "Health" },
  { id: "science", label: "Science" },
  { id: "sports", label: "Sports" },
  { id: "technology", label: "Technology" },
];

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [category, setCategory] = useState("all");
  const [newsData, setNewsData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const API_KEY = "9c275a54dbc84836a2edacbc50f24c19";

  const getData = async () => {
    setError("");
    setLoading(true);

    try {
      let query;
      if (category === "all" || !category) {
        if (!search.trim()) {
          setError("Please enter a search query");
          setLoading(false);
          return;
        }
        query = search.trim();
      } else {
        query = category;
      }

      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        query,
      )}&apiKey=${API_KEY}`;
      const response = await fetch(url);
      const jsonData = await response.json();

      if (jsonData.articles && jsonData.articles.length > 0) {
        const dt = jsonData.articles.slice(0, 10);
        setNewsData(dt);
      } else {
        setError(
          category === "all"
            ? "No news articles found. Try another query."
            : `No news in ${
                CATEGORIES.find((c) => c.id === category)?.label
              }. Try another category.`,
        );
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [category]);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryClick = (id) => {
    setCategory(id);
  };

  return (
    <div className="newsapp">
      <header className="newsapp-header">
        <nav className="newsapp-nav">
          <h1 className="newsapp-logo">News</h1>
          <div className="search">
            <input
              type="text"
              className="search__input"
              placeholder="Search News"
              value={search}
              onChange={handleInput}
              disabled={loading}
              aria-label="Search news"
            />
            <button
              type="button"
              className="search__button"
              onClick={getData}
              disabled={loading}
              aria-label="Search"
            >
              <svg
                className="search__icon"
                aria-hidden="true"
                viewBox="0 0 24 24"
              >
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {error && (
        <div className="newsapp-error" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loader" aria-hidden="true">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <>
          <section className="newsapp-hero">
            <p className="newsapp-hero__text">Stay Updated with Latest News</p>
          </section>
          <div className="newsapp-categories">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`newsapp-category-btn ${
                  category === c.id ? "newsapp-category-btn--active" : ""
                }`}
                onClick={() => handleCategoryClick(c.id)}
                disabled={loading}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="newsapp-content">
            {newsData ? <Card data={newsData} /> : null}
          </div>
        </>
      )}
    </div>
  );
};

export default Newsapp;
