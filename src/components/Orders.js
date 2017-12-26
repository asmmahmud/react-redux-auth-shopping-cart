import React from 'react';
import Wrapper from '../hoc/Wrapper';
import { Route, Link } from 'react-router-dom';
import OrderDetailContainer from '../containers/OrdersContainer/OrderDetailContainer';
import '../css/Order.css';

class Orders extends React.PureComponent {
  render () {
    const allOrders = this.props.allOrders;
    const orderCount = Object.keys(allOrders).length;
    let htmlContent;
    if (this.props.loginStatus) {
      htmlContent = <h4>Please login to view your list of orders.</h4>;
    } else {
      htmlContent = <h4>You don't have any orders</h4>;
    }

    if (orderCount) {
      htmlContent = (
        <Wrapper>
          <h3 className='order-page-title my-4'>All Completed Orders</h3>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Product Name</th>
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
                      <Link
                        to={{ pathname: '/orders/' + orderId }}
                        title={'order id: ' + orderId}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Wrapper>
      );
    }
    return (
      <div className='order-page'>
        <div className='row justify-content-center'>
          <div className='col-sm-8'>{htmlContent} </div>
        </div>
        <Route path='/orders/:orderId' component={OrderDetailContainer} />
      </div>
    );
  }
}

export default Orders;
