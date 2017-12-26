import {connect} from 'react-redux';
import Products from '../components/Products';
import {addToCart} from '../actions/cart';
import {setProductFilter} from '../actions/products';
import {getFilteredProducts, getFilteredProductBrands} from "../reducers/productReducer";

const mapStateToProps = (state, props) => {
  const params = {
    loginStatus: state.loginStatus,
    filters: state.productFilters
  };
  params.categoryName = props.match.params.categoryName ? props.match.params.categoryName : '';
  params.products = getFilteredProducts(state, params.categoryName);
  params.brandList = getFilteredProductBrands(state, params.categoryName);
  return params;
};

export default connect(mapStateToProps, {
  addToCart,
  setProductFilter
})(Products);
