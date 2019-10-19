import { ActionTypes } from "../actions/ActionTypes";

const initialState = {
  currentPosition: null
};

export const location = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SAVE_POSITION:
      return { ...state, currentPosition: action.position };
    default:
      return state;
  }
};
