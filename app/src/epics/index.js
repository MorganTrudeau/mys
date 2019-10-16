import { combineEpics } from "redux-observable";
import { updateActiveUser, createActiveUser, fetchActiveUser } from "./user";
import {
  fetchCustomer,
  saveSource,
  updateCustomer,
  deleteSource,
  fetchSavedSources,
  createCustomer,
  createCharge
} from "./stripe";
import { savePosition } from "./location";

export const RootEpic = combineEpics(
  // user
  fetchActiveUser,
  updateActiveUser,
  createActiveUser,
  // stripe
  fetchCustomer,
  saveSource,
  updateCustomer,
  deleteSource,
  fetchSavedSources,
  createCustomer,
  createCharge,
  savePosition
);
