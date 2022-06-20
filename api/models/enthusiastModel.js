const mongoose = require("mongoose");
const { Schema } = mongoose;

const enthusiastModel = new Schema({
  accountType: { type: String },
  name: { type: String },
  email: { type: String },
  liscenced: { type: Boolean },
  mailingList: { type: Boolean },
  password: { type: String },
  telephone: { type: String },
  wallet: { type: Object },
});

module.exports = mongoose.model("Enthusiast", enthusiastModel);
