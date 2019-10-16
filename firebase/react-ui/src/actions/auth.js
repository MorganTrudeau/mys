import { ActionTypes } from "./ActionTypes";

export const loginRequest = userInfo => {
  return { type: ActionTypes.LOGIN_REQUEST, userInfo };
};

export const loginSuccess = activeUser => {
  return {
    type: ActionTypes.LOGIN_REQUEST_SUCCESS,
    user: activeUser
  };
};

export const loginFailure = error => {
  return {
    type: ActionTypes.LOGIN_REQUEST_FAILURE,
    error
  };
};

export const logoutRequest = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST
  };
};

export const firebaseAuthActive = user => {
  return { type: ActionTypes.FIREBASE_AUTH_ACTIVE, user };
};

export const firebaseAuthInactive = () => {
  return { type: ActionTypes.FIREBASE_AUTH_INACTIVE };
};
