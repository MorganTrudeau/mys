import { ActionTypes } from "./ActionTypes";

export const dateNightsRequest = () => ({
  type: ActionTypes.DATE_NIGHTS_REQUEST
});

export const dateNightsSuccess = dateNights => ({
  type: ActionTypes.DATE_NIGHTS_REQUEST_SUCCESS,
  dateNights
});

export const dateNightsFailure = error => ({
  type: ActionTypes.DATE_NIGHTS_REQUEST_FAILURE,
  error
});

export const createDateNightRequest = dateNight => ({
  type: ActionTypes.DATE_NIGHT_CREATE_REQUEST,
  dateNight
});

export const createDateNightSuccess = dateNight => ({
  type: ActionTypes.DATE_NIGHT_CREATE_REQUEST_SUCCESS,
  dateNight
});

export const createDateNightFailure = error => ({
  type: ActionTypes.DATE_NIGHT_CREATE_REQUEST_FAILURE,
  error
});

export const deleteDateNightSuccess = dateNightId => ({
  type: ActionTypes.DATE_NIGHT_DELETE_SUCCESS,
  dateNightId
});
