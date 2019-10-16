import { ActionTypes } from "./ActionTypes";

export const changeAuthLoadingState = loading => ({
  type: ActionTypes.AUTH_LOADING_STATE_CHANGE,
  loading
});

export const verifyPhoneNumber = phoneNumber => ({
  type: ActionTypes.VERIFY_PHONE_NUMBER_REQUEST,
  phoneNumber
});
export const verifyPhoneNumberSuccess = verificationId => ({
  type: ActionTypes.VERIFY_PHONE_NUMBER_SUCCESS,
  verificationId
});
export const verifyPhoneNumberFailure = error => ({
  type: ActionTypes.VERIFY_PHONE_NUMBER_FAILURE,
  error
});

export const phoneAuth = verificationCode => ({
  type: ActionTypes.PHONE_AUTH_REQUEST,
  verificationCode
});
export const phoneAuthSuccess = response => ({
  type: ActionTypes.PHONE_AUTH_SUCCESS,
  response
});
export const phoneAuthFailure = error => ({
  type: ActionTypes.PHONE_AUTH_FAILURE,
  error
});

export const loginRequest = userInfo => {
  return { type: ActionTypes.LOGIN_REQUEST, userInfo };
};
export const loginSuccess = activeUser => {
  return {
    type: ActionTypes.LOGIN_REQUEST_SUCCESS,
    activeUser: activeUser
  };
};
export const loginFailure = error => {
  return {
    type: ActionTypes.LOGIN_REQUEST_FAILURE,
    error
  };
};

export const signUpRequest = userInfo => {
  return { type: ActionTypes.SIGN_UP_REQUEST, userInfo };
};
export const signUpSuccess = activeUser => {
  return { type: ActionTypes.SIGN_UP_REQUEST_SUCCESS, activeUser };
};
export const signUpFailure = error => {
  return { type: ActionTypes.SIGN_UP_REQUEST_FAILURE, error };
};

export const firebaseAuthActive = activeUser => {
  return { type: ActionTypes.FIREBASE_AUTH_ACTIVE, activeUser };
};
export const firebaseAuthInactive = () => {
  return { type: ActionTypes.FIREBASE_AUTH_INACTIVE };
};

export const passwordResetLoading = email => {
  return {
    type: ActionTypes.PASSWORD_RESET_REQUEST_LOADING,
    email
  };
};
export const passwordResetSuccess = email => {
  return {
    type: ActionTypes.PASSWORD_RESET_REQUEST_SUCCESS,
    email
  };
};
export const passwordResetFailure = error => {
  return {
    type: ActionTypes.PASSWORD_RESET_REQUEST_FAILURE,
    error
  };
};
