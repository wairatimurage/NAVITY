const pilotSchema = (sequelize, Sequelize) => {
  const Pilot = sequelize.define("Pilot", {
    _id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: { type: Sequelize.STRING },
    accountType: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    insured: { type: Sequelize.BOOLEAN },
    liscenced: { type: Sequelize.BOOLEAN },
    liscenceExpiry: { type: Sequelize.DATE },
    mailingList: { type: Sequelize.BOOLEAN },
    services: { type: Sequelize.ARRAY(Sequelize.STRING) },
    professional: { type: Sequelize.BOOLEAN },
    telephone: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    website: { type: Sequelize.STRING },
    avatar: { type: Sequelize.STRING },
    socials: { type: Sequelize.JSON },
    bio: { type: Sequelize.JSON },
    location: { type: Sequelize.ARRAY(Sequelize.STRING) },
    reviews: { type: Sequelize.ARRAY(Sequelize.STRING) },
    wallet: { type: Sequelize.JSON },
  });
  return Pilot;
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
};

module.exports = pilotSchema;
