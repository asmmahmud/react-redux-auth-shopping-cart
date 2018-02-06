import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { FadeCSSTransitionWrapper } from '../AnimatedWrappers';

const NotFound = props => {
  return (
    <React.Fragment>
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>
      <div className="row justify-content-center">
        <div className="col-8">
          <div className="alert alert-danger">
            The Page you're looking for is not existed.You can go to the <Link to="/products">products</Link> page.
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default FadeCSSTransitionWrapper(NotFound);
