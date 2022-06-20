const mongoose = require("mongoose");
const { Schema } = mongoose;

const institutionModel = new Schema({
  accountType: { type: String },
  name: { type: String },
  email: { type: String },
  liscenced: { type: Boolean },
  liscenceExpiry: { type: Date },
  // training: { type: Array },
  mailingList: { type: Boolean },
  telephone: { type: Array },
  password: { type: String },
  website: { type: String },
  logo: { type: String },
  contact: { type: Array },
  bio: { type: Object },
  socials: { type: Object },
  locations: { type: Array },
  reviews: { type: Array },
  wallet: { type: Object },
});

// liscenced: { status: {type: Boolean}, expiry: {type: Date}},
// bio: {
//   description:{type: String},
//   training: ["Thermal Inspection", ""],
// }
//     reviews: [
//        {
//           name: {type: String},
//           comment: {type: String},
//           rating: {type: String}
//        }
//     ]
//  }
module.exports = mongoose.model("Institution", institutionModel);
