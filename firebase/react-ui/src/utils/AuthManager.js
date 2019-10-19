import firebase from "../database";
import "firebase/auth";
import {
  changeAuthLoadingState,
  firebaseAuthActive,
  firebaseAuthInactive
} from "../actions/auth";
import AppAlert from "../components/AppAlert/AppAlert";
import store from "../store";
import * as UserActions from "../actions/user";

let authManager;
export const getAuthManager = () => {
  if (!authManager) {
    authManager = new AuthManager();
  }
  return authManager;
};

class AuthManager {
  debounce = false;
  unsubscribeToAuthState = null;

  init = () => {
    this.unsubscribeToAuthState = firebase
      .auth()
      .onAuthStateChanged(authState => {
        // Work around for firebase spam
        if (this.debounce) {
          return;
        }
        this.debounce = true;
        setTimeout(() => (this.debounce = false), 500);

        if (!!authState) {
          const {
            _user: {
              uid,
              email,
              displayName,
              emailVerified,
              photoURL,
              phoneNumber,
              metadata
            }
          } = authState;
          store.dispatch(
            firebaseAuthActive({
              id: uid,
              email,
              displayName,
              emailVerified,
              photoURL,
              phoneNumber,
              metadata
            })
          );
          if (!store.getState().user.activeUserSetUp) {
            store.dispatch(UserActions.fetchActiveUser(uid));
          }
        } else {
          store.dispatch(firebaseAuthInactive());
        }
      });
  };

  destroy = () => {
    this.unsubscribeToAuthState && this.unsubscribeToAuthState();
  };

  showMessageErrorByCode = error => {
    console.log(error);
    let message;
    switch (error.code) {
      case "auth/invalid-phone-number":
        message = "Please enter valid phone number";
        break;
      case "auth/unknown": {
        message = "User blocked by firebase";
        break;
      }
      case "auth/session-expired": {
        message = "SMS code has expired";
        break;
      }
      case "auth/invalid-verification-code": {
        message = "Code is incorrect";
        break;
      }
      case "auth/invalid-email": {
        message = "The email address is badly formatted.";
        break;
      }
      case "auth/weak-password": {
        message = "The password is too weak.";
        break;
      }
      case "auth/email-already-in-use": {
        message = "The email is already in use.";
        break;
      }
      case "auth/requires-recent-login":
        return this.onSessionExpired();
      default:
        message = "Please try again";
    }
    AppAlert.alert("Authentication Failed", message);
  };

  updateDisplayName = async displayName => {
    try {
      store.dispatch(changeAuthLoadingState(true));
      await firebase.auth().currentUser.updateProfile({ displayName });
      return store.dispatch(changeAuthLoadingState(false));
    } catch (error) {
      this.showMessageErrorByCode(error);
      return store.dispatch(changeAuthLoadingState(false));
    }
  };

  updateAvatar = photoURL => {
    return firebase.auth().currentUser.updateProfile({ photoURL });
  };

  linkEmail = async (email, password) => {
    try {
      store.dispatch(changeAuthLoadingState(true));

      const credential = await firebase.auth.EmailAuthProvider.credential(
        email,
        password
      );
      const User = firebase.auth().currentUser;
      await User.linkWithCredential(credential);

      return store.dispatch(changeAuthLoadingState(false));
    } catch (error) {
      this.showMessageErrorByCode(error);
      store.dispatch(changeAuthLoadingState(false));
      throw error.code;
    }
  };

  signInWithEmailAndPassword = async (email, password) => {
    try {
      return await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      this.showMessageErrorByCode(error);
    }
  };

  createUserWithEmailAndPassword = async (email, password) => {
    try {
      return await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    } catch (error) {
      this.showMessageErrorByCode(error);
    }
  };

  signOut = async () => {
    try {
      return await firebase.auth().signOut();
    } catch (error) {
      this.showMessageErrorByCode(error);
    }
  };
}
