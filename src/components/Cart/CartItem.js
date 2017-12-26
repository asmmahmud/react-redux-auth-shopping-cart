import React from 'react';

const CartItem = function (props) {
  return (
    <tr>
      <td>{props.product.name}</td>
      <td>{props.product.price.toFixed(2)}</td>
      <td className='quantity-row'>
        <button
          onClick={props.decrement}
          className='btn btn-outline-danger decrement btn-sm'
        >
          -
        </button>
        <span className='quantity'> {props.product.quantity}</span>
        <button
          disabled={props.product.originalQty <= 0}
          onClick={props.addToCart}
          className='btn btn-outline-success btn-sm increment'
        >
          +
        </button>
      </td>
      <td>{(props.product.quantity * props.product.price).toFixed(2)}</td>
    </tr>
  );
};

export default CartItem;
