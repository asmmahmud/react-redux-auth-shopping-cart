import React from 'react';
import { connect } from 'react-redux';
import loading from '../assets/loading.svg';
import Auth from '../AuthService/Auth';
import { FadeCSSTransitionWrapper } from '../AnimatedWrappers';

class CallBackComponent extends React.Component {
  componentDidMount() {
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      Auth.handleAuthentication(this.props);
    }
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-6">
          <img src={loading} alt="loading" />
        </div>
      </div>
    );
  }
}
const CallBack = connect()(CallBackComponent);
export default FadeCSSTransitionWrapper(CallBack);
