import React from 'react';
import { NavLink } from 'react-router-dom';

import '../Styles/style.NavBar.css';

function NavBar() {
    const isLoggedIn = !!localStorage.getItem('phone');
    return (
        <nav className="navbar-container">
            {isLoggedIn ? (
                <>
                    <NavLink to="/tracker" className={({ isActive }) => (isActive ? 'active' : '')}>Tracker</NavLink>
                    <NavLink to="/logout" className={({ isActive }) => (isActive ? 'active' : '')}>Logout</NavLink>
                </>
            )
                : (
                    <>
                        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
                        <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Log in</NavLink>
                        <NavLink to="/signup" className={({ isActive }) => (isActive ? 'active' : '')}>Sign Up</NavLink>
                    </>
                )}
        </nav>
    );
}

export default NavBar;
