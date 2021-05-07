import { useEffect, useState } from 'react';
import CUSTOMER from '../api/queries/Customer';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { isPast } from 'date-fns';

function useCustCocs() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(CUSTOMER.COC_LIST, {
    variables: {
      limit: '1000',
      page: '1',
      customerNo: id,
    },
  });
  const { data: claimsData, loading: claimsLoading } = useQuery(
    CUSTOMER.CLAIMS,
    {
      variables: {
        limit: '1000',
        page: '1',
        customerNo: id,
      },
    }
  );
  const [owner, setOwner] = useState('');
  const [cocs, setCocs] = useState([]);

  //sorting COC status:
  useEffect(() => {
    if (data && !claimsLoading) {
      const { cocs, customer } = data.getCustomerCocList;
      const { firstName, middleName, lastName } = customer;
      setOwner(`${firstName} ${middleName} ${lastName}`);
      setCocs(
        cocs.map((coc) => {
          var cocStatus =
            _.lowerCase(coc.active) === 'true' ? 'Active' : 'INVALID DATA';

          const claimsOfThisCoc = claimsData
            ? claimsData.getCustomerClaims.filter((claim) =>
                claim.cocs.includes(coc.cocNumber)
              )
            : [];

          const settledStatusCheck = claimsOfThisCoc.find((claim) => {
            const { claimStatus } = claim;
            return (
              claimStatus === 'Settled (Ex-Gratia)' || claimStatus === 'Settled'
            );
          });
          const benefitCheck = claimsOfThisCoc.find((claim) => {
            const { benefits } = claim;
            return benefits
              .map((benefit) => benefit.code)
              .some((_) => ['DB', 'MUAB', 'ADB'].includes(_));
          });
          cocStatus =
            isPast(new Date(coc.expiryDate)) ||
            (settledStatusCheck && benefitCheck)
              ? 'Expired'
              : cocStatus;

          cocStatus =
            settledStatusCheck && !benefitCheck ? 'Claimed' : cocStatus;
          return {
            ...coc,
            COCStatus: coc.productCode === 'CLPMX' ? cocStatus : '',
            claimsOfThisCoc: claimsOfThisCoc,
            pastExpiry: isPast(new Date(coc.expiryDate)),
          };
        })
      );
    }
  }, [data, claimsData, claimsLoading, id]);

  return [loading, claimsLoading, error, owner, cocs];
}

export default useCustCocs;
