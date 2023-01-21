// import { Typography } from "@mui/material";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import getNews from "../service/GetNews";
import "./GetNews.css";

const NewsData = () => {
  const [newsData, setNewsData] = useState([]);
  const alankey = `6bab3063b9274bf257e911612dc913892e956eca572e1d8b807a3e2338fdd0dc/stage`;
  const [selectOption, setSelectOption] = useState("");

  const getAllNews = async () => {
    let data = await getNews(selectOption);
    setNewsData(data?.data?.articles);
  };

  const selectCategory = (event) => {
    setSelectOption(event.target.value);
  };

  useEffect(() => {
    alanBtn({
      key: "cf6f2f0b118118a237537b4f04bbeaf32e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        console.log(commandData?.data.toLowerCase());
        setSelectOption(commandData.data.toLowerCase());
      },
    });
  }, [alankey]);

  useEffect(() => {
    getAllNews();
  }, [selectOption]);

  console.log(newsData);
  return (
    <div className="main">
      <h1>Voice News</h1>
      <div className="news-category">
        <label>Choose News Category:</label>
        {/* <label>Choosed by voice "{selectOption}"</label> */}

        <select
          className="select-news"
          name="category"
          id="category"
          onChange={selectCategory}
        >
          <option value={selectOption}>{selectOption}</option>
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
