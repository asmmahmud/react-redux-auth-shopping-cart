import { connect } from 'react-redux';
import OrderPlacement from '../../components/Cart/OrderPlacement';
import { placeOrder } from '../../actions/cart';

const mapStateToProps = state => {
  return {
    productCount: state.cart.productIds.length,
    loginStatus: state.loginStatus
  };
};
export default connect(mapStateToProps, { placeOrder })(OrderPlacement);
