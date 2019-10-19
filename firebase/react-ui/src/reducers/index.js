import { combineReducers } from "redux";
import auth from "./auth";
import stripe from "./stripe";
import user from "./user";
import { location } from "./location";
import transport from "./transport";
import nav from "./nav";

export default combineReducers({
  auth,
  user,
  stripe,
  transport,
  location,
  nav
});
