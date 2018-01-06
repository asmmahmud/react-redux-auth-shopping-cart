import React from 'react';
import Auth from '../AuthService/Auth';

import { Collapse, Navbar, NavbarToggler } from 'reactstrap';
import { NavLink } from 'react-router-dom';

export default class NavigationBar extends React.Component {
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
          <NavLink to='/home' className='navbar-brand'>
            Shopping Cart
          </NavLink>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <div className='navbar-nav ml-auto'>
              <NavLink activeClassName='active' className='nav-item nav-link' to='/products'>
                Products
              </NavLink>
              {this.props.loginStatus && (
                <NavLink activeClassName='active' className='nav-item nav-link' to='/orders'>
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
                  <img src={this.props.profilePic} width='50' alt='profile pic' />
                </NavLink>
              )}
            </div>
          </Collapse>
        </div>
      </Navbar>
    );
  }
}
