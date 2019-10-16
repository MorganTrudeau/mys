import { firebase } from "@react-native-firebase/auth";
import {
  changeAuthLoadingState,
  firebaseAuthActive,
  firebaseAuthInactive
} from "../actions/auth";
import { NavigationActions } from "react-navigation";
import AppAlert from "../components/AppAlert";
import AsyncStorage from "@react-native-community/async-storage";
import NavigationService from "../navigation/NavigationService";
import { store } from "../store";
import * as UserActions from "../actions/user";

const { PhoneAuthState } = firebase.auth;

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
    this.unsubscribeToAuthState = firebase.auth().onUserChanged(authState => {
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
        if (!email) {
          NavigationService.navigate("EmailInputScreen");
        } else if (!displayName) {
          NavigationService.navigate("DisplayNameInputScreen");
        } else if (!store.getState().user.activeUserSetUp) {
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

  saveVerificationId = verificationId => {
    return AsyncStorage.setItem("verification_id", verificationId);
  };

  fetchVerificationId = () => {
    return AsyncStorage.getItem("verification_id");
  };

  verifyPhoneNumber = (phoneNumber, formattedPhoneNumber) => {
    store.dispatch(changeAuthLoadingState(true));

    return firebase
      .auth()
      .verifyPhoneNumber(phoneNumber)
      .on("state_changed", async phoneAuthSnapshot => {
        const { verificationId, code, error, state } = phoneAuthSnapshot;
        switch (state) {
          case PhoneAuthState.CODE_SENT:
            await this.saveVerificationId(verificationId);
            NavigationService.navigate("CodeVerificationScreen", {
              phoneNumber,
              formattedPhoneNumber
            });
            break;
          case PhoneAuthState.AUTO_VERIFIED:
            await this.saveVerificationId(verificationId);
            await this.authenticatePhone(code);
            break;

          case PhoneAuthState.AUTO_VERIFY_TIMEOUT:
            AppAlert.alert(
              "Request Timeout",
              "Check your network connection and try again"
            );
            break;

          case PhoneAuthState.ERROR:
            this.showMessageErrorByCode(error);
            break;
        }

        store.dispatch(changeAuthLoadingState(false));
      });
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

  authenticatePhone = async code => {
    try {
      store.dispatch(changeAuthLoadingState(true));

      const verificationId = await this.fetchVerificationId();
      if (!verificationId) {
        this.onSessionExpired();
      }
      const credential = await firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );
      await firebase.auth().signInWithCredential(credential);

      return store.dispatch(changeAuthLoadingState(false));
    } catch (error) {
      this.showMessageErrorByCode(error);
      return store.dispatch(changeAuthLoadingState(false));
    }
  };

  onSessionExpired = () => {
    return AppAlert.alert(
      "Session Expired",
      "Sign in again to finish account set up.",
      [{ text: "OK", onPress: this.signOut }]
    );
  };

  signOut = async () => {
    try {
      return await firebase.auth().signOut();
    } catch (error) {
      this.showMessageErrorByCode(error);
    }
  };
}
