import React from "react";
// import Proptypes from "prop-types";
import bg from "../assets/page-bg1.jpg";
import GetQuote from "./GetQuote";
// import desktopInfographic from "../assets/desktopInfographic.png";
// import mobileInfographic from "../assets/mobileInfographic.png";

const Home = () => {
  return (
    <>
      <section className="container-fluid" style={backgroundStyles}>
        <div style={{ minHeight: "32rem", backdropFilter: "brightness(0.9)" }}>
          <div className="container" style={{ padding: "2rem 1rem" }}>
            <GetQuote />
          </div>
        </div>
      </section>
      <section className="container-fluid">
        <div className="infographic-mobile">
          {/* <img
            src={mobileInfographic}
            style={{ height: "auto", width: "100%", boxSizing: "border-box" }}
          /> */}
        </div>
        <div className="desktop-infographic">
          {/* <img
            src={desktopInfographic}
            style={{ height: "auto", width: "100%", boxSizing: "border-box" }}
          /> */}
        </div>
      </section>
    </>
  );
};

const backgroundStyles = {
  backgroundImage: `url(${bg})`,
  backgroundSize: "cover",
  backgroundRepeat: "initial initial",
  backgroundPosition: "center",
  minHeight: "32rem",
  paddingRight: 0,
  paddingLeft: 0,
};

// InfographicCard.propTypes = {
//   title: Proptypes.string.isRequired,
//   index: Proptypes.number,
// };
export default Home;
