import axios from 'axios';
import Auth from '../AuthService/Auth';
import {showTheAlert, showInitializingAlert, closeTheAlert} from './alert';
import {ACTIONS} from './types';

export const loadAllProducts = (sort = 'brand', sortOrder = 'asc') => (dispatch) => {
  let query;
  if (sort) {
    query = 'sort=' + sort;
    if (sortOrder) {
      query += '&sorder=' + sortOrder;
    }
  }

  const API_URL = `http://localhost:3002/api/products?${query}`;
  dispatch(showInitializingAlert());
  axios
    .get(API_URL)
    .then(response => {
      dispatch({
        type: ACTIONS.LOAD_ALL_PRODUCTS,
        loadedProducts: response.data
      });
      dispatch(closeTheAlert());
      //console.log(response.data);
    })
    .catch(error => {
      console.log(error);
      dispatch(showTheAlert(error.message, 'danger'));
    });
};
export const setProductFilter = (filters) => {
  return {
    type: ACTIONS.SET_PRODUCT_FILTERS,
    filters
  };
}
export const submitNewProduct = productData => dispatch => {
  const accessToken = Auth.getAccessToken();
  console.log('submitNewProduct', productData);
  const API_URL = 'http://localhost:3002/api/products';
  const headers = {Authorization: `Bearer ${accessToken}`};
  dispatch({
    type: ACTIONS.SUBMIT_NEW_PRODUCT
  });
  axios
    .post(API_URL, productData, {headers})
    .then(response => {
      console.log(response.data);
      dispatch({
        type: ACTIONS.NEW_PRODUCT_ADDED,
        addedProduct: response.data
      });
      dispatch(showTheAlert('Product successfully added.', 'success'));
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: ACTIONS.NEW_PRODUCT_FAILED
      });
      dispatch(showTheAlert(error.message, 'danger'));
    });
};

