// Cards.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import { CartContext } from "../context/CartContext"; // CartContext import

const Cards = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext); // CartContext se addToCart function

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/all/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = products.slice(indexOfFirstCard, indexOfLastCard);

  // Pagination controls
  const totalPages = Math.ceil(products.length / cardsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-message">Oops! Something went wrong: {error}</div>
    );
  }

  return (
    <div>
      <div className="cards-container">
        {currentCards.map((product) => (
          <div
            className="card"
            key={product.id}
            onClick={() => handleCardClick(product.id)}
          >
            <div className="card-image">
              <img src={product.thumbnail} alt={product.title} loading="lazy" />
            </div>
            <div className="card-content">
              <div className="c">
                <h2 className="card-title">{product.title} </h2>
                <p className="card-price">
                  <span className="currency-symbol">$</span>
                  {Math.floor(product.price)}
                  <span className="decimal-part">
                    {product.price.toFixed(2).slice(-3)}
                  </span>
                </p>
              </div>

              <p className="card-description">{product.description}</p>
              <div className="card-rating">
                <span className="stars">
                  {"⭐".repeat(product.rating)} {product.rating}
                </span>
                <span className="reviews">
                  ({product.reviews?.length || 0})
                </span>
              </div>
              {/* Add to Cart Button */}
              <button
                className="add-to-cart-btn"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click
                  addToCart(product); // Cart mein product add karo
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-btn ${
              currentPage === index + 1 ? "active" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Cards;
