import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {
    FLUSH,
    PAUSE,
    PERSIST, persistReducer,
    PURGE,
    REGISTER, REHYDRATE
} from 'redux-persist';
import { combineReducers } from 'redux';

import appReducer from 'src/appSlice';
import testReducer from 'src/testSlice';
import authReducer from 'src/authSlice';


const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['test', 'app']
};

const rootReducer = combineReducers({
    app: appReducer,
    test: testReducer,
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore(
    {
        reducer: persistedReducer,
        middleware: getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    }
);

export default store;