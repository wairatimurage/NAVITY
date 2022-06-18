import React from "react";
import Proptypes from "prop-types";

const StarRating = ({ tally }) => {
  return (
    <p>
      {[...Array(tally)].map((star, i) => (
        <svg
          key={i}
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 280.124 280.124"
          // style="enable-background:new 0 0 280.124 280.124;"
          style={starStyles}
        >
          <path
            style={{ fill: "#F4B459" }}
            d="M280.124,106.914l-92.059-6.598L140.057,4.441l-48.55,95.874L0,106.914l61.282,74.015
		l-17.519,94.754l96.294-43.614l96.294,43.606l-17.799-94.754C218.553,180.919,280.124,106.914,280.124,106.914z"
          />
          <polygon
            style={{ fill: "#E3A753" }}
            points="236.352,275.683 218.553,180.92 280.071,106.975 280.071,106.905 188.065,100.315 
		140.057,4.441 140.057,232.068 	"
          />
        </svg>
      ))}
      <span
        style={{
          marginLeft: ".5rem",
          fontSize: ".8rem",
          paddingBottom: ".5rem",
        }}
      >
        (Reviews: {tally})
      </span>
    </p>
  );
};

const starStyles = {
  enableBackground: "new 0 0 280.124 280.124",
  height: "1rem",
  width: "1rem",
};
StarRating.propTypes = {
  tally: Proptypes.number,
};
export default StarRating;
