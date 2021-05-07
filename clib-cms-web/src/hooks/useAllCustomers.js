import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import CUSTOMER from '../api/queries/Customer';

function useAllCustomers() {
  const { loading, error, data } = useQuery(CUSTOMER.SEARCH_LIST, {
    variables: {
      limit: '1000',
      page: '1',
      search: '',
    },
  });

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (data) {
      const withFixedDate = data.searchCustomerList.map((cust) => {
        const { dateOfBirth } = cust;
        const month = dateOfBirth.slice(5, 7);
        const date = dateOfBirth.slice(8, 10);
        const year = dateOfBirth.slice(0, 4);
        const formattedDate = `${month}/${date}/${year}`;
        return {
          ...cust,
          dateOfBirth: formattedDate,
        };
      });
      setCustomers(withFixedDate);
    }
  }, [data]);

  return [customers, loading, error, data];
}

export default useAllCustomers;
