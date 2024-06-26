import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './Components/Home';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Logout from './Components/Logout';
import Tracker from './Components/Tracker/Tracker';
import NotFound from './Components/NotFound';

import './Styles/App.css';

function App() {
    return (
        <>
            <NavBar />
            <div className="body">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/tracker" element={<Tracker />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
