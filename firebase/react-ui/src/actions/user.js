import { ActionTypes } from "./ActionTypes";

export const createActiveUser = authData => ({
  type: ActionTypes.ACTIVE_USER_CREATE,
  authData
});
export const createActiveUserSuccess = user => ({
  type: ActionTypes.ACTIVE_USER_CREATE_SUCCESS,
  user
});
export const createActiveUserFailure = error => ({
  type: ActionTypes.ACTIVE_USER_CREATE_FAILURE,
  error
});

export const fetchActiveUser = id => ({
  type: ActionTypes.ACTIVE_USER_FETCH,
  id
});
export const fetchActiveUserSuccess = user => ({
  type: ActionTypes.ACTIVE_USER_FETCH_SUCCESS,
  user
});
export const fetchActiveUserFailure = error => ({
  type: ActionTypes.ACTIVE_USER_FETCH_FAILURE,
  error
});

export const updateActiveUser = user => ({
  type: ActionTypes.ACTIVE_USER_UPDATE,
  user
});
export const updateActiveUserSuccess = user => ({
  type: ActionTypes.ACTIVE_USER_UPDATE_SUCCESS,
  user
});
export const updateActiveUserFailure = error => ({
  type: ActionTypes.ACTIVE_USER_UPDATE_SUCCESS,
  error
});
