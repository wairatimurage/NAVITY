const clientRequestsSchema = (sequelize, Sequelize) => {
  const ClientRequest = sequelize.define(
    "ClientRequest",
    {
      location: { type: Sequelize.STRING },
      service: {
        fromList: { type: Sequelize.STRING },
        additionalDetails: { type: Sequelize.STRING },
      },
      schedule: {
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
