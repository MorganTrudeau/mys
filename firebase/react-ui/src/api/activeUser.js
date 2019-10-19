import firebase from "../database";
import "firebase/firestore";

export async function fetchActiveUser(id) {
  const user = await firebase
    .firestore()
    .collection("Users")
    .doc(id)
    .get();
  return user ? user.data() : null;
}

export function updateUser(user) {
  return firebase
    .firestore()
    .collection("Users")
    .doc(user.id)
    .set(user);
}
