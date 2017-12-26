import { createSelector } from 'reselect';
import { ACTIONS } from '../actions/types';
import dotProp from 'dot-prop-immutable';

const initialState = {
  productIds: [],
  productQtys: {},
  orderInProgress: { status: false, message: '', messageType: 'success' }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART: {
      if (state.productIds.indexOf(action.productId) === -1) {
        let productIds, productQtys;
        productIds = state.productIds.concat([action.productId]);
        productQtys = dotProp.set(state.productQtys, `${action.productId}`, 1);
        return {
          ...state,
          productIds,
          productQtys
        };
      } else {
        return dotProp.set(
          state,
          `productQtys.${action.productId}`,
          qty => qty + 1
        );
      }
    }
    case ACTIONS.REMOVE_FROM_CART: {
      const qty = state.productQtys[action.productId] - 1;
      if (qty) {
        return dotProp.set(
          state,
          `productQtys.${action.productId}`,
          qty => qty - 1
        );
      }
      const prodIndex = state.productIds.indexOf(action.productId);
      const newState = dotProp.delete(state, `productQtys.${action.productId}`);
      return dotProp.delete(newState, `productIds.${prodIndex}`);
    }
    case ACTIONS.CHECKOUT_INIT: {
      return {
        ...state,
        orderInProgress: {
          status: true,
          message: 'Submitting Order....',
          messageType: 'success'
        }
      };
    }
    case ACTIONS.CHECKOUT_SUCCESS: {
      return {
        productIds: [],
        productQtys: {},
        orderInProgress: {
          status: false,
          message: 'Order Completed!',
          messageType: 'success'
        }
      };
    }
    case ACTIONS.CHECKOUT_FAILED: {
      return {
        ...state,
        orderInProgress: {
          status: false,
          message: action.message,
          messageType: 'danger'
        }
      };
    }
    default:
      return state;
  }
};

export const getGrandTotal = createSelector(
  [
    state => state.allProducts,
    state => state.cart.productIds,
    state => state.cart.productQtys
  ],
  (allProducts, cartProductIds, productQtys) => {
    return cartProductIds.reduce((total, productId) => {
      return total + productQtys[productId] * allProducts[productId].price;
    }, 0);
  }
);
export const getCartItemCount = createSelector(
  [state => state.cart.productIds, state => state.cart.productQtys],
  (cartProductIds, productQtys) => {
    return cartProductIds.reduce((total, productId) => {
      return total + productQtys[productId];
    }, 0);
  }
);
export const getCartProducts = createSelector(
  [
    state => state.allProducts,
    state => state.cart.productIds,
    state => state.cart.productQtys
  ],
  (allProducts, cartProductIds, productQtys) => {
    return cartProductIds.reduce((products, productId) => {
      products[productId] = {
        ...allProducts[productId],
        originalQty: allProducts[productId].quantity,
        quantity: productQtys[productId]
      };
      return products;
    }, {});
  }
);
