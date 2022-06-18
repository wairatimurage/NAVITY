import React, { useState } from "react";
import { getQuotes } from "../utility/apiCalls";
import TextInput from "./shared/widgets/TextInput";
// import { Link } from "react-router-dom";

const GetQuote = () => {
  const [currentBox, setCurrentBox] = useState("location");
  const [jobDetails, setjobDetails] = useState({
    service: { serviceType: {} },
    schedule: {},
  });
  const servicesList = [
    "Aerial Photography",
    "Aerial Survey",
    "Aerial Inspection",
    "Mapping",
    "Videography",
    "Serveillance(Security)",
    "Crop Spraying",
    "Thermal",
    "events",
  ];

  const handleInputChange = (event) => {
    event.preventDefault();
    setjobDetails({ ...jobDetails, [event.target.name]: event.target.value });
  };
  const handleNestedInput = (event) => {
    event.preventDefault();
    const [group, ...name] = event.target.name.split(" ");
    if (event.target.type === "checkbox") {
      setjobDetails({
        ...jobDetails,
        [group]: {
          ...jobDetails[group],
          serviceType: {
            ...jobDetails.service.serviceType,
            [name.join(" ")]: event.target.checked,
          },
        },
      });
    } else if (event.target.type === "textarea") {
      setjobDetails({
        ...jobDetails,
        [group]: { ...jobDetails[group], [name.join(" ")]: event.target.value },
      });
    } else if (event.target.type === "date") {
      setjobDetails({
        ...jobDetails,
        schedule: {
          ...jobDetails.schedule,
          [event.target.name]: event.target.value,
        },
      });
    }
  };
  const checkEmptyValue = (group, valueName) => (group ? group[valueName] : "");
  const handleSubmit = (event) => {
    event.preventDefault();
    getQuotes(jobDetails).then((data) => {
      console.log(data);
      nextBox();
    });
  };
  const nextBox = () => {
    switch (currentBox) {
      case "location":
        return setCurrentBox("services");
      case "services":
        return setCurrentBox("schedule");
      case "schedule":
        return setCurrentBox("clientDetails");
      case "clientDetails":
        return setCurrentBox("complete");
      default:
        return setCurrentBox("location");
    }
  };
  const previousBox = () => {
    switch (currentBox) {
      case "services":
        return setCurrentBox("location");
      case "schedule":
        return setCurrentBox("services");
      case "clientDetails":
        return setCurrentBox("schedule");
      default:
        return setCurrentBox("location");
    }
  };

  return (
    <div
      className="container form-container"
      style={{ maxWidth: "450px", margin: "1rem 0" }}
    >
      {/* Location Box */}
      {currentBox === "location" ? (
        <form id="location" className="container" onSubmit={nextBox}>
          <div style={{ padding: ".5rem", textAlign: "center" }}>
            <h2 style={{ marginBottom: ".5rem", fontSize: "1.4rem" }}>
              Get Your Pilot Now!
            </h2>
            <p style={{ margin: "0" }}>
              Hire from a pool of the best KCAA approved pilots in the country.
            </p>
          </div>
          <div className="container">
            <TextInput
              label="Enter Location"
              placeholder="County, Town"
              name="location"
              required
              value={jobDetails.location}
              onChange={handleInputChange}
            />
          </div>
        </form>
      ) : null}
      {/* Services Box */}
      {currentBox === "services" ? (
        <form id="services" className="container" onSubmit={nextBox}>
          <div style={{ padding: ".5rem", textAlign: "center" }}>
            <h2 style={{ marginBottom: ".5rem", fontSize: "1.4rem" }}>
              Services Available
            </h2>
            <p style={{ margin: "0" }}>
              What type of services would you require?
            </p>
          </div>
          <div className="container">
            {servicesList.map((key) => (
              <div key={key} className="form-group">
                <div className="form-check">
                  <input
                    type="checkbox"
                    name={`service ${key}`}
                    onChange={handleNestedInput}
                    checked={jobDetails.service.serviceType[key] || ""}
                    className="form-input-check"
                  />
                  <label htmlFor="service">{key}</label>
                </div>
              </div>
            ))}
            <div className="form-group">
              <label htmlFor="otherDetails">Additional Details:</label>
              <textarea
                name="service details"
                onChange={handleNestedInput}
                value={checkEmptyValue(jobDetails.service, "details")}
                style={{
                  width: "90%",
                  resize: "none",
                  overflow: "auto",
                  fontFamily: "inherit",
                }}
                rows="6"
              ></textarea>
            </div>
          </div>
        </form>
      ) : null}
      {/* Schedule Box */}
      {currentBox === "schedule" ? (
        <form id="schedule" className="container" onSubmit={nextBox}>
          <div style={{ padding: ".5rem", textAlign: "center" }}>
            <h2 style={{ marginBottom: ".5rem", fontSize: "1.4rem" }}>
              Schedule
            </h2>
            <p style={{ margin: "0" }}>
              To ensure service quality please state a timeframe within which
              services are required.
            </p>
          </div>
          <div className="container">
            <div className="row date-picker">
              <div className="form-group">
                <label htmlFor="fromDate">From:</label>
                <input
                  type="date"
                  name="from"
                  onChange={handleNestedInput}
                  value={jobDetails.schedule.from || ""}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="toDate">To:</label>
                <input
                  type="date"
                  name="to"
                  onChange={handleNestedInput}
                  value={jobDetails.schedule.to || ""}
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="schedule details">Additional Details:</label>
              <textarea
                name="schedule details"
                onChange={handleNestedInput}
                value={jobDetails.schedule.details || ""}
                style={{
                  width: "90%",
                  resize: "none",
                  overflow: "auto",
                  fontFamily: "inherit",
                }}
                rows="6"
              ></textarea>
            </div>
          </div>
        </form>
      ) : null}
      {/* Client Details Box */}
      {currentBox === "clientDetails" ? (
        <form id="clientDetails" className="container" onSubmit={handleSubmit}>
          <div style={{ padding: ".5rem", textAlign: "center" }}>
            <h2 style={{ marginBottom: ".5rem", fontSize: "1.4rem" }}>
              Contact Info
            </h2>
            <p style={{ margin: "0" }}>
              Where would you like your quote to be sent?
            </p>
          </div>
          <div className="container">
            <TextInput
              label="Full Name"
              placeholder=""
              name="name"
              required
              value={jobDetails.name}
              onChange={handleInputChange}
            />
            <TextInput
              label="Email"
              placeholder="example@x.com"
              name="email"
              type="email"
              required
              value={jobDetails.email}
              onChange={handleInputChange}
            />
            <TextInput
              label="Telephone"
              name="telephone"
              type="tel"
              required
              value={jobDetails.telephone}
              onChange={handleInputChange}
            />
            {/* <div className="form-group">
              <label htmlFor="otherDetails">Additional Details:</label>
              <textarea
                name="otherDetails"
                id=""
                style={{
                  width: "90%",
                  resize: "none",
                  overflow: "auto",
                  fontFamily: "inherit",
                }}
                rows="6"
              ></textarea>
            </div> */}
          </div>
        </form>
      ) : null}
      {/* Completion Box */}
      {currentBox === "complete" ? (
        <div id="complete" className="container">
          <div style={{ padding: ".5rem", textAlign: "center" }}>
            <h2 style={{ marginBottom: ".5rem", fontSize: "1.4rem" }}>
              Thank You For Choosing Us!
            </h2>
            <p style={{ margin: "0" }}>
              One of our pilots will reach out to you soon.
            </p>
          </div>
          <div className="container"></div>
        </div>
      ) : null}
      <div style={{ textAlign: "center", margin: "1rem" }}>
        {currentBox !== "location" && currentBox !== "complete" ? (
          <button className="btn bg-primary" onClick={previousBox}>
            Back
          </button>
        ) : null}
        {
          currentBox === "clientDetails" ? (
            <button
              type="submit"
              className="btn bg-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          ) : currentBox !== "complete" ? (
            <button className="btn bg-primary" type="submit" onClick={nextBox}>
              {currentBox === "location" ? "Get Quote" : "Proceed"}
            </button>
          ) : null
          // <button className="btn bg-primary" onClick={nextBox}>
          //   <Link to="/signup">Sign Up</Link>
          // </button>
        }
      </div>
    </div>
  );
};
export default GetQuote;
