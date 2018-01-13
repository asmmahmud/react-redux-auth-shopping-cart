import React from 'react';
import Auth from '../AuthService/Auth';
export default class extends React.Component {
  login(e) {
    e.preventDefault();
    Auth.login();
  }
  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-sm-8">
          {Auth.isAuthenticated() && <h4>You are logged in!</h4>}
          {!Auth.isAuthenticated() && (
            <h4>
              You are not logged in! Please
              <a style={{ cursor: 'pointer' }} onClick={this.login}>
                Log In
              </a>
              to continue.
            </h4>
          )}
        </div>
      </div>
    );
  }
}
