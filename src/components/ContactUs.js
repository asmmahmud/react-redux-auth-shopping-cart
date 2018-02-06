import React from 'react';
import { Helmet } from 'react-helmet';
import upworkIcon from '../assets/upwork.svg';
import upworkIconHover from '../assets/upwork-hover.svg';
import '../styles/ContactUs.scss';

export default class ContactUs extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      upworIconImage: upworkIconHover
    };
    this.imgMouseOver = this.imgMouseOver.bind(this);
    this.imgMouseLeave = this.imgMouseLeave.bind(this);
  }
  imgMouseOver() {
    this.setState({ upworIconImage: upworkIcon });
  }
  imgMouseLeave() {
    this.setState({ upworIconImage: upworkIconHover });
  }
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Contact Us</title>
        </Helmet>
        <div className="row justify-content-center contact-us-page">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Contact Us</h5>
              </div>
              <div className="card-body">
                <div className="list-group social-networks">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://twitter.com/asmscorses"
                    className="list-group-item twitter"
                    title="My Twitter"
                  >
                    <i className="fa fa-twitter" />
                  </a>
                  <a
                    href="https://github.com/asmmahmud"
                    className="list-group-item github"
                    rel="noopener noreferrer"
                    target="_blank"
                    title="My github page"
                  >
                    <i className="fa fa-github" />
                  </a>
                  <a
                    href="https://stackoverflow.com/users/story/1576255"
                    className="list-group-item stackoverflow"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="My stackoverflow Profile"
                  >
                    <i className="fa fa-stack-overflow" />
                  </a>
                  <a
                    href="https://www.upwork.com/o/profiles/users/_~01233afc5e2aac7f4f/"
                    className="list-group-item upwork"
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
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
