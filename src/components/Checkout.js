import React from 'react';
import { connect } from 'react-redux';
import Wrapper from '../hoc/Wrapper';
import Cart from './Cart';
import OrderPlace from './Cart/OrderPlace';
import { FadeCSSTransitionWrapper } from '../AnimatedWrappers';

const CheckoutComponent = props => {
  let orderForm = '';
  if (!props.loginStatus && props.productCount > 0) {
    orderForm = (
      <div className="row justify-content-center mt-4">
        <div className="col-md-auto">
          <div className="alert alert-warning">
            <h6>
              <i className="fa fa-warning" /> To checkout, you've to login
            </h6>
          </div>
        </div>
      </div>
    );
  } else if (props.loginStatus && props.productCount > 0) {
    orderForm = (
      <OrderPlace
        productCount={props.productCount}
        loginStatus={props.loginStatus}
        orderInProgress={props.orderInProgress}
      />
    );
  }
  return (
    <Wrapper>
      <Cart />
      {orderForm}
    </Wrapper>
  );
};
const mapStateToProps = state => {
  return {
    productCount: state.cart.productIds.length,
    loginStatus: state.allStatuses.loginStatus,
    orderInProgress: state.allStatuses.orderInProgress
  };
};
const Checkout = connect(mapStateToProps)(CheckoutComponent);
export default FadeCSSTransitionWrapper(Checkout);
