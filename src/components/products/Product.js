import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/Product.scss';
import { API_DOMAIN } from '../../config';
import PreLoadImage from '../PreLoadImage';

/*const itemIcon = itemName => {
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
};*/
class Product extends React.PureComponent {
  constructor() {
    super();
    this.addToCart = this.addToCart.bind(this);
    this.openModal = this.openModal.bind(this);
  }
  addToCart() {
    this.props.addToCart(this.props.product.productId);
  }
  openModal() {
    this.props.openModal(this.props.product.productId);
  }
  render() {
    let productIcon;
    if (this.props.product.category === 'Cell Phone') {
      productIcon = <i className="fa fa-mobile" aria-hidden="true" />;
    } else if (this.props.product.category === 'Laptop') {
      productIcon = <i className="fa fa-laptop" aria-hidden="true" />;
    } else if (this.props.product.category === 'Monitor') {
      productIcon = <i className="fa fa-desktop" aria-hidden="true" />;
    } else if (this.props.product.category === 'Electric Car') {
      productIcon = <i className="fa fa-car" aria-hidden="true" />;
    }
    const list = Object.keys(this.props.product)
      .filter(
        key =>
          key !== 'productId' &&
          key !== 'name' &&
          key !== 'category' &&
          key !== '_id' &&
          key !== 'images' &&
          key !== 'createdAt' &&
          key !== '__v'
      )
      .map(key => {
        return (
          <tr key={key}>
            <td className="attr-col">
              <strong className="text-capitalize">{key}: </strong>
            </td>
            <td className="attr-val">
              {key === 'price' ? this.props.product[key].toFixed(2) : this.props.product[key]}
            </td>
          </tr>
        );
      });
    return (
      <div className="col-md-6 col-xl-4">
        <div className="card product-box">
          <div className="card-header">
            <div className="top-part" />
            <div className="card-title">
              <h6>
                {productIcon} {this.props.product.name}
              </h6>
            </div>
          </div>
          <div className="card-body clearfix">
            <div className="left-portion">
              <table className="table product-attributes">
                <tbody>{list}</tbody>
              </table>
            </div>
            <div className="right-portion">
              {this.props.product.images &&
                this.props.product.images.length && (
                  <PreLoadImage
                    className="product-image"
                    src={API_DOMAIN + '/' + this.props.product.images[0]}
                    alt={this.props.product.name}
                  />
                )}
            </div>
          </div>
          <div className="card-footer text-center">
            <button
              disabled={this.props.product.quantity <= 0}
              className="btn btn-success btn-sm"
              onClick={this.addToCart}
            >
              <i className="fa fa-shopping-cart" aria-hidden="true" /> Add to Cart
            </button>
            <button className="btn btn-success btn-sm btn-open-modal" onClick={this.openModal}>
              View More
            </button>
          </div>
        </div>
      </div>
    );
  }
}
Product.propTypes = {
  product: PropTypes.shape({
    productId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    model: PropTypes.string,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.array
  }),
  addToCart: PropTypes.func,
  openModal: PropTypes.func
};

export default Product;
