import React from 'react';
import { Field } from 'redux-form';
import { radioRenderer } from '../../../redux-form-helper/renderer';

const ShippingMethod = () => {
  return (
    <div className='card'>
      <div className='card-header'>
        <h5 className='sec-title'>Shipping Method</h5>
      </div>
      <div className='card-body'>
        <div className='form-group'>
          <Field
            vals={['fedex', 'ups', 'free']}
            name='shippingMethod'
            labels={['UPS', 'Fedex', 'Free Shipping']}
            component={radioRenderer}
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingMethod;
