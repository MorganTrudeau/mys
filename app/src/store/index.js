import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import immutableTransform from "redux-persist-transform-immutable";
import { createEpicMiddleware } from "redux-observable";
const epicMiddleware = createEpicMiddleware();
import { RootEpic } from "../epics";
import { stripeTransform } from "../reducers/stripe";

const middleWare = [epicMiddleware];

const authTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    return { ...inboundState, firebaseAuth: null };
  },
  // transform state being rehydrated
  (outboundState, key) => {
    return outboundState;
  },
  // define which reducers this transform gets called for.
  { whitelist: ["auth"] }
);

const persistConfig = {
  transforms: [authTransform, stripeTransform, immutableTransform()],
  key: "root",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2
};

const middlewareOperator =
  window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        applyMiddleware(...middleWare)
      )
    : applyMiddleware(...middleWare);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, middlewareOperator);

epicMiddleware.run(RootEpic);

export const persistor = persistStore(store);
