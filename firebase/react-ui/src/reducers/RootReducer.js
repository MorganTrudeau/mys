import { combineReducers } from "redux";
import auth from "./auth";
import dateNights from "./dateNights";

export default combineReducers({
  auth,
  dateNights
});
