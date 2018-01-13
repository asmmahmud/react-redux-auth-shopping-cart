import React from 'react';
import SearchFilter from './SearchFilter';

const FilterBar = props => {
  return (
    <div className="row product-bar justify-content-center">
      <div className="col-md-4 filter">
        <div className="form-group row">
          <label htmlFor="brand" className="col-sm-3 col-form-label">
            Filter
          </label>
          <div className="col-sm-9">
            <select
              onChange={props.sortAndFilterHandler}
              value={props.brand}
              className="form-control"
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
        </div>
      </div>
      <div className="col-md-4 sorting">
        <div className="form-group row">
          <label htmlFor="sort" className="col-sm-5 col-form-label">
            Sorting:
          </label>
          <div className="col-sm-6 col-form-input">
            <select
              onChange={props.sortAndFilterHandler}
              value={props.sort}
              className="form-control"
              name="sort"
              id="sort"
            >
              <option value="brand">Brand</option>
              <option value="price">Price</option>
              <option value="quantity">Quantity</option>
            </select>
          </div>
        </div>
        <div className="direction">
          <i onClick={props.sortOrderChange} className={'fa fa-fw fa-sort-' + props.sortOrder} />
        </div>
      </div>
      <div className="col-sm-4 product-search">
        <div className="form-group ">
          <SearchFilter searchTerm={props.searchTerm} searchProducts={props.searchProducts} />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
