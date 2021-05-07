import React, { useEffect, useState } from 'react';
import ClaimList from './ClaimList';
import ErrorMessage from '../../../ErrorMessage';
import '../CustomerSection.css';

import CUSTOMER from '../../../../api/queries/Customer';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import CustomersLoading from '../../../CustomersLoading';
import { NetworkStatus } from 'apollo-client';
import useGetBranches from '../../../../hooks/useGetBranches';

export const ClaimIndex = () => {
  const { id } = useParams();
  const {
    data,
    loading,
    error,
    networkStatus,
    refetch: claimsRefetch,
  } = useQuery(CUSTOMER.CLAIMS, {
    variables: {
      limit: '1000',
      page: '1',
      customerNo: id,
    },
    notifyOnNetworkStatusChange: true,
  });
  const { loadingBranches, branches } = useGetBranches();
  const [withBranchNames, setWithBranchNames] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (data && branches && mounted) {
      const addedBranchNames = data.getCustomerClaims.map((claim) => {
        const clBranchObj = branches.find(
          (branch) => branch.code === claim.branchCode
        );
        const payoutBranchObj = branches.find(
          (branch) => branch.code === claim.payoutBranch
        );
        const clBranchName = clBranchObj ? clBranchObj.name : 'nameNotFound';
        const payoutBranchName = payoutBranchObj
          ? payoutBranchObj.name
          : 'nameNotFound';
        return {
          ...claim,
          clBranchName: clBranchName,
          payoutBranchName: payoutBranchName,
        };
      });
      setWithBranchNames(addedBranchNames);
    }
    return () => (mounted = false);
  }, [data, branches]);

  return (
    <>
      {(loading ||
        loadingBranches ||
        networkStatus === NetworkStatus.refetch) && (
        <div className="cust-sidebar-loading">
          <CustomersLoading />
        </div>
      )}
      {error && (
        <ErrorMessage
          icon="file-tray-full-outline"
          meta={error.message.slice(14)}
        />
      )}
      {data &&
        branches &&
        networkStatus !== NetworkStatus.refetch &&
        withBranchNames.map((claim, i) => {
          return (
            <ClaimList
              claim={claim}
              key={i}
              claimKey={i}
              claimsRefetch={claimsRefetch}
            />
          );
        })}
    </>
  );
};

export default ClaimIndex;
