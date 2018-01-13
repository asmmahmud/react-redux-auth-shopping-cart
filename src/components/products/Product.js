import React from 'react';
import '../../styles/Product.scss';

const itemIcon = itemName => {
  if (itemName === 'brand') {
    return <i className="fa fa-building-o" aria-hidden="true" />;
  } else if (itemName === 'price') {
    return <i className="fa fa-money" aria-hidden="true" />;
  } else if (itemName === 'quantity') {
    return <i className="fa fa-cubes" aria-hidden="true" />;
  } else if (itemName === 'model') {
    return <i className="fa fa-square" aria-hidden="true" />;
  }
  return '';
};
const Product = function(props) {
  let productIcon;
  if (props.product.category === 'Cell Phone') {
    productIcon = <i className="fa fa-mobile" aria-hidden="true" />;
  } else if (props.product.category === 'Laptop') {
    productIcon = <i className="fa fa-laptop" aria-hidden="true" />;
  } else if (props.product.category === 'Monitor') {
    productIcon = <i className="fa fa-desktop" aria-hidden="true" />;
  } else if (props.product.category === 'Electric Car') {
    productIcon = <i className="fa fa-car" aria-hidden="true" />;
  }
  const list = Object.keys(props.product)
    .filter(
      key =>
        key !== 'productId' &&
        key !== 'name' &&
        key !== 'category' &&
        key !== '_id' &&
        key !== 'createdAt' &&
        key !== '__v'
    )
    .map(key => {
      return (
        <tr key={key}>
          <td>{itemIcon(key)}</td>
          <td>
            <strong className="text-capitalize">{key}: </strong>
          </td>
          <td>{key === 'price' ? props.product[key].toFixed(2) : props.product[key]}</td>
        </tr>
      );
    });
  return (
    <div className="col-sm-6 col-md-4 col-xl-3">
      <div className="card product-box">
        <div className="card-header">
          <div className="top-part" />
          <div className="card-title">
            <h6>
              {productIcon} {props.product.name}
            </h6>
          </div>
        </div>
        <div className="card-body">
          <table className="table product-attributes">
            <tbody>{list}</tbody>
          </table>
        </div>
        <div className="card-footer text-center">
          <button disabled={props.product.quantity <= 0} className="btn btn-success btn-sm" onClick={props.addToCart}>
            <i className="fa fa-shopping-cart" aria-hidden="true" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
