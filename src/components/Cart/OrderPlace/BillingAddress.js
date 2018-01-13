import React from 'react';
import Field from '../../FormElements/Field';
// import { renderInput } from '../../../redux-form-helper/renderer';

class BillingAddress extends React.Component {
  render() {
    const { onInputChange, onInputBlur, formState } = this.props;
    return (
      <div className="card">
        <div className="card-header">
          <h6 className="sec-title">Billing Address</h6>
        </div>
        <div className="card-body">
          <Field
            label="Name"
            input={formState.name}
            onInputBlur={onInputBlur}
            onInputChange={onInputChange}
            type="text"
          />
          <Field
            label="Email Address"
            input={formState.email}
            onInputBlur={onInputBlur}
            onInputChange={onInputChange}
            type="email"
          />
          <Field
            label="Post Code"
            input={formState.postCode}
            onInputBlur={onInputBlur}
            onInputChange={onInputChange}
            type="number"
          />
          <Field
            label="District"
            input={formState.district}
            onInputBlur={onInputBlur}
            onInputChange={onInputChange}
            type="text"
          />
          <Field
            label="Country"
            input={formState.country}
            onInputBlur={onInputBlur}
            onInputChange={onInputChange}
            type="text"
          />
        </div>
      </div>
    );
  }
}

export default BillingAddress;
