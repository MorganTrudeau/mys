import { ActionTypes } from "./ActionTypes";

export const createCustomer = activeUser => ({
  type: ActionTypes.CREATE_CUSTOMER,
  activeUser
});
export const createCustomerSuccess = customer => ({
  type: ActionTypes.CREATE_CUSTOMER_SUCCESS,
  customer
});
export const createCustomerFailure = error => ({
  type: ActionTypes.CREATE_CUSTOMER_FAILURE,
  error
});

export const fetchCustomerLoading = customerId => ({
  type: ActionTypes.CUSTOMER_FETCH_LOADING,
  customerId
});
export const fetchCustomerSuccess = customer => ({
  type: ActionTypes.CUSTOMER_FETCH_SUCCESS,
  customer
});
export const fetchCustomerFailure = error => ({
  type: ActionTypes.CUSTOMER_FETCH_FAILURE,
  error
});

export const saveSource = source => ({
  type: ActionTypes.SAVE_SOURCE,
  source
});
export const saveSourceSuccess = card => ({
  type: ActionTypes.SAVE_SOURCE_SUCCESS,
  card
});
export const saveSourceFailure = error => ({
  type: ActionTypes.SAVE_SOURCE_FAILURE,
  error
});

export const addTempSource = card => ({
  type: ActionTypes.ADD_TEMP_SOURCE,
  card
});

export const updateCustomer = updates => ({
  type: ActionTypes.UPDATE_CUSTOMER,
  updates
});
export const updateCustomerSuccess = customer => ({
  type: ActionTypes.UPDATE_CUSTOMER_SUCCESS,
  customer
});
export const updateCustomerFailure = error => ({
  type: ActionTypes.UPDATE_CUSTOMER_FAILURE,
  error
});

export const deleteSource = source => ({
  type: ActionTypes.DELETE_SOURCE,
  source
});
export const deleteSourceSuccess = confirmation => ({
  type: ActionTypes.DELETE_SOURCE_SUCCESS,
  confirmation
});
export const deleteSourceFailure = error => ({
  type: ActionTypes.DELETE_SOURCE_FAILURE,
  error
});

export const fetchSavedSources = () => ({
  type: ActionTypes.FETCH_SAVED_SOURCES
});
export const fetchSavedSourcesSuccess = cards => ({
  type: ActionTypes.FETCH_SAVED_SOURCES_SUCCESS,
  cards
});
export const fetchSavedSourcesFailure = error => ({
  type: ActionTypes.FETCH_SAVED_SOURCES_FAILURE,
  error
});

export const createCharge = (source, amount, currency) => ({
  type: ActionTypes.CREATE_CHARGE,
  source,
  amount,
  currency
});
export const createChargeSuccess = charge => ({
  type: ActionTypes.CREATE_CHARGE_SUCCESS,
  charge
});
export const createChargeFailure = error => ({
  type: ActionTypes.CREATE_CHARGE_FAILURE,
  error
});
