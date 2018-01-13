import React from 'react';
import Field from '../../FormElements/Field';

const ShippingMethod = props => {
  const { onInputChange, onInputBlur, formInput } = props;
  return (
    <div className="card">
      <div className="card-header">
        <h6 className="sec-title">Shipping Method</h6>
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
            <option value="fedex">Fedex</option>
            <option value="ups">UPS</option>
            <option value="free">Free Shipping</option>
          </Field>
        </div>
      </div>
    </div>
  );
};

export default ShippingMethod;
