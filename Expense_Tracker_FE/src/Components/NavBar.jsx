import React from 'react';
import { NavLink } from 'react-router-dom';

import '../Styles/style.NavBar.css';

function NavBar() {
    const isLoggedIn = !!localStorage.getItem('phone');
    return (
        <nav className="navbar-container">
            {isLoggedIn ? (
                <>
                    <NavLink to="/tracker">Tracker</NavLink>
                    <NavLink to="/logout">Logout</NavLink>
                </>
            )
                : (
                    <>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/login">Log in</NavLink>
                        <NavLink to="signup">Sign Up</NavLink>

                    </>
                )}
        </nav>
    );
}

export default NavBar;
