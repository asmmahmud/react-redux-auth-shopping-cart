import { createSelector } from 'reselect';
import dotProp from 'dot-prop-immutable';
import { ACTIONS } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.PRODUCTS_ALL_LOADED: {
      return action.loadedProducts.reduce((allProduct, product) => {
        allProduct[product._id] = {
          ...product,
          productId: product._id,
          price: parseFloat(product.price),
          quantity: +product.quantity
        };
        return allProduct;
      }, {});
    }
    case ACTIONS.NEW_PRODUCT_SUCCESS: {
      return {
        ...state,
        [action.addedProduct._id]: {
          ...action.addedProduct,
          productId: action.addedProduct._id,
          price: parseFloat(action.addedProduct.price),
          quantity: +action.addedProduct.quantity
        }
      };
    }
    case ACTIONS.ADD_TO_CART: {
      return dotProp.set(state, `${action.productId}.quantity`, qty => qty - 1);
    }
    case ACTIONS.SUBTRACT_FROM_CART: {
      return dotProp.set(state, `${action.productId}.quantity`, qty => qty + 1);
    }
    default:
      return state;
  }
};
/*export const specialProductAddedReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.NEW_PRODUCT_SUCCESS: {
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
};*/

export const getFilteredProductBrands = createSelector([allProducts => allProducts], allProducts => {
  return allProducts.reduce((brandList, product) => {
    if (product.brand && brandList.indexOf(product.brand) === -1) {
      brandList.push(product.brand);
    }
    return brandList;
  }, []);
});
export const getFilteredProducts = createSelector(
  [state => state.allProducts, (state, categoryName) => categoryName],
  (allProducts, categoryName) => {
    const filteredProducts = Object.keys(allProducts)
      .filter(productId => {
        const product = allProducts[productId];
        if (categoryName) {
          return product.category === categoryName;
        }
        return true;
      })
      .map(productId => allProducts[productId]);

    filteredProducts.sort((productA, productB) => {
      const nameA = productA.brand,
        nameB = productB.brand;
      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    return filteredProducts;
  }
);
