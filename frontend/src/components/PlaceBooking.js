import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { MinimalLoadingSpinner } from "./shared/widgets/LoadingSpinner";
import { completeBooking, prepaidDetails } from "../utility/apiCalls";

const PlaceBooking = ({ location, history }) => {
  const [currentBooking, setCurrentBooking] = useState({});
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(true);

  const handlePlaceBooking = () => {
    setShowLoadingSpinner(true);
    completeBooking(currentBooking)
      .then((_res) => {
        setShowLoadingSpinner(false);
        if (_res.errorMessage) return alert(_res.errorMessage);
        alert("Booking succesfully placed.");
        history.push("/");
      })
      .catch((_err) => {
        console.log(_err);
      });
  };

  useEffect(() => {
    const getParams = () => {
      const _params = location.search.replace("?", "").split("&");
      let _paramsObject;
      _params.map((_val) => {
        let _valArray = _val.split("=");
        _paramsObject = { ..._paramsObject, [_valArray[0]]: _valArray[1] };
      });
      return _paramsObject;
    };

    const _paymentId = location.pathname.split("/").slice(-1).toString();

    prepaidDetails(_paymentId, getParams())
      .then((_res) => {
        setShowLoadingSpinner(false);
        if (_res.errorMessage) {
          console.log("err: ", _res);
          return;
        }
        setCurrentBooking(_res);
      })
      .catch((_err) => {
        setShowLoadingSpinner(false);
        console.log(_err);
        console.log(_err);
      });
  }, []);

  console.log("booking: ", currentBooking);
  return (
    <>
      {showLoadingSpinner ? <MinimalLoadingSpinner /> : null}
      <div>
        {Object.keys(currentBooking).length ? (
          <div className="booking-complete">
            <p className="booking-complete-h1">Complete Booking</p>
            <div className="form-group">
              <p>
                <span>Name: </span> {currentBooking.client.name}
              </p>
            </div>
            <div className="form-group">
              <p>
                <span>Email: </span> {currentBooking.client.email}
              </p>
            </div>
            <div className="form-group">
              <p className="booking-complete-h2">
                {currentBooking.paymentMethod} Payment
              </p>
            </div>
            <div className="form-group">
              <p>
                <span>Ksh {currentBooking.bookingFee}</span> (Booking)
              </p>
            </div>
            <div className="form-group">
              <p>
                <span>Services: </span>
                {currentBooking.services.toString()}
              </p>
            </div>
            <div className="form-group">
              <p>
                <span>From: </span>
                {currentBooking.provider.name} ({currentBooking.provider.email})
              </p>
            </div>
            <div
              className="form-group"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <button className="btn bg-primary" onClick={handlePlaceBooking}>
                Place Booking
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default PlaceBooking;

PlaceBooking.propTypes = {
  //   profile: Proptypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  //   user: Proptypes.object,
};
