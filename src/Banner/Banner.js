import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./Banner.css";
const Banner = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=e5e6927ca0d44792acb1b017e1f7ece9"
    )
      .then((res) => res.json())
      .then((data) => setNewsData(data.articles));
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        justifyItems: "center",
      }}
    >
      <div style={{ backgroundColor: "black", padding: "5px" }}>
        <p style={{ color: "white" }}>News with Voice</p>
      </div>
      {newsData.map((news, index) => {
        if (index >= 1) return null;
        return (
          <Container
            className="banner"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "75%",
              marginLeft: "270px",
              marginTop: "10px",
              border: "5 solid red",
            }}
          >
            <div className="">
              <img src={news.urlToImage} style={{ height: "300px" }} alt="" />
            </div>
            <div className=" banner" style={{ border: "5 solid red" }}>
              <h2 style={{ textAlign: "left", marginLeft: "30px" }}>
                {news.title}
              </h2>
              <p style={{ textAlign: "left", marginLeft: "30px" }}>
                {news.content}
              </p>
              <p>
                <a href={news?.url} target="_blank" rel="noreferrer">
                  Read More..
                </a>
              </p>
            </div>
          </Container>
        );
      })}
    </div>
  );
};
export default Banner;
