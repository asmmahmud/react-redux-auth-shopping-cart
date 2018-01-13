import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import userProfileReducer from './userProfileReducer';
import allStatusesReducer from './allStatusesReducer';
import alertReducer from './alertReducer';
import productReducer, { specialProductAddedReducer } from './productReducer';
import cartReducer, { specialCartReducer } from './cartReducer';
import ordersReducer from './ordersReducer';

const initialCombinedReducer = combineReducers({
  userProfile: userProfileReducer,
  allStatuses: allStatusesReducer,
  alert: alertReducer,
  allProducts: productReducer,
  cart: cartReducer,
  allOrders: ordersReducer
});

const rootReducer = reduceReducers(initialCombinedReducer, specialProductAddedReducer, specialCartReducer);

export default rootReducer;
