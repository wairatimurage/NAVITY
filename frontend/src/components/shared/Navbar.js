import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./styles.css";
import { fetchCurrentUser, logout } from "../../utility/apiCalls";

const Navbar = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    fetchCurrentUser().then((data) => {
      console.log(data);
      setCurrentUser(data);
    });
  }, [window.location]);

  const handleLogout = () => {
    props.toggleDropdown();
    logout()
      .then(() => props.history("/"))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="navbar">
        <button onClick={props.toggle}>
          <svg id="hum-menu" viewBox="0 0 32 32" className="svg-icon">
            <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
          </svg>
        </button>
        <h1
          style={{
            margin: "-0.1rem auto 0.2rem",
            fontSize: "1.5rem",
          }}
        >
          Navity
        </h1>
        <button
          className="user-icon"
          style={{
            width: "fit-content",
            height: "3rem",
            display: "flex",
            gap: ".5rem",
            alignItems: "center",
          }}
          onClick={props.toggleDropdown}
        >
          {currentUser ? (
            currentUser.avatar ? (
              <img
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "50%",
                  border: "solid 2px #fff",
                }}
                src={currentUser.avatar}
                alt=""
              />
            ) : (
              <svg
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 53 53"
                style={{ enableBackground: "new 0 0 53 53" }}
              >
                <path
                  style={{ fill: "#E7ECED" }}
                  d="M18.613,41.552l-7.907,4.313c-0.464,0.253-0.881,0.564-1.269,0.903C14.047,50.655,19.998,53,26.5,53
	c6.454,0,12.367-2.31,16.964-6.144c-0.424-0.358-0.884-0.68-1.394-0.934l-8.467-4.233c-1.094-0.547-1.785-1.665-1.785-2.888v-3.322
	c0.238-0.271,0.51-0.619,0.801-1.03c1.154-1.63,2.027-3.423,2.632-5.304c1.086-0.335,1.886-1.338,1.886-2.53v-3.546
	c0-0.78-0.347-1.477-0.886-1.965v-5.126c0,0,1.053-7.977-9.75-7.977s-9.75,7.977-9.75,7.977v5.126
	c-0.54,0.488-0.886,1.185-0.886,1.965v3.546c0,0.934,0.491,1.756,1.226,2.231c0.886,3.857,3.206,6.633,3.206,6.633v3.24
	C20.296,39.899,19.65,40.986,18.613,41.552z"
                />
                <path
                  style={{ fill: "#556080" }}
                  d="M26.953,0.004C12.32-0.246,0.254,11.414,0.004,26.047C-0.138,34.344,3.56,41.801,9.448,46.76
		c0.385-0.336,0.798-0.644,1.257-0.894l7.907-4.313c1.037-0.566,1.683-1.653,1.683-2.835v-3.24c0,0-2.321-2.776-3.206-6.633
		c-0.734-0.475-1.226-1.296-1.226-2.231v-3.546c0-0.78,0.347-1.477,0.886-1.965v-5.126c0,0-1.053-7.977,9.75-7.977
		s9.75,7.977,9.75,7.977v5.126c0.54,0.488,0.886,1.185,0.886,1.965v3.546c0,1.192-0.8,2.195-1.886,2.53
		c-0.605,1.881-1.478,3.674-2.632,5.304c-0.291,0.411-0.563,0.759-0.801,1.03V38.8c0,1.223,0.691,2.342,1.785,2.888l8.467,4.233
		c0.508,0.254,0.967,0.575,1.39,0.932c5.71-4.762,9.399-11.882,9.536-19.9C53.246,12.32,41.587,0.254,26.953,0.004z"
                />
              </svg>
            )
          ) : null}
          {currentUser ? <span id="nav-name">{currentUser.name} </span> : null}
        </button>
      </div>
      <nav className={props.toggleState ? "side-nav links" : "hide links"}>
        <Link to="/" onClick={props.toggle}>
          Home
        </Link>
        <Link to="/pilots" onClick={props.toggle}>
          Pilots
        </Link>
        <Link to="/institutions" onClick={props.toggle}>
          Institutions
        </Link>
        <Link to="/info-hub" onClick={props.toggle}>
          Info Hub
        </Link>
        <Link to="/blog" onClick={props.toggle}>
          Blog
        </Link>
        <Link to="/about" onClick={props.toggle}>
          About Us
        </Link>
        <Link to="/login" onClick={props.toggle}>
          Login
        </Link>
      </nav>
      {currentUser ? (
        <div
          className={
            props.toggleDrop ? "profile-dropdown" : "profile-dropdown-hide"
          }
        >
          <Link
            to={`/${currentUser.accountType}s/${currentUser._id}`}
            onClick={props.toggleDropdown}
          >
            <svg
              viewBox="0 0 512 512"
              style={{
                enableBackground: "new 0 0 512 512",
                width: ".9rem",
                height: ".9rem",
                margin: "0 .5rem -.2rem 0",
              }}
            >
              <g>
                <g>
                  <path
                    d="M256,0c-84.83,0-153.6,85.965-153.6,192S171.17,384,256,384s153.6-85.965,153.6-192S340.83,0,256,0z M256,358.4
			c-70.579,0-128-74.65-128-166.4S185.421,25.6,256,25.6S384,100.25,384,192S326.579,358.4,256,358.4z"
                  />
                </g>
              </g>
              <g>
                <g>
                  <path
                    d="M367.812,361.762c-6.869,6.682-14.182,12.689-21.82,18.099c24.388,11.332,45.781,20.753,64.051,28.732
			c67.797,29.585,76.356,35.439,76.356,52.207c0,11.597-11.418,25.6-25.6,25.6H51.2c-14.182,0-25.6-14.003-25.6-25.6
			c0-16.768,8.559-22.622,76.348-52.207c18.278-7.979,39.671-17.399,64.051-28.732c-7.637-5.41-14.95-11.418-21.82-18.099
			C37.598,410.539,0,417.075,0,460.8C0,486.4,22.921,512,51.2,512h409.6c28.279,0,51.2-25.6,51.2-51.2
			C512,417.075,474.402,410.539,367.812,361.762z"
                  />
                </g>
              </g>
            </svg>
            Profile
          </Link>
          <Link
            to={`/settings/${currentUser._id}`}
            onClick={props.toggleDropdown}
          >
            <svg
              viewBox="0 0 478.703 478.703"
              style={{
                enableBackground: "new 0 0 478.703 478.703",
                width: ".9rem",
                height: ".9rem",
                margin: "0 .5rem -.2rem 0",
              }}
            >
              <g>
                <path
                  d="M454.2,189.101l-33.6-5.7c-3.5-11.3-8-22.2-13.5-32.6l19.8-27.7c8.4-11.8,7.1-27.9-3.2-38.1l-29.8-29.8
			c-5.6-5.6-13-8.7-20.9-8.7c-6.2,0-12.1,1.9-17.1,5.5l-27.8,19.8c-10.8-5.7-22.1-10.4-33.8-13.9l-5.6-33.2
			c-2.4-14.3-14.7-24.7-29.2-24.7h-42.1c-14.5,0-26.8,10.4-29.2,24.7l-5.8,34c-11.2,3.5-22.1,8.1-32.5,13.7l-27.5-19.8
			c-5-3.6-11-5.5-17.2-5.5c-7.9,0-15.4,3.1-20.9,8.7l-29.9,29.8c-10.2,10.2-11.6,26.3-3.2,38.1l20,28.1
			c-5.5,10.5-9.9,21.4-13.3,32.7l-33.2,5.6c-14.3,2.4-24.7,14.7-24.7,29.2v42.1c0,14.5,10.4,26.8,24.7,29.2l34,5.8
			c3.5,11.2,8.1,22.1,13.7,32.5l-19.7,27.4c-8.4,11.8-7.1,27.9,3.2,38.1l29.8,29.8c5.6,5.6,13,8.7,20.9,8.7c6.2,0,12.1-1.9,17.1-5.5
			l28.1-20c10.1,5.3,20.7,9.6,31.6,13l5.6,33.6c2.4,14.3,14.7,24.7,29.2,24.7h42.2c14.5,0,26.8-10.4,29.2-24.7l5.7-33.6
			c11.3-3.5,22.2-8,32.6-13.5l27.7,19.8c5,3.6,11,5.5,17.2,5.5l0,0c7.9,0,15.3-3.1,20.9-8.7l29.8-29.8c10.2-10.2,11.6-26.3,3.2-38.1
			l-19.8-27.8c5.5-10.5,10.1-21.4,13.5-32.6l33.6-5.6c14.3-2.4,24.7-14.7,24.7-29.2v-42.1
			C478.9,203.801,468.5,191.501,454.2,189.101z M451.9,260.401c0,1.3-0.9,2.4-2.2,2.6l-42,7c-5.3,0.9-9.5,4.8-10.8,9.9
			c-3.8,14.7-9.6,28.8-17.4,41.9c-2.7,4.6-2.5,10.3,0.6,14.7l24.7,34.8c0.7,1,0.6,2.5-0.3,3.4l-29.8,29.8c-0.7,0.7-1.4,0.8-1.9,0.8
			c-0.6,0-1.1-0.2-1.5-0.5l-34.7-24.7c-4.3-3.1-10.1-3.3-14.7-0.6c-13.1,7.8-27.2,13.6-41.9,17.4c-5.2,1.3-9.1,5.6-9.9,10.8l-7.1,42
			c-0.2,1.3-1.3,2.2-2.6,2.2h-42.1c-1.3,0-2.4-0.9-2.6-2.2l-7-42c-0.9-5.3-4.8-9.5-9.9-10.8c-14.3-3.7-28.1-9.4-41-16.8
			c-2.1-1.2-4.5-1.8-6.8-1.8c-2.7,0-5.5,0.8-7.8,2.5l-35,24.9c-0.5,0.3-1,0.5-1.5,0.5c-0.4,0-1.2-0.1-1.9-0.8l-29.8-29.8
			c-0.9-0.9-1-2.3-0.3-3.4l24.6-34.5c3.1-4.4,3.3-10.2,0.6-14.8c-7.8-13-13.8-27.1-17.6-41.8c-1.4-5.1-5.6-9-10.8-9.9l-42.3-7.2
			c-1.3-0.2-2.2-1.3-2.2-2.6v-42.1c0-1.3,0.9-2.4,2.2-2.6l41.7-7c5.3-0.9,9.6-4.8,10.9-10c3.7-14.7,9.4-28.9,17.1-42
			c2.7-4.6,2.4-10.3-0.7-14.6l-24.9-35c-0.7-1-0.6-2.5,0.3-3.4l29.8-29.8c0.7-0.7,1.4-0.8,1.9-0.8c0.6,0,1.1,0.2,1.5,0.5l34.5,24.6
			c4.4,3.1,10.2,3.3,14.8,0.6c13-7.8,27.1-13.8,41.8-17.6c5.1-1.4,9-5.6,9.9-10.8l7.2-42.3c0.2-1.3,1.3-2.2,2.6-2.2h42.1
			c1.3,0,2.4,0.9,2.6,2.2l7,41.7c0.9,5.3,4.8,9.6,10,10.9c15.1,3.8,29.5,9.7,42.9,17.6c4.6,2.7,10.3,2.5,14.7-0.6l34.5-24.8
			c0.5-0.3,1-0.5,1.5-0.5c0.4,0,1.2,0.1,1.9,0.8l29.8,29.8c0.9,0.9,1,2.3,0.3,3.4l-24.7,34.7c-3.1,4.3-3.3,10.1-0.6,14.7
			c7.8,13.1,13.6,27.2,17.4,41.9c1.3,5.2,5.6,9.1,10.8,9.9l42,7.1c1.3,0.2,2.2,1.3,2.2,2.6v42.1H451.9z"
                />
                <path
                  d="M239.4,136.001c-57,0-103.3,46.3-103.3,103.3s46.3,103.3,103.3,103.3s103.3-46.3,103.3-103.3S296.4,136.001,239.4,136.001
			z M239.4,315.601c-42.1,0-76.3-34.2-76.3-76.3s34.2-76.3,76.3-76.3s76.3,34.2,76.3,76.3S281.5,315.601,239.4,315.601z"
                />
              </g>
            </svg>
            Settings
          </Link>
          <Link
            to={`/bookings/${currentUser._id}`}
            onClick={props.toggleDropdown}
          >
            <svg
              style={{
                enableBackground: "new 0 0 478.703 478.703",
                width: ".9rem",
                height: ".9rem",
                margin: "0 .5rem -.2rem 0",
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            My Bookings
          </Link>
          <Link to="" onClick={handleLogout}>
            <svg
              viewBox="0 0 64 64"
              style={{
                enableBackground: "new 0 0 64 64",
                width: ".9rem",
                height: ".9rem",
                margin: "0 .5rem -.2rem 0",
              }}
            >
              <g id="Exit_1_">
                <path
                  d="M52.4501991,28.7678509l-5-4.9990005c-0.3768997-0.3770008-0.9902-0.3770008-1.3671989,0
		c-0.3778992,0.3778992-0.3778992,0.9902,0,1.3671989l3.3171997,3.3164005H35.2666016v2h14.1320992l-3.3157005,3.3163986
		c-0.3778992,0.377903-0.3778992,0.9902,0,1.3672028c0.1884995,0.1884995,0.4365997,0.2831993,0.6835976,0.2831993
		c0.2471008,0,0.4951019-0.0946999,0.6836014-0.2831993l5-5.0010014c0.1817017-0.1816006,0.2831993-0.4277,0.2831993-0.6835995
		C52.7333984,29.1946507,52.6319008,28.9495506,52.4501991,28.7678509z"
                />
                <path
                  d="M40.2666016,39.4524498c-0.5527,0-1,0.4473-1,1v10.7900009c0,1.0429993-0.8310013,2.2099991-1.9433022,2.2099991
		h-6.0566998V11.2394505V9.8677502L30.0191994,9.33395L14.0765009,2.56445l-0.2606955-0.112h23.507494
		c1.2168007,0,1.9433022,0.9921999,1.9433022,1.9511998v15.0487995c0,0.5527,0.4473,1,1,1c0.5527992,0,1-0.4473,1-1V4.4036498
		c0-2.1786997-1.7685013-3.9511998-3.9433022-3.9511998H12.2666006c-0.5215998,0-0.9358997,0.4029-0.9822998,0.9124
		L11.2666006,1.35725V1.45245V55.03405l17.1855011,7.3064003l2.8144989,1.2070999v-3.0951004v-5h6.0566998
		c2.3584023,0,3.9433022-2.1767998,3.9433022-4.2099991V40.4524498
		C41.2666016,39.8997498,40.8194008,39.4524498,40.2666016,39.4524498z M29.2665997,11.2394505v49.2129974l-15.999999-6.7766991
		V4.4524498l15.9906988,6.7728004l0.0093002,0.0038996V11.2394505z"
                />
              </g>
            </svg>
            Logout
          </Link>
        </div>
      ) : null}
    </>
  );
};

Navbar.propTypes = {
  toggleState: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  user: PropTypes.object,
  toggleDrop: PropTypes.bool.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  location: PropTypes.object,
  history: PropTypes.object,
};
export default Navbar;
