import React from 'react';
import { Link } from 'react-router-dom';
import { FadeCSSTransitionWrapper } from '../AnimatedWrappers';

const NotFound = props => {
  return (
    <div className="row justify-content-center">
      <div className="col-8">
        <div className="alert alert-danger">
          The Page you're looking for is not existed.You can go to the <Link to="/products">products</Link> page.
        </div>
      </div>
    </div>
  );
};
export default FadeCSSTransitionWrapper(NotFound);
