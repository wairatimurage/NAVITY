import React, { useEffect, useState } from "react";
import Proptypes from "prop-types";

import { MinimalLoadingSpinner } from "./shared/widgets/LoadingSpinner";
import { toggleModal } from "../utility/utilityFunctions";
import { makePayment } from "../utility/apiCalls";

const BookingModal = ({ profile, location, user }) => {
  const [bookingStage, setBookingStage] = useState("");
  const [provider, setProvider] = useState({});
  const [loadState, setLoadState] = useState(true);
  const [error, setError] = useState("");
  const [inquiry, setInquiry] = useState({});
  const [booking, setBooking] = useState({});

  const placeInquiry = (event) => {
    event.preventDefault();

    console.log({
      ...inquiry,
      client: { name: user.name, email: user.email },
      email: profile.email,
    });
  };

  const setOrderPayment = (event) => {
    setError("");
    setBooking({ ...booking, paymentMethod: event.target.value });
  };

  const handleMakePayment = (event) => {
    event.preventDefault();
    if (booking.paymentMethod) {
      const _booking = {
        ...booking,
        client: { name: user.name, email: user.email },
        provider: { name: profile.name, email: profile.email },
        bookingFee: 500,
      };
      setLoadState(true);
      makePayment(_booking)
        .then((_res) => {
          setLoadState(false);
          window.open(_res.redirectUrl, "_self");
        })
        .catch((_err) => {
          setLoadState(false);
          console.log("err: ", _err);
        });
      console.log("booking: ", _booking);
    } else {
      setError("Payment Method is required.");
    }
  };

  const _alreadyPaid = (event) => {
    event.preventDefault();
    setLoadState(true);
    alreadyPaid(order)
      .then((_response) => {
        setLoadState(false);
        if (_response.errorMessage) {
          console.log("err: ", _response);
          return;
        }
        if (_response.message) {
          console.log(_response.message);
          // TODO: modal showing order placed previously and details
          // showToast({ message: _response.message, _class: "error" });
          console.log("order: ", _response.order);
          return;
        }
        console.log(_response);
        setBooking({ ...booking, ..._response });
        // setShowPayment(true);
      })
      .catch((_err) => {
        console.log(_err);
      });
  };

  const proceedToPay = (event) => {
    event.preventDefault();
    booking.services && booking.services.length
      ? setBookingStage("pay")
      : setError("Select a Minimum of One service.");
  };

  const handleInquiryInputChange = (event) => {
    event.preventDefault();
    setInquiry({ ...inquiry, [event.target.name]: event.target.value });
  };

  const handleCheck = (event) => {
    const _value = event.target.name;
    setError("");
    console.log("event: ", event.target.checked);
    if (event.target.checked) {
      if (
        (booking.services && !booking.services.includes(_value)) ||
        !booking.services
      ) {
        setBooking({
          ...booking,
          services: [...(booking.services || []), _value],
        });
        console.log({
          ...booking,
          services: [...(booking.services || []), _value],
        });
      }
    } else {
      console.log("ss: ", booking.services);
      console.log("unchecked: ", {
        ...booking,
        services: [...(booking.services || []), _value],
      });
    }
  };

  useEffect(() => {
    setProvider(profile);
  }, []);

  useEffect(() => {
    if (provider) setLoadState(false);
  }, [profile]);

  return (
    <div>
      {loadState ? <MinimalLoadingSpinner /> : null}
      <div className="modal container hide" id="place-inquiry-modal">
        <div className="modal-content">
          <div className="modal-header">
            <button
              className="close-modal"
              data-dismiss="modal"
              data-target="#place-inquiry-modal"
              onClick={toggleModal}
            >
              x
            </button>
            <h2 className="modal-title">Place Inquiry</h2>
          </div>

          <div className="modal-body">
            <form action="" onSubmit={placeInquiry}>
              <p>
                Send your questions/inquiries to <b>{profile.name}</b> and they
                will get back to you.
              </p>
              <div className="form-group">
                <label htmlFor="inquiry">Inquiry: </label>
                <textarea
                  name="inquiry"
                  id="inquiry"
                  cols="30"
                  rows="5"
                  onChange={handleInquiryInputChange}
                  className="form-control"
                ></textarea>
              </div>
              <div className="form-group modal-buttons">
                <button
                  className="btn modal-save-btn"
                  type="submit"
                  data-target="#place-inquiry-modal"
                  onClick={placeInquiry}
                >
                  Place Inquiry
                </button>
                {/* <!-- <button className="btn modal-cancel-btn" onclick="toggleModal">
              Cancel
            </button> --> */}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal container hide" id="place-booking-modal">
        <div className="modal-content">
          <div className="modal-header">
            <button
              className="close-modal"
              data-dismiss="modal"
              data-target="#place-booking-modal"
              onClick={toggleModal}
            >
              x
            </button>
            <h2 className="modal-title">Place Booking</h2>
          </div>

          <div className="modal-body">
            {profile ? (
              <form
                action=""
                onSubmit={!bookingStage ? proceedToPay : handleMakePayment}
              >
                {error ? (
                  <div className="form-group">
                    <span className="error-message">{error}</span>
                  </div>
                ) : null}
                {bookingStage === "pay" ? (
                  <>
                    <div className="form-group">
                      <span>
                        Place Booking for consultation on the following services
                        from {profile.name} at KSh. 500
                      </span>
                    </div>
                    <div className="form-group">
                      <span>
                        <b>Services: </b> {booking.services.toString()}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="payment-method">
                        Select payment Method
                      </label>

                      <div className="form-group">
                        <input
                          type="radio"
                          name="payment"
                          id="mpesa"
                          value="mpesa"
                          checked={booking.paymentMethod === "mpesa"}
                          onChange={setOrderPayment}
                        />

                        <label htmlFor="mpesa">MPESA</label>
                      </div>

                      <div className="form-group">
                        <input
                          type="radio"
                          name="paymentorder-address"
                          id="card"
                          value="card"
                          checked={booking.paymentMethod === "card"}
                          onChange={setOrderPayment}
                        />

                        <label htmlFor="once">Credit/Debit Card</label>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group">
                      <span>
                        Select the services you'd like from{" "}
                        <b>{profile.name}</b>
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="services">Services: </label>
                      {profile.bio &&
                        profile.bio.services.map((item) => (
                          <div
                            key={item}
                            className="form-check"
                            style={{ marginTop: "1rem", lineHeight: "1.2rem" }}
                          >
                            <input
                              type="checkbox"
                              name={item}
                              className="form-input-check"
                              checked={(booking.services || []).includes(item)}
                              onChange={handleCheck}
                            />
                            <label
                              style={{
                                marginLeft: ".5rem",
                                fontSize: ".85rem",
                              }}
                              htmlFor=""
                            >
                              {item}
                            </label>
                          </div>
                        ))}
                    </div>
                  </>
                )}
                <div className="form-group modal-buttons">
                  {bookingStage === "pay" ? (
                    <>
                      <button
                        className="btn bg-primary"
                        onClick={() => setBookingStage("")}
                      >
                        Back
                      </button>
                    </>
                  ) : null}
                  {!bookingStage ? (
                    <button
                      className="btn modal-save-btn"
                      type="submit"
                      data-target="#place-booking-modal"
                      onClick={proceedToPay}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      className="btn modal-save-btn"
                      type="submit"
                      data-target="#place-booking-modal"
                      onClick={handleMakePayment}
                    >
                      Make Payment
                    </button>
                  )}

                  {/* <!-- <button className="btn modal-cancel-btn" onclick="toggleModal">
              Cancel
            </button> --> */}
                </div>
              </form>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

BookingModal.propTypes = {
  profile: Proptypes.object,
  location: Proptypes.object,
  user: Proptypes.object,
};

export default BookingModal;
