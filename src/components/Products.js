import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import FilterBar from './products/FilterBar';
import Pagination from './products/Pagination';
import Product from './products/Product';
import { addToCart } from '../actions/cart-action';
import { getFilteredProducts, getFilteredProductBrands } from '../reducers/productReducer';
import { FadeCSSTransitionWrapper } from '../AnimatedWrappers';
import '../styles/Products.scss';
import ajaxLoader from '../assets/loading.svg';
import ProductModal from './products/ProductModal';

class ProductsComponent extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      filteredProducts: [],
      currentProducts: [],
      brand: '',
      sort: 'brand',
      sortOrder: 'asc',
      currentPage: 1,
      searchTerm: '',
      modalProduct: null,
      isModalOpen: false
    };
    this.pageSize = 9;
    this.addnew = this.addNewProduct.bind(this);
    this.sortAndFilterHandler = this.sortAndFilterHandler.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
    this.sortOrderChange = this.sortOrderChange.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.openModal = this.openModal.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }
  searchProducts(e) {
    const searchTerm = e.target.value;
    this.updateState(
      {
        brand: '',
        sort: 'brand',
        sortOrder: 'asc',
        currentPage: 1,
        searchTerm: searchTerm
      },
      this.props.products
    );
  }
  sortOrderChange() {
    const sortDir = this.state.sortOrder === 'asc' ? 'desc' : 'asc';
    this.updateState({ sortOrder: sortDir, currentPage: 1 }, this.props.products);
  }
  sortAndFilterHandler(e) {
    const target = e.target;
    this.updateState({ [target.name]: target.value, currentPage: 1 }, this.props.products);
  }
  goToPage(pageNo) {
    console.log('goToPage: ', pageNo);
    this.processPagination(pageNo);
  }
  processPagination(pageNo) {
    const startPos = this.pageSize * (pageNo - 1);
    let endPos = startPos + this.pageSize;
    if (this.state.filteredProducts.length < endPos) {
      endPos = this.state.filteredProducts.length;
    }
    const currentProducts = this.state.filteredProducts.slice(startPos, endPos);
    this.setState({
      currentPage: pageNo,
      currentProducts: currentProducts
    });
  }
  componentDidMount() {
    if (this.props.products !== this.state.filteredProducts) {
      const start = 0;
      let endPos = this.pageSize;
      if (this.props.products.length < endPos) {
        endPos = this.props.products.length;
      }
      const currentProducts = this.props.products.slice(start, endPos);
      this.setState({
        brand: '',
        sort: 'brand',
        sortOrder: 'asc',
        currentPage: 1,
        searchTerm: '',
        filteredProducts: this.props.products,
        currentProducts: currentProducts
      });
    }
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.categoryName !== nextProps.categoryName) {
      const start = 0;
      let endPos = this.pageSize;
      if (nextProps.products.length < endPos) {
        endPos = nextProps.products.length;
      }
      const currentProducts = nextProps.products.slice(start, endPos);
      this.setState({
        brand: '',
        sort: 'brand',
        sortOrder: 'asc',
        currentPage: 1,
        searchTerm: '',
        filteredProducts: nextProps.products,
        currentProducts: currentProducts
      });
    } else if (nextProps.products !== this.props.products) {
      this.updateState(
        {
          brand: this.state.brand,
          sort: this.state.sort,
          currentPage: this.state.currentPage,
          sortOrder: this.state.sortOrder,
          searchTerm: this.state.searchTerm
        },
        nextProps.products
      );
    }
  }

  updateState(newFilter, allProducts) {
    this.setState(prevState => {
      const nextState = {
        ...prevState,
        ...newFilter
      };
      const brand = nextState.brand;
      const searchTerm = nextState.searchTerm.toLowerCase();
      const products = allProducts.filter(product => {
        if (brand && searchTerm) {
          return (
            product.brand === brand &&
            (product.name.toLowerCase().includes(searchTerm) ||
              product.category.toLowerCase().includes(searchTerm) ||
              (product.model && product.model.toLowerCase().includes(searchTerm)))
          );
        } else if (brand) {
          return product.brand === brand;
        } else if (searchTerm) {
          return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            (product.model && product.model.toLowerCase().includes(searchTerm))
          );
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

      nextState.filteredProducts = products;
      const start = 0;
      let endPos = this.pageSize;
      if (products.length < endPos) {
        endPos = products.length;
      }
      nextState.currentProducts = products.slice(start, endPos);

      if (prevState.modalProduct) {
        nextState.modalProduct = products.find(product => product.productId === prevState.modalProduct.productId);
      }

      return nextState;
    });
  }
  addNewProduct() {
    this.props.history.replace('/products/new');
  }
  openModal(productId) {
    const modalProduct = this.state.products.find(product => product.productId === productId);
    this.setState({
      isModalOpen: true,
      modalProduct: modalProduct
    });
  }
  modalToggle() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  addToCart(productId) {
    this.props.addToCart(productId);
  }
  render() {
    let documentTitle,
      pageTitle,
      productsHtml,
      currentProducts = this.state.currentProducts,
      productCount = this.state.filteredProducts.length;

    console.log(currentProducts);

    if (this.props.categoryName) {
      pageTitle = this.props.categoryName;
      documentTitle = this.props.categoryName;
    } else {
      pageTitle = 'All Products';
      documentTitle = 'All Products';
    }
    if (this.props.productsLoading) {
      productsHtml = (
        <div className="col-md-auto">
          <img src={ajaxLoader} className="img-fluid ajax-loader mt-5" width="250" alt="products are loading....." />
        </div>
      );
    } else {
      if (!productCount && this.props.categoryName) {
        productsHtml = (
          <div className="col-md-12">
            <div className="alert alert-warning text-center my-5">
              <h6>
                <i className="fa fa-warning" />
                No Product found on the category <strong>{this.props.categoryName}</strong>
              </h6>
            </div>
          </div>
        );
      } else if (!productCount) {
        productsHtml = (
          <div className="col-md-12">
            <div className="alert alert-warning text-center my-5">
              <h6>
                <i className="fa fa-warning" /> No Product Found
              </h6>
            </div>
          </div>
        );
      } else {
        productsHtml = currentProducts.map(product => {
          return (
            <Product key={product.productId} product={product} addToCart={this.addToCart} openModal={this.openModal} />
          );
        });
      }
    }

    return (
      <div className="product-list">
        <Helmet>
          <title>{documentTitle}</title>
        </Helmet>

        <div className="row mb-2">
          <div className="col-md-4">
            <h5 className="page-title">
              <i className="fa fa-clone" /> <span>{pageTitle}</span>
            </h5>
          </div>
          {!this.props.productsLoading &&
            (productCount > 0 && (
              <div className="col-md-4 product-count">
                <i className="fa fa-check-square" aria-hidden="true" />
                <span className="count-line">{productCount} products found.</span>
              </div>
            ))}
          {!this.props.productsLoading &&
            (!productCount && (
              <div className="col-md-4 product-count">
                <i className="fa fa-warning" />
                <span className="count-line">No product found.</span>
              </div>
            ))}
          {this.props.loginStatus && (
            <div className="col-md-4 text-right">
              <button className="btn btn-primary" onClick={this.addnew}>
                Add New Product
              </button>
            </div>
          )}
        </div>

        {!this.props.productsLoading &&
          (Object.keys(this.props.brandList).length > 0 && (
            <FilterBar
              sortAndFilterHandler={this.sortAndFilterHandler}
              brandList={this.props.brandList}
              brand={this.state.brand}
              sort={this.state.sort}
              sortOrder={this.state.sortOrder}
              sortOrderChange={this.sortOrderChange}
              searchTerm={this.state.searchTerm}
              searchProducts={this.searchProducts}
            />
          ))}
        {productCount > 0 && (
          <div className="row pagination-row">
            <div className="col-md-auto">
              <Pagination
                className="product-pagination"
                pageSize={this.pageSize}
                currentPage={this.state.currentPage}
                productCount={productCount}
                goToPage={this.goToPage}
              />
            </div>
          </div>
        )}
        <div className="row justify-content-center mb-5">{productsHtml}</div>
        <ProductModal
          product={this.state.modalProduct}
          toggle={this.modalToggle}
          addToCart={this.addToCart}
          isModalOpen={this.state.isModalOpen}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const params = {
    loginStatus: state.allStatuses.loginStatus,
    productsLoading: state.allStatuses.productsLoading,
    categoryName: props.match && props.match.params.categoryName ? props.match.params.categoryName : ''
  };

  params.products = getFilteredProducts(state, params.categoryName);
  params.brandList = getFilteredProductBrands(params.products);
  return params;
};

const Products = connect(mapStateToProps, { addToCart })(ProductsComponent);

export default FadeCSSTransitionWrapper(Products);
