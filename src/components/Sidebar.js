import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

const Sidebar = function (props) {
  return (
    <div className='nav side-nav flex-column'>
      <NavLink activeClassName='active' to={'/Cell Phone'} className='nav-item nav-link'>
        Cell Phones
      </NavLink>
      <NavLink activeClassName='active' to={'/Laptop'} className='nav-item nav-link'>
        Laptop
      </NavLink>
      <NavLink activeClassName='active' to={'/Monitor'} className='nav-item nav-link'>
        Monitor
      </NavLink>
      <NavLink activeClassName='active' to={'/Electric Car'} className='nav-item nav-link'>
        Electric Car
      </NavLink>
    </div>
  );
};

export default withRouter(Sidebar);
