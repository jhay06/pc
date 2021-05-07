import { useEffect, useState } from 'react';
import _ from 'lodash';

function useSearch(allData, onCardPage) {
  const [searchText, setSearchText] = useState('');
  const [searchedData, setSearchedData] = useState([]);

  useEffect(() => {
    if (onCardPage && allData) {
      setSearchedData(
        allData.filter((item) => {
          const { fullname } = item.customerObj || {};
          const { claimsReferenceNumber } = item || {};
          return (
            _.lowerCase(fullname).includes(_.lowerCase(searchText)) ||
            claimsReferenceNumber.includes(searchText)
          );
        })
      );
    } else {
      setSearchedData(
        allData.filter((item) => {
          const { firstName, middleName, lastName, insuranceCustomerNo } = item;
          const fullName = `${firstName} ${middleName} ${lastName}`;
          return (
            _.lowerCase(fullName).includes(_.lowerCase(searchText)) ||
            insuranceCustomerNo.includes(searchText)
          );
        })
      );
    }
  }, [searchText, allData, onCardPage]);

  return [setSearchText, searchedData, searchText];
}

export default useSearch;
