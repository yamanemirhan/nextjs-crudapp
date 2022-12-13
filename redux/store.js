import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducer';
import actionListenerMiddleware from './actionListener';

export const store = configureStore({
  reducer: {
    app: reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(actionListenerMiddleware.middleware),
});
