import React from 'react';
import './HomeDes.css';

const HomeDes = () => {
  return (
    <div className="homeDesWrapper">
      <div className="ripple-background">
        <div className="circle xxlarge shade1"></div>
        <div className="circle xlarge shade2"></div>
        <div className="circle large shade3"></div>
        <div className="circle medium shade4"></div>
        <div className="circle small shade5"></div>
      </div>

      <div className="homeDesContainer">
        <div className="homeDesContent">
          <h1 className="homeDesH1">Shopping And Department Store.</h1>
          <p>Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.</p>
          <button>Learn More</button>
        </div>
        <div className="homeDesImageContainer">
          <div className="homeDesImageBox">
            <img src="https://i.imgur.com/qNOjJje.jpeg" alt="Shopping Bags" />
          </div>
          <div className="homeDesImageBox">
            <img src="https://i.imgur.com/Qphac99.jpeg" alt="Suitcase" />
          </div>
          <div className="homeDesImageBox">
            <img src="https://i.imgur.com/ZANVnHE.jpeg" alt="Play Station" />
          </div>
          <div className="homeDesImageBox">
            <img src="https://i.imgur.com/BG8J0Fj.jpg" alt="Chips and Drinks" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDes;
