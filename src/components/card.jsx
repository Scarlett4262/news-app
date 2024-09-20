import React from "react";

const NewsCard = ({ article }) => {
  return (
    <div className="relative flex flex-col rounded-xl bg-white border border-black-900 shadow-md w-full max-w-xs mx-auto">
      {/* Image */}
      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl shadow-lg border border-black">
        <img
          src={article.urlToImage || "https://via.placeholder.com/400x300"}
          alt="News"
          className="h-full w-full object-cover"
          style={{ maxHeight: "160px" }}
        />
      </div>

      {/* Date and Title */}
      <div className="p-6">
        {/* Date */}
        <p className="block font-sans text-xs font-light leading-relaxed text-gray-500">
          {new Date(article.publishedAt).toDateString()}
        </p>

        {/* Title */}
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900">
          {article.title}
        </h5>

        {/* Description */}
        <p className="block font-sans text-base font-light leading-relaxed text-gray-700">
          {article.description
            ? article.description
            : "No description available."}
        </p>
      </div>

      {/* Read More Button */}
      <div className="p-6 pt-0">
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          <button
            type="button"
            className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg focus:opacity-[0.85] active:opacity-[0.85]"
          >
            Read More
          </button>
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
