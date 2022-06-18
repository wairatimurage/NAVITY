import React from "react";
import PropTypes from "prop-types";

const TextInput = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type={props.type || "text"}
        name={props.name}
        placeholder={props.placeholder}
        className="form-control"
        value={props.value || ""}
        onChange={props.onChange}
      />
      {props.error && <div className="error-div">{props.error}</div>}
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
};

TextInput.defaultProps = {
  error: "",
};
export default TextInput;
