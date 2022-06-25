class CustomError extends Error {
  constructor(message, name, ...params) {
    super(...params);
    this.name = name;
    this.message = message;
  }
}

const handleResponseErrors = (_error) => {
  switch (_error) {
    case "invalidPassword":
      throw new CustomError(
        "Credentials provided are incorect",
        "invalidCredentials"
      );
    case "invalidEmail":
      throw new CustomError(
        "Credentials provided are incorect",
        "invalidCredentials"
      );
    case "userExists":
      throw new CustomError("User with email already exists", "userExists");
    case "authError":
      throw new CustomError(
        "An error occured during authentication. Please try again",
        "authError"
      );
    default:
      throw new CustomError(
        "Sorry, an error occured. Please try again.",
        "genericError"
      );
  }
};

const handleServerErrors = (_err) => {
  // TODO: log errors
  console.log(_err);
};

const handlePaymentErrors = (_err) => {
  console.log(_err);
};

module.exports = {
  CustomError,
  handleResponseErrors,
  handleServerErrors,
  handlePaymentErrors,
};
