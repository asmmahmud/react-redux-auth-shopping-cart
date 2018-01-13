import React from 'react';
import { connect } from 'react-redux';
import { FadeCSSTransitionWrapper } from '../AnimatedWrappers';
import Wrapper from '../hoc/Wrapper';
import { Link } from 'react-router-dom';
import '../styles/Order.scss';

class OrdersComponent extends React.PureComponent {
  render() {
    const allOrders = this.props.allOrders;
    const orderCount = Object.keys(allOrders).length;
    let htmlContent;
    if (this.props.loginStatus) {
      htmlContent = (
        <div className="row">
          <div className="col-md-12">
            <h4>Please login to view your list of orders.</h4>
          </div>
        </div>
      );
    } else {
      htmlContent = (
        <div className="row">
          <div className="col-md-12">
            <h4>You don't have any orders</h4>
          </div>
        </div>
      );
    }

    if (orderCount) {
      htmlContent = (
        <Wrapper>
          <div className="row">
            <div className="col-md-12">
              <h5 className="order-page-title my-4">Your all Orders</h5>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-12">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Order Date</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(allOrders).map(orderId => {
                    return (
                      <tr key={orderId}>
                        <td>{allOrders[orderId].createdAt.toLocaleString()}</td>
                        <td>{allOrders[orderId].totalQty}</td>
                        <td>{allOrders[orderId].grandTotal}</td>
                        <td>
                          <Link to={{ pathname: '/orders/' + orderId }} title={'order id: ' + orderId}>
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Wrapper>
      );
    }
    return <div className="order-page">{htmlContent}</div>;
  }
}

const mapStateToProps = state => {
  return {
    allOrders: state.allOrders,
    loginStatus: state.allStatuses.loginStatus
  };
};
const Orders = connect(mapStateToProps)(OrdersComponent);
export default FadeCSSTransitionWrapper(Orders);
