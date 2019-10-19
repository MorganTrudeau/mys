import { filter, switchMap } from "rxjs/operators";
import { ActionTypes } from "../actions/ActionTypes";
import { EMPTY } from "rxjs";
import * as Api from "../api";
import * as UserActions from "../actions/user";

export const fetchActiveUser = (action$, state$) =>
  action$.pipe(
    filter(action => action.type === ActionTypes.FIREBASE_AUTH_ACTIVE),
    switchMap(action => {
      return Api.fetchActiveUser(action.activeUser.id)
        .then(user => {
          if (!!user) {
            return UserActions.fetchActiveUserSuccess(user);
          } else {
            const { data } = state$.value.auth;
            return UserActions.createActiveUser(data);
          }
        })
        .catch(error => UserActions.fetchActiveUserFailure(error));
    })
  );

export const createActiveUser = (action$, state$) =>
  action$.pipe(
    filter(action => action.type === ActionTypes.ACTIVE_USER_CREATE),
    switchMap(action => {
      return Api.updateUser(action.authData)
        .then(() => UserActions.createActiveUserSuccess(action.authData))
        .catch(error => UserActions.createActiveUserFailure(error));
    })
  );

export const updateActiveUser = (action$, state$) =>
  action$.pipe(
    filter(action => action.type === ActionTypes.ACTIVE_USER_UPDATE),
    switchMap(action => {
      return Api.updateUser(action.user)
        .then(() => UserActions.updateActiveUserSuccess(action.user))
        .catch(error => UserActions.updateActiveUserFailure(error));
    })
  );
