import React from 'react';
import { Route, Link } from 'react-router-dom';
import '../css/Cart.css';
import spinnerSvg from '../assets/loading.svg';
import CartItem from './Cart/CartItem';
import Wrapper from '../hoc/Wrapper';
import OrderPlaceContainer from '../containers/CartContainer/OrderPlaceContainer';

class Cart extends React.PureComponent {
  openCheckout = e => {
    if (this.props.productCount <= 0 || !this.props.loginStatus) {
      e.preventDefault();
    }
    return true;
  };
  render() {
    const products = this.props.products;
    let progressReport = '',
      content;
    if (this.props.orderInProgress.status) {
      progressReport = (
        <div className="alert alert-warning d-flex justify-content-center">
          <img
            alt="Ajax Loader"
            src={spinnerSvg}
            className="img-fluid"
            style={{ width: '32px', margin: '0 auto' }}
          />
        </div>
      );
    } else if (this.props.orderInProgress.message) {
      progressReport = (
        <div
          className={[
            'alert',
            'alert-' + this.props.orderInProgress.messageType,
            'd-flex',
            'justify-content-center',
          ].join(' ')}
        >
          <span>{this.props.orderInProgress.message}</span>
        </div>
      );
    }

    if (this.props.productCount <= 0) {
      content = <div className="alert alert-warning">Cart is Empty</div>;
    } else {
      content = (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(products).map(productId => {
              return (
                <CartItem
                  key={productId}
                  productId={productId}
                  product={products[productId]}
                  decrement={() => this.props.decrement(productId)}
                  addToCart={() => this.props.addToCart(productId)}
                />
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2" className="text-left">
                <Link
                  disabled={
                    this.props.productCount <= 0 || !this.props.loginStatus
                  }
                  to="/cart/checkout"
                  onClick={this.openCheckout}
                  className="btn btn-outline-primary text-left"
                >
                  Checkout
                </Link>
              </td>
              <td colSpan="2" className="text-right">
                Grand Total: {this.props.grandTotal.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      );
    }

    return (
      <Wrapper>
        <div className="row justify-content-center mt-2 mb-5">
          <div className="col-sm-8">
            {progressReport}
            <div className="card shopping-cart">
              <div className="card-header">
                <div className='top-part' />
                <h5 className="cart-title">Shopping Cart ({this.props.cartItemCount} Items)</h5>
              </div>
              <div className="card-body">{content}</div>
            </div>
          </div>
        </div>
        <Route path="/cart/checkout" component={OrderPlaceContainer} />
      </Wrapper>
    );
  }
}

export default Cart;
