import axios from 'axios';
import Auth from '../AuthService/Auth';
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

  const API_URL = API_DOMAIN + '/api/orders?email=' + emailParam;
  const headers = { Authorization: `Bearer ${accessToken}` };
  dispatch({ type: ACTIONS.ORDERS_LOADING_START });
  axios
    .get(API_URL, { headers })
    .then(response => {
      dispatch({
        type: ACTIONS.ORDERS_ALL_LOADED,
        loadedOrders: response.data
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: ACTIONS.ORDERS_LOADING_FAILED,
        message: error.message,
        messageType: 'danger'
      });
    });
};
