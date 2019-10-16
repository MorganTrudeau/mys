import AsyncStorage from "@react-native-community/async-storage";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  passwordResetLoading,
  passwordResetSuccess,
  passwordResetFailure
} from "../actions/auth";
import { firebase } from '@react-native-firebase/auth';
import { loginErrorToMessage } from "../utils";
import { updateUser } from "./activeUser";

export function verifyPhoneNumber(phoneNumber) {
  return firebase.auth().verifyPhoneNumber(phoneNumber);
}

export function phoneAuth(verificationId, verificationCode) {
  return firebase.auth.signInWithCredential();
}

export function resetPassword(email) {
  return function(dispatch) {
    dispatch(passwordResetLoading(email));
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        dispatch(passwordResetSuccess(email));
      })
      .catch(error => {
        dispatch(passwordResetFailure(error.message));
      });
  };
}

export function signUp(email, password, firstName, lastName) {
  return function(dispatch) {
    dispatch(signUpRequest({ email, password }));
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        let user = firebase.auth().currentUser;
        let activeUser = {
          id: user.uid,
          email: user.email,
          firstName,
          lastName
        };
        dispatch(updateUser(activeUser));
        dispatch(signUpSuccess(activeUser));
      })
      .catch(error => {
        dispatch(signUpFailure(loginErrorToMessage(error)));
      });
  };
}

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

export function logout() {
  return firebase.auth().signOut();
}
