import { ActionTypes } from "./ActionTypes";

export const createTransport = transport => ({
  type: ActionTypes.TRANSPORT_CREATE,
  transport
});
export const createTransportSuccess = transport => ({
  type: ActionTypes.TRANSPORT_CREATE_SUCCESS,
  transport
});
export const createTransportFailure = error => ({
  type: ActionTypes.TRANSPORT_CREATE_FAILURE,
  error
});
