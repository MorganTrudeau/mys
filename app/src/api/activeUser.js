import * as ActiveUserActions from "../actions/user";
import firestore from "@react-native-firebase/firestore";

export async function fetchActiveUser(id) {
  const user = await firestore()
    .collection("Users")
    .doc(id)
    .get();
  return user ? user.data() : null;
}

export function updateUser(user) {
  return firestore()
    .collection("Users")
    .doc(user.id)
    .set(user);
}
