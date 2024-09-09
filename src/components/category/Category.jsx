import React, { useEffect, useState } from 'react';
import './Category.css';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch categories
    fetch('http://localhost:3000/category')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching category data:', error));
  }, []);

  useEffect(() => {
    // Fetch products only when a category is selected
    if (selectedCategory) {
      fetch(`http://localhost:3000/products?category=${selectedCategory}`)
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error('Error fetching products:', error));
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category._id); // Set the clicked category
  };

  return (
    <>
      <h2>Our Popular Categories</h2>
      <div className="category-container">
        {categories.map((category) => (
          <div
            key={category._id}
            className="category-card"
            onClick={() => handleCategoryClick(category)} // Category click event
          >
            <img src={category.image} alt={category.name} className="cat-img" />
            <div className="cat-heading">{category.name}</div>
          </div>
        ))}
      </div>

      {/* Display Products of the selected category */}
      {selectedCategory && (
        <div className="product-container">
          <h3>Products in {categories.find(cat => cat._id === selectedCategory)?.name}</h3>
          <div className="product-list">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <img src={product.image} alt={product.name} />
                <div>{product.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Category;
