import { ActionTypes } from "../actions/ActionTypes";
import { Map } from "immutable";

const initialState = {
  cache: {},

  createLoading: false,
  createSuccess: null,
  createError: null
};

const transport = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TRANSPORT_CREATE:
      return {
        ...state,
        createLoading: true,
        createError: null,
        createSuccess: null
      };
    case ActionTypes.TRANSPORT_CREATE_FAILURE:
      return { ...state, createLoading: false, createError: action.error };
    case ActionTypes.TRANSPORT_CREATE_SUCCESS:
      return {
        ...state,
        cache: Object.assign({}, state.cache, {
          [action.transport.id]: action.transport
        }),
        createLoading: false,
        createSuccess: action.transport
      };
    default:
      return state;
  }
};

export default transport;
