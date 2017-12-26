import React from 'react';
import '../../css/OrderPlacement.css';
import BillingAddress from './OrderPlacement/BillingAddress';
import PaymentMethod from './OrderPlacement/PaymentMethod';
import ShippingMethod from './OrderPlacement/ShippingMethod';
import {reduxForm} from 'redux-form';

const validate = (values) => {

  const errors = {billingAddress: {}, shippingMethod: '', paymentMethod: ''};
  if (!(values.billingAddress && values.billingAddress.name)) {
    errors.billingAddress.name = 'Required';
  }
  if (!(values.billingAddress && values.billingAddress.email)) {
    errors.billingAddress.email = 'Required';
  } else if (!values.billingAddress || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.billingAddress.email)) {
    errors.billingAddress.email = 'Invalid Email Address';
  }
  if (!(values.billingAddress && values.billingAddress.postCode)) {
    errors.billingAddress.postCode = 'Required';
  } else if (!values.billingAddress || values.billingAddress.postCode.length < 4 || values.billingAddress.postCode.length > 5) {
    errors.billingAddress.postCode = 'Post Code is not valid';
  }
  if (!(values.billingAddress && values.billingAddress.country)) {
    errors.billingAddress.country = 'Required';
  }
  if (!(values.billingAddress && values.billingAddress.district)) {
    errors.billingAddress.district = 'Required';
  }
  if (!values.shippingMethod) {
    errors.shippingMethod = 'Required';
  }
  if (!values.paymentMethod) {
    errors.paymentMethod = 'Required';
  }
  return errors;
};

const PlaceOrder = (props) => {

  return (
    <form onSubmit={props.handleSubmit(props.placeOrder)} className='order-place-form'>
      <div className='row'>
        <div className='col'>
          <h5 className='placeorder-title'>Place your Order</h5>
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className='col-sm-6'>
          <BillingAddress/>
        </div>
        <div className='col-sm-6'>
          <div className='row'>
            <div className='col-sm-12'>
              <ShippingMethod/>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-12'>
              <PaymentMethod/>
            </div>
          </div>
        </div>
      </div>
      <div className='row justify-content-end mb-5'>
        <div className='col-sm-2 d-flex'>
          <button
            className='btn btn-primary mr-3'
            type='submit'
            disabled={
              props.productCount <= 0 || !props.loginStatus || props.submitting
            }
          >
            Place Order
          </button>
          <button
            type='button'
            className='btn btn-default'
            disabled={props.pristine || props.submitting}
            onClick={props.reset}
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'placeOrderForm',
  validate
})(PlaceOrder);
