const quoteSchema = (sequelize, Sequelize) => {
  const Quote = sequelize.define("Quote", {
    _id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    telephone: { type: Sequelize.STRING },
    location: { type: Sequelize.STRING },
    service: { type: Sequelize.JSON },
    date: { type: Sequelize.JSON },
  });

  return Quote;
  // service:{serviceType:{type: String}, details:{type:String}}
  // date:{from:{type:Date}, to:{type:Date}, details:{type:String}}
};

module.exports = quoteSchema;
