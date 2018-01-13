import { ACTIONS } from '../actions/types';
const initialState = {
  message: '',
  type: ''
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.CART_UPDATING_FAILED:
    case ACTIONS.PRODUCTS_LOADING_FAILED:
    case ACTIONS.ORDERS_LOADING_FAILED:
    case ACTIONS.CHECKOUT_FAILED:
    case ACTIONS.NEW_PRODUCT_FAILED:
    case ACTIONS.SHOW_ALERT: {
      return {
        message: action.message,
        type: action.messageType
      };
    }
    case ACTIONS.CLOSE_ALERT: {
      return {
        message: '',
        type: ''
      };
    }
    case ACTIONS.WORK_IN_PROGRESS: {
      return {
        message: '',
        type: 'loading'
      };
    }
    case ACTIONS.CHECKOUT_SUCCESS: {
      return {
        message: 'Order has been successfully created.',
        type: 'success'
      };
    }
    case ACTIONS.NEW_PRODUCT_SUCCESS: {
      return {
        message: 'Product has been successfully saved.',
        type: 'success'
      };
    }
    default:
      return state;
  }
};
