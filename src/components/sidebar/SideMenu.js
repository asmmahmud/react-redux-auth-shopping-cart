import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

const SideMenu = function() {
  return (
    <div className="card side-nav">
      <div className="card-header">
        <h5 className="card-title">
          <i className="fa fa-clone" aria-hidden="true" /> Categories
        </h5>
      </div>
      <div className="card-body">
        <div className="nav flex-column">
          <NavLink activeClassName="active" to={'/category/Cell Phone'} className="nav-item nav-link">
            <i className="fa fa-mobile" aria-hidden="true" />
            <span>Cell Phones</span>
          </NavLink>
          <NavLink activeClassName="active" to={'/category/Laptop'} className="nav-item nav-link">
            <i className="fa fa-laptop" aria-hidden="true" />
            <span>Laptop</span>
          </NavLink>
          <NavLink activeClassName="active" to={'/category/Monitor'} className="nav-item nav-link">
            <i className="fa fa-desktop" aria-hidden="true" />
            <span>Monitor</span>
          </NavLink>
          <NavLink activeClassName="active" to={'/category/Electric Car'} className="nav-item nav-link">
            <i className="fa fa-car" aria-hidden="true" />
            <span>Electric Car</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SideMenu);
