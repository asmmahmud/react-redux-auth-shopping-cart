import {ACTIONS} from '../actions/types';
import dotProp from 'dot-prop-immutable';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_ALL_PRODUCTS: {
      return action.loadedProducts.reduce((allProduct, product) => {
        allProduct[product._id] = {
          ...product,
          price: parseFloat(product.price, 10),
          quantity: +product.quantity
        };
        return allProduct;
      }, {});
    }
    case ACTIONS.ADD_TO_CART: {
      return dotProp.set(state, `${action.productId}.quantity`, qty => qty - 1);
    }
    case ACTIONS.REMOVE_FROM_CART: {
      return dotProp.set(state, `${action.productId}.quantity`, qty => qty + 1);
    }
    default:
      return state;
  }
};
export const productAddedReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.NEW_PRODUCT_ADDED: {
      const allProducts = {
        ...state.allProducts,
        [action.addedProduct._id]: action.addedProduct
      };
      const newState = dotProp.set(state, 'allProducts', allProducts);
      return dotProp.set(newState, 'formStatus.productSubmitting', false);
    }
    default:
      return state;
  }
};
