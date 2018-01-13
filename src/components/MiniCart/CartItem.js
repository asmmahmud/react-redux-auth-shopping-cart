import React from 'react';
import { FadeTransitionWrapper } from '../../AnimatedWrappers';

const CartItem = function(props) {
  let content = (
    <div>
      <div className="price">
        {props.product.price.toFixed(2)} <span> X </span>
      </div>
      <div>
        <button onClick={props.subtractFromCart} className="btn btn-outline-danger decrement btn-sm">
          -
        </button>
        <div className="quantity">{props.product.quantity}</div>
        <button
          disabled={props.product.originalQty <= 0}
          onClick={props.addToCart}
          className="btn btn-outline-success btn-sm increment"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <tr className={props.className}>
      <td className="product-name">
        <i className="fa fa-circle-o" />
        {props.product.name}
      </td>
      <td className="quantity-row">{content}</td>
      <td className="action">
        <i className="fa fa-close" onClick={props.removeCartItem} />
      </td>
    </tr>
  );
};

export default FadeTransitionWrapper(CartItem);
