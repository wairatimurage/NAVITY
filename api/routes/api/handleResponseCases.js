const handleResponseErrors = (_error) => {
  const option = errorOptions[_error];
  return option;
};
function handleDeleteResponse() {
  return;
}
const errorOptions = {
  invalidEmail: {
    status: 401,
    returnValue: {
      code: "auth/invalid-email",
      message: "User with given email does not exist",
    },
  },
  invalidUser: {
    status: 404,
    returnValue: {
      code: "auth/user-not-found",
      message: "User Account does not exist",
    },
  },
  invalidPassword: {
    status: 401,
    returnValue: {
      code: "auth/incorrect-password",
      message: "The password provided is incorect",
    },
  },
  userExists: {
    status: 304,
    returnValue: {
      code: "auth/email-in use",
      message: "An account already exists with the provided email",
    },
  },
  authError: {
    status: 500,
    returnValue: {
      code: "auth/generic",
      message: "An Error Occured during authentication please try again",
    },
  },
  unauthorized:{
    status: 401,
    returnValue:{
      code: "resource/unauthorized",
      message:"you are not authorized to make this request"
    }
  }
};
function removeSensitiveData_Single() {
  return;
}
function removeSensitiveData_Array() {
  return;
}

module.exports = {
  handleResponseErrors,
  handleDeleteResponse,
  removeSensitiveData_Single,
  removeSensitiveData_Array,
  errorOptions,
};
