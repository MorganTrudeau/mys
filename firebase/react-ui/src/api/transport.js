import { deleteRequest, getRequest, postRequest } from "../api";

export function createTransport(transport, userId) {
  return postRequest("/transport/create", { transport, userId });
}
