import { createListenerMiddleware } from '@reduxjs/toolkit';
import { toggleChangeAction, updateAction } from './reducer';

const actionListenerMiddleware = createListenerMiddleware();

actionListenerMiddleware.startListening({
  actionCreator: toggleChangeAction,
  effect: async (action, actionListenerAPI) => {
    actionListenerAPI.dispatch(updateAction(action.payload));
  },
});

export default actionListenerMiddleware;
