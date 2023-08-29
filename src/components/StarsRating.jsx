import { useState } from "react";
import Star from "./Star";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};
const starsContainerStyle = {
  display: "flex",
};
StarsRating.prototype = {
  maxRating: PropTypes.number,
  size: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  messages: PropTypes.array,
  className: PropTypes.string,
  onSetRating: PropTypes.func,
};

export default function StarsRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating = () => {},
}) {
  const [rating, setRating] = useState(defaultRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = (rating) => {
    setRating(rating);
    onSetRating(rating);
  };
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starsContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onClick={() => handleRating(i + 1)}
            full={hoverRating ? hoverRating >= i + 1 : rating >= i + 1}
            onMouseEnter={() => setHoverRating(i + 1)}
            onMouseLeave={() => setHoverRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[hoverRating ? hoverRating - 1 : rating - 1]
          : hoverRating || rating || ""}
      </p>
    </div>
  );
}
