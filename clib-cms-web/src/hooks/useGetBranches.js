import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import BRANCH from '../api/queries/Branch';

function useGetBranches() {
  const { loading, error, data } = useQuery(BRANCH.LIST);

  const [branches, setBranches] = useState();

  useEffect(() => {
    if (data) {
      setBranches(data.branches);
    }
  }, [data]);

  return { loading, error, branches };
}

export default useGetBranches;
