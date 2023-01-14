// import { Typography } from "@mui/material";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import getNews from "../service/GetNews";
import "./GetNews.css";

const NewsData = () => {
  const [newsData, setNewsData] = useState([]);
  const [selectOption, setSelectOption] = useState([]);

  const getAllNews = async () => {
    let data = await getNews(selectOption);
    setNewsData(data?.data?.articles);
  };

  const selectCategory = (event) => {
    setSelectOption(event.target.value);
  };

  useEffect(() => {
    getAllNews();
  }, [selectOption]);
  console.log(newsData);
  return (
    <div className="main">
      <h1>Voice News</h1>
      <div className="news-category">
        <label for="cars">Choose News Category:</label>

        <select
          className="select-news"
          name="category"
          id="category"
          onChange={selectCategory}
        >
          <option value="General">General</option>
          <option value="Health">Health</option>
          <option value="Business">Business</option>
          <option value="Sports">Sports</option>
        </select>
      </div>

      <div className="grid-main">
        {newsData?.map((news) => {
          return (
            <div className="grid-child">
              <div style={{ alignContent: "center" }}>
                <img
                  style={{
                    width: "100%",
                  }}
                  src={news?.urlToImage}
                  alt="news"
                />
              </div>
              <p className="news-title">{news.title}</p>
              <p className="news-content">{news.content}</p>
              <div className="space-between">
                <p className="news-author">
                  Author:{" "}
                  {news.author ? news?.author : "Author name is not avaialbe"}
                </p>
                <p className="news-date">
                  Date: {moment(news?.publishedAt).format("LL")}
                </p>
              </div>
              <a href={news?.url} target="_blank" rel="noreferrer">
                Read More..
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewsData;
