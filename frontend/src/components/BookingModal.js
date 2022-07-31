import React, { useState } from "react";
import { toggleModal } from "../utility/utilityFunctions";

const BookingModal = ({ profile }) => {
  const [bookingStage, setBookingStage] = useState("");

  const placeInquiry = (event) => {
    event.preventDefault();
  };

  const placeBooking = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      BookingModal
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
      <div className="modal container fase" id="place-booking-modal">
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
            <form action="" onSubmit={placeBooking}>
              <div className="form-group modal-buttons">
                <button
                  className="btn modal-save-btn"
                  type="submit"
                  data-target="#place-booking-modal"
                  onClick={placeBooking}
                >
                  Make Booking
                </button>
                {/* <!-- <button className="btn modal-cancel-btn" onclick="toggleModal">
              Cancel
            </button> --> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
