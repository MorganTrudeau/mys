import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers/RootReducer";
import logger from "redux-logger"
import createStorageMiddleware, {getStorageState} from 'redux-simple-storage-middleware';

const sessionStorageMiddleware = createStorageMiddleware({
    key: 'mysstorage',
});

const storageState = getStorageState({
    key: 'mysstorage',
});

let store = createStore(
    rootReducer,
    storageState,
    compose(
        applyMiddleware(
            thunkMiddleware,
            logger,
            sessionStorageMiddleware
        )
    )
);

export default store;
