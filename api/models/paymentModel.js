const paymentSchema = (sequelize, Sequelize) => {
  const Payment = sequelize.define(
    "Payment",
    {
      _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      refId: { type: Sequelize.STRING, unique: true },
      order: { type: Sequelize.JSON, allowNull: true },
      clientId: { type: Sequelize.STRING, allowNull: true },
      initiatedAt: { type: Sequelize.DATE, allowNull: true },
      completed: { type: Sequelize.BOOLEAN, allowNull: true, default: false },
      currency: { type: Sequelize.STRING, allowNull: true },
      bookingFee: { type: Sequelize.INTEGER, allowNull: true },
      totalPayable: { type: Sequelize.INTEGER },
      payment: { type: Sequelize.JSON },
    },
    { timestamps: true }
  );

  return Payment;
};

module.exports = paymentSchema;
