import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import themeSlice from './theme/themeSlice.js';

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  theme: themeSlice,
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store and export it
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Create and export the persistor
export const persistor = persistStore(store);
