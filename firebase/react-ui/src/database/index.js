import store from "../store";
import { firebaseAuthActive, firebaseAuthInactive } from "../actions/auth";
import firebase from "@firebase/app";
import "@firebase/auth";
// import { storeActiveUserId } from "../apis/user";

var firebaseConfig = {
  apiKey: "AIzaSyBWSm4I5FbqDw-K_OxINKCmWrvz0Hz0lbw",
  authDomain: "date-night-2a470.firebaseapp.com",
  databaseURL: "https://date-night-2a470.firebaseio.com",
  projectId: "date-night-2a470",
  storageBucket: "gs://date-night-2a470.appspot.com",
  messagingSenderId: "1077536009671"
};

firebase.initializeApp(firebaseConfig);

// Listen for authentication state to change.
firebase.auth().onAuthStateChanged(user => {
  if (user != null) {
    let activeUser = { id: user.uid };
    store.dispatch(firebaseAuthActive(activeUser));
    // storeActiveUserId(user.uid);
    console.log("User logged in: " + JSON.stringify(activeUser));
  } else {
    store.dispatch(firebaseAuthInactive());
    // storeActiveUserId("");
    console.log("User logged out");
  }
});

export default firebase;
