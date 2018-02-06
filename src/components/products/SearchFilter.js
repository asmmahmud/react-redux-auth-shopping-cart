import React from 'react';

const SearchFilter = props => {
  return (
    <input
      type="text"
      value={props.searchTerm}
      className="form-control form-control-sm product-search-control"
      onChange={props.searchProducts}
      name="filter_search"
      placeholder="Search Product"
    />
  );
};
export default SearchFilter;
