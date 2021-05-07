import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import TotalCard from './TotalCard';
import DistributionChart from './DistributionChart';
import AgingChart from './AgingChart';
import './DashboardContainer.css';
import OVERVIEW from '../../../api/queries/Overview';
import { useQuery } from '@apollo/react-hooks';
import CustomersLoading from '../../CustomersLoading';
import _ from 'lodash';
import { cardTitles } from '../../../hooks/useOverviewClaims';

const StatisticContents = () => {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, loading, error } = useQuery(OVERVIEW.TOTALS, {
    variables: {
      limit: '1',
      page: '1',
    },
  });

  return (
    <>
      {loading && (
        <>
          <div className="overview-loader">
            <CustomersLoading />
          </div>
        </>
      )}
      {error && <h1>{error.message}</h1>}
      {data && (
        <div className="overview-container mt-2 d-flex flex-column">
          <div className="total-container d-flex">
            {cardTitles.map((card, index) => {
              const apiData = Object.keys(data).map((key) => data[key]);
              return (
                <Link to={`/overview/${_.camelCase(card)}`} key={index}>
                  <TotalCard number={apiData[index].totalResult} text={card} />
                </Link>
              );
            })}
          </div>

          <div className="graph-container d-flex">
            <AgingChart
              text="Aging Chart for Active CLaims"
              icon="ellipsis-horizontal"
            />

            <DistributionChart
              text="Distribution of Claim Per Type or Coverage"
              icon="ellipsis-horizontal"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default StatisticContents;
