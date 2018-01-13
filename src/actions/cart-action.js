import { ACTIONS } from './types';
import axios from 'axios';
import Auth from '../AuthService/Auth';
import { loadAllProducts } from './products-action';
import history from '../history';
import { API_DOMAIN } from '../config';

export const clearTheCart = () => {
  return {
    type: ACTIONS.CART_CLEARING
  };
};
export const loadUserCart = () => (dispatch, getState) => {
  const state = getState();
  if (!Auth.isAuthenticated()) {
    return;
  }
  const accessToken = Auth.getAccessToken();
  const email = state.userProfile.name;
  const emailParam = encodeURIComponent(email);

  const API_URL = API_DOMAIN + '/api/cart?email=' + emailParam;
  const headers = { Authorization: `Bearer ${accessToken}` };
  dispatch({
    type: ACTIONS.CART_UPDATING_START
  });
  axios
    .get(API_URL, { headers })
    .then(response => {
      if (response.data && Array.isArray(response.data.items) && response.data.items.length > 0) {
        dispatch({
          type: ACTIONS.USER_CART_LOADED,
          cartItems: response.data.items
        });
      }
      dispatch({ type: ACTIONS.CART_UPDATING_END });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: ACTIONS.CART_UPDATING_FAILED,
        message: error.message,
        messageType: 'danger'
      });
    });
};
export const addToCart = productId => (dispatch, getState) => {
  const state = getState();
  if (state.allProducts[productId] && state.allProducts[productId].quantity > 0) {
    const state = getState();
    if (Auth.isAuthenticated()) {
      const postData = {
        email: state.userProfile.name,
        product_id: productId,
        qty: 1
      };
      const API_URL = API_DOMAIN + '/api/cart/add';
      const accessToken = Auth.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}` };
      dispatch({
        type: ACTIONS.CART_UPDATING_START
      });
      axios
        .post(API_URL, postData, { headers })
        .then(response => {
          if (response.data && Array.isArray(response.data.items) && response.data.items.length > 0) {
            console.log(response.data.items);
            dispatch({
              type: ACTIONS.ADD_TO_CART,
              productId: productId
            });
          }
          dispatch({ type: ACTIONS.CART_UPDATING_END });
        })
        .catch(error => {
          console.log(error);
          dispatch({
            type: ACTIONS.CART_UPDATING_FAILED,
            message: error.message,
            messageType: 'danger'
          });
        });
    } else {
      dispatch({
        type: ACTIONS.ADD_TO_CART,
        productId: productId
      });
    }
  }
};
export const subtractFromCart = productId => (dispatch, getState) => {
  const state = getState();
  if (state.cart.productQtys[productId]) {
    if (Auth.isAuthenticated()) {
      const postData = {
        email: state.userProfile.name,
        product_id: productId,
        qty: 1
      };
      const API_URL = API_DOMAIN + '/api/cart/subtract';
      const accessToken = Auth.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}` };
      dispatch({
        type: ACTIONS.CART_UPDATING_START
      });
      axios
        .post(API_URL, postData, { headers })
        .then(response => {
          if (response.data && response.data.email) {
            console.log(response.data.items);
            dispatch({
              type: ACTIONS.SUBTRACT_FROM_CART,
              productId: productId
            });
          }
          dispatch({ type: ACTIONS.CART_UPDATING_END });
        })
        .catch(error => {
          console.log(error);
          dispatch({
            type: ACTIONS.CART_UPDATING_FAILED,
            message: error.message,
            messageType: 'danger'
          });
        });
    } else {
      dispatch({
        type: ACTIONS.SUBTRACT_FROM_CART,
        productId: productId
      });
    }
  }
};
export const removeFromCart = productId => (dispatch, getState) => {
  const state = getState();
  if (state.cart.productIds.indexOf(productId) !== -1) {
    if (Auth.isAuthenticated()) {
      const postData = {
        email: state.userProfile.name,
        product_id: productId,
        qty: 0
      };
      /* setting qty to zero (0) actually will remove the product from the cart */
      const API_URL = API_DOMAIN + '/api/cart/add';
      const accessToken = Auth.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}` };
      dispatch({
        type: ACTIONS.CART_UPDATING_START
      });
      axios
        .post(API_URL, postData, { headers })
        .then(response => {
          if (response.data && response.data.email) {
            console.log(response.data.items);
            dispatch({
              type: ACTIONS.REMOVE_FROM_CART,
              productId: productId
            });
          }
          dispatch({ type: ACTIONS.CART_UPDATING_END });
        })
        .catch(error => {
          console.log(error);
          dispatch({
            type: ACTIONS.CART_UPDATING_FAILED,
            message: error.message,
            messageType: 'danger'
          });
        });
    } else {
      dispatch({
        type: ACTIONS.REMOVE_FROM_CART,
        productId: productId
      });
    }
  }
};
export const placeOrder = orderData => (dispatch, getState) => {
  console.log('placeOrder 1: ', orderData);
  const state = getState();
  if (state.cart.productIds.length > 0 && Auth.isAuthenticated()) {
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
    console.log('placeOrder 2: ', orderData);
    const accessToken = Auth.getAccessToken();
    const API_URL = API_DOMAIN + '/api/orders/create';
    const headers = { Authorization: `Bearer ${accessToken}` };
    dispatch({
      type: ACTIONS.CHECKOUT_STARTED
    });
    return axios
      .post(API_URL, orderData, { headers })
      .then(
        response => {
          console.log(response);
          dispatch({
            type: ACTIONS.CHECKOUT_SUCCESS,
            lastSuccessfulOrder: response.data
          });
          dispatch(loadAllProducts());
          window.scrollTo(0, 0);
          history.push(`/order-success/${response.data._id}?singleton=1`);
        },
        errRes => {
          console.log(errRes);
          dispatch({
            type: ACTIONS.CHECKOUT_FAILED,
            message: errRes.message,
            messageType: 'danger'
          });
          window.scrollTo(0, 0);
          history.push('/cart/checkout');
        }
      )
      .catch(error => {
        console.log(error);
        dispatch({
          type: ACTIONS.CHECKOUT_FAILED,
          message: error.message,
          messageType: 'danger'
        });
        window.scrollTo(0, 0);
        history.push('/cart/checkout');
      });
  }
};
