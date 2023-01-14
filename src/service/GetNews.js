import axios from "axios";

export default function getNews(category) {
  const API_KEY = `e5e6927ca0d44792acb1b017e1f7ece9`;
  const API_EndPoint = `https://newsapi.org/v2/top-headlines?country=us&category=${category}`;

  return axios.get(`${API_EndPoint}&apikey=${API_KEY}`);
}
