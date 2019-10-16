import { ActionTypes } from "../actions/ActionTypes";

const dateNights = (
  state = { data: [], isLoading: false, error: null },
  action
) => {
  switch (action.type) {
    case ActionTypes.DATE_NIGHTS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case ActionTypes.DATE_NIGHTS_REQUEST_SUCCESS:
      return { ...state, isLoading: false, data: action.dateNights };
    case ActionTypes.DATE_NIGHTS_REQUEST_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    case ActionTypes.DATE_NIGHT_CREATE_REQUEST_SUCCESS:
      const newData = state.data;
      const i = newData.findIndex(
        dateNight => (dateNight.id = action.dateNight.id)
      );
      if (i !== -1) {
        newData[i] = action.dateNight;
      } else {
        newData.push(action.dateNight);
      }
      return {
        ...state,
        data: newData
      };

    case ActionTypes.DATE_NIGHT_DELETE_SUCCESS:
      return {
        ...state,
        data: state.data.filter(
          dateNight => dateNight.id !== action.dateNightId
        )
      };
    default:
      return state;
  }
};

export default dateNights;
