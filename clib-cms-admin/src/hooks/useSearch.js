import { useEffect, useState } from 'react';
import _ from 'lodash';

function useSearch(allData) {
  const [searchText, setSearchText] = useState('');
  const [searchedData, setSearchedData] = useState([]);

  useEffect(() => {
    if (allData && allData.length > 0) {
      setSearchedData(
        allData.filter((item) => {
          const { fullname, employeeId } = item;
          return (
            _.lowerCase(fullname).includes(_.lowerCase(searchText)) ||
            employeeId.includes(searchText)
          );
        })
      );
    }
  }, [searchText, allData]);

  return [setSearchText, searchedData, searchText];
}

export default useSearch;
