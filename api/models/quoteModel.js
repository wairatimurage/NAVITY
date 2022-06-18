const mongoose = require("mongoose");
const { Schema } = mongoose;

const quoteModel = new Schema({
  name: { type: String },
  email: { type: String },
  telephone: { type: String },
  location: { type: String },
  service: { type: Object },
  date: { type: Object },
});

// service:{serviceType:{type: String}, details:{type:String}}
// date:{from:{type:Date}, to:{type:Date}, details:{type:String}}

module.exports = mongoose.model("Quote", quoteModel);
