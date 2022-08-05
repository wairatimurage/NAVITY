import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { fetchBookings } from "../utility/apiCalls";

const Bookings = ({ location }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const _paymentId = location.pathname.split("/").slice(-1).toString();
    console.log(_paymentId);
    fetchBookings(_paymentId).then((_res) => {
      console.log("ss: ", _res);
    });
  }),
    [];

  return <div>Bookings</div>;
};

export default Bookings;

Bookings.propTypes = {
  location: PropTypes.object,
};
