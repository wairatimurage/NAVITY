import React from "react";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <section className="container-fluid">
      <h2>Sorry! This page does not exist</h2>
      <p>
        Go back{" "}
        <b>
          <Link to="/">Home ?</Link>
        </b>
      </p>
    </section>
  );
};
export default PageNotFound;
