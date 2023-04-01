const quoteSchema = (sequelize, Sequelize) => {
  const Quote = sequelize.define(
    "Quote",
    {
  name: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  telephone: { type: Sequelize.STRING },
  location: { type: Sequelize.STRING },
  service: { type: Sequelize.JSON },
  date: { type: Sequelize.JSON },
});

// service:{serviceType:{type: String}, details:{type:String}}
// date:{from:{type:Date}, to:{type:Date}, details:{type:String}}
};
module.exports = quoteSchema;
