import { ActionTypes } from "../actions/ActionTypes";
import { NavStates } from "../utils/Constants";

const initialState = { state: NavStates.transports };

const nav = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.NAV_SWITCH_STATE:
      return { ...state, state: action.state };
    default:
      return state;
  }
};

export default nav;
