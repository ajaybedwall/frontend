import React from 'react';
import './Card.css';

const Cards = ({ products }) => {
  return (
    <div className="cards-container">
      {products.map((product) => (
        <div className="card" key={product.id}>
          <div className="card-image">
            <img src={product.thumbnail} alt={product.title} />
          </div>
          <div className="card-content">
            <h3 className="card-title">{product.title}</h3>
            <p className="card-price">${product.price.toFixed(2)}</p>
            <p className="card-description">{product.description}</p>
            <div className="card-rating">
              <span className="stars">⭐ {product.rating}</span>
              <span className="reviews">({product.reviews.length})</span>
            </div>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
