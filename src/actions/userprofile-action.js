import { ACTIONS } from './types';

export const storeUserProfile = profile => {
  return {
    type: ACTIONS.STORE_USER_PROFILE,
    userProfile: profile
  };
};
