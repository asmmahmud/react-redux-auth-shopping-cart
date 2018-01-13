import { ACTIONS } from './types';
export const closeTheAlert = () => {
  return { type: ACTIONS.CLOSE_ALERT };
};

export const showTheAlert = (message, messageType) => {
  return { type: ACTIONS.SHOW_ALERT, message, messageType };
};

export const showWorkInProgressAlert = () => {
  return { type: ACTIONS.WORK_IN_PROGRESS };
};
