import React, { useState } from "react";
import InfoButton from "./shared/widgets/InfoButton";
import Proptypes from "prop-types";

export const AccountType = (props) => {
  const [accountDescription, setaccountDescription] = useState("none");
  const onInfoClickHandler = (event) => {
    event.preventDefault();
    if (event.target.getAttribute("value") === accountDescription) {
      setaccountDescription("none");
      return;
    }
    setaccountDescription(event.target.getAttribute("value"));
    return;
  };

  const setAccountType = (event) => {
    event.preventDefault();
    props.setUser({
      ...props.user,
      accountType: event.target.getAttribute("value"),
    });
    props.changeView("checklist");
    props.setBoxMax("checklist");
  };

  return (
    <form
      className="container"
      style={{ display: "block", padding: "2rem 0 3rem" }}
    >
      <div style={{ margin: "0 auto", textAlign: "center" }}>
        <button
          className="btn"
          style={buttonStyles}
          value="enthusiast"
          onClick={setAccountType}
        >
          Recreational User
        </button>
        <InfoButton clickHandler={onInfoClickHandler} value="enthusiast" />
        {accountDescription === "enthusiast" ? (
          <p style={descriptionStyles}>
            Suitable for drone enthusiasts with no interest in engaging
            commercially.
          </p>
        ) : null}
      </div>
      <div style={{ margin: "0 auto", textAlign: "center" }}>
        <button
          className="btn"
          style={buttonStyles}
          value="pilot"
          onClick={setAccountType}
        >
          Pilot / Service Provider
        </button>
        <InfoButton clickHandler={onInfoClickHandler} value="pilots" />
        {accountDescription === "pilots" ? (
          <p style={descriptionStyles}>
            Suitable for commercial drone pilots or commercial corporation
            providing drone pilot services
          </p>
        ) : null}
      </div>
      <div style={{ margin: "0 auto", textAlign: "center" }}>
        <button
          className="btn"
          style={buttonStyles}
          value="institution"
          onClick={setAccountType}
        >
          Training Institution
        </button>
        <InfoButton clickHandler={onInfoClickHandler} value="institutions" />
        {accountDescription === "institutions" ? (
          <p style={descriptionStyles}>
            Suitable for institutions that train drone pilots.
          </p>
        ) : null}
      </div>
    </form>
  );
};

export const Checklist = (props) => {
  const setCheckList = (account) => {
    switch (account) {
      case "enthusiast":
        return [
          {
            name: "liscenced",
            text: "I have a KCAA permission for recreational drone use",
          },
          {
            name: "mailingList",
            text:
              "I would like to receive information from drone academies, drone clubs, drone shops, drone tournaments, and events",
          },
        ];
      case "pilot":
        return [
          {
            name: "liscenced",
            text: "I have KCAA permission for commercial operations",
          },
          { name: "insured", text: "I have commercial drone insurance" },
          { name: "professional", text: "I am a professional UAV pilot" },
          {
            name: "premiumJobs",
            text: "I would like to register for the Premium job-link service",
          },
          {
            name: "mailingList",
            text:
              "I would like to receive information by mail on surveys, reports, trends, exclusive discounted deals, and developments in the drone industry.",
          },
        ];
      case "institution":
        return [
          {
            name: "liscenced",
            text: "I have KCAA permission for commercial operations",
          },
          {
            name: "mailingList",
            text:
              "I would like to receive information by mail on surveys, reports, trends, exclusive discounted deals, and developments in the drone industry.",
          },
        ];
      default:
        return;
    }
  };
  const handleCheck = (event) => {
    props.setUser({
      ...props.user,
      [event.target.name]: event.target.checked,
    });
  };
  const setExpiry = (event) => {
    props.setUser({ ...props.user, [event.target.name]: event.target.value });
  };
  const nextBox = () => {
    props.changeView("accountDetails");
    props.setBoxMax("accountDetails");
  };
  const currentChecklist = setCheckList(props.user.accountType);

  return (
    <form
      action=""
      className="container"
      onSubmit={nextBox}
      style={{ display: "block", marginTop: "1.5rem" }}
    >
      {currentChecklist.map((item) => (
        <div
          key={item.name}
          className="form-check"
          style={{ marginTop: "1rem", lineHeight: "1.2rem" }}
        >
          <input
            type="checkbox"
            name={item.name}
            className="form-input-check"
            checked={props.user[item.name] || ""}
            onChange={handleCheck}
          />
          <label style={{ marginLeft: ".5rem", fontSize: ".85rem" }} htmlFor="">
            {item.text}
          </label>
        </div>
      ))}
      {props.user.accountType === "pilot" ? (
        <div className="form-group">
          <label htmlFor="liscenceExpiry" style={{ fontWeight: 500 }}>
            Liscense expiry date:{" "}
          </label>
          <input
            type="date"
            name="liscenceExpiry"
            value={props.user.liscenceExpiry || ""}
            onChange={setExpiry}
            className="form-control"
          />
        </div>
      ) : null}
      <button
        style={{ display: "block", margin: "1rem auto" }}
        className="btn bg-info"
        onClick={nextBox}
      >
        Next
      </button>
    </form>
  );
};

const descriptionStyles = { fontSize: ".9rem", margin: "1rem" };
const buttonStyles = {
  border: ".5px solid #aca6a6",
  marginTop: "1rem",
  width: "12rem",
  backgroundColor: "#aca6a6b0",
};

// prop declarations
const commonProps = {
  user: Proptypes.object,
  setUser: Proptypes.func,
  changeView: Proptypes.func,
  setBoxMax: Proptypes.func,
};
AccountType.propTypes = {
  ...commonProps,
};
Checklist.propTypes = {
  ...commonProps,
};
