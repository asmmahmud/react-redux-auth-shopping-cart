import React from 'react';
import { connect } from 'react-redux';
import { getGrandTotal, getCartProducts } from '../reducers/cartReducer';
import { subtractFromCart, addToCart, removeFromCart } from '../actions/cart-action';
import { getCartItemCount } from '../reducers/cartReducer';
import { Link } from 'react-router-dom';
import CartItem from './Cart/CartItem';
import '../styles/Cart.scss';
import spinnerSvg from '../assets/loading.svg';

class CartComponent extends React.PureComponent {
  openCheckout = e => {
    if (this.props.productCount <= 0 || !this.props.loginStatus) {
      e.preventDefault();
    }
    return true;
  };
  render() {
    const products = this.props.products;
    let content;
    if (this.props.orderInProgress || this.props.cartUpdating) {
      content = <img alt="Ajax Loader" src={spinnerSvg} className="img-fluid ajax-loader" width="90" />;
    } else {
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
                <td>&nbsp;</td>
              </tr>
            </thead>
            <tbody>
              {Object.keys(products).map(productId => {
                return (
                  <CartItem
                    key={productId}
                    productId={productId}
                    product={products[productId]}
                    subtractFromCart={() => this.props.subtractFromCart(productId)}
                    addToCart={() => this.props.addToCart(productId)}
                    removeFromCart={() => this.props.removeFromCart(productId)}
                  />
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2" className="text-left">
                  <Link
                    disabled={this.props.productCount <= 0 || !this.props.loginStatus}
                    to="/cart/checkout"
                    onClick={this.openCheckout}
                    className="btn btn-outline-success text-left"
                  >
                    Checkout
                  </Link>
                </td>
                <td colSpan="3" className="text-right">
                  Grand Total: {this.props.grandTotal.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        );
      }
    }

    return (
      <div className="row justify-content-center mt-2 mb-5">
        <div className="col-sm-8">
          <div className="card shopping-cart">
            <div className="card-header">
              <div className="top-part" />
              <h5 className="cart-title">Shopping Cart ({this.props.cartItemCount} Items)</h5>
            </div>
            <div className="card-body">{content}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    productCount: state.cart.productIds.length,
    products: getCartProducts(state),
    grandTotal: getGrandTotal(state),
    cartItemCount: getCartItemCount(state),
    orderInProgress: state.allStatuses.orderInProgress,
    loginStatus: state.allStatuses.loginStatus,
    cartUpdating: state.allStatuses.cartUpdating
  };
};

const Cart = connect(mapStateToProps, {
  subtractFromCart,
  addToCart,
  removeFromCart
})(CartComponent);

export default Cart;
