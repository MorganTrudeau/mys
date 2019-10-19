import { filter, mergeMap } from "rxjs/operators";
import { ActionTypes } from "../actions/ActionTypes";
import * as Api from "../api";
import * as TransportActions from "../actions/transport";

export const createTransport = (action$, state$) => {
  return action$.pipe(
    filter(a => a.type === ActionTypes.TRANSPORT_CREATE),
    mergeMap(action => {
      const userId = state$.value.user.active.id;
      return Api.createTransport({ ...action.transport, userId })
        .then(response =>
          TransportActions.createTransportSuccess(action.transport)
        )
        .catch(error => TransportActions.createTransportFailure(error));
    })
  );
};
