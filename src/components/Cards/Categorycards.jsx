import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryCards.css'; 

const CategoryCards = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/all/products/category/${categoryName}`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching product data:', error));
  }, [categoryName]);

  return (
    <>
      <h2>{categoryName} Products</h2>
      <div className="product-container">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.thumbnail} alt={product.title} className="product-img" />
            <div className="product-details">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryCards;
