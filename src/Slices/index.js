import { configureStore } from '@reduxjs/toolkit';
import filesReducer from './filesSlice.js';

export default configureStore({
  reducer: {
    filesReducer,
  }
});
