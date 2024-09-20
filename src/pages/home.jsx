import React, { useEffect, useState } from "react";
import NewsCard from "../components/card";
import Loader from "../components/loader";
import { fetchNews } from "../api";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsArticles = await fetchNews();
        setArticles(newsArticles);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {articles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Home;
