import { connect } from 'react-redux';
import Cart from '../components/Cart';
import { getGrandTotal, getCartProducts } from '../reducers/cartReducer';
import { decrement, addToCart } from '../actions/cart';
import { getCartItemCount } from '../reducers/cartReducer';

const mapStateToProps = (state, props) => {
  // console.log('mapStateToProps', props);
  return {
    productCount: state.cart.productIds.length,
    products: getCartProducts(state),
    grandTotal: getGrandTotal(state),
    orderInProgress: state.cart.orderInProgress,
    cartItemCount: getCartItemCount(state),
    loginStatus: state.loginStatus
  };
};
const CartContainer = connect(mapStateToProps, {
  decrement,
  addToCart
})(Cart);
export default CartContainer;
