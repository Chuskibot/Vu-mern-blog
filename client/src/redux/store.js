import { configureStore } from '@reduxjs/toolkit'
import useReducer from './user/userSlice.js';

export default configureStore({
  reducer: {
    user: useReducer,
  },
});