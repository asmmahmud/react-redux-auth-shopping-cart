import { ACTIONS } from '../actions/types';
const initialState = {
  searchTerm: '',
  loginStatus: false,
  cartUpdating: false,
  productsLoading: false,
  productSubmitting: false,
  ordersLoading: false,
  orderInProgress: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN_STATUS_CHANGED: {
      return {
        ...state,
        loginStatus: action.loginStatus
      };
    }

    case ACTIONS.CART_UPDATING_START: {
      return {
        ...state,
        cartUpdating: true
      };
    }
    case ACTIONS.CART_UPDATING_END:
    case ACTIONS.CART_UPDATING_FAILED: {
      return {
        ...state,
        cartUpdating: false
      };
    }
    case ACTIONS.CHECKOUT_STARTED: {
      return {
        ...state,
        orderInProgress: true
      };
    }
    case ACTIONS.CHECKOUT_FAILED:
    case ACTIONS.CHECKOUT_SUCCESS: {
      return {
        ...state,
        orderInProgress: false
      };
    }
    case ACTIONS.PRODUCTS_LOADING_START: {
      return {
        ...state,
        productsLoading: true
      };
    }
    case ACTIONS.PRODUCTS_ALL_LOADED:
    case ACTIONS.PRODUCTS_LOADING_FAILED: {
      return {
        ...state,
        productsLoading: false
      };
    }
    case ACTIONS.NEW_PRODUCT_SUBMITTING: {
      return {
        ...state,
        productSubmitting: true
      };
    }
    case ACTIONS.NEW_PRODUCT_SUCCESS:
    case ACTIONS.NEW_PRODUCT_FAILED: {
      return {
        ...state,
        productSubmitting: false
      };
    }
    case ACTIONS.ORDERS_LOADING_START: {
      return {
        ...state,
        ordersLoading: true
      };
    }
    case ACTIONS.ORDERS_ALL_LOADED:
    case ACTIONS.ORDERS_LOADING_FAILED: {
      return {
        ...state,
        ordersLoading: false
      };
    }
    default:
      return state;
  }
};
