import React from "react";
import PropTypes from "prop-types";
import headerImage from "../../../assets/about-header1.jpg";

const PageHeader = (props) => {
  return (
    <section
      className="container-fluid"
      style={{
        backgroundImage: `url(${headerImage})`,
        height: "8rem",
        backgroundSize: "cover",
        backgroundPosition: "left 60%",
        display: "flex",
        padding: "0",
      }}
    >
      <div
        className="container-fluid"
        style={{ margin: "0", backdropFilter: "brightness(0.4)" }}
      >
        <h1
          style={{
            textAlign: "center",
            margin: "4rem auto 2rem",
            color: "#fff",
            fontSize: "2rem",
            textTransform: "capitalize",
          }}
        >
          {props.title}
        </h1>
      </div>
    </section>
  );
};
PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
export default PageHeader;
