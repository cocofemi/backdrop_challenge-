import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import favoriteReducer from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import {STORAGE_KEY} from "@env";

const persistConfig = {
    key: STORAGE_KEY,
    storage: AsyncStorage,
    whitelist: ['favorites']
}

const rootReducer = combineReducers({
    favorite: persistReducer(persistConfig, favoriteReducer)
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);