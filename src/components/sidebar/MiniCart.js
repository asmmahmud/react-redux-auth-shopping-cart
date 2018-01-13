import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import CartItem from '../MiniCart/CartItem';
import { getGrandTotal, getCartProducts } from '../../reducers/cartReducer';
import { subtractFromCart, removeFromCart, addToCart } from '../../actions/cart-action';
import { getCartItemCount } from '../../reducers/cartReducer';
import ajaxLoader from '../../assets/loading.svg';
import '../../styles/MiniCart.scss';

class MiniCartComponent extends React.PureComponent {
  openCheckout = e => {
    if (this.props.productCount <= 0 || !this.props.loginStatus || this.props.orderInProgress) {
      e.preventDefault();
    }
    return true;
  };
  render() {
    let content;
    const products = this.props.products;
    if (this.props.cartUpdating || this.props.orderInProgress) {
      content = <img src={ajaxLoader} alt="working....." className="img-fluid ajax-loader" width="60" />;
    } else if (this.props.productCount <= 0) {
      content = <div className="alert alert-warning">Cart is Empty</div>;
    } else {
      content = (
        <div className="table-responsive">
          <table className="table table-striped">
            <TransitionGroup component="tbody" className="transition-group">
              {Object.keys(products).map(productId => {
                return (
                  <CartItem
                    key={productId}
                    productId={productId}
                    product={products[productId]}
                    subtractFromCart={() => this.props.subtractFromCart(productId)}
                    addToCart={() => this.props.addToCart(productId)}
                    removeCartItem={() => this.props.removeFromCart(productId)}
                  />
                );
              })}
            </TransitionGroup>
            <tfoot>
              <tr>
                <td className="text-left">
                  <Link
                    disabled={this.props.productCount <= 0 || !this.props.loginStatus || this.props.orderInProgress}
                    to="/cart/checkout"
                    onClick={this.openCheckout}
                    className="btn btn-primary btn-sm text-left"
                  >
                    Checkout
                  </Link>
                </td>
                <td className="text-right">{this.props.grandTotal.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      );
    }
    return (
      <div className="card mini-cart">
        <div className="card-header">
          <div className="top-part" />
          <h5 className="card-title">
            <i className="fa fa-shopping-cart" aria-hidden="true" />Shopping Cart ({this.props.cartItemCount} Items)
          </h5>
        </div>
        <div className="card-body">{content}</div>
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

const MiniCart = connect(mapStateToProps, {
  removeFromCart,
  subtractFromCart,
  addToCart
})(MiniCartComponent);

export default MiniCart;
