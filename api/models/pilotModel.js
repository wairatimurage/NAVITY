const mongoose = require("mongoose");
const { Schema } = mongoose;

const pilotModel = new Schema({
  name: { type: String },
  accountType: { type: String },
  email: { type: String },
  insured: { type: Boolean },
  liscenced: { type: Boolean },
  liscenceExpiry: { type: Date },
  mailingList: { type: Boolean },
  services: { type: Array },
  professional: { type: Boolean },
  telephone: { type: String },
  password: { type: String },
  website: { type: String },
  logo: { type: String },
  socials: { type: Object },
  bio: { type: Object },
  location: { type: Array },
  reviews: { type: Array },
});
// TODO : add instance method to generate id
// pilotModel.methods.insertId= function(){
//   return this.model("Pilot").
// }
// liscenced: { status: {type: Boolean}, expiry: {type: Date}},
// bio Schema{
//        description:{type: String},
//        services: {type: Array},
//        dronesFlown: {type: Array},
//        rating: {type:Array}
//     }

// socials {
//    instagram: {type: String},
//    twitter: {type : String},
//    linkedIn: {type : String}
// }
//     reviews: [
//        {
//           name: {type: String},
//           comment: {type: String},
//           rating: {type: String}
//        }
//     ]
//  }

module.exports = mongoose.model("Pilot", pilotModel);
