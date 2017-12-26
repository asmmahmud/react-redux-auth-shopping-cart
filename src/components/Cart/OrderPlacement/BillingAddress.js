import React from 'react';
import { Field } from 'redux-form';
import { renderInput } from '../../../redux-form-helper/renderer';

let BillingAddress = () => {
  return (
    <div className='card'>
      <div className='card-header'>
        <h5 className='sec-title'>Billing Address</h5>
      </div>
      <div className='card-body'>
        <Field label='Name' name='billingAddress[name]' type='text' component={renderInput} />
        <Field label='Email Address' name='billingAddress[email]' type='email' component={renderInput} />
        <Field label='Post Code' name='billingAddress[postCode]' type='number' component={renderInput} />
        <Field label='District' name='billingAddress[district]' type='text' component={renderInput} />
        <Field label='Country' name='billingAddress[country]' type='text' component={renderInput} />
      </div>
    </div>
  );
};

export default BillingAddress;
