import store from "../store";
import { firebaseAuthActive, firebaseAuthInactive } from "../actions/auth";
import firebase from "firebase/app";
import "firebase/auth";
// import { storeActiveUserId } from "../apis/user";

const firebaseConfig = {
  apiKey: "AIzaSyCQto_NLMVgUTXzKWcp6f3xbCI9jLvrw3c",
  authDomain: "move-your-shit.firebaseapp.com",
  databaseURL: "https://move-your-shit.firebaseio.com",
  projectId: "move-your-shit",
  storageBucket: "move-your-shit.appspot.com",
  messagingSenderId: "752054190277",
  appId: "1:752054190277:web:e6762ca3ad691c0d1ab0ac"
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
