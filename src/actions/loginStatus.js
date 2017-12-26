import { ACTIONS } from './types';
export const changeLoginStatus = status => {
  return { type: ACTIONS.LOGIN_STATUS_CHANGED, loginStatus: status };
};
