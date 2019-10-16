import { switchMap, filter, mergeMap } from "rxjs/operators";
import { EMPTY, concat, of } from "rxjs";
import { ActionTypes } from "../actions/ActionTypes";
import * as Api from "../api";
import * as StripeActions from "../actions/stripe";

export const createCustomer = (action$, state$) =>
  action$.pipe(
    filter(
      a =>
        a.type === ActionTypes.ACTIVE_USER_CREATE_SUCCESS ||
        a.type === ActionTypes.CREATE_CUSTOMER
    ),
    switchMap(action => {
      const { user } = action;
      const { email, displayName, id } = user;
      const params = { email, name: displayName };
      return Api.createCustomer(params, id)
        .then(customer => StripeActions.createCustomerSuccess(customer))
        .catch(error => StripeActions.createCustomerFailure(error));
    })
  );

export const fetchCustomer = (action$, state$) =>
  action$.pipe(
    filter(a => a.type === ActionTypes.ACTIVE_USER_FETCH_SUCCESS),
    switchMap(action => {
      if (action.user && action.user.customerId) {
        const loading = of(
          StripeActions.fetchCustomerLoading(action.user.customerId)
        );
        const request = Api.fetchCustomer(action.user.customerId)
          .then(customer => StripeActions.fetchCustomerSuccess(customer))
          .catch(err => StripeActions.fetchCustomerFailure(err));
        return concat(loading, request);
      } else {
        return of({
          type: ActionTypes.CREATE_CUSTOMER,
          user: action.user
        });
      }
    })
  );

export const saveSource = (action$, state$) => {
  const { stripe } = state$.value;
  return action$.pipe(
    filter(
      action =>
        action.type === ActionTypes.SAVE_SOURCE && !stripe.saveSourceLoading
    ),
    mergeMap(action => {
      const { stripe } = state$.value;
      return Api.addSource(action.source, stripe.customer.id)
        .then(customer => StripeActions.saveSourceSuccess(customer))
        .catch(error => StripeActions.saveSourceFailure(error));
    })
  );
};

export const fetchSavedSources = (action$, state$) => {
  return action$.pipe(
    filter(action => action.type === ActionTypes.FETCH_SAVED_SOURCES),
    switchMap(action => {
      const { stripe } = state$.value;
      return Api.fetchSavedSources(stripe.customer.id)
        .then(response => {
          if (response.data) {
            return StripeActions.fetchSavedSourcesSuccess(response.data);
          }
        })
        .catch(error => StripeActions.fetchSavedSourcesFailure(error));
    })
  );
};

export const updateCustomer = (action$, state$) => {
  const { stripe } = state$.value;
  return action$.pipe(
    filter(action => action.type === ActionTypes.UPDATE_CUSTOMER),
    mergeMap(action => {
      const { stripe } = state$.value;
      return Api.updateCustomer(action.updates, stripe.customer.id)
        .then(customer => StripeActions.updateCustomerSuccess(customer))
        .catch(error => StripeActions.updateCustomerFailure(error));
    })
  );
};

export const deleteSource = (action$, state$) => {
  return action$.pipe(
    filter(action => action.type === ActionTypes.DELETE_SOURCE),
    mergeMap(action => {
      const { stripe } = state$.value;
      return Api.deleteSource(action.source, stripe.customer.id)
        .then(confirmation => StripeActions.deleteSourceSuccess(confirmation))
        .catch(error => StripeActions.deleteSourceFailure(error));
    })
  );
};

export const createCharge = (action$, state$) => {
  return action$.pipe(
    filter(action => action.type === ActionTypes.CREATE_CHARGE),
    mergeMap(action => {
      const { stripe } = state$.value;
      return Api.chargeSource(
        stripe.customer.id,
        action.source,
        action.amount,
        action.currency
      )
        .then(charge => StripeActions.createChargeSuccess(charge))
        .catch(error => StripeActions.createChargeFailure(error));
    })
  );
};
