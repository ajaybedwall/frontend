import React from 'react';
import './deals.css';
import book1 from '../../assets/book-min.png'
import sofa from '../../assets/sofa-min.png'
import shirt from '../../assets/shirt-min.png'
import book2 from '../../assets/bug & book-min.png'

const Deals = () => {
  return (
    <div className="deals-container">
      <h2 className="deals-title">Get Up To 70% Off</h2>
      <div className="deals-grid">
        <div className="deals-card">
          <div className="deals-card-content">
            <h3 className="deals-card-title">Save</h3>
            <h2 className="deals-card-price">$100</h2>
            <p className="deals-card-description">Explore Our Furniture & Home Furnishing Range</p>
          </div>
          <img src={sofa} alt="Sofa" className="deals-card-image" />
        </div>
        <div className="deals-card">
          <div className="deals-card-content">
            <h3 className="deals-card-title">Save</h3>
            <h2 className="deals-card-price">$29</h2>
            <p className="deals-card-description">Explore Our Furniture & Home Furnishing Range</p>
          </div>
          <img src={book1} alt="Book" className="deals-card-image" />
        </div>
        <div className="deals-card">
          <div className="deals-card-content">
            <h3 className="deals-card-title">Save</h3>
            <h2 className="deals-card-price">$67</h2>
            <p className="deals-card-description">Explore Our Furniture & Home Furnishing Range</p>
          </div>
          <img src={shirt} alt="Clothes" className="deals-card-image" />
        </div>
        <div className="deals-card">
          <div className="deals-card-content">
            <h3 className="deals-card-title">Save</h3>
            <h2 className="deals-card-price">$59</h2>
            <p className="deals-card-description">Explore Our Furniture & Home Furnishing Range</p>
          </div>
          <img src={book2} alt="Backpack" className="deals-card-image" />
        </div>
      </div>
    </div>
  );
};

export default Deals;