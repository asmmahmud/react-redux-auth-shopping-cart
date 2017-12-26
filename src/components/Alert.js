import React from 'react';
import loadingImg from '../assets/loading.svg';

function Alert (props) {
  if (props.type === 'INITIALIZING') {
    return (
      <div className='row justify-content-center'>
        <div className='col-sm-6'>
          <img
            src={loadingImg}
            width='60'
            height='60'
            alt='resource loading.....'
          />
        </div>
      </div>
    );
  }
  if (props.type) {
    return (
      <div className='row justify-content-center'>
        <div className='col-sm-10'>
          <div
            className={[
              'alert',
              'alert-' + props.type,
              'd-flex',
              'justify-content-between'
            ].join(' ')}
          >
            <p className='message'>{props.message} </p>
            <span onClick={props.closeTheAlert} className='fa fa-close' />
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default Alert;
