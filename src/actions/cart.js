import { ACTIONS } from './types';
import axios from 'axios';
import Auth from '../AuthService/Auth';
import { loadAllProducts } from './products';
import history from '../history';
import { API_DOMAIN } from '../config';

export const addToCart = productId => (dispatch, getState) => {
  const state = getState();
  if (state.allProducts[productId] && state.allProducts[productId].quantity > 0) {
    dispatch({
      type: ACTIONS.ADD_TO_CART,
      productId: productId
    });
  }
};
export const decrement = productId => (dispatch, getState) => {
  const state = getState();
  if (state.cart.productQtys[productId]) {
    dispatch({
      type: ACTIONS.REMOVE_FROM_CART,
      productId: productId
    });
  }
};

export const placeOrder = orderData => (dispatch, getState) => {
  console.log(orderData);
  const state = getState();
  if (state.cart.productIds.length && Auth.isAuthenticated()) {
    orderData.items = state.cart.productIds.map(productId => {
      return {
        productId: productId,
        name: state.allProducts[productId].name,
        price: state.allProducts[productId].price,
        qty: state.cart.productQtys[productId]
      };
    });
    orderData.user = {
      name: state.userProfile.nickname,
      email: state.userProfile.name
    };
    console.log(orderData);
    const accessToken = Auth.getAccessToken();
    const API_URL = API_DOMAIN + '/api/orders/create';
    const headers = { Authorization: `Bearer ${accessToken}` };
    dispatch({
      type: ACTIONS.CHECKOUT_INIT
    });
    // console.log(accessToken, orderData);
    axios
      .post(API_URL, orderData, { headers })
      .then(response => {
        console.log(response);
        dispatch({
          type: ACTIONS.CHECKOUT_SUCCESS,
          lastSuccessfulOrder: response.data
        });
        dispatch(loadAllProducts());
        history.push(`/order-success/${response.data._id}`);
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: ACTIONS.CHECKOUT_FAILED,
          message: error.message
        });
        history.push('/cart/order-failure');
      });
  }
};
