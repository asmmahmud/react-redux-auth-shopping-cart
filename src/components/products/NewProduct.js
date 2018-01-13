import React from 'react';
import { connect } from 'react-redux';
import Field from '../FormElements/Field';
import dotProp from 'dot-prop-immutable';
import { submitNewProduct } from '../../actions/products-action';
import { FadeCSSTransitionWrapper } from '../../AnimatedWrappers';
import ajaxLoader from '../../assets/loading.svg';
import '../../styles/NewProduct.scss';

const validate = (name, value) => {
  if (name === 'name') {
    if (!value.trim()) {
      return 'Product Name is required.';
    } else if (value.trim().length < 4) {
      return 'Product Name has to be atleast 4 characters.';
    }
  } else if (name === 'category') {
    if (!value.trim()) {
      return 'Product Category is required.';
    }
  } else if (name === 'brand') {
    if (!value.trim()) {
      return 'Product Brand is required.';
    } else if (!(value.trim().length >= 2 && value.trim().length <= 20)) {
      return 'Product Brand has to be atleast 2 and at most 20 characters.';
    }
  } else if (name === 'price') {
    let price = parseFloat(value);
    if (!price || price <= 0) {
      return 'Price has to be above 0.';
    }
  } else if (name === 'quantity') {
    let quantity = parseInt(value, 10);
    if (!quantity || quantity < 0) {
      return 'Quantity can not be negative.';
    }
  }
  return '';
};
const isFormValid = state => {
  for (let key of Object.keys(state)) {
    if (key !== 'formValid' && key !== 'submitting' && state[key].invalid) {
      return false;
    }
  }
  return true;
};
const defaultProductFormState = {
  name: { name: 'name', value: '', touched: false, invalid: true, pristine: true, error: '' },
  category: { name: 'category', value: '', touched: false, invalid: true, pristine: true, error: '' },
  brand: { name: 'brand', value: '', touched: false, invalid: true, pristine: true, error: '' },
  model: { name: 'model', value: '', touched: false, invalid: true, pristine: true, error: '' },
  price: { name: 'price', value: '', touched: false, invalid: true, pristine: true, error: '' },
  quantity: { name: 'quantity', value: '', touched: false, invalid: true, pristine: true, error: '' },
  formValid: false,
  submitting: false
};
class NewProductComponent extends React.PureComponent {
  constructor() {
    super();
    this.state = defaultProductFormState;
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
  }
  onInputChange(e) {
    const { name, value } = e.target;
    this.processState(name, value);
  }
  onInputBlur(e) {
    const { name, value } = e.target;
    this.processState(name, value, false);
  }
  resetForm() {
    this.setState(defaultProductFormState);
  }
  processState(fieldName, fieldValue, isPristineUnchanged = true) {
    this.setState(prevState => {
      let newState;
      const error = validate(fieldName, fieldValue);

      const currentStatus = {
        name: fieldName,
        pristine: isPristineUnchanged ? prevState[fieldName].pristine : false,
        value: fieldValue,
        touched: true,
        error: error,
        invalid: error.length > 0
      };
      newState = dotProp.set(prevState, fieldName, currentStatus);
      newState.formValid = isFormValid(newState);

      return newState;
    });
  }

  onClickSubmit() {
    if (this.state.formValid) {
      const productData = {
        name: this.state.name.value,
        category: this.state.category.value,
        brand: this.state.brand.value,
        model: this.state.model.value,
        price: this.state.price.value,
        quantity: this.state.quantity.value
      };
      console.log('productData: ', productData);
      this.props.submitNewProduct(productData);
      this.resetForm();
    }
  }
  render() {
    const { isSubmitting } = this.props;
    let btnHtml = '';
    if (isSubmitting) {
      btnHtml = <img src={ajaxLoader} alt="Order is progress...." width="50" className="img-fluid ajax-loader" />;
    } else {
      btnHtml = (
        <div>
          <button
            className="btn btn-primary mr-3"
            onClick={this.onClickSubmit}
            type="submit"
            disabled={!this.state.formValid}
          >
            Save
          </button>
        </div>
      );
    }
    return (
      <div className="row justify-content-center mb-4">
        <div className="col-sm-10">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add New Product</h4>
            </div>
            <div className="card-body">
              <form>
                <Field
                  label="Product Name"
                  input={this.state.name}
                  onInputBlur={this.onInputBlur}
                  onInputChange={this.onInputChange}
                  type="text"
                />
                <Field
                  label="Category"
                  input={this.state.category}
                  onInputBlur={this.onInputBlur}
                  onInputChange={this.onInputChange}
                  type="select"
                >
                  <option value="">-Select-</option>
                  <option value="Cell Phone">Cell Phone</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Cars">Cars</option>
                </Field>
                <Field
                  label="Brand Name"
                  input={this.state.brand}
                  onInputBlur={this.onInputBlur}
                  onInputChange={this.onInputChange}
                  type="text"
                />
                <Field
                  label="Model"
                  input={this.state.model}
                  onInputBlur={this.onInputBlur}
                  onInputChange={this.onInputChange}
                  type="text"
                />
                <Field
                  label="Price"
                  input={this.state.price}
                  onInputBlur={this.onInputBlur}
                  onInputChange={this.onInputChange}
                  type="number"
                />
                <Field
                  label="Quantity"
                  input={this.state.quantity}
                  onInputBlur={this.onInputBlur}
                  onInputChange={this.onInputChange}
                  type="number"
                />
                <div className="form-group">{btnHtml}</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSubmitting: state.allStatuses.productSubmitting
  };
};
const NewProduct = connect(mapStateToProps, { submitNewProduct })(NewProductComponent);
export default FadeCSSTransitionWrapper(NewProduct);
