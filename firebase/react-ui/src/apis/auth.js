import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest
} from "../actions/auth";
import firebase from "../database";
import { loginErrorToMessage } from "../utils";


export function auth(email, password) {
  return function(dispatch) {
    // Authorize user in database
    dispatch(loginRequest({ email, password }));
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        let user = firebase.auth().currentUser;
        let activeUser = { id: user.uid, name: user.displayName };
        dispatch(loginSuccess(activeUser));
        return null;
      })
      .catch(error => {
        dispatch(loginFailure(loginErrorToMessage(error)));
        return loginErrorToMessage(error);
      });
  };
}

export function deAuth() {
  return function(dispatch) {
    // Logout user from database
    return firebase
      .auth()
      .signOut()
      .then(() => {
        // Update state with null user
        dispatch(logoutRequest());
      });
  };
}
