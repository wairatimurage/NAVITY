import React, { useState, useEffect } from "react";
import Proptypes from "prop-types";
import { Link } from "react-router-dom";
import "./profile.css";
import { fetchCurrentUser, fetchProfile } from "../../utility/apiCalls";
import { checkEmpty } from "../../utility/formatingFunctions";
import DetailButton from "../shared/widgets/detailButton";
import sampleLogo from "../../assets/logo-sample.png";
import {
  InstagramSvg,
  LinkedInSvg,
  TwitterSvg,
} from "../shared/widgets/svgSocialIcons";
import { toggleModal } from "../../utility/utilityFunctions";
import BookingModal from "../BookingModal";

const Profile = ({ location }) => {
  const [user, setUser] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [loadState, setLoadState] = useState(false);
  const fetchArguments = location.pathname.split("/");

  useEffect(() => {
    fetchProfile(fetchArguments[1], fetchArguments[2]).then((data) => {
      setUser({ ...user, ...data });
      fetchCurrentUser().then((response) => setCurrentUser(response));
      setLoadState(true);
    });
  }, [location]);
  return (
    <>
      {loadState ? (
        <section className="container-fluid profile">
          <div className="bio">
            <div className="identity profile-section-container">
              <div
                className="logo"
                style={{
                  width: "10rem",
                  height: "10rem",
                  margin: "0 auto",
                }}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="logo" />
                ) : (
                  <img src={sampleLogo} alt="logo" />
                )}
              </div>
              <p
                style={{
                  fontSize: "1.4rem",
                  fontWeight: "500",
                  marginBottom: ".5rem",
                }}
              >
                {user.name}
                {currentUser && currentUser._id === user._id ? (
                  <Link
                    to={{
                      pathname: `/profile/${user.accountType}s/edit/${user._id}`,
                      state: { user },
                    }}
                  >
                    <span
                      className="edit-profile-btn btn"
                      style={{ marginLeft: "1rem" }}
                    >
                      <svg
                        version="1.1"
                        viewBox="0 0 512.008 512.008"
                        style={{
                          enableBackground: "new 0 0 512.008 512.008",
                          width: "1.2rem",
                          height: "1.5rem",
                          marginBottom: "-.3rem",
                        }}
                      >
                        <path
                          d="M504.507,79.905L432.102,7.499c-9.993-9.992-26.206-10.001-36.207,0L51.959,351.435c-2.807,2.807-4.924,6.238-6.187,10.01
			L1.313,478.309c-3.063,9.199-0.674,19.336,6.187,26.197c6.861,6.861,16.998,9.25,26.197,6.187l116.864-44.459
			c3.772-1.254,7.194-3.371,10.01-6.187l343.936-343.936C514.508,106.11,514.508,89.906,504.507,79.905z M25.608,486.398
			l44.459-116.864l72.405,72.405L25.608,486.398z M160.571,423.841l-72.405-72.405L359.696,79.905l72.405,72.405L160.571,423.841z
			 M450.201,134.211l-72.405-72.405l36.207-36.207l72.405,72.405L450.201,134.211z"
                        />
                      </svg>
                    </span>
                  </Link>
                ) : null}
              </p>
              {currentUser && currentUser._id !== user._id ? (
                <button
                  className="btn btn-outline-dark"
                  data-target={
                    fetchArguments[1] === "institutions"
                      ? "#place-inquiry-modal"
                      : "#place-booking-modal"
                  }
                  onClick={toggleModal}
                >
                  Place{" "}
                  {fetchArguments[1] === "institutions" ? "Inquiry" : "Booking"}
                </button>
              ) : null}
              <hr></hr>
              <p style={{ fontWeight: "500", fontSize: "1.1rem" }}>Services</p>
              <div className="specialty">
                {user.bio && user.bio.services
                  ? user.bio.services !== []
                    ? user.accountType === "pilot"
                      ? user.bio.services.map((service) =>
                          checkEmpty(
                            service,
                            <DetailButton key={service} text={service} />
                          )
                        )
                      : user.bio.services.map((service) =>
                          checkEmpty(
                            service,
                            <DetailButton key={service} text={service} />
                          )
                        )
                    : null
                  : null}
              </div>
              {user.accountType === "pilot" ? (
                <div className="specialty">
                  <p
                    style={{
                      fontWeight: "500",
                      fontSize: "1.1rem",
                      textAlign: "center",
                    }}
                  >
                    Drones Flown
                  </p>
                  {user.bio && user.bio.dronesFlown
                    ? user.bio.dronesFlown
                      ? user.bio.dronesFlown.map((service) => (
                          <DetailButton key={service} text={service} />
                        ))
                      : null
                    : null}
                </div>
              ) : null}
            </div>
          </div>
          <div className="other-details">
            <div className="profile-section-container">
              <p
                style={{
                  fontWeight: "500",
                  fontSize: "1.1rem",
                  margin: "0 1rem",
                }}
              >
                Bio
              </p>
              <div style={{ margin: "1rem" }}>
                {user.bio && user.bio.description ? user.bio.description : ""}
              </div>
            </div>
            <div className="profile-section-container">
              <p
                style={{
                  fontWeight: "500",
                  fontSize: "1.1rem",
                  margin: "0 1rem",
                }}
              >
                Contact
              </p>
              <div
                className="profile-contact-section"
                style={{ margin: "1rem" }}
              >
                <p>
                  Telephone:
                  <span style={{ fontWeight: "500" }}> {user.telephone}</span>
                </p>
                <p>
                  Email: <span style={{ fontWeight: "500" }}>{user.email}</span>
                </p>
                <p>
                  Location:{" "}
                  <span style={{ fontWeight: "500" }}>
                    {user.location || user.locations}
                  </span>
                </p>
                {user.website ? (
                  <p>
                    Website:{" "}
                    <span style={{ fontWeight: "500" }}>
                      <a
                        href={user.website}
                        rel="noreferrer noopener"
                        target="_blank"
                        style={{ color: "#629be6" }}
                      >
                        {user.website || ""}
                      </a>
                    </span>
                  </p>
                ) : null}
                <div style={{ margin: "2rem 0 1rem", textAlign: "center" }}>
                  <hr style={{ margin: "1rem 0" }}></hr>
                  {user.socials && user.socials.instagram ? (
                    <a
                      rel="noreferrer noopener"
                      href={`https://${user.socials.instagram}`}
                      target="_blank"
                      className="btn"
                      style={{ padding: 0, margin: "0 .5rem" }}
                    >
                      <InstagramSvg />
                    </a>
                  ) : null}
                  {user.socials && user.socials.instagram ? (
                    <a
                      href={`https://${user.socials.twitter}`}
                      rel="noreferrer noopener"
                      target="_blank"
                      className="btn"
                      style={{ padding: 0, margin: "0 .5rem" }}
                    >
                      <TwitterSvg />
                    </a>
                  ) : null}
                  {user.socials && user.socials.linkedIn ? (
                    <a
                      href={`https://${user.socials.linkedIn}`}
                      rel="noreferrer noopener"
                      target="_blank"
                      className="btn"
                      style={{ padding: 0, margin: "0 .5rem" }}
                    >
                      <LinkedInSvg />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
      <BookingModal profile={user} location={location} user={currentUser} />
    </>
  );
};

Profile.propTypes = {
  user: Proptypes.object,
  location: Proptypes.object,
};

export default Profile;
