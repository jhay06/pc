import { useQuery } from '@apollo/react-hooks';
import OVERVIEW from '../api/queries/Overview';
import _ from 'lodash';

export const cardTitles = [
  'Reported',
  'Pending Requirements',
  'Processing',
  'For Approval of Insurer',
  'Approved by Insurer',
  'Ready for Release',
];

function useOverviewClaims(overviewCard) {
  const {
    data: dataReported,
    loading: loadingReported,
    error: errorReported,
  } = useQuery(OVERVIEW.REPORTED, {
    variables: {
      limit: '10000',
      page: '1',
    },
    skip: overviewCard !== _.camelCase(cardTitles[0]) ? true : false,
  });
  const {
    data: dataPendingReq,
    loading: loadingPendingReq,
    error: errorPendingReq,
  } = useQuery(OVERVIEW.PENDING_REQ, {
    variables: {
      limit: '10000',
      page: '1',
    },
    skip: overviewCard !== _.camelCase(cardTitles[1]) ? true : false,
  });
  const {
    data: dataProcessing,
    loading: loadingProcessing,
    error: errorProcessing,
  } = useQuery(OVERVIEW.PROCESSING, {
    variables: {
      limit: '10000',
      page: '1',
    },
    skip: overviewCard !== _.camelCase(cardTitles[2]) ? true : false,
  });
  const {
    data: dataInsurerApproval,
    loading: loadingInsurerApproval,
    error: errorInsurerApproval,
  } = useQuery(OVERVIEW.INSURER_APPROVAL, {
    variables: {
      limit: '10000',
      page: '1',
    },
    skip: overviewCard !== _.camelCase(cardTitles[3]) ? true : false,
  });
  const {
    data: dataInsurerApproved,
    loading: loadingInsurerApproved,
    error: errorInsurerApproved,
  } = useQuery(OVERVIEW.INSURER_APPROVED, {
    variables: {
      limit: '10000',
      page: '1',
    },
    skip: overviewCard !== _.camelCase(cardTitles[4]) ? true : false,
  });
  const {
    data: dataReadyRelease,
    loading: loadingReadyRelease,
    error: errorReadyRelease,
  } = useQuery(OVERVIEW.READY_RELEASE, {
    variables: {
      limit: '10000',
      page: '1',
    },
    skip: overviewCard !== _.camelCase(cardTitles[5]) ? true : false,
  });

  const overviewCardsData = {
    [_.camelCase(cardTitles[0])]: [
      dataReported,
      loadingReported,
      errorReported,
    ],
    [_.camelCase(cardTitles[1])]: [
      dataPendingReq,
      loadingPendingReq,
      errorPendingReq,
    ],
    [_.camelCase(cardTitles[2])]: [
      dataProcessing,
      loadingProcessing,
      errorProcessing,
    ],
    [_.camelCase(cardTitles[3])]: [
      dataInsurerApproval,
      loadingInsurerApproval,
      errorInsurerApproval,
    ],
    [_.camelCase(cardTitles[4])]: [
      dataInsurerApproved,
      loadingInsurerApproved,
      errorInsurerApproved,
    ],
    [_.camelCase(cardTitles[5])]: [
      dataReadyRelease,
      loadingReadyRelease,
      errorReadyRelease,
    ],
  };

  const overviewData = overviewCardsData[overviewCard];

  return overviewData;
}

export default useOverviewClaims;
