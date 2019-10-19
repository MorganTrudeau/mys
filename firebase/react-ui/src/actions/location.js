import { ActionTypes } from "./ActionTypes";

export const savePosition = position => ({
  type: ActionTypes.SAVE_POSITION,
  position
});
export const savePostionSuccess = position => ({
  type: ActionTypes.SAVE_POSITION_SUCCESS,
  position
});
export const savePositionFailure = error => ({
  type: ActionTypes.SAVE_POSITION_FAILURE,
  error
});
