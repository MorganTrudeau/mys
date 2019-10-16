import { ActionTypes } from "../actions/ActionTypes";
import { List } from "immutable";
import { createTransform } from "redux-persist";

const initialState = {
  tempSources: List(),
  savedSources: List(),

  customer: null,

  defaultSource: null,

  saveSourceLoading: false,
  saveSourceError: null,
  saveSourceSuccess: null,

  deleteSourceLoading: false,
  deleteSourceError: null,
  deleteSourceSuccess: null,

  fetchSavedSourcesLoading: false,
  fetchSavedSourcesError: null,

  createChargeLoading: false,
  createChargeError: null,
  createChargeSuccess: null
};

export const stripeTransform = createTransform(
  (inboundState, key) => {
    return {
      ...inboundState,
      saveSourceLoading: false,
      deleteSourceLoading: false,
      tempSources: List()
    };
  },
  (outboundState, key) => {
    return outboundState;
  },
  { whitelist: ["stripe"] }
);

const stripe = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_CUSTOMER_SUCCESS:
      return { ...state, customer: action.customer };

    case ActionTypes.ADD_TEMP_SOURCE:
      return { ...state, tempSources: state.tempSources.push(action.card) };

    case ActionTypes.SAVE_SOURCE:
      return {
        ...state,
        saveSourceLoading: true,
        saveSourceError: null,
        saveSourceSuccess: null
      };
    case ActionTypes.SAVE_SOURCE_SUCCESS:
      const savedSources = !state.savedSources.find(
        source => source.fingerprint === action.card.fingerprint
      )
        ? state.savedSources.push(action.card)
        : state.savedSources;
      return {
        ...state,
        savedSources,
        saveSourceLoading: false,
        saveSourceSuccess: action.card,
        defaultSource: action.card.id
      };
    case ActionTypes.SAVE_SOURCE_FAILURE:
      return {
        ...state,
        saveSourceError: action.error,
        saveSourceLoading: false
      };

    case ActionTypes.FETCH_SAVED_SOURCES:
      return {
        ...state,
        fetchSavedSourcesLoading: true,
        fetchSavedSourcesError: null
      };
    case ActionTypes.FETCH_SAVED_SOURCES_SUCCESS:
      return {
        ...state,
        savedSources: List(action.cards),
        fetchSavedSourcesLoading: false
      };
    case ActionTypes.FETCH_SAVED_SOURCES_FAILURE:
      return {
        ...state,
        fetchSavedSourcesError: action.error,
        fetchSavedSourcesLoading: false
      };

    case ActionTypes.CUSTOMER_FETCH_SUCCESS:
      return {
        ...state,
        customer: action.customer,
        defaultSource: action.customer.default_source
      };

    case ActionTypes.UPDATE_CUSTOMER:
      return {
        ...state,
        updateCustomerLoading: true,
        updateCustomerError: null,
        updateCustomerSuccess: false
      };
    case ActionTypes.UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customer: action.customer,
        defaultSource: action.customer.default_source,
        updateCustomerSuccess: true,
        updateCustomerLoading: false
      };
    case ActionTypes.UPDATE_CUSTOMER_FAILURE:
      return {
        ...state,
        updateCustomerLoading: false,
        updateCustomerError: action.error
      };

    case ActionTypes.DELETE_SOURCE:
      return {
        ...state,
        deleteSourceSuccess: false,
        deleteSourceError: null,
        deleteSourceLoading: true
      };
    case ActionTypes.DELETE_SOURCE_FAILURE:
      return {
        ...state,
        deleteSourceLoading: false,
        deleteSourceError: action.error
      };
    case ActionTypes.DELETE_SOURCE_SUCCESS:
      let data = [...state.customer.sources.data];
      data = data.filter(source => source.id !== action.confirmation.id);
      let customer = { ...state.customer };
      customer.sources.data = data;
      return {
        ...state,
        savedSources: state.savedSources.filter(
          source => source.id !== action.confirmation.id
        ),
        deleteSourceSuccess: action.confirmation,
        deleteSourceLoading: false
      };

    case ActionTypes.CREATE_CHARGE:
      return {
        ...state,
        createChargeLoading: true,
        createChargeError: null,
        createChargeSuccess: null
      };
    case ActionTypes.CREATE_CHARGE_SUCCESS:
      return {
        ...state,
        createChargeSuccess: action.charge,
        createChargeLoading: false
      };
    case ActionTypes.CREATE_CHARGE_FAILURE:
      return {
        ...state,
        createChargeError: action.error,
        createChargeLoading: false
      };

    case ActionTypes.FIREBASE_AUTH_INACTIVE:
      return initialState;
    default:
      return state;
  }
};

export default stripe;
