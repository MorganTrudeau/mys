import { ActionTypes } from "../actions/ActionTypes";

const initialAuthData = null;

const initialState = {
  firebaseAuth: null,
  data: initialAuthData,

  loading: false,

  resetPasswordLoading: false,
  resetPasswordResult: null,
  resetPasswordError: null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_LOADING_STATE_CHANGE:
      return { ...state, loading: action.loading };
    case ActionTypes.FIREBASE_AUTH_ACTIVE:
      return {
        ...state,
        firebaseAuth: "ACTIVE",
        data: action.activeUser
      };
    case ActionTypes.FIREBASE_AUTH_INACTIVE:
      return { ...initialState, firebaseAuth: "INACTIVE" };
    case ActionTypes.SIGN_UP_REQUEST:
      return { ...state, signUpLoading: true, signUpError: null };
    case ActionTypes.LOGIN_REQUEST:
      return { ...state, loginLoading: true, loginError: null };
    case ActionTypes.SIGN_UP_REQUEST_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        data: Object.assign({}, state.data, action.activeUser)
      };
    case ActionTypes.LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        data: Object.assign({}, state.data, action.activeUser)
      };
    case ActionTypes.LOGIN_REQUEST_FAILURE:
      return { ...state, loginLoading: false, loginError: action.error };
    case ActionTypes.SIGN_UP_REQUEST_FAILURE:
      return { ...state, signUpLoading: false, signUpError: action.error };
    case ActionTypes.PASSWORD_RESET_REQUEST_LOADING:
      return {
        ...state,
        resetPasswordLoading: true,
        resetPasswordResult: null,
        resetPasswordError: null
      };
    case ActionTypes.PASSWORD_RESET_REQUEST_SUCCESS:
      return {
        ...state,
        resetPasswordLoading: false,
        resetPasswordResult: action.email
      };
    case ActionTypes.PASSWORD_RESET_REQUEST_FAILURE:
      return {
        ...state,
        resetPasswordLoading: false,
        resetPasswordError: action.error
      };
    default:
      return state;
  }
};

export default auth;
