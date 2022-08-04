import React from "react";
import "../styles.css";
import "./loading-spinner.css";
export const ElementLoadingSpinner = () => {
  return <div></div>;
};

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container fade">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        {/* <span className="loading-text">Text</span> */}
      </div>
    </div>
  );
};
const DualRingSpinner = () => {
  return <div class="lds-dual-ring"></div>;
};
export const MinimalLoadingSpinner = () => {
  return (
    <div className="minimal-loading-spinner-container">
      <div className="minimal-loading-spinner">
        <div className="minimal-spinner">
          <div>
            <div>
              <div>
                <div></div>
              </div>
            </div>
            <div>
              <div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const ContainedLoadingSpinner = () => {
  return (
    <div className="loading-spinner-container contained-loading-spinner fade">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        {/* <span className="loading-text">Text</span> */}
      </div>
    </div>
  );
};
export default LoadingSpinner;
