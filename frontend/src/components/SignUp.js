import React, { useState } from "react";
import { Link } from "react-router-dom";
// import bg1 from "../assets/page-bg1.jpg";
// import bg2 from "../assets/page-bg2.jpg";
import TextInput from "./shared/widgets/TextInput";
import Proptypes from "prop-types";
import { AccountType, Checklist } from "./SignUpFlow";
import { signUp } from "../utility/apiCalls";

const ProcesssButton = (props) => {
  const status =
    props.box === props.currentBox
      ? { borderBottom: "blue 3px solid" }
      : { color: "#d8d6d6" };
  const checkDisabled = () => {
    let _status = true;
    if (props.currentBox !== "none") {
      if (
        props.box === "checklist" &&
        (props.currentBox === "checklist" ||
          props.currentBox === "accountDetails")
      ) {
        return (_status = false);
      }
      if (
        props.box === "accountDetails" &&
        (props.currentBox === "accountDetails" || props.boxMax === props.box)
      ) {
        return (_status = false);
      }
    }
    return _status;
  };
  checkDisabled();
  return (
    <button
      className="btn"
      disabled={checkDisabled()}
      onClick={() => {
        props.setCurrentBox(props.box);
      }}
      style={{
        outline: "none",
        ...status,
        margin: "0 .1rem .2rem",
        textAlign: "center",
        width: "auto",
        fontSize: ".97rem",
      }}
    >
      {props.text}
    </button>
  );
};

const nameLabel = {
  enthusiast: "Full Name",
  pilot: "Pilot / Company Name",
  institution: "Institution Name",
};
const SignUp = ({ history }) => {
  const [user, setUser] = useState({});
  const [currentBox, setCurrentBox] = useState("accountType");
  const [boxMax, setboxMax] = useState("none");
  const handleInputChange = (event) => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentBox("signupComplete");
    signUp(user)
      .then((response) =>
        response && response._id
          ? history.push(`/${response.accountType}s/${response._id}`)
          : null
      )
      .catch((err) => console.log(err));
  };

  return (
    <section
      className="container-fluid form-page signup-page"
      style={{ minHeight: "43.7rem" }}
    >
      <div className="background-effect">
        <div className="marketing-message">
          <p
            style={{
              fontSize: "3rem",
              marginBottom: ".5rem",
            }}
          >
            Reach new customers, get more sales
          </p>
          <p style={{ fontSize: "1.5rem" }}>
            Join Navity, Kenya&apos;s largest drone registry
          </p>
        </div>

        {currentBox !== "signupComplete" ? (
          <div className="container" style={{ padding: "1.5rem" }}>
            <div className="form-container">
              <div style={{ padding: "1rem", textAlign: "center" }}>
                <h2 style={{ marginBottom: ".5rem" }}>Join Us!</h2>
                <p style={{ margin: "0", fontSize: ".9rem" }}>
                  Create an account and experience awesome perks.
                </p>
              </div>
              <div
                className="breadcrumbs container"
                style={{
                  backgroundColor: "#ffffff7a",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <ProcesssButton
                  text="Checklist"
                  box="checklist"
                  currentBox={currentBox}
                  setCurrentBox={setCurrentBox}
                  boxMax={boxMax}
                />
                <ProcesssButton
                  text="Account Details"
                  box="accountDetails"
                  currentBox={currentBox}
                  setCurrentBox={setCurrentBox}
                  boxMax={boxMax}
                />
              </div>
              {currentBox === "accountType" ? (
                <AccountType
                  setUser={setUser}
                  user={user}
                  changeView={setCurrentBox}
                  setBoxMax={setboxMax}
                />
              ) : null}
              {currentBox === "checklist" ? (
                <Checklist
                  setUser={setUser}
                  user={user}
                  changeView={setCurrentBox}
                  setBoxMax={setboxMax}
                />
              ) : null}
              {currentBox === "accountDetails" ? (
                <form
                  action=""
                  className="container"
                  style={{ display: "block", fontSize: "0.9rem" }}
                  onSubmit={handleSubmit}
                >
                  <TextInput
                    label={nameLabel[user.accountType]}
                    name="name"
                    value={user.name}
                    type="text"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    label="Email"
                    name="email"
                    value={user.email}
                    type="email"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    label="Telephone"
                    name="telephone"
                    value={user.telephone}
                    type="tel"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    label="Password"
                    name="password"
                    value={user.password}
                    type="password"
                    onChange={handleInputChange}
                  />
                  <TextInput
                    label="Confirm Password"
                    name="passwordConfirm"
                    value={user.passwordConfirm}
                    type="password"
                    onChange={handleInputChange}
                  />
                  <button
                    style={{ display: "block", margin: "1rem auto" }}
                    className="btn bg-info"
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </button>
                </form>
              ) : null}
            </div>
            <div
              style={{
                textAlign: "center",
                maxWidth: "400px",
                fontSize: ".95rem",
                color: "#fff",
                margin: "0 auto",
              }}
            >
              <p>
                Already have an account?
                <b>
                  <Link to="/login"> Login</Link>
                </b>
              </p>
            </div>
          </div>
        ) : (
          <div className="container" style={{ padding: "1.5em" }}>
            <div
              className="form-container"
              style={{
                padding: "1rem",
                textAlign: "center",
                minHeight: "18rem",
              }}
            >
              <h2>Welcome to Navity!</h2>
              <p>
                A Verification Email has been sent to you. Kindly check your
                email for the login steps.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

ProcesssButton.propTypes = {
  text: Proptypes.string.isRequired,
  box: Proptypes.string.isRequired,
  currentBox: Proptypes.string.isRequired,
  setCurrentBox: Proptypes.func,
  boxMax: Proptypes.string,
};
SignUp.propTypes = {
  history: Proptypes.object,
};
export default SignUp;
