import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Wrapper from '../../hoc/Wrapper';
import OrderItem from './Order/OrderItem';
import { remove_ } from '../../utils';

class OrderDetailComponent extends React.PureComponent {
  render() {
    if (!Object.keys(this.props.order).length) {
      return null;
    }
    const items = this.props.order.items;
    return (
      <Wrapper>
        <div className="row justify-content-end">
          <div className="col-md-2 text-right">
            <Link to="/orders">&lt;&lt; Back </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h5 className="order-title">Order No# {this.props.order.id}</h5>
          </div>
        </div>
        <div className="row justify-content-center mb-4">
          <div className="col-md-12">
            <div className="card order">
              <div className="card-header">
                <h6 className="card-title">Ordered Items</h6>
              </div>
              <div className="card-body">
                <table className="table order-items-table table-striped">
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
                      <td colSpan="2" className="text-right">
                        <strong>Grand Total</strong>
                      </td>
                      <td colSpan="2" className="text-right">
                        {this.props.order.grandTotal.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h6 className="card-title">Shipping Information</h6>
              </div>
              <div className="card-body">
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
          <div className="col-md-6">
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h6 className="card-title">Shipping Method</h6>
                  </div>
                  <div className="card-body">
                    <span className="capitalize">{this.props.order.shippingMethod}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h6 className="card-title">Payment Method</h6>
                  </div>
                  <div className="card-body">
                    <span className="capitalize"> {remove_(this.props.order.paymentMethod)}</span>
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
OrderDetailComponent.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string,
    items: PropTypes.array,
    grandTotal: PropTypes.number,
    billingAddress: PropTypes.object,
    shippingMethod: PropTypes.string,
    paymentMethod: PropTypes.string
  })
};

const mapStateToProps = (state, ownProps) => {
  const orderId = ownProps.match && ownProps.match.params.orderId ? ownProps.match.params.orderId : null;
  return {
    order: state.allOrders[orderId] ? state.allOrders[orderId] : {}
  };
};

export default connect(mapStateToProps)(OrderDetailComponent);
