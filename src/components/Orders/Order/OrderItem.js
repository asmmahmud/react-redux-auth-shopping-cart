import React from 'react';

const OrderItem = function(props) {
  return (
    <tr>
      <td>{props.item.name}</td>
      <td>{props.item.price.toFixed(2)}</td>
      <td className="quantity-row">{props.item.qty}</td>
      <td className="subtotal">{(props.item.qty * props.item.price).toFixed(2)}</td>
    </tr>
  );
};

export default OrderItem;
