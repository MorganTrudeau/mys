export function loginErrorToMessage(error) {
  switch (error.code) {
    case "auth/user-not-found":
      return "There is no user record corresponding to this identifier. Please try another email";
    default:
      return error.message;
  }
}
