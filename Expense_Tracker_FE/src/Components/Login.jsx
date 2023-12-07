import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import http from '../services/httpService';

import '../Styles/style.Login.css';

function Login() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleChange = ({ target }) => {
        if (target.name === 'phone')setPhone(target.value);
        if (target.name === 'password')setPassword(target.value);
    };

    const handleSubmit = async () => {
        try {
            const res = await http.post('/user/login', {
                phone,
                password,
            });
            if (res.status === 200) {
                const { token } = res.body;
                const tokenObj = jwtDecode(token);
                http.setAuthToken(token);
                localStorage.setItem('id', tokenObj._id);
                localStorage.setItem('phone', tokenObj.phone);
                window.location = '/tracker';
            } else {
                console.log(res);
                setError(res.body.error);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="login-container">
            <h2>Welcome!</h2>
            <input type="number" name="phone" value={phone} placeholder="phone" onChange={handleChange} />
            <input type="password" name="password" value={password} placeholder="password" onChange={handleChange} />
            {error && <div className="error-div">{error}</div>}
            <button type="button" onClick={handleSubmit}>Log In</button>
        </div>
    );
}

export default Login;
