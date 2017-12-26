import { ACTIONS } from '../actions/types';
const initialLoginStatus = false;
export default (state = initialLoginStatus, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN_STATUS_CHANGED: {
      return action.loginStatus;
    }
    default:
      return state;
  }
};
