import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the route
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/all/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail">
        <img src={product.thumbnail} alt={product.title} className="product-image" />
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price.toFixed(2)}</p>
        <p>Rating: ⭐ {product.rating}</p>
        <p>Stock: {product.stock}</p>
        <button className="add-to-cart-btn-d">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
