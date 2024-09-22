import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./Newsapp.css";

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const API_KEY = "37f3f6d54afd49788a71f76778a92fa2";

  // Function to fetch news data
  const getData = async () => {
    if (!search.trim()) {
      setError("Please enter a search query");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`
      );
      const jsonData = await response.json();

      // If the response contains articles
      if (jsonData.articles && jsonData.articles.length > 0) {
        let dt = jsonData.articles.slice(0, 10); // Limit to 10 articles
        setNewsData(dt);
      } else {
        setError("No news articles found. Try another query.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on first render
  useEffect(() => {
    getData();
  }, []);

  // Handle input change for the search query
  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      {/* Navigation bar */}
      <nav>
        <div>
          <h1>News</h1>
        </div>

        <div className="search">
          <input
            type="text"
            className="search__input"
            placeholder="Search News"
            value={search}
            onChange={handleInput}
            disabled={loading} // Disable input while loading
          />
          <button
            className="search__button"
            onClick={getData}
            disabled={loading} // Disable button while loading
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

      {/* Display error if any */}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {/* Loader */}
      {loading ? (
        <div className="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <>
          <div>
            <p className="head">Stay Updated with Latest News</p>
          </div>

          {/* Display news cards if available */}
          <div>{newsData ? <Card data={newsData} /> : null}</div>
        </>
      )}
    </div>
  );
};

export default Newsapp;
