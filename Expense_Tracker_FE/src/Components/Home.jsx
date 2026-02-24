import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/style.Home.css';

function Home() {
    return (
        <div className="home-container">
            <div className="hero-section">
                <h1 className="hero-title">
                    Master Your <span className="highlight">Money</span>
                </h1>
                <p className="hero-subtitle">
                    Welcome to an amazing expense tracker app where you can track your expenses and incomes
                    with ease. Get started if you are new here or simply just log in.
                </p>
                <div className="cta-buttons">
                    <Link to="/signup" className="btn btn-primary">Get Started</Link>
                    <Link to="/login" className="btn btn-secondary">Log in</Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
