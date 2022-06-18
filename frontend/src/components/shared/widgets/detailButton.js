import React from "react";
import PropTypes from "prop-types";

const DetailButton = (props) => {
  return (
    <button
      className="btn"
      style={{
        fontSize: ".9rem",
        color: "#fff",
        backgroundColor: "#808080",
        margin: ".3rem",
        padding: ".3rem",
      }}
    >
      {props.text}
    </button>
  );
};
DetailButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default DetailButton;
