import React from 'react';
import '../css/Products.css';
import Wrapper from '../hoc/Wrapper';
import Product from './products/List';
import CartContainer from '../containers/CartContainer';

class Products extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      brand: '',
      sort: 'brand',
      sortOrder: 'asc'
    };
    this.addnew = this.addNewProduct.bind(this);
    this.sortAndFilterHandler = this.sortAndFilterHandler.bind(this);
  }

  componentDidMount() {
    if (this.props.categoryName) {
      this.props.loadAllProducts(this.props.categoryName);
    } else {
      this.props.loadAllProducts('');
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.categoryName, this.props.categoryName);
    if (this.props.categoryName !== nextProps.categoryName) {
      console.log('componentWillReceiveProps', nextProps.categoryName);
      this.props.loadAllProducts(nextProps.categoryName);
    }
  }

  sortAndFilterHandler(e) {
    const categoryName = this.props.categoryName ? this.props.categoryName : '';
    this.setState({[e.target.name]: e.target.value});
    const state = {...this.state, [e.target.name]: e.target.value};
    this.props.loadAllProducts(categoryName, state.brand, state.sort, state.sortOrder);
  }

  addNewProduct() {
    this.props.history.replace('/products/new');
  }

  render() {
    let productsHtml,
      allProducts = this.props.products || [];
    if (!Object.keys(allProducts).length && this.props.categoryName) {
      productsHtml = (
        <div className='col-sm-12'>
          <h4 className='text-center'>No Product found on the category <strong>{this.props.categoryName}</strong></h4>
        </div>
      );
    } else if (!Object.keys(allProducts).length) {
      productsHtml = (
        <div className='col-sm-12'>
          <h4 className='text-center'>Loading.......</h4>
        </div>
      );
    } else {
      productsHtml = Object.keys(allProducts).map(productId => {
        return (
          <Product
            key={productId}
            productId={productId}
            product={allProducts[productId]}
            addToCart={() => this.props.addToCart(productId)}
          />
        );
      });
    }
    return (
      <Wrapper>
        {/*        <div className="row">
          <div className="col-sm-12">
            <pre>{JSON.stringify(allProducts, null, 2)}</pre>
          </div>
        </div>*/}
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
        {Object.keys(allProducts).length && (
          <div className='row justify-content-center'>
            <div className='col-sm-12'>
              <div className='product-bar d-flex justify-content-between'>
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
                        <option value='Apple'>Apple</option>
                        <option value='Samsung'>Samsung</option>
                        <option value='Google'>Google</option>
                        <option value='LG'>LG</option>
                        <option value='Motorola'>Motorola</option>
                        <option value='OnePlus'>OnePlus</option>
                      </select>
                    </div>
                  </div>
                </div>
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
        )}
        <div className='row justify-content-center mb-5'>{productsHtml}</div>
      </Wrapper>
    );
  }
}

export default Products;
