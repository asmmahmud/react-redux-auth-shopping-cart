import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import userProfileReducer from './userProfileReducer';
import allStatusesReducer from './allStatusesReducer';
import alertReducer from './alertReducer';
import productReducer from './productReducer';
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

const rootReducer = reduceReducers(initialCombinedReducer, specialCartReducer);

export default rootReducer;
