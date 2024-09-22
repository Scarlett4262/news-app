import React from "react";
import "./Card.css"; // Assuming you'll create a CSS file for custom styles

const Card = ({ data }) => {
  const readMore = (url) => {
    window.open(url);
  };

  return (
    <div className="cardContainer">
      {data.map((curItem, index) => {
        if (!curItem.urlToImage) {
          return null;
        } else {
          return (
            <div className="card" key={index}>
              <div
                className="card-image"
                style={{ backgroundImage: `url(${curItem.urlToImage})` }}
              ></div>
              <div className="card-content">
                <div className="category">{curItem.source.name}</div>{" "}
                <div className="author">
                  {new Date(curItem.publishedAt).toLocaleDateString()}
                </div>
                <div className="heading">
                  <a className="title" onClick={() => window.open(curItem.url)}>
                    {curItem.title}
                  </a>
                </div>
                <button
                  className="button"
                  onClick={() => readMore(curItem.url)}
                  style={{ "--clr": "#7808d0" }}
                >
                  <span className="button__icon-wrapper">
                    <svg
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="button__icon-svg"
                      width="10"
                    >
                      <path
                        d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                        fill="currentColor"
                      ></path>
                    </svg>

                    <svg
                      viewBox="0 0 14 15"
                      fill="none"
                      width="10"
                      xmlns="http://www.w3.org/2000/svg"
                      className="button__icon-svg button__icon-svg--copy"
                    >
                      <path
                        d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  Read More
                </button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Card;
