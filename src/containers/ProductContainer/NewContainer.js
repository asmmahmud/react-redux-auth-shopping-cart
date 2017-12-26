import { connect } from 'react-redux';
import { submitNewProduct } from '../../actions/products';

import NewProduct from '../../components/products/New';

const mapStateToProps = state => {
  return {
    products: state.allProducts,
    isSubmitting: state.formStatus.productSubmitting
  };
};
export default connect(mapStateToProps, { submitNewProduct })(NewProduct);
