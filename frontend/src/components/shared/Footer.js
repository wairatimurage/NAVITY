import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./widgets/svgLogo";
import TextInput from "./widgets/TextInput";
// import { fetchPilots } from "../../utility/apiCalls";

const Footer = () => {
  const [newsletter, setNewsletter] = useState({});
  const handleInputChange = (event) => {
    setNewsletter({ ...newsletter, [event.target.name]: event.target.value });
  };
  return (
    <footer
      className="container-fluid"
      style={{
        backgroundColor: "#ffffffa3",
        padding: ".5rem 0rem 1rem",
        color: "#000000",
        marginBottom: "",
        // position: "fixed",
      }}
    >
      <div className="footer-logo">
        <Logo />
        <p className="copyright">
          <small style={{ fontSize: ".8rem" }}>&copy;</small> Navity{" "}
          {new Date().getFullYear()}
        </p>
      </div>
      <div className="footer-contact">
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 112.196 112.196"
          style={{
            enableBackground: "new 0 0 112.196 112.196",
            width: "2rem",
            height: "2rem",
            margin: "0 .6rem",
          }}
        >
          <g>
            <circle
              style={{ fill: "#3B5998" }}
              cx="56.098"
              cy="56.098"
              r="56.098"
            />
            <path
              style={{ fill: "#FFFFFF" }}
              d="M70.201,58.294h-10.01v36.672H45.025V58.294h-7.213V45.406h7.213v-8.34
  c0-5.964,2.833-15.303,15.301-15.303L71.56,21.81v12.51h-8.151c-1.337,0-3.217,0.668-3.217,3.513v7.585h11.334L70.201,58.294z"
            />
          </g>
        </svg>
        <svg
          version="1.1"
          id="Layer_1"
          viewBox="0 0 291.319 291.319"
          style={{
            enableBackground: "new 0 0 291.319 291.319",
            width: "2rem",
            height: "2rem",
            margin: "0 .6rem",
          }}
        >
          <g>
            <path
              style={{ fill: "#3F729B" }}
              d="M145.659,0c80.44,0,145.66,65.219,145.66,145.66S226.1,291.319,145.66,291.319S0,226.1,0,145.66
  S65.21,0,145.659,0z"
            />
            <path
              style={{ fill: "#FFFFFF" }}
              d="M195.93,63.708H95.38c-17.47,0-31.672,14.211-31.672,31.672v100.56
  c0,17.47,14.211,31.672,31.672,31.672h100.56c17.47,0,31.672-14.211,31.672-31.672V95.38
  C227.611,77.919,213.4,63.708,195.93,63.708z M205.908,82.034l3.587-0.009v27.202l-27.402,0.091l-0.091-27.202
  C182.002,82.116,205.908,82.034,205.908,82.034z M145.66,118.239c22.732,0,27.42,21.339,27.42,27.429
  c0,15.103-12.308,27.411-27.42,27.411c-15.121,0-27.42-12.308-27.42-27.411C118.23,139.578,122.928,118.239,145.66,118.239z
  M209.65,193.955c0,8.658-7.037,15.704-15.713,15.704H97.073c-8.667,0-15.713-7.037-15.713-15.704v-66.539h22.759
  c-2.112,5.198-3.305,12.299-3.305,18.253c0,24.708,20.101,44.818,44.818,44.818s44.808-20.11,44.808-44.818
  c0-5.954-1.193-13.055-3.296-18.253h22.486v66.539L209.65,193.955z"
            />
          </g>
        </svg>
        <p style={{ fontWeight: 500, marginTop: ".5rem", color: " #00a1d4" }}>
          info@navity.com
        </p>
      </div>
      <div className="footer-links">
        <p className="footer-header">LINKS</p>
        <div>
          <Link to="">Contact Us</Link>
          <Link to="">Privacy Policy and User Agreement</Link>
        </div>
      </div>
      <form className="footer-newsletter-signup">
        <p className="footer-header">NEWSLETTER</p>
        <span
          style={{
            display: "block",
            fontSize: ".8rem",
            color: "#656769",
            textAlign: "center",
          }}
        >
          Sign up and get emails on the latest in the drone industry
        </span>
        <TextInput
          name="name"
          placeholder="Full Name"
          value={newsletter.name || ""}
          onChange={handleInputChange}
        />
        <TextInput
          name="telepone"
          placeholder="Telephone"
          type="tel"
          value={newsletter.telephone || ""}
          onChange={handleInputChange}
        />
        <TextInput
          name="email"
          placeholder="email"
          type="email"
          value={newsletter.email || ""}
          onChange={handleInputChange}
        />
        <div className="form-check">
          <input
            type="checkbox"
            name="termsAndConditions"
            className="form-input-check"
            style={{ marginRight: ".5rem" }}
          />
          <label htmlFor="termsAndConditions">
            I agree to Terms of Service within{" "}
            <Link to="/pricavy-policy">Pivacy policy</Link>
          </label>
        </div>
      </form>
    </footer>
  );
};
export default Footer;
