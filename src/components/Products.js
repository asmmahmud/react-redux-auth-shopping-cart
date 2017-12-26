import React from 'react';
import '../css/Products.css';
import Wrapper from '../hoc/Wrapper';
import Product from './products/List';
import CartContainer from '../containers/CartContainer';

class Products extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      brand: '',
      sort: 'price',
      sortOrder: 'asc'
    };
    this.addnew = this.addNewProduct.bind(this);
    this.sortAndFilterHandler = this.sortAndFilterHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.categoryName !== nextProps.categoryName) {
      this.setState({brand: '', sort: 'price', sortOrder: 'asc', products: nextProps.products});
    } else if (nextProps.products !== this.props.products) {
      this.updateState({
        brand: this.state.brand,
        sort: this.state.sort,
        sortOrder: this.state.sortOrder
      }, nextProps.products);
    }
  }

  updateState(newFilter, allProducts) {
    this.setState(prevState => {
      const nextState = {
        ...prevState,
        ...newFilter
      };
      const brand = nextState.brand;
      const products = allProducts
        .filter(product => {
          if (brand) {
            return product.brand === brand
          }
          return true;
        });
      products.sort((productA, productB) => {
        const nameA = productA[nextState.sort],
          nameB = productB[nextState.sort],
          sortOrder = nextState.sortOrder;
        if (nameA < nameB) {
          return sortOrder === 'asc' ? -1 : 1;
        } else if (nameA > nameB) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
      nextState.products = products;
      return nextState;
    });
  }

  sortAndFilterHandler(e) {
    const target = e.target;
    this.updateState({[target.name]: target.value}, this.props.products);
  }

  addNewProduct() {
    this.props.history.replace('/products/new');
  }

  render() {
    let productsHtml, allProducts = this.state.products;
    if (!allProducts.length && this.props.categoryName) {
      productsHtml = (
        <div className='col-sm-12'>
          <h4 className='text-center'>No Product found on the category <strong>{this.props.categoryName}</strong></h4>
        </div>
      );
    } else if (!allProducts.length) {
      productsHtml = (
        <div className='col-sm-12'>
          <h4 className='text-center'>Loading.......</h4>
        </div>
      );
    } else {
      productsHtml = allProducts.map(product => {
        return (
          <Product
            key={product.productId}
            productId={product.productId}
            product={product}
            addToCart={() => this.props.addToCart(product.productId)}
          />
        );
      });
    }
    return (
      <Wrapper>
        <CartContainer/>
        {this.props.loginStatus && (
          <div className='row justify-content-end mb-4'>
            <div className='col-sm-2'>
              <button className='btn btn-primary' onClick={this.addnew}>
                Add New Product
              </button>
            </div>
          </div>
        )}

        <div className='row justify-content-center'>
          <div className='col-sm-12'>
            <div className='product-bar d-flex justify-content-between'>
              {Object.keys(this.props.brandList).length &&
              <div className='filter'>
                <div className='form-group row'>
                  <label htmlFor='brand' className='col-sm-2 col-form-label'>
                    Filter
                  </label>
                  <div className='col-sm-10'>
                    <select
                      onChange={this.sortAndFilterHandler}
                      value={this.state.brand}
                      className='form-control'
                      name='brand'
                      id='brand'
                    >
                      <option value=''>All</option>
                      {this.props.brandList.map(brand =>
                        <option key={brand} value={brand}>{brand}</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>
              }
              <div className='d-flex justify-content-between sorting'>
                <div className='form-group row'>
                  <label htmlFor='sort' className='col-sm-4 col-form-label'>
                    Sorting:
                  </label>
                  <div className='col-sm-7'>
                    <select
                      onChange={this.sortAndFilterHandler}
                      value={this.state.sort}
                      className='form-control'
                      name='sort'
                      id='sort'
                    >
                      <option value='brand'>Brand</option>
                      <option value='price'>Price</option>
                      <option value='quantity'>Quantity</option>
                    </select>
                  </div>
                </div>
                <div className='form-group row'>
                  <label
                    htmlFor='sortOrder'
                    className='col-sm-4 col-form-label'
                  >
                    Order:
                  </label>
                  <div className='col-sm-7'>
                    <select
                      onChange={this.sortAndFilterHandler}
                      value={this.state.sortOrder}
                      className='form-control'
                      name='sortOrder'
                      id='sortOrder'
                    >
                      <option value='asc'>Ascending</option>
                      <option value='desc'>Descending</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row justify-content-center mb-5'>{productsHtml}</div>
      </Wrapper>
    );
  }
}

export default Products;
