import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryCards.css'; 

const CategoryCards = () => {
  // Change 'categoryName' to 'category' to match the route parameter in App.js
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/all/products/category/${category}`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching product data:', error));
  }, [category]);

  return (
    <>
      <h2>{category} Products</h2>
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
