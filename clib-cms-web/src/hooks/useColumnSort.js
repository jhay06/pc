import { useEffect, useState } from 'react';
import _ from 'lodash';

function useColumnSort(searchedData) {
  const [sortMode, setSortMode] = useState('firstName');
  const [sortedData, setData] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);

  const sort = (type) => {
    setSortAscending((prev) => (sortMode === type ? !prev : true));
    setSortMode(type);
  };

  useEffect(() => {
    setData(() => {
      const sorted = _.sortBy(
        searchedData,
        sortMode === 'dateOfBirth'
          ? (customer) => new Date(customer.dateOfBirth)
          : [
              (customer) =>
                customer[sortMode] && customer[sortMode].toLowerCase(),
            ]
      );
      return sortAscending ? sorted : sorted.reverse();
    });
  }, [sortMode, sortAscending, searchedData]);

  return [sort, sortedData, sortMode, sortAscending];
}

export default useColumnSort;
