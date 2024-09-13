import { useEffect, useState } from "react";
import {
  FaRegUser,
  FaPhone,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Trolley from "../../assets/trolley.png";
import "./Navbar.css";
import Cart from "../Cart/Cart"; // Ensure this path is correct

const Navbar = ({ cartItems }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (token && loggedInUser) {
      setIsLoggedIn(true);
      setUserName(loggedInUser);
    }

    // Sticky navbar logic
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen); // Toggle cart visibility
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <div className="nav-1">
        <div className="navbar-button">
          <FaPhone />
          +91 12345 67890
        </div>
        <div className="shop-now">
          <p>Get 50% off on selected items | Shop Now</p>
        </div>
        <div className="navbar-button">
          <select className="dropdown">
            <option>Eng</option>
            <option>Hindi</option>
          </select>
          <select className="dropdown">
            <option>Location</option>
            <option>India</option>
          </select>
        </div>
      </div>

      {/* Sticky navbar */}
      <div className={`navbar ${isSticky ? "sticky" : ""}`}>
        <div className="navbar-left">
          <div className="navbar-button">
            <img src={Trolley} alt="icon" className="nav-icon" />
            ShopCart
          </div>
        </div>
        <div className="navbar-middle">
          <div className="menu-items">
            <Link to="/categories" className="menu-item">
              Categories
            </Link>
            <Link to="/deals" className="menu-item">
              Deals
            </Link>
            <Link to="/whats-new" className="menu-item">
              What&apos;s New
            </Link>
            <Link to="/delivery" className="menu-item">
              Delivery
            </Link>
          </div>

          <div className="nav2-search">
            <div className="search-box">
              <input
                type={isSearchActive ? "text" : "hidden"}
                className="search-input"
                placeholder="Search..."
              />
              <IoIosSearch
                className="search-btn"
                onClick={() => setIsSearchActive(!isSearchActive)}
              />
            </div>
          </div>

          {isLoggedIn ? (
            <div className="navbar-button dropdown-container">
              <span className="arrow">
                <FaRegUser /> {userName} <IoIosArrowDown />
              </span>
              <div className="dropdown-content">
                <Link to="/profile">
                  <button className="dropdown-item">Profile</button>
                </Link>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="navbar-button">
              <span className="arrow">
                <FaRegUser /> <Link to="/login">Account</Link>
              </span>
            </div>
          )}

          {/* Cart Button */}
          <div className="navbar-button" onClick={handleCartClick}>
            <span className="arrow">
              <FaShoppingCart />
              <Link to={"/cart"}>Cart</Link> ({cartItems.length})
            </span>
          </div>

          <div className="hamburger" onClick={() => setIsSidebarOpen(true)}>
            <FaBars />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <FaTimes onClick={() => setIsSidebarOpen(false)} className="close-btn" />
        </div>
        <div className="sidebar-content">
          <div className="sidebar-button">
            <IoIosArrowDown /> Categories
          </div>
          <div className="sidebar-button">Deals</div>
          <div className="sidebar-button">What&apos;s New</div>
          <div className="sidebar-button">Delivery</div>
          <div className="sidebar-button">
            <FaRegUser /> <Link to="/login">Account</Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div className="overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Cart Component */}
      {isCartOpen && <Cart cartItems={cartItems} onClose={handleCartClose} />}
    </>
  );
};

export default Navbar;
