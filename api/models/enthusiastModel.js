const enthusiastSchema = (sequelize, Sequelize) => {
  const Enthusiast = sequelize.define(
    "Enthusiast",
    {
      _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      accountType: { type: Sequelize.STRING },
      name: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      liscenced: { type: Sequelize.BOOLEAN },
      mailingList: { type: Sequelize.BOOLEAN },
      password: { type: Sequelize.STRING },
      telephone: { type: Sequelize.STRING },
      wallet: { type: Sequelize.JSON },
      avatar: { type: Sequelize.STRING },
    },
    { timestamps: true }
  );

  return Enthusiast;
};

module.exports = enthusiastSchema;
