import React from 'react';
import { connect } from 'react-redux';
import dotProp from 'dot-prop-immutable';
import ajaxLoader from '../../assets/loading.svg';
import { placeOrder } from '../../actions/cart-action';
import BillingAddress from './OrderPlace/BillingAddress';
import PaymentMethod from './OrderPlace/PaymentMethod';
import ShippingMethod from './OrderPlace/ShippingMethod';
import '../../styles/OrderPlacement.scss';

const validate = (name, value) => {
  if (name === 'name') {
    if (!value.trim()) {
      return 'Name is required.';
    } else if (value.trim().length < 4) {
      return 'Name has to be atleast 4 characters.';
    }
  } else if (name === 'email') {
    if (!value.trim()) {
      return 'Email is required.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return 'Email has to be valid.';
    }
  } else if (name === 'postCode') {
    if (!value.trim()) {
      return 'Post Code is required.';
    } else if (!(value.trim().length === 4 || value.trim().length === 5)) {
      return 'Post Code is not valid';
    }
  } else if (name === 'district') {
    if (!value.trim()) {
      return 'District is required.';
    }
  } else if (name === 'country') {
    if (!value.trim()) {
      return 'Country is required.';
    }
  } else if (name === 'paymentMethod') {
    if (!value.trim()) {
      return 'PaymentMethod is required.';
    }
  } else if (name === 'shippingMethod') {
    if (!value.trim()) {
      return 'ShippingMethod is required.';
    }
  }
  return '';
};
function isOrderFormValid(state) {
  for (let key of Object.keys(state.billingAddress)) {
    if (state.billingAddress[key].invalid) {
      return false;
    }
  }
  return !(state.shippingMethod.invalid || state.paymentMethod.invalid);
}
class OrderPlaceComponent extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      billingAddress: {
        name: { name: 'name', value: '', touched: false, invalid: true, pristine: true, error: '' },
        email: { name: 'email', value: '', touched: false, invalid: true, pristine: true, error: '' },
        postCode: { name: 'postCode', value: '', touched: false, invalid: true, pristine: true, error: '' },
        district: { name: 'district', value: '', touched: false, invalid: true, pristine: true, error: '' },
        country: { name: 'country', value: '', touched: false, invalid: true, pristine: true, error: '' }
      },
      paymentMethod: { name: 'paymentMethod', value: '', touched: false, invalid: true, pristine: true, error: '' },
      shippingMethod: { name: 'shippingMethod', value: '', touched: false, invalid: true, pristine: true, error: '' },
      formValid: false,
      submitting: false
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    console.log(this.state);
  }
  onInputChange(e) {
    const { name, value } = e.target;
    this.processState(name, value);
  }
  onInputBlur(e) {
    const { name, value } = e.target;
    this.processState(name, value, false);
  }
  processState(name, value, isPristineUnchanged = true) {
    this.setState(prevState => {
      let newState;
      const error = validate(name, value);
      // console.log('onInputBlur - ' + name + '--' + value + ' - ' + error);
      if (name === 'paymentMethod') {
        const currentStatus = {
          ...prevState.paymentMethod,
          pristine: isPristineUnchanged ? prevState.paymentMethod.pristine : false,
          value: value,
          touched: true,
          error: error,
          invalid: error.length > 0
        };
        newState = dotProp.set(prevState, 'paymentMethod', currentStatus);
      } else if (name === 'shippingMethod') {
        const currentStatus = {
          ...prevState.shippingMethod,
          pristine: isPristineUnchanged ? prevState.shippingMethod.pristine : false,
          value: value,
          touched: true,
          error: error,
          invalid: error.length > 0
        };
        newState = dotProp.set(prevState, 'shippingMethod', currentStatus);
      } else {
        const currentStatus = {
          ...prevState.billingAddress[name],
          pristine: isPristineUnchanged ? prevState.billingAddress[name].pristine : false,
          value: value,
          touched: true,
          error: error,
          invalid: error.length > 0
        };
        newState = dotProp.set(prevState, `billingAddress.${name}`, currentStatus);
      }
      newState.formValid = isOrderFormValid(newState);
      return newState;
    });
  }

  onSubmit() {
    if (this.state.formValid) {
      const orderData = {
        billingAddress: {
          name: this.state.billingAddress.name.value,
          email: this.state.billingAddress.email.value,
          postCode: this.state.billingAddress.postCode.value,
          district: this.state.billingAddress.district.value,
          country: this.state.billingAddress.country.value
        },
        paymentMethod: this.state.paymentMethod.value,
        shippingMethod: this.state.shippingMethod.value
      };
      console.log('Order Data: ', orderData);
      this.props.dispatch(placeOrder(orderData));
    }
  }

  render() {
    let btnHtml = null;
    if (this.props.orderInProgress) {
      btnHtml = <img src={ajaxLoader} alt="Order is progress...." width="50" className="img-fluid ajax-loader" />;
    } else {
      btnHtml = (
        <button
          onClick={this.onSubmit}
          type="button"
          className="btn btn-primary mr-3"
          disabled={this.props.productCount <= 0 || !this.props.loginStatus || !this.state.formValid}
        >
          Place Order
        </button>
      );
    }
    return (
      <form className="order-place-form">
        <div className="row">
          <div className="col">
            <h5 className="placeorder-title">Place your Order</h5>
          </div>
        </div>
        <div className="row justify-content-center place-order">
          <div className="col-sm-6">
            <BillingAddress
              onInputBlur={this.onInputBlur}
              onInputChange={this.onInputChange}
              formState={this.state.billingAddress}
            />
          </div>
          <div className="col-sm-6">
            <div className="row">
              <div className="col-sm-12">
                <ShippingMethod
                  onInputBlur={this.onInputBlur}
                  onInputChange={this.onInputChange}
                  formInput={this.state.shippingMethod}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <PaymentMethod
                  onInputBlur={this.onInputBlur}
                  onInputChange={this.onInputChange}
                  formInput={this.state.paymentMethod}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-end mb-5">
          <div className="col-sm-auto">{btnHtml}</div>
        </div>
      </form>
    );
  }
}

export default connect()(OrderPlaceComponent);
