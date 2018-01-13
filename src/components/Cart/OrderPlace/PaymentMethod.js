import React from 'react';
import Field from '../../FormElements/Field';

class PaymentMethod extends React.PureComponent {
  render() {
    const { onInputChange, onInputBlur, formInput } = this.props;
    return (
      <div className="card">
        <div className="card-header">
          <h6 className="sec-title">Payment Method</h6>
        </div>
        <div className="card-body">
          <div className="form-group">
            <Field
              label="Payment Method"
              input={formInput}
              onInputBlur={onInputBlur}
              onInputChange={onInputChange}
              type="select"
            >
              <option value="">-Select-</option>
              <option value="cash_on_delivery">Cash on Delivery</option>
              <option value="skrill">Skrill</option>
              <option value="paypal">Paypal</option>
            </Field>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentMethod;
