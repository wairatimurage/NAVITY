import React, { useState, useEffect } from "react";
import Proptypes from "prop-types";
import StarRating from "./shared/widgets/StarRating";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loadInstitutions } from "../redux/actions/institutionActions";
import { loadPilots } from "../redux/actions/pilotActions";
import {
  filter as loadFilter,
  search as loadSearch,
} from "../redux/actions/genericActions";
import sampleLogo from "../assets/logo-sample.png";
import PageHeader from "./shared/widgets/PageHeader";
import Filter from "./shared/widgets/Filter";

const DetailCard = ({ details, urlPath }) => {
  return (
    <div
      className="card"
      style={{
        // minWidth: "13rem",
        width: "auto",
        padding: ".2rem",
        margin: ".5rem",
      }}
    >
      <Link to={{ pathname: `${urlPath}/${details._id}`, state: { details } }}>
        <div className="card-logo">
          {details.logo ? (
            <img
              src={details.logo}
              style={{
                maxWidth: "13rem",
                boxSizing: "border-box",
              }}
              alt="logo"
            />
          ) : (
            <img
              src={sampleLogo}
              alt="logo"
              style={{
                maxWidth: "13rem",
                boxSizing: "border-box",
              }}
            />
          )}
        </div>
        <p
          style={{
            fontSize: "1.3rem",
            marginTop: ".5rem",
            fontWeight: "500",
            marginLeft: ".5rem",
          }}
        >
          {details.name}
          <button
            style={{ marginLeft: "1rem", color: "blue", border: "none" }}
            href={details.website}
            target="_blank"
          >
            <svg
              width=".9rem"
              height=".9rem"
              viewBox="0 0 32.822 32.822"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                id="Lager_80"
                data-name="Lager 80"
                transform="translate(0 0.822)"
              >
                <path
                  id="Path_89"
                  data-name="Path 89"
                  d="M24,22v5a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V9A1,1,0,0,1,5,8h5a2,2,0,0,0,2-2h0a2,2,0,0,0-2-2H3A3,3,0,0,0,0,7V29a3,3,0,0,0,3,3H25a3,3,0,0,0,3-3V22a2,2,0,0,0-2-2h0A2,2,0,0,0,24,22Z"
                  style={{ fill: "#5d87ea" }}
                />
                <rect
                  id="Rectangle_40"
                  data-name="Rectangle 40"
                  width="16"
                  height="4"
                  rx="2"
                  transform="translate(16 0)"
                  style={{ fill: "#5d87ea" }}
                />
                <rect
                  id="Rectangle_41"
                  data-name="Rectangle 41"
                  width="16"
                  height="4"
                  rx="2"
                  transform="translate(32 0) rotate(90)"
                  style={{ fill: "#5d87ea" }}
                />
                <g id="Group_37" data-name="Group 37">
                  <rect
                    id="Rectangle_42"
                    data-name="Rectangle 42"
                    width="32.296"
                    height="3.971"
                    rx="1.986"
                    transform="translate(7.178 22.014) rotate(-45)"
                    style={{ fill: "#5d87ea" }}
                  />
                </g>
              </g>
            </svg>
          </button>
        </p>

        <StarRating tally={4} />
      </Link>
    </div>
  );
};
const CardList = (props) => {
  const [loadState, setloadState] = useState(false);
  const [list, setList] = useState([]);
  const fetchList = () => {
    if (props.location.pathname === "/institutions") {
      return props
        .loadInstitutions()
        .then((data) => setList(data.institutions))
        .catch((err) => console.log(err));
    }
    return props
      .loadPilots()
      .then((data) => setList(data.pilots))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchList();
    setloadState(true);
  }, [props.location]);

  return (
    <>
      <PageHeader title={props.location.pathname.substring(1)} />
      <Filter list={list} urlPath={props.location.pathname} />
      {loadState ? (
        <section
          className="cardlist container-fluid"
          style={{
            display: "flex",
            flexFlow: "row wrap",
            boxSizing: "border-box",
          }}
        >
          {list.map((item) => (
            <DetailCard
              key={item.name}
              details={item}
              urlPath={props.location.pathname}
            />
          ))}
        </section>
      ) : null}
    </>
  );
};

DetailCard.propTypes = {
  details: Proptypes.object.isRequired,
  urlPath: Proptypes.string,
};

CardList.propTypes = {
  location: Proptypes.object,
  loadInstitutions: Proptypes.func,
  loadPilots: Proptypes.func,
  loadSearch: Proptypes.func,
  loadFilter: Proptypes.func,
};

const mapStateToProps = ({
  pilots,
  institutions,
  searchReults,
  filterResults,
}) => ({
  pilots,
  institutions,
  searchReults,
  filterResults,
});
const mapDispatchToProps = {
  loadInstitutions,
  loadPilots,
  loadSearch,
  loadFilter,
};
export default connect(mapStateToProps, mapDispatchToProps)(CardList);
