import React from 'react';
import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import rootReducer from '../reducers/rootReducers';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
// import axiosMiddleware from 'redux-axios-middleware';
// import { loginReset } from "../actions/login/login.action";r

const persistConfig = {
  key: 'CONFI_DATE',
  storage: AsyncStorage,
};

const composedEnhancer = compose(applyMiddleware(thunk));

// export const initStore = () => createStore(rootReducer, {}, composedEnhancer);

// export default store = initStore()
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Configure Store and the Persistor of Store
 */
export const configureStore = () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return {store, persistor};
};
