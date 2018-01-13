import React from 'react';
import { connect } from 'react-redux';
import { closeTheAlert } from '../actions/alert-action';

function Alert(props) {
  let html = null;
  if (props.type) {
    html = (
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className={['alert', 'alert-' + props.type, 'd-flex', 'justify-content-between'].join(' ')}>
            <span className="message">{props.message} </span>
            <span onClick={props.closeTheAlert} className="fa fa-close" />
          </div>
        </div>
      </div>
    );
  }
  return html;
}

const mapStateToProps = state => {
  return {
    message: state.alert.message,
    type: state.alert.type
  };
};

export default connect(mapStateToProps, { closeTheAlert })(Alert);
