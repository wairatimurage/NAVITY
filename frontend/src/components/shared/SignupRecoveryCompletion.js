import React from "react";
import { Link } from "react-router-dom";

const SignupRecoveryCompletion = (props) => {
  return (
    <section className="container-fluid form-page">
      <div className="background-effect">
        <div className="container">
          <div className="form-container">
            <div style={{ padding: "1rem", textAlign: "center" }}>
              <h2>Thank you!</h2>
              <p>An email has been sent to you with the necessary details</p>
            </div>
          </div>
          <div style={{ textAlign: "center", maxWidth: "400px" }}>
            <p>
              Go back to{" "}
              <b>
                <Link to="/">Home</Link>
              </b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignupRecoveryCompletion;
