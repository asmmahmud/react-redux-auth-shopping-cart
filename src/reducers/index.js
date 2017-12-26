import {combineReducers} from 'redux';
import reduceReducers from 'reduce-reducers';
import {reducer as formReducer} from 'redux-form';
import alertReducer from './alertReducer';
import productReducer, {productAddedReducer} from './productReducer';
import formStatusReducer from './formStatusReducer';
import loginStatusReducer from './loginStatusReducer';
import cartReducer from './cartReducer';
import ordersReducer from './ordersReducer';
import userProfileReducer from './userProfileReducer';
/* export default combineReducers({
  formStatus: formStatusReducer,
  alert: alertReducer,
  allProducts: productReducer
}); */

const initialCombinedReducer = combineReducers({
  userProfile: userProfileReducer,
  loginStatus: loginStatusReducer,
  formStatus: formStatusReducer,
  alert: alertReducer,
  allProducts: productReducer,
  cart: cartReducer,
  allOrders: ordersReducer,
  form: formReducer
});

const rootReducer = reduceReducers(initialCombinedReducer, productAddedReducer);

export default rootReducer;
