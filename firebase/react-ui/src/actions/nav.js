import { ActionTypes } from "./ActionTypes";

export const switchNavState = state => ({
  type: ActionTypes.NAV_SWITCH_STATE,
  state
});
