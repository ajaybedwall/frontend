import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Category.css';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Use navigate hook for redirection

  useEffect(() => {
    fetch('http://localhost:3000/category')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching category data:', error));
  }, []);

  const handleCategoryClick = (categoryName) => {
    // Ensure this matches the route defined in App.js
    navigate(`/Product/category/${categoryName}`);
  };

  return (
    <>
      <h2>Our Popular Categories</h2>
      <div className="category-container">
        {categories.map((category) => (
          <div 
            key={category._id} 
            className="category-card" 
            onClick={() => handleCategoryClick(category.name.toLowerCase())}
          >
            <img src={category.image} alt={category.name} className="cat-img" />
            <div className="cat-heading">{category.name}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Category;
