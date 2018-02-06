import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { API_DOMAIN } from '../../config';
import '../../styles/productModal.scss';
import PreLoadImage from '../PreLoadImage';

export default class ProductModal extends React.PureComponent {
  constructor() {
    super();
    this.addToCart = this.addToCart.bind(this);
  }
  addToCart() {
    this.props.addToCart(this.props.product.productId);
  }
  productIcon() {
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
    return productIcon;
  }
  render() {
    if (!this.props.product) {
      return null;
    }

    const list = Object.keys(this.props.product)
      .filter(
        key =>
          key !== 'productId' &&
          key !== 'name' &&
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
      <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggle} className="product-modal">
        <ModalHeader toggle={this.props.toggle}>
          {this.productIcon()} {this.props.product.name}
        </ModalHeader>
        <ModalBody className="product-details">
          <div className="left-portion">
            <table className="table product-attributes">
              <tbody>{list}</tbody>
              <tbody>
                <tr>
                  <td colSpan="2">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam distinctio dolorum est in
                      inventore iusto maxime minus omnis quasi voluptate. Aspernatur at corporis cupiditate delectus
                      dolores, eius excepturi expedita, facere fugiat inventore minima minus necessitatibus nostrum
                      numquam odit totam voluptates! Dignissimos fuga, maiores non odio ratione sed ullam voluptas
                      voluptatem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, vitae. Lorem ipsum
                      dolor sit amet, consectetur adipisicing elit. A aperiam cum ex facere fugit illo nam obcaecati
                      perferendis velit, vitae.
                    </p>
                  </td>
                </tr>
              </tbody>
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
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-warning btn-sm" onClick={this.props.toggle}>
            Cancel
          </button>
          <button
            disabled={this.props.product.quantity <= 0}
            className="btn btn-success btn-sm"
            onClick={this.addToCart}
          >
            <i className="fa fa-shopping-cart" aria-hidden="true" /> Add to Cart
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}
ProductModal.propTypes = {
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
  toggle: PropTypes.func,
  isModalOpen: PropTypes.bool
};
