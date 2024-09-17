import React from 'react';
import './Whats.css';
import first from "../../assets/faq-min.png";
import second from "../../assets/onlie payment-min.png"
import third from "../../assets/home delivery-min.png"

const Whats = () => {
    return (
        <>
            <div >
                <div className="whats-header">
                    <h1>Services To Help You Shop</h1>
                </div>
            </div>
            <div className="whats-container">
                <div className="whats-content">
                    <div className="whats-card">
                        <div className="whats-card-header">
                            <h3>Frequently Asked Questions</h3>
                        </div>
                        <div className="whats-card-body">
                            <p>Update on Safe Shoping in our Stores</p>
                            <img src={first} alt="Frequently Asked Questions" />
                        </div>
                    </div>
                    <div className="whats-card">
                        <div className="whats-card-header">
                            <h3>Online Payment Process</h3>
                        </div>
                        <div className="whats-card-body">
                            <p>Update on Safe Shoping in our Stores</p>
                            <img src={second} alt="Online Payment Process" />
                        </div>
                    </div>
                    <div className="whats-card">
                        <div className="whats-card-header">
                            <h3>Home Delivery Options</h3>
                        </div>
                        <div className="whats-card-body">
                            <p>Update on Safe Shoping in our Stores</p>
                            <img src={third} alt="Home Delivery Options" />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Whats;