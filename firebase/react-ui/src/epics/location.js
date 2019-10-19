import { switchMap, filter } from "rxjs/operators";
import { EMPTY, concat, of } from "rxjs";
import { ActionTypes } from "../actions/ActionTypes";
import * as Api from "../api";
import * as LocationActions from "../actions/location";

export const savePosition = (action$, state$) => {
  return action$.pipe(
    filter(a => a.type === ActionTypes.SAVE_POSITION),
    switchMap(action => {
      const userId =
        state$.value.user.active &&
        state$.value.user.active.data &&
        state$.value.user.active.data.id;
      const { position } = action;
      if (userId) {
        return Api.savePosition(position, userId)
          .then(res => LocationActions.savePostionSuccess(position))
          .catch(error => LocationActions.savePositionFailure(error));
      } else {
        return EMPTY;
      }
    })
  );
};
