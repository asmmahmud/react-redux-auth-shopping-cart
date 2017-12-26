import { connect } from 'react-redux';
import Orders from '../components/Orders';

const mapStateToProps = state => {
  return {
    allOrders: state.allOrders,
    oginStatus: state.loginStatus
  };
};
export default connect(mapStateToProps)(Orders);
