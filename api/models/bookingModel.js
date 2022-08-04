const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingModel = new Schema({
  client: { type: Object },
  bookingDate: { type: Date },
  payment: { type: Object },
  // additional: { type: String },
  totalPayable: { type: Number },
  bookingFee: { type: Number },
  services: { type: Array },
  provider: { type: Object },
  paymentMethod: { type: String },
});

module.exports = mongoose.model("Booking", bookingModel);
