import React, { useState } from "react";
import PropTypes from "prop-types";
import { checkEmpty } from "../../../utility/formatingFunctions";
import TextInput from "./TextInput";

const EditListItem = (props) => {
  const deleteItem = (event) => {
    const value = event.target.getAttribute("value");
    props.setUser({
      ...props.user,
      [props.group]: {
        ...props.user[props.group],
        [props.nameValue]: props.list.filter((item) => item !== value),
      },
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#ced4da52",
        padding: ".2rem .5rem",
        marginBottom: ".1rem",
        lineHeight: "2rem",
      }}
    >
      <div>
        <span
          value={props.value}
          style={{ float: "right", cursor: "pointer" }}
          onClick={deleteItem}
        >
          <svg
            value={props.value}
            version="1.1"
            width="1.2rem"
            height="1.2rem"
            viewBox="0 0 482.428 482.429"
            style={{
              enableBackground: "new 0 0 482.428 482.429",
              marginBottom: "-.3rem",
              marginRight: ".5rem",
            }}
          >
            <g>
              <g>
                <path
                  value={props.value}
                  d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098
			c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117
			h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828
			C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879
			C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096
			c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266
			c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979
			V115.744z"
                />
                <path
                  value={props.value}
                  d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07
			c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"
                />
                <path
                  value={props.value}
                  d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07
			c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"
                />
                <path
                  value={props.value}
                  d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07
			c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"
                />
              </g>
            </g>
          </svg>
        </span>
        <span>{props.value}</span>
      </div>
    </div>
  );
};

const EditList = (props) => {
  const [group, nameValue] = props.name.split(" ");
  const [currentEdit, setCurrentEdit] = useState("");
  const [addState, setAddState] = useState(false);
  const toggleAdd = (event) => {
    event.preventDefault();
    setAddState(!addState);
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setCurrentEdit(event.target.value);
  };

  const appendToArray = (event) => {
    event.preventDefault();
    props.setUser({
      ...props.user,
      [group]: {
        ...props.user[group],
        [nameValue]: [
          ...(props.user[group][nameValue] || []),
          event.target.value,
        ],
      },
    });
    setCurrentEdit("");
  };

  return (
    <div className="form-group">
      <div>
        <label htmlFor={props.name}>{props.label}</label>
        <>
          <div style={{ width: "100%" }}>
            <button
              onClick={toggleAdd}
              className="btn"
              style={{ color: "#629be6", lineHeight: "1.5rem", float: "right" }}
            >
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  stroke: "#629be6",
                  height: "1.4rem",
                  width: "1.4rem",
                  marginRight: ".5rem",
                  verticalAlign: "middle",
                  marginTop: "-.2rem",
                }}
              >
                {addState ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                )}
              </svg>
              <span>{addState ? "Colapse" : "Add new"}</span>
            </button>
          </div>
          {addState ? (
            <div style={{ clear: "both" }}>
              <TextInput
                name=""
                label={"Name:"}
                value={currentEdit}
                onBlur={appendToArray}
                onChange={handleInputChange}
              />
            </div>
          ) : null}
        </>

        <div
          style={{
            margin: ".5rem 0",
            boxSizing: "border-box",
            border: "1px solid #ced4da",
            clear: "both",
          }}
        >
          {props.list
            ? props.list.map((value) =>
                checkEmpty(
                  value,
                  <EditListItem
                    key={value}
                    value={value}
                    list={props.list}
                    user={props.user}
                    setUser={props.setUser}
                    group={group}
                    nameValue={nameValue}
                  />
                )
              )
            : null}
        </div>
      </div>
    </div>
  );
};

EditListItem.propTypes = {
  value: PropTypes.string,
  list: PropTypes.array,
  setUser: PropTypes.func,
  user: PropTypes.object,
  nameValue: PropTypes.string,
  group: PropTypes.string,
};
EditList.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  list: PropTypes.array,
  setUser: PropTypes.func,
  user: PropTypes.object,
};

export default EditList;
