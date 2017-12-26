import { ACTIONS } from '../actions/types';
const InitialState = {
  productSubmitting: false
};
export default (state = InitialState, action) => {
  switch (action.type) {
    case ACTIONS.SUBMIT_NEW_PRODUCT: {
      return {
        ...state,
        productSubmitting: true
      };
    }
    case ACTIONS.NEW_PRODUCT_FAILED: {
      return {
        ...state,
        productSubmitting: false
      };
    }
    default:
      return state;
  }
};
