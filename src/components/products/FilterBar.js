import React from 'react';
import '../../styles/Filterbar.scss';

const FilterBar = props => {
  return (
    <div className="filter-bar">
      <div className="input-group input-group-sm brand-filter">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="brand">
            Brand
          </label>
        </div>
        <select
          onChange={props.sortAndFilterHandler}
          value={props.brand}
          className="custom-select"
          name="brand"
          id="brand"
          disabled={props.searchTerm.length > 0}
        >
          <option value="">All</option>
          {props.brandList.map(brand => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <div className="sorting-group">
        <div className="input-group input-group-sm">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="sort">
              Sorting
            </label>
          </div>
          <select
            onChange={props.sortAndFilterHandler}
            value={props.sort}
            className="custom-select"
            name="sort"
            id="sort"
          >
            <option value="brand">Brand</option>
            <option value="price">Price</option>
            <option value="quantity">Quantity</option>
          </select>
        </div>
        <div className="direction">
          <i onClick={props.sortOrderChange} className={'fa fa-fw fa-sort-' + props.sortOrder} />
        </div>
      </div>
      <div className="input-group product-search">
        <div className="input-group-prepend">
          <span className="input-group-text">Search</span>
        </div>
        <input
          type="text"
          value={props.searchTerm}
          className="form-control product-search-control"
          onChange={props.searchProducts}
          name="searchTerm"
          id="searchTerm"
          placeholder="Search Product"
        />
      </div>
    </div>
  );
};

export default FilterBar;
