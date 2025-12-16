import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../user/user.slice';
import messageReducer from '../message/message.slice';
import aiReducer from '../ai/ai.slice';

export const store = configureStore({
  reducer: {
    userReducer,
    messageReducer,
    aiReducer
  }
});

export default store;
