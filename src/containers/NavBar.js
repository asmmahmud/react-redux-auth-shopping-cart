import React from 'react';
import { connect } from 'react-redux';
import Auth from '../AuthService/Auth';
import { Collapse, Navbar, NavbarToggler, NavbarBrand } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { getCartItemCount } from '../reducers/cartReducer';

class NavigationBar extends React.Component {
  constructor (props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  login (e) {
    e.preventDefault();
    Auth.login();
  }

  logout (e) {
    e.preventDefault();
    Auth.logout(this.props.dispatch);
  }
  cartItemCountLink (e) {
    e.preventDefault();
  }
  render () {
    return (
      <Navbar color='faded' light expand='md'>
        <div className='container'>
          <NavbarBrand href='/home'>Shopping Cart</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <div className='navbar-nav ml-auto'>
              <NavLink
                activeClassName='active'
                className='nav-item nav-link'
                to='/products'
              >
                Products
              </NavLink>
              {this.props.loginStatus && (
                <NavLink
                  activeClassName='active'
                  className='nav-item nav-link'
                  to='/orders'
                >
                  Orders
                </NavLink>
              )}
              {!this.props.loginStatus && (
                <NavLink
                  activeClassName='active'
                  className='nav-item nav-link'
                  to='#'
                  onClick={this.login}
                >
                  Login
                </NavLink>
              )}
              {this.props.loginStatus && (
                <NavLink
                  activeClassName='active'
                  className='nav-item nav-link'
                  to='#'
                  onClick={this.logout.bind(this)}
                >
                  Logout
                </NavLink>
              )}
              <NavLink
                className='nav-item nav-link'
                title='Total Cart Item Counter'
                to='#'
                onClick={this.cartItemCountLink}
              >
                <button type='button' className='btn btn-outline-success'>
                  {this.props.cartItemCount}
                </button>
              </NavLink>
              {this.props.loginStatus && (
                <NavLink
                  className='nav-item nav-link'
                  title='Profile Pic'
                  to='#'
                  onClick={this.cartItemCountLink}
                >
                  <img
                    src={this.props.profilePic}
                    width='50'
                    alt='profile pic'
                  />
                </NavLink>
              )}
            </div>
          </Collapse>
        </div>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginStatus: state.loginStatus,
    cartItemCount: getCartItemCount(state),
    profilePic: state.userProfile.picture
  };
};
export default connect(mapStateToProps)(NavigationBar);
