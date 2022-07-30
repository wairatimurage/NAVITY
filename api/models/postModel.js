const { model, Schema } = require("mongoose");

const postModel = new Schema({
  id: { type: String, required: true },
  title: { type: String, unique: true },
  articleText: { type: String },
  mainImage: { type: String },
  stars: { type: Number, default: 0 },
  images: { type: Array },
  status: { type: String, required: true },
  publishedOn: { type: Date, required: true },
  updatedOn: { type: Date },
});

module.exports = model("Post", postModel);
