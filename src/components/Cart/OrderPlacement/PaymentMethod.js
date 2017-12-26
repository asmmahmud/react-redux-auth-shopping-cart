import React from 'react';
import {Field} from 'redux-form';
import {radioRenderer} from '../../../redux-form-helper/renderer';

class PaymentMethod extends React.PureComponent {
  render() {
    return (
      <div className='card'>
        <div className='card-header'>
          <h5 className='sec-title'>Payment Method</h5>
        </div>
        <div className='card-body'>
          <div className='form-group'>
            <Field
              vals={['paypal', 'skrill', 'cash_on_delivery']}
              name='paymentMethod'
              labels={['Paypal', 'Skrill', 'Cash on Delivery']}
              component={radioRenderer}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentMethod;
