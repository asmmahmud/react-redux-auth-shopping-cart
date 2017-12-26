import React from 'react';
import {NavLink} from 'react-router-dom';

const Sidebar = function (props) {
  const cellPhone = encodeURIComponent('Cell Phone');
  const laptop = encodeURIComponent('Laptop');
  const monitor = encodeURIComponent('Monitor');
  const cars = encodeURIComponent('Electric Car');
  return (
    <div className="nav flex-column">
      <NavLink activeClassName='active' to={'/'+cellPhone} className="nav-item nav-link">Cell Phones</NavLink>
      <NavLink activeClassName='active' to={'/'+laptop} className="nav-item nav-link">Laptop</NavLink>
      <NavLink activeClassName='active' to={'/'+monitor} className="nav-item nav-link">Monitor</NavLink>
      <NavLink activeClassName='active' to={'/'+cars} className="nav-item nav-link">Electric Car</NavLink>
    </div>
  );
};

export default Sidebar;
