import React from 'react';
import { Field, reduxForm } from 'redux-form';
import '../../css/NewProduct.css';
import { renderInput, renderSelect } from '../../redux-form-helper/renderer';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.category) {
    errors.category = 'Required';
  }
  if (!values.brand) {
    errors.brand = 'Required';
  }
  if (!values.price) {
    errors.price = 'Required';
  } else if (parseFloat(values.price, 10) < 0) {
    errors.price = 'Price can not be less than 0';
  }
  if (!values.quantity) {
    errors.quantity = 'Required';
  } else if (parseInt(values.quantity, 10) < 0) {
    errors.quantity = 'Quantity can not be less than 0';
  }
  return errors;
};

let NewProduct = props => {
  const { handleSubmit, submitNewProduct, pristine, reset, submitting } = props;

  return (
    <div className='row justify-content-center mb-4'>
      <div className='col-sm-10'>
        <form onSubmit={handleSubmit(submitNewProduct)}>
          <fieldset>
            <legend>
              <h4>Add New Product</h4>
            </legend>
            <Field label='Name' name='name' type='text' component={renderInput} />
            <Field label='Category' name='category' component={renderSelect}>
              <option value=''>-Select-</option>
              <option value='Cell Phone'>Cell Phone</option>
              <option value='Laptop'>Laptop</option>
              <option value='Cars'>Cars</option>
            </Field>
            <Field label='Brand' name='brand' type='text' component={renderInput} />
            <Field label='Model' name='model' type='text' component={renderInput} />
            <Field label='Price' name='price' type='number' component={renderInput} />
            <Field label='Quantity' name='quantity' type='number' component={renderInput} />
            <div className='form-group'>
              <button className='btn btn-primary' type='submit' disabled={submitting}>
                Save
              </button>
              <button
                type='button'
                className='btn btn-default'
                disabled={pristine || submitting}
                onClick={reset}
              >
                Reset
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
export default reduxForm({
  form: 'newProductForm', // a unique identifier for this form
  validate
})(NewProduct);
