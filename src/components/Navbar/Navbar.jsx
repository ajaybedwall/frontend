import  { useEffect, useState } from "react";
import "./Navbar.css";
import Trolley from "../../assets/trolley.png";
import {FaRegUser, FaShoppingCart, FaBars, FaTimes,} from "react-icons/fa";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { Link,useNavigate } from "react-router-dom";
// import { , FaRegUser } from "react-icons/fa";
// import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
// import { Link, useNavigate } from "react-router-dom";
// import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
    const [isSearchActive, setIsSearchActive] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (token && loggedInUser) {
      setIsLoggedIn(true);
      setUserName(loggedInUser);
    }
  }, []);
  console.log("ajay");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    navigate("/login");
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

      <div className="navbar">
        <div className="navbar-left">
          <div className="navbar-button">
            <img src={Trolley} alt="icon" className="nav-icon" />
            ShopCart
          </div>
        </div>

        <div className="navbar-middle">
          <div className="">
            {" "}
            Categories
            <i>
              <IoIosArrowDown />
            </i>
          </div>
          <div className="">Deals</div>
          <div className="">What&apos; New</div>
          <div className="">Delivery</div>
        </div>

        <div className="navbar-right">
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
          <div className="">
            <span className="arrow">
              <FaRegUser /> <Link to="/login">Account</Link>
            </span>
          </div>
          <div className=""> {isLoggedIn ? (
            <div className="navbar-button dropdown-container">
              <span className="arrow">
                <FaRegUser /> {userName} <IoIosArrowDown />
              </span>
              <div className="dropdown-content">
                <Link to="/profile">
                  <button className="dropdown-item">Profile</button>
                </Link>
                <button className="dropdown-item" onClick={handleLogout}> Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="navbar-button">
              
            </div>
          )}
            <span className="arrow">
              <FaShoppingCart /> Cart
            </span>
          </div>
        </div>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={() => setIsSidebarOpen(true)}>
          <FaBars />
        </div>
      </div>

      {/* Sidebar Menu */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <FaTimes
            onClick={() => setIsSidebarOpen(false)}
            className="close-btn"
          />
        </div>
        <div className="sidebar-content">
          <div className="sidebar-button">
            {" "}
            Categories
            <i>
              <IoIosArrowDown />
            </i>
          </div>
          <div className="sidebar-button">Deals</div>
          <div className="sidebar-button">What&apos; New</div>
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
    </>
  );
};

export default Navbar;
