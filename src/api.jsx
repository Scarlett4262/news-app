import axios from "axios";

const API_KEY = "37f3f6d54afd49788a71f76778a92fa2";
const api = axios.create({
  baseURL: "https://newsapi.org/v2/",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const fetchNews = async () => {
  const response = await api.get("top-headlines", {
    params: {
      country: "us",
      category: "technology",
    },
  });
  return response.data.articles;
};
