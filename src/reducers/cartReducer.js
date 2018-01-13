import { createSelector } from 'reselect';
import { ACTIONS } from '../actions/types';
import dotProp from 'dot-prop-immutable';

const initialState = {
  productIds: [],
  productQtys: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART: {
      if (state.productIds.indexOf(action.productId) === -1) {
        let productIds, productQtys;
        productIds = state.productIds.concat([action.productId]);
        productQtys = dotProp.set(state.productQtys, `${action.productId}`, 1);
        return {
          productIds,
          productQtys
        };
      } else {
        return dotProp.set(state, `productQtys.${action.productId}`, qty => qty + 1);
      }
    }
    case ACTIONS.SUBTRACT_FROM_CART: {
      const qty = state.productQtys[action.productId] - 1;
      if (qty) {
        return dotProp.set(state, `productQtys.${action.productId}`, qty => qty - 1);
      }
      const prodIndex = state.productIds.indexOf(action.productId);
      const newState = dotProp.delete(state, `productQtys.${action.productId}`);
      return dotProp.delete(newState, `productIds.${prodIndex}`);
    }
    case ACTIONS.CHECKOUT_SUCCESS: {
      return initialState;
    }
    default:
      return state;
  }
};
export const specialCartReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.REMOVE_FROM_CART: {
      let newCart, newAllProducts;
      const oldCart = state.cart,
        oldAllProducts = state.allProducts;
      const oldProduct = oldAllProducts[action.productId];
      if (oldProduct) {
        const prodIndex = oldCart.productIds.indexOf(action.productId);
        const qty = oldCart.productQtys[action.productId];
        if (prodIndex !== -1) {
          newCart = dotProp.delete(oldCart, `productQtys.${action.productId}`);
          newCart = dotProp.delete(newCart, `productIds.${prodIndex}`);
          const newQty = oldProduct.quantity + qty;
          newAllProducts = dotProp.set(oldAllProducts, `${action.productId}.quantity`, newQty);
          return {
            ...state,
            allProducts: newAllProducts,
            cart: newCart
          };
        }
      }
      return state;
    }
    case ACTIONS.CART_CLEARING: {
      const cart = state.cart;
      const editedProducts = {};
      cart.productIds.forEach(id => {
        editedProducts[id] = {
          ...state.allProducts[id],
          quantity: state.allProducts[id].quantity + cart.productQtys[id]
        };
      });
      if (cart.productIds.length > 0) {
        return {
          ...state,
          allProducts: {
            ...state.allProducts,
            ...editedProducts
          },
          cart: { ...initialState }
        };
      }
      return state;
    }
    case ACTIONS.USER_CART_LOADED: {
      const productIds = [];
      const productQtys = {};
      const editedProducts = {};
      action.cartItems.forEach(item => {
        const qty = +item.qty;
        if (qty && state.allProducts[item.product_id]) {
          if (state.allProducts[item.product_id].quantity >= qty) {
            productIds.push(item.product_id);
            productQtys[item.product_id] = qty;
            editedProducts[item.product_id] = {
              ...state.allProducts[item.product_id],
              quantity: state.allProducts[item.product_id].quantity - qty
            };
          } else {
            productIds.push(item.product_id);
            productQtys[item.product_id] = state.allProducts[item.product_id].quantity;
            editedProducts[item.product_id] = {
              ...state.allProducts[item.product_id],
              quantity: 0
            };
          }
        }
      });
      //dotProp.set(state, `${action.productId}.quantity`, qty => qty + 1);
      if (productIds.length > 0) {
        return {
          ...state,
          allProducts: {
            ...state.allProducts,
            ...editedProducts
          },
          cart: {
            ...state.cart,
            productIds: productIds,
            productQtys: productQtys
          }
        };
      }
      return state;
    }
    default:
      return state;
  }
};

export const getGrandTotal = createSelector(
  [state => state.allProducts, state => state.cart.productIds, state => state.cart.productQtys],
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
  [state => state.allProducts, state => state.cart.productIds, state => state.cart.productQtys],
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
