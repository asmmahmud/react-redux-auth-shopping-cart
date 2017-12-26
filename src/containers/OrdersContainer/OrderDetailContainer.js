import { connect } from 'react-redux';
import Order from '../../components/Orders/Order';

const mapStateToProps = (state, ownProps) => {
  const orderId = ownProps.match.params.orderId;
  console.log(state.allOrders[orderId]);
  return {
    order: state.allOrders[orderId] ? state.allOrders[orderId] : {}
  };
};

export default connect(mapStateToProps)(Order);
