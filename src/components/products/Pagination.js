import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/Pagination.scss';

class Pagination extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      pagesArray: []
    };
  }
  /*  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      nextProps.productCount !== this.props.productCount ||
      nextProps.currentPage !== this.props.currentPage ||
      nextProps.pageSize !== this.props.pageSize
    );
  }*/
  componentDidMount() {
    const numOfPages = Math.ceil(this.props.productCount / this.props.pageSize);
    const pagesArray = Array(numOfPages)
      .fill(1)
      .map((v, i) => i + 1);
    console.log(pagesArray);
    this.setState({ pagesArray });
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.productCount !== this.props.productCount || nextProps.pageSize !== this.props.pageSize) {
      console.log(nextProps);
      const numOfPages = Math.ceil(nextProps.productCount / nextProps.pageSize);
      const pagesArray = Array(numOfPages)
        .fill(1)
        .map((v, i) => i + 1);
      this.setState({ pagesArray });
    }
  }
  render() {
    let pageHtml = this.state.pagesArray.map(pageNo => {
      return (
        <li key={pageNo} className="page-item">
          <button
            className={this.props.currentPage !== pageNo ? 'page-link' : ['page-link', 'active', 'disabled'].join(' ')}
            onClick={this.props.currentPage !== pageNo ? () => this.props.goToPage(pageNo) : null}
          >
            <span>{pageNo}</span>
          </button>
        </li>
      );
    });
    return (
      <nav aria-label="Page navigation" className={this.props.className}>
        <ul className="pagination">
          {this.props.currentPage - 1 > 0 && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={e => {
                  e.preventDefault();
                  this.props.goToPage(this.props.currentPage - 1);
                }}
              >
                Previous
              </button>
            </li>
          )}
          {pageHtml}
          {this.props.currentPage + 1 <= this.state.pagesArray.length && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={e => {
                  e.preventDefault();
                  this.props.goToPage(this.props.currentPage + 1);
                }}
              >
                Next
              </button>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}
Pagination.propTypes = {
  className: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  productCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired
};
export default withRouter(Pagination);
