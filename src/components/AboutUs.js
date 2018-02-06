import React from 'react';
import { Helmet } from 'react-helmet';
import '../styles/AboutUs.scss';
import { NavLink } from 'react-router-dom';

export default class AboutUs extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Contact Us</title>
        </Helmet>
        <div className="row justify-content-center about-us">
          <div className="col-md-8">
            <h2 className="title">About Us</h2>
            <div className="desc">
              <h5>We're React.js, Angular, Vue.js, Node.js Developers.</h5>
              <p>
                <NavLink to="/contact-us">Contact Us</NavLink>{' '}
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
