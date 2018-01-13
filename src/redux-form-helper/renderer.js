import React from 'react';
import Wrapper from '../hoc/Wrapper';

const createRenderer = render => ({ input, name, label, meta, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {render(input, name, label, meta, rest)}
      {meta.touched &&
        (meta.error && (
          <div style={{ padding: '.25rem 1.25rem' }} className="alert alert-danger">
            {meta.error}
          </div>
        ))}
    </div>
  );
};
export const radioRenderer = ({ vals = [], labels = [], input, meta }) => {
  // console.log('input: ', input);
  // console.log('meta: ', meta);
  return (
    <Wrapper>
      {vals.map((val, i) => {
        return (
          <div key={val} className="form-check">
            <label className="form-check-label">
              <input
                {...input}
                className="form-check-input"
                checked={input.value === val}
                type="radio"
                name={input.name}
                id={input.name + i}
                value={val}
              />
              {labels[i]}
            </label>
          </div>
        );
      })}
      {meta.touched &&
        (meta.error && (
          <div style={{ padding: '.25rem 1.25rem' }} className="alert alert-danger">
            {meta.error}
          </div>
        ))}
    </Wrapper>
  );
};
export const renderInput = createRenderer((input, name, label, meta, { type }) => {
  return (
    <input
      {...input}
      name={name}
      id={name}
      className={meta.touched && meta.invalid ? 'form-control form-control-error' : 'form-control'}
      placeholder={label}
      type={type}
    />
  );
});
export const renderSelect = createRenderer((input, name, label, meta, { type, children }) => {
  return (
    <select
      className={meta.touched && meta.invalid ? 'form-control form-control-error' : 'form-control'}
      {...input}
      id={name}
    >
      {children}
    </select>
  );
});
