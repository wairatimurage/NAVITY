const Sequelize = require("sequelize");
require("dotenv").config();

const DB_POOL = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000,
};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    operatorsAliases: "0",
    pool: DB_POOL,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Bookings = require("./bookingModel")(sequelize, Sequelize);
db.ClientRequests = require("./clientRequestModel")(sequelize, Sequelize);
db.Enthusiasts = require("./enthusiastModel")(sequelize, Sequelize);
db.Institutions = require("./institutionModel")(sequelize, Sequelize);
db.Payments = require("./paymentModel")(sequelize, Sequelize);
db.Pilots = require("./pilotModel")(sequelize, Sequelize);
db.Posts = require("./postModel")(sequelize, Sequelize);
db.Quotes = require("./quoteModel")(sequelize, Sequelize);

module.exports = db;
