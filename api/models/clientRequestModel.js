const mongoose = require("mongoose");
const { Schema } = mongoose;

const clientRequestModel = new Schema({
  location: { type: String },
  service: {
    fromList: { type: String },
    additionalDetails: { type: String },
  },
  schedule: {
    fromDate: { type: Date },
    toDate: { type: Date },
    additionalDetails: { type: String },
  },
  fullName: { type: String },
  email: { type: String },
  telephone: { type: String },
});

module.exports = mongoose.model("ClientRequest", clientRequestModel);
