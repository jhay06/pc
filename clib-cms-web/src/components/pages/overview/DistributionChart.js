import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';

import './ChartCard.css';

const DistributionChart = ({ text, icon }) => {
  return (
    <div className="chart-card col-md-6">
      <div className="heading d-flex justify-content-between mt-2 mb-2">
        <label className="label">{text}</label>
        <div className="icon">
          <ion-icon className="icon" name={icon}></ion-icon>
        </div>
      </div>

      <Pie
        data={{
          labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4'],
          datasets: [
            {
              label: 'Aging Charts',
              data: [12, 19, 3, 20],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(136, 232, 140, 0.2)',
              ],
            },
          ],
        }}
      />
    </div>
  );
};

export default DistributionChart;

DistributionChart.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
};
