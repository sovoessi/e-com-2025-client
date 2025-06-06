import React from "react";

const StarRating = ({ rating = 0, max = 5 }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(max)].map((_, i) => {
        const fill = rating >= i + 1 ? "#facc15" : rating > i ? "url(#half)" : "#e5e7eb";
        return (
          <svg
            key={i}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="#facc15" />
                <stop offset="50%" stopColor="#e5e7eb" />
              </linearGradient>
            </defs>
            <polygon
              points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,18.99 10,15.27 4.18,18.99 6,12.14 0.49,7.64 7.41,7.36"
              fill={fill}
            />
          </svg>
        );
      })}
    </div>
  );
};

export default StarRating;