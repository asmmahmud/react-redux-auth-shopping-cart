import React from 'react';
import '../../css/Product.css';

const Product = function (props) {
  const list = Object.keys(props.product)
    .filter(
      key =>
        key !== 'name' && key !== '_id' && key !== 'createdAt' && key !== '__v'
    )
    .map(key => {
      return (
        <div key={key} className='list-group-item text-justify'>
          <strong className='text-capitalize'>{key}: </strong>
          {key === 'price' ? props.product[key].toFixed(2) : props.product[key]}
        </div>
      );
    });
  return (
    <div className='col-sm-3'>
      <div className='card product-box'>
        <div className='card-header'>
          <div className='top-part' />
          <div className='card-title'>
            <h6>{props.product.name}</h6>
          </div>
        </div>
        <div className='card-body'>
          <div className='list-group'>{list}</div>
        </div>
        <div className='card-footer text-center'>
          <button
            disabled={props.product.quantity <= 0}
            className='btn btn-outline-success btn-sm'
            onClick={props.addToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
