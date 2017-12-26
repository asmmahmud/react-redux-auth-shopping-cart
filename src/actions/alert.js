import { ACTIONS } from './types';
export const closeTheAlert = () => {
  return { type: ACTIONS.CLOSE_ALERT };
}; 

export const showTheAlert = (message, messageType) => {
  return { type: ACTIONS.SHOW_ALERT, message, messageType };
};

export const showInitializingAlert = () => {
  return { type: ACTIONS.INITIALIZING };
};
