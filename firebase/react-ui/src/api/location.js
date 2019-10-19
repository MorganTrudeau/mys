import { deleteRequest, getRequest, postRequest } from "../api";

export async function savePosition(position, userId) {
  return postRequest("/location/savePosition", { position, userId });
}
