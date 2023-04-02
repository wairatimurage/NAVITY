const bookingSchema = (sequelize, Sequelize) => {
  const Booking = sequelize.define(
    "Booking",
    {
      _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      BookingDetails: { type: Sequelize.JSON },
      purchaseBody: { type: Sequelize.JSON },
      client: { type: Sequelize.JSON },
      bookingDate: { type: Sequelize.DATE },
      payment: { type: Sequelize.JSON },
      // additional: { type: String },
      totalPayable: { type: Sequelize.INTEGER },
      bookingFee: { type: Sequelize.INTEGER },
      services: { type: Sequelize.ARRAY(Sequelize.STRING) },
      provider: { type: Sequelize.JSON },
      paymentMethod: { type: Sequelize.STRING },
    },
    { timestamps: true }
  );

  return Booking;
};

module.exports = bookingSchema;
