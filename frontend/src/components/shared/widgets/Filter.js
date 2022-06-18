import React, { useState } from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";

const Filter = ({ urlPath }) => {
  const [search, setsearch] = useState({});
  const [filters, setFilters] = useState({ services: {} });
  const [showFilters, setShowFilters] = useState(false);
  const toggleShowFilters = () => setShowFilters(!showFilters);
  const handleInputChange = (event) => {
    setsearch({ [event.target.name]: event.target.value });
  };
  const handleFiltersChange = (event) => {
    if (event.target.type === "text") {
      return setFilters({
        ...filters,
        [event.target.name]: event.target.value,
      });
    }
    if (event.target.type === "checkbox") {
      return setFilters({
        ...filters,
        services: {
          ...filters.services,
          [event.target.name]: event.target.checked,
        },
      });
    }
  };
  const handleSearch = (event) => {
    event.preventDefault();
    console.log(search);
  };
  const servicesList = {
    ["/pilots"]: [
      "Aerial Photography",
      "Aerial Survey",
      "Aerial Inspection",
      "Mapping",
      "Videography",
      "Serveillance(Security)",
      "Crop Spraying",
      "Thermal",
      "events",
    ],
    ["/institutions"]: [
      "Aerial Photography",
      "Aerial Survey",
      "Aerial Inspection",
      "Mapping",
      "Videography",
      "Serveillance(Security)",
      "Crop Spraying",
      "Thermal",
    ],
  };

  return (
    <section
      className="container-fluid"
      style={{
        backgroundColor: "#ffffff",
        marginBottom: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <div style={{ display: "flex" }}>
        <form onSubmit={handleSearch}>
          <TextInput
            placeholder="Search..."
            name="searchQuery"
            onChange={handleInputChange}
            value={search.searchQuery}
          />
        </form>
        <button
          className="btn"
          onClick={toggleShowFilters}
          style={{ paddingBottom: "0rem" }}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 210.68 210.68"
            height="1.2rem"
            width="1.2rem"
            style={{
              enableBackground: "new 0 0 210.68 210.68",
              marginBottom: "-.5rem",
            }}
          >
            <path
              d="M205.613,30.693c0-10.405-10.746-18.149-32.854-23.676C154.659,2.492,130.716,0,105.34,0
	C79.965,0,56.021,2.492,37.921,7.017C15.813,12.544,5.066,20.288,5.066,30.693c0,3.85,1.476,7.335,4.45,10.479l68.245,82.777v79.23
	c0,2.595,1.341,5.005,3.546,6.373c1.207,0.749,2.578,1.127,3.954,1.127c1.138,0,2.278-0.259,3.331-0.78l40.075-19.863
	c2.55-1.264,4.165-3.863,4.169-6.71l0.077-59.372l68.254-82.787C204.139,38.024,205.613,34.542,205.613,30.693z M44.94,20.767
	C61.467,17.048,82.917,15,105.34,15s43.874,2.048,60.399,5.767c18.25,4.107,23.38,8.521,24.607,9.926
	c-1.228,1.405-6.357,5.819-24.607,9.926c-16.525,3.719-37.977,5.767-60.399,5.767S61.467,44.338,44.94,40.62
	c-18.249-4.107-23.38-8.521-24.607-9.926C21.56,29.288,26.691,24.874,44.94,20.767z M119.631,116.486
	c-1.105,1.341-1.711,3.023-1.713,4.761l-0.075,57.413l-25.081,12.432v-69.835c0-1.741-0.605-3.428-1.713-4.771L40.306,54.938
	C58.1,59.1,81.058,61.387,105.34,61.387c24.283,0,47.24-2.287,65.034-6.449L119.631,116.486z"
            />
          </svg>{" "}
          <span
            style={{
              marginLeft: ".3rem",
              verticalAlign: "bottom",
              lineHeight: "1.2rem",
            }}
          >
            {" "}
            Filter
          </span>
        </button>
      </div>
      {showFilters ? (
        <div
          className="filters-dropdown"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          <div style={{ minWidth: "200px", marginRight: "2rem" }}>
            <TextInput
              label="Location: "
              name="location"
              onChange={handleFiltersChange}
              value={filters.location}
            />
          </div>
          <div className="form-group">
            <label style={{ fontSize: "1rem" }}>Services</label>
            <div
              style={{
                fontSize: ".9rem",
                padding: "0 0 2rem",
                display: "flex",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                marginRight: "1rem",
              }}
            >
              {servicesList[urlPath].map((property) => (
                <div
                  className="form-check"
                  key={property}
                  style={{ paddingLeft: "2rem" }}
                >
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleFiltersChange}
                    checked={filters.services[property]}
                    name={property}
                  />
                  <label htmlFor={property}>{property}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

Filter.propTypes = {
  list: PropTypes.array,
  urlPath: PropTypes.string,
  // filters: PropTypes.array,
  // search: PropTypes.string,
};
export default Filter;
