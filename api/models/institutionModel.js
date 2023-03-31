const institutionSchema = (sequelize, Sequelize) => {
  const Institution = sequelize.define(
    "Institution",
    {
      accountType: { type: Sequelize.STRING },
      name: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      liscenced: { type: Sequelize.BOOLEAN },
      liscenceExpiry: { type: Date },
      // training: { type: Sequelize.ARRAY },
      mailingList: { type: Sequelize.BOOLEAN },
      telephone: { type: Sequelize.ARRAY },
      password: { type: Sequelize.STRING },
      website: { type: Sequelize.STRING },
      avatar: { type: Sequelize.STRING },
      contact: { type: Sequelize.ARRAY },
      bio: { type: Sequelize.JSON },
      socials: { type: Sequelize.JSON },
      locations: { type: Sequelize.ARRAY },
      reviews: { type: Sequelize.ARRAY },
      wallet: { type: Sequelize.JSON },
    },
    { timestamps: true }
  );

  return Institution;
};

module.exports = institutionSchema;

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
