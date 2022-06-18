import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextInput from "./shared/widgets/TextInput";

const PasswordRecovery = () => {
  const [user, setUser] = useState({});
  const handleInputChange = (event) => {
    setUser({ [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("reseting password");
  };
  return (
    <section className="container-fluid form-page">
      <div className="background-effect">
        <div className="container" style={{ padding: "3rem 1.5rem" }}>
          <div className="form-container">
            <div style={{ padding: "1rem", textAlign: "center" }}>
              <h2 style={{ marginBottom: ".5rem" }}>Password Recovery</h2>
              <p style={{ margin: "0" }}>
                An email will be sent with the account recovery details.
              </p>
            </div>
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

              <button
                style={{ display: "block", margin: "1rem auto" }}
                className="btn bg-info"
                type="submit"
              >
                Submit
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
              Go back to{" "}
              <b>
                <Link to="/login">Login</Link>
              </b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PasswordRecovery;
