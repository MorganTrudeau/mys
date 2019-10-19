import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import logger from "redux-logger";
import createStorageMiddleware, {
  getStorageState
} from "redux-simple-storage-middleware";
import { createEpicMiddleware } from "redux-observable";
import { RootEpic } from "../epics";

const epicMiddleware = createEpicMiddleware();

const sessionStorageMiddleware = createStorageMiddleware({
  key: "mysstorage"
});

const storageState = getStorageState({
  key: "mysstorage"
});

let store = createStore(
  rootReducer,
  storageState,
  compose(applyMiddleware(epicMiddleware, logger, sessionStorageMiddleware))
);

export default store;

epicMiddleware.run(RootEpic);
