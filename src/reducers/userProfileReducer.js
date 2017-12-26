import { ACTIONS } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.STORE_USER_PROFILE: {
      return action.userProfile;
    }
    default:
      return state;
  }
};
