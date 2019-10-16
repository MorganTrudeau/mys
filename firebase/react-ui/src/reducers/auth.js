import { ActionTypes } from "../actions/ActionTypes";

const initialUserData = { id: null };

const auth = (
  state = {
    firebaseAuth: null,
    user: initialUserData,
    isLoading: false,
    signUpError: null,
    loginError: null
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FIREBASE_AUTH_ACTIVE:
      return {
        ...state,
        firebaseAuth: "ACTIVE",
        user: Object.assign({}, state.user, action.user)
      };
    case ActionTypes.FIREBASE_AUTH_INACTIVE:
      return {
        ...state,
        firebaseAuth: "INACTIVE",
        user: initialUserData
      };
    case ActionTypes.LOGIN_REQUEST:
      return { ...state, isLoading: true, loginError: null };
    case ActionTypes.LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case ActionTypes.LOGIN_REQUEST_FAILURE:
      return { ...state, isLoading: false, loginError: action.error };
    default:
      return state;
  }
};

export default auth;
