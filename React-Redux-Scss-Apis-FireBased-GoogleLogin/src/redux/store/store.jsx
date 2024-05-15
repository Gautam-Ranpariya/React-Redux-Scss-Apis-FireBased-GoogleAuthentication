
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage/session";
import authSclice from '../apiSclices/authSclice';

const reducers = combineReducers({
    auth: authSclice,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);
// const isProd = window?.location?.href?.includes("app.vtalkz.com");


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    // devTools: isProd ? false : true,
})

export const persistor = persistStore(store);
export default store;