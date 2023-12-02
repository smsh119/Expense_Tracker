import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './Components/Home';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Logout from './Components/Logout';
import Tracker from './Components/Tracker';

import './Styles/App.css';

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/tracker" element={<Tracker />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </>
    );
}

export default App;
