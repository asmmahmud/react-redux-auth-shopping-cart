import React from 'react';
import Wrapper from '../../hoc/Wrapper';
import OrderItem from './Order/OrderItem';
import loadingSvg from '../../assets/loading.svg';

class Order extends React.PureComponent {
  render () {
    if (!Object.keys(this.props.order).length) {
      return (
        <div className='row justify-content-center'>
          <div className='col-sm-8'>
            <img src={loadingSvg} width='50' height='50' alt='Loading......' />
          </div>
        </div>
      );
    }
    const items = this.props.order.items;
    return (
      <Wrapper>
        <div className='row'>
          <div className='col-sm-12'>
            <h4 className='order-title mt-5'>
              Order No# {this.props.order.id}
            </h4>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-sm-8'>
            <div className='card'>
              <div className='card-header'>
                <h5>Ordered Items</h5>
              </div>
              <div className='card-body'>
                <table className='table table-striped'>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, id) => {
                      return <OrderItem key={id} item={item} />;
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan='2' className='text-right'>
                        <strong>Grand Total</strong>
                      </td>
                      <td colSpan='2' className='text-right'>
                        {this.props.order.grandTotal.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-sm-6'>
            <div className='card'>
              <div className='card-header'>
                <h5>Shipping Information</h5>
              </div>
              <div className='card-body'>
                <address>
                  {this.props.order.billingAddress.name}
                  <br />
                  {this.props.order.billingAddress.email}
                  <br />
                  {this.props.order.billingAddress.postCode}
                  <br />
                  {this.props.order.billingAddress.district}
                  <br />
                  {this.props.order.billingAddress.country}
                  <br />
                </address>
              </div>
            </div>
          </div>
          <div className='col-sm-6'>
            <div className='row justify-content-center'>
              <div className='col-sm-12'>
                <div className='card'>
                  <div className='card-header'>
                    <h5>Shipping Method</h5>
                  </div>
                  <div className='card-body'>
                    {this.props.order.shippingMethod}
                  </div>
                </div>
              </div>
            </div>
            <div className='row justify-content-center'>
              <div className='col-sm-12'>
                <div className='card'>
                  <div className='card-header'>
                    <h5>Payment Method</h5>
                  </div>
                  <div className='card-body'>
                    {this.props.order.paymentMethod}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default Order;
