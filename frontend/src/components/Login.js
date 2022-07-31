import React, { useState } from "react";
// import bg1 from "../assets/page-bg1.jpg";
// import bg2 from "../assets/page-bg2.jpg";
import Proptypes from "prop-types";
import TextInput from "./shared/widgets/TextInput";
import { Link } from "react-router-dom";
import { Login as callLogin } from "../utility/apiCalls";

const Login = ({ history }) => {
  const [user, setUser] = useState({});
  const handleLoginError = (data) => {
    console.log(data);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    callLogin(user)
      .then((data) =>
        data._id
          ? history.push(`/${data.accountType}s/${data._id}`)
          : handleLoginError(data)
      )
      .catch((err) => console.log(err));
  };
  const handleInputChange = (event) => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
    console.log(user.remember);
  };

  return (
    <section className="container-fluid form-page">
      <div className="background-effect">
        <div className="container" style={{ padding: "2rem 1.5rem" }}>
          <div className="form-container">
            <div style={{ padding: "1rem", textAlign: "center" }}>
              <h2 style={{ marginBottom: ".5rem" }}>Welcome Back!</h2>
              <p style={{ margin: "0" }}>
                Enter your credentials to access your account
              </p>
            </div>

            {/* <div style={{ height: "1rem" }}>
            <span style={{ position: "fixed" }}></span>
          </div> */}
            <form
              action=""
              className="container"
              style={{ display: "block" }}
              onSubmit={handleSubmit}
            >
              <TextInput
                label="Email"
                name="email"
                value={user.email}
                type="email"
                onChange={handleInputChange}
              />
              <TextInput
                label="Password"
                name="password"
                value={user.password}
                type="password"
                onChange={handleInputChange}
              />
              <div className="form-check">
                <small
                  style={{
                    float: "right",
                    fontSize: ".75rem",
                    color: "gray",
                    marginRight: "1rem",
                  }}
                >
                  <Link to="/password-recovery">Forgot Password ?</Link>
                </small>
                <div style={{ display: "inline" }}>
                  <input
                    type="checkbox"
                    name="remember"
                    value={user.remember}
                    onChange={handleInputChange}
                    className="form-input-check"
                  />
                  <label>Remember Me</label>
                </div>
              </div>
              <button
                style={{ display: "block", margin: "1rem auto" }}
                className="btn bg-info"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
          <div
            style={{
              textAlign: "center",
              maxWidth: "400px",
              color: "#fff",
              margin: "0 auto",
            }}
          >
            <p>
              Don&apos;t have an Account?{" "}
              <b>
                <Link to="/sign-up">Sign Up</Link>
              </b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
// Login styles
// const loginStyles = {};

Login.propTypes = {
  history: Proptypes.object,
};

export default Login;
