import React from 'react';
import Wrapper from '../../hoc/Wrapper';

export default class Field extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: 'Value'
    };
  }

  render() {
    let html = '',
      errorBlock;
    const { input, type, onInputBlur, onInputChange } = this.props;
    if (type === 'radio') {
      html = (
        <Wrapper>
          {this.props.vals.map((val, i) => {
            return (
              <div key={val} className="form-check">
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    checked={input.value === val}
                    type="radio"
                    name={input.name}
                    id={input.name + i}
                    value={val}
                  />
                  {this.props.labels[i]}
                </label>
              </div>
            );
          })}
          {input.touched &&
            (input.error && (
              <div style={{ padding: '.25rem 1.25rem' }} className="alert alert-danger">
                {input.error}
              </div>
            ))}
        </Wrapper>
      );
    } else if (type === 'select') {
      const { label, children } = this.props;
      if (input.touched && !input.pristine && input.error) {
        errorBlock = (
          <div style={{ padding: '.25rem 1.25rem' }} className="alert alert-danger">
            {input.error}
          </div>
        );
      }
      html = (
        <div className="form-group">
          <label htmlFor={input.name}>{label}</label>
          <select
            className={
              input.touched && !input.pristine && input.invalid ? 'form-control form-control-error' : 'form-control'
            }
            name={input.name}
            id={input.name}
            value={input.value}
            onChange={onInputChange}
            onBlur={onInputBlur}
          >
            {children}
          </select>
          {errorBlock}
        </div>
      );
    } else {
      const { label } = this.props;
      if (input.touched && !input.pristine && input.error) {
        errorBlock = (
          <div style={{ padding: '.25rem 1.25rem' }} className="alert alert-danger">
            {input.error}
          </div>
        );
      }
      html = (
        <div className="form-group">
          <label htmlFor={input.name}>{label}</label>
          <input
            className={
              input.touched && !input.pristine && input.invalid ? 'form-control form-control-error' : 'form-control'
            }
            name={input.name}
            id={input.name}
            type={type}
            value={input.value}
            onChange={onInputChange}
            onBlur={onInputBlur}
          />
          {errorBlock}
        </div>
      );
    }
    return html;
  }
}
