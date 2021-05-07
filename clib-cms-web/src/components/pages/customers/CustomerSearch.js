import React from 'react';
import PropTypes from 'prop-types';

function CustomerSearch({ handleInputChange, searchText }) {
  return (
    <div>
      <input
        className="search-input"
        type="search"
        id="search"
        name="search"
        placeholder="Search..."
        value={searchText}
        onChange={handleInputChange}
      ></input>
    </div>
  );
}

export default CustomerSearch;

CustomerSearch.propTypes = {
  handleInputChange: PropTypes.func,
  searchText: PropTypes.string,
};
