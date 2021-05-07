import React from 'react';
import Bg from '../../../assets/img/background.png';

import './BackgroundContainer.css';

const BackgroundContainer = () => {
  return (
    <div className="background-container">
      <img src={Bg} alt="background-img" />
      <div className="overlay"></div>
    </div>
  );
};

export default BackgroundContainer;
