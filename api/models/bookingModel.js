const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingModel = new Schema({
  orderNumber: { type: String },
  items: { type: Array },
  clientDetails: { type: Object },
  address: { type: Object },
  orderDate: { type: Date },
  status: { type: String },
  processedDate: { type: Date },
  ETA: { type: Date },
  fulfillmentDate: { type: Date },
  payment: { type: Object },
  additional: { type: String },
  totalPayable: { type: Number },
});

module.exports = mongoose.model("Booking", bookingModel);
