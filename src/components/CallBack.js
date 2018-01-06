import React from 'react';
import loading from '../assets/loading.svg';
import Auth from '../AuthService/Auth';

export default class CallBackComponent extends React.Component {
  componentDidMount () {
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      Auth.handleAuthentication(this.props);
    }
  }

  render () {
    const style = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white'
    };

    return (
      <div style={style}>
        <img src={loading} alt='loading' />
      </div>
    );
  }
}
