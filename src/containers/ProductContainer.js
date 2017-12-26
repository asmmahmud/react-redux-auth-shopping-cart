import {connect} from 'react-redux';
import Products from '../components/Products';
import {addToCart} from '../actions/cart';
import {loadAllProducts} from '../actions/products';

const mapStateToProps = (state, props) => {
  const params = {
    loginStatus: state.loginStatus
  };
  if (props.match.params.categoryName) {
    params.categoryName = props.match.params.categoryName;
  }
  return params;
};
export default connect(mapStateToProps, {
  addToCart,
  loadAllProducts
})(Products);
