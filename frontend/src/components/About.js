import React from "react";
import aboutHeader from "../assets/about-header1.jpg";
import aboutPilot from "../assets/about-pilot.jpg";
import aboutInstitution from "../assets/about-institution.jpg";

const AboutPage = () => {
  return (
    <>
      <section className="container-fluid" style={headerStyles}>
        {/* <h1 style={{ width: "100%", textAlign: "center" }}>About Us</h1> */}
        <div className="container" style={headerTextStyles}>
          <h2>We are changing how you hire drone pilots.</h2>
          <p>
            Hiring drone pilots has never been easier. While providing equal
            employment opportunities for pilots.
          </p>
        </div>
      </section>
      <section
        className="container-fluid about-marketing first"
        style={{ marginTop: "5rem", textAlign: "center" }}
      >
        <div className="about-marketing-text-header pilot-section">
          <h2 style={{ fontSize: "1.2rem" }}>
            Empowering Pilots To Earn Doing What they Love.
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor.
          </p>
        </div>
        <img
          className="about-marketing-image pilot-section"
          src={aboutPilot}
          alt=""
        />
        <p className="about-marketing-text">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor.
        </p>
      </section>
      <section
        className="container-fluid about-marketing second"
        style={{ marginTop: "3rem", textAlign: "center", marginBottom: "1rem" }}
      >
        <div className="about-marketing-text-header institution-section">
          <h2 style={{ fontSize: "1.2rem" }}>
            Helping You Place Your Institution On The Map.
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor.
          </p>
        </div>
        <img
          className="about-marketing-image institution-section"
          src={aboutInstitution}
          alt=""
        />
        <p className="about-marketing-text">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor.
        </p>
      </section>
      <section className="container-fluid" style={{ textAlign: "center" }}>
        <h2>Mission</h2>
        <p>
          To simplify the process of looking for a qualified drone pilot and
          networking with drone pilots, leaders, and drone industry players
          through a platform that adheres to international civil aviation
          regulations and safeguards both customers and pilots from
          exploitation.
        </p>
        <h2>Vision</h2>
        <p>
          To professionalize the domestic and commercial drone experience in
          Kenya.
        </p>
      </section>
    </>
  );
};

// styles
const headerStyles = {
  backgroundImage: `url(${aboutHeader})`,
  height: "20rem",
  backgroundSize: "cover",
  backgroundPosition: "left 60%",
  display: "flex",
};
const headerTextStyles = {
  color: "#000",
  textAlign: "center",
  backgroundColor: "#ffffffd0",
  margin: "auto auto -3rem",
  maxWidth: "",
};
export default AboutPage;
