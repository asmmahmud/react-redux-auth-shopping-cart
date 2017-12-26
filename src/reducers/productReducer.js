import {createSelector} from 'reselect';
import dotProp from 'dot-prop-immutable';
import {ACTIONS} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_ALL_PRODUCTS: {
      return action.loadedProducts.reduce((allProduct, product) => {
        allProduct[product._id] = {
          ...product,
          productId: product._id,
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

export const getFilteredProductBrands = createSelector(
  [
    state => state.allProducts,
    (state, categoryName) => categoryName
  ],
  (allProducts, categoryName) => {
    if (categoryName) {
      return Object.keys(allProducts).reduce((brandList, productId) => {
        if (allProducts[productId].category === categoryName
          && allProducts[productId].brand && brandList.indexOf(allProducts[productId].brand) === -1) {
          brandList.push(allProducts[productId].brand);
        }
        return brandList;
      }, []);
    }
    return Object.keys(allProducts).reduce((brandList, productId) => {
      if (allProducts[productId].brand && brandList.indexOf(allProducts[productId].brand) === -1) {
        brandList.push(allProducts[productId].brand);
      }
      return brandList;
    }, []);
  }
);
export const getFilteredProducts = createSelector(
  [
    state => state.allProducts,
    (state, categoryName) => categoryName,
  ],
  (allProducts, categoryName) => {
    return Object.keys(allProducts)
      .filter(productId => {
        if (categoryName) {
          return allProducts[productId].category === categoryName
        }
        return true;
      })
      .map(productId => allProducts[productId]);
  }
);
