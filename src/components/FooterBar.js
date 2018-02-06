import React from 'react';
import { connect } from 'react-redux';
import Auth from '../AuthService/Auth';
import { NavLink, withRouter } from 'react-router-dom';

import upworkIcon from '../assets/upwork.svg';
import upworkIconHover from '../assets/upwork-hover.svg';

import '../styles/Footerbar.scss';

class FooterBar extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      upworIconImage: upworkIcon
    };
    this.logout = this.logout.bind(this);
    this.imgMouseOver = this.imgMouseOver.bind(this);
    this.imgMouseLeave = this.imgMouseLeave.bind(this);
  }
  login(e) {
    e.preventDefault();
    Auth.login();
  }
  logout(e) {
    e.preventDefault();
    Auth.logout(this.props.dispatch);
  }
  imgMouseOver() {
    this.setState({ upworIconImage: upworkIconHover });
  }
  imgMouseLeave() {
    this.setState({ upworIconImage: upworkIcon });
  }
  isLinkActive = match => {
    if (!match) {
      return false;
    }
    return true;
  };
  render() {
    return (
      <footer id="myFooter">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-4">
              <h5>Get started</h5>
              <ul>
                <li>
                  <NavLink exact isActive={this.isLinkActive} className="nav-link" to="/products">
                    <i className="fa fa-home" />
                    <span>Home</span>
                  </NavLink>
                </li>
                {this.props.loginStatus && (
                  <li>
                    <NavLink exact isActive={this.isLinkActive} className="nav-link" to="/orders">
                      <i className="fa fa-shopping-basket" aria-hidden="true" />
                      <span>Orders</span>
                    </NavLink>
                  </li>
                )}
                {!this.props.loginStatus && (
                  <li>
                    <NavLink className="nav-link" to="#" onClick={this.login}>
                      <i className="fa fa-sign-in" />
                      <span>Signin / Signup</span>
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
            <div className="col-sm-4">
              <h5>About us</h5>
              <ul>
                <li>
                  <NavLink exact className="nav-link" to="/about-us">
                    <i className="fa fa-user" />
                    <span>About Us</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink exact className="nav-link" to="/contact-us">
                    <i className="fa fa-envelope" />
                    <span>Contact Us</span>
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="col-sm-4">
              <div className="social-networks">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/asmscorses"
                  className="twitter"
                  title="My Twitter"
                >
                  <i className="fa fa-twitter" />
                </a>
                <a
                  href="https://github.com/asmmahmud"
                  className="github"
                  rel="noopener noreferrer"
                  target="_blank"
                  title="My github page"
                >
                  <i className="fa fa-github" />
                </a>
                <a
                  href="https://stackoverflow.com/users/story/1576255"
                  className="stackoverflow"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="My stackoverflow Profile"
                >
                  <i className="fa fa-stack-overflow" />
                </a>
                <a
                  href="https://www.upwork.com/o/profiles/users/_~01233afc5e2aac7f4f/"
                  className="upwork"
                  title="My Upwork Profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    onMouseOver={this.imgMouseOver}
                    onMouseLeave={this.imgMouseLeave}
                    src={this.state.upworIconImage}
                    className="upwork-icon"
                    alt="Upwork"
                  />
                </a>
              </div>
              <NavLink className="btn btn-default" to="/contact-us">
                <i className="fa fa-envelope" />
                <span>Contact Us</span>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <p>© 2018 A.S.M. Mahmudul Hasan. All Rights Reserved.</p>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginStatus: state.allStatuses.loginStatus
  };
};

export default connect(mapStateToProps)(withRouter(FooterBar));
