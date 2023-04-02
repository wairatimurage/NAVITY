const clientRequestsSchema = (sequelize, Sequelize) => {
  const ClientRequest = sequelize.define(
    "ClientRequest",
    {
      _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      location: { type: Sequelize.STRING },
      service: {
        type: Sequelize.JSON,
        fromList: { type: Sequelize.STRING },
        additionalDetails: { type: Sequelize.STRING },
      },
      schedule: {
        type: Sequelize.JSON,
        fromDate: { type: Sequelize.DATE },
        toDate: { type: Sequelize.DATE },
        additionalDetails: { type: Sequelize.STRING },
      },
      fullName: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      telephone: { type: Sequelize.STRING },
    },
    { timestamps: true }
  );

  return ClientRequest;
};

module.exports = clientRequestsSchema;
