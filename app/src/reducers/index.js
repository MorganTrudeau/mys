import { combineReducers } from "redux";
import auth from "./auth";
import stripe from "./stripe";
import user from "./user";
import { location } from "./location";

export default combineReducers({
  auth,
  user,
  stripe,
  location
});
