import firebase from "../database";
import "@firebase/firestore";
import "@firebase/storage";
import * as DateNightActions from "../actions/dateNights";
import { generateUid } from "../utils";

export function loadDateNights() {
  return function(dispatch, getState) {
    dispatch(DateNightActions.dateNightsRequest());
    return firebase
      .firestore()
      .collection("dateNights")
      .get()
      .then(snapshot => {
        let dateNights = [];
        snapshot.forEach(doc => dateNights.push(doc.data()));
        dispatch(DateNightActions.dateNightsSuccess(dateNights));
      })
      .catch(error => dispatch(DateNightActions.dateNightsFailure(error)));
  };
}

export function createDateNight(dateNight, picture) {
  return function(dispatch, getState) {
    dispatch(DateNightActions.createDateNightRequest(dateNight));
    const storageId = generateUid();
    const dateNightId = dateNight.id ? dateNight.id : generateUid();
    dateNight.id = dateNightId;
    if (picture) {
      const ref = firebase.storage().ref();
      dateNight.coverImage = storageId;
      ref
        .child(storageId)
        .put(picture)
        .then(function(snapshot) {
          console.log("Uploaded a blob or file!", snapshot);
          firebase
            .firestore()
            .collection("dateNights")
            .doc(dateNightId)
            .set(dateNight)
            .then(() =>
              dispatch(DateNightActions.createDateNightSuccess(dateNight))
            )
            .catch(error =>
              dispatch(DateNightActions.createDateNightFailure(error))
            );
        })
        .catch(error => console.log(error));
    } else {
      firebase
        .firestore()
        .collection("dateNights")
        .doc(dateNightId)
        .set(dateNight)
        .then(() =>
          dispatch(DateNightActions.createDateNightSuccess(dateNight))
        )
        .catch(error =>
          dispatch(DateNightActions.createDateNightFailure(error))
        );
    }
  };
}

export function deleteDateNight(dateNightId) {
  return function(dispatch, getState) {
    return firebase
      .firestore()
      .collection("dateNights")
      .doc(dateNightId)
      .delete()
      .then(() =>
        dispatch(DateNightActions.deleteDateNightSuccess(dateNightId))
      )
      .catch(error => alert(error));
  };
}
