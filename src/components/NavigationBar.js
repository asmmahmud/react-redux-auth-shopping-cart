import React from 'react';
import { connect } from 'react-redux';
import Auth from '../AuthService/Auth';
import { NavLink, withRouter } from 'react-router-dom';
import '../styles/NavigationBar.scss';

class NavigationBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  login(e) {
    e.preventDefault();
    Auth.login();
  }
  logout(e) {
    e.preventDefault();
    Auth.logout(this.props.dispatch);
  }

  isLinkActive = match => {
    if (!match) {
      return false;
    }
    return true;
  };

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand">
            <h1>React Redux Shopping Cart</h1>
          </NavLink>
          <button onClick={this.props.toggle} className="navbar-toggler" type="button" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className={this.props.isOpen ? 'collapse navbar-collapse' : 'collapse navbar-collapse open'}
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink exact isActive={this.isLinkActive} className="nav-link" to="/products">
                  <i className="fa fa-product-hunt" aria-hidden="true" />
                  <span>Products</span>
                </NavLink>
              </li>

              {this.props.loginStatus && (
                <li className="nav-item">
                  <NavLink exact isActive={this.isLinkActive} className="nav-link" to="/orders">
                    <i className="fa fa-shopping-basket" aria-hidden="true" />
                    <span>Orders</span>
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink exact isActive={this.isLinkActive} className="nav-link" to="/contact-us">
                  <i className="fa fa-envelope" aria-hidden="true" />
                  <span>Contact Us</span>
                </NavLink>
              </li>
              {!this.props.loginStatus && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="#" onClick={this.login}>
                    <i className="fa fa-sign-in" aria-hidden="true" /> Signin / Signup
                  </NavLink>
                </li>
              )}
              {this.props.loginStatus && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink"
                    onClick={this.props.toggleDropdown}
                  >
                    <img className="user-avatar" src={this.props.profilePic} width="50" alt="profile pic" />
                  </a>

                  <div
                    className={this.props.isDropDownOpen ? 'dropdown-menu open' : 'dropdown-menu'}
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <a className="dropdown-item" onClick={this.logout}>
                      <i className="fa fa-sign-out" aria-hidden="true" /> Logout
                    </a>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginStatus: state.allStatuses.loginStatus,
    profilePic: state.userProfile.picture
  };
};

export default connect(mapStateToProps)(withRouter(NavigationBar));
