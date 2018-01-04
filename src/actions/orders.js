import axios from 'axios';
import Auth from '../AuthService/Auth';
// import { showTheAlert, showInitializingAlert, closeTheAlert } from './alert';
import { API_DOMAIN } from '../config';
import { ACTIONS } from './types';

export const loadAllOrders = () => (dispatch, getState) => {
  const state = getState();
  if (!Auth.isAuthenticated()) {
    return;
  }
  const accessToken = Auth.getAccessToken();
  const email = state.userProfile.name;

  const emailParam = encodeURIComponent(email);
  // console.log(emailParam);
  const API_URL = API_DOMAIN + '/api/orders?email=' + emailParam;
  const headers = { Authorization: `Bearer ${accessToken}` };
  // dispatch(showInitializingAlert());
  axios
    .get(API_URL, { headers })
    .then(response => {
      // console.log(response.data);
      dispatch({
        type: ACTIONS.LOAD_ALL_ORDERS,
        loadedOrders: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};
