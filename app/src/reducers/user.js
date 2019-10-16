import { ActionTypes } from "../actions/ActionTypes";
import { Map } from "immutable";

const initialState = {
  active: null,
  activeUserSetUp: false,

  cache: Map(),
  fetchLoading: false,
  fetchError: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ACTIVE_USER_FETCH:
      return { ...state, fetchLoading: true, fetchError: null };
    case ActionTypes.ACTIVE_USER_FETCH_SUCCESS:
      return { ...state, fetchLoading: false, active: action.user };
    case ActionTypes.ACTIVE_USER_FETCH_FAILURE:
      return { ...state, fetchLoading: false, fetchError: action.error };

    case ActionTypes.ACTIVE_USER_UPDATE_SUCCESS:
    case ActionTypes.ACTIVE_USER_CREATE_SUCCESS:
      return { ...state, active: action.user };
    case ActionTypes.CREATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        active: {
          ...state.active,
          customerId: action.customer.id
        },
        activeUserSetUp: true
      };
    case ActionTypes.CUSTOMER_FETCH_SUCCESS:
      return {
        ...state,
        activeUserSetUp: true
      };
    case ActionTypes.FIREBASE_AUTH_INACTIVE:
      return initialState;
    default:
      return state;
  }
};

export default user;
